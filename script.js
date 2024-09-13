
const API_KEY = 'xgkbVzin7YICoFociMeNpfmj7RE2667U';
const API_URL = 'https://api.giphy.com/v1/gifs/search';

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const gifContainer = document.getElementById('gifContainer');


async function fetchGifs(query) {
    try {
        const url = `${API_URL}?api_key=${API_KEY}&q=${encodeURIComponent(query)}&limit=10`;
        const response = await fetch(url);
        const data = await response.json();
        displayGifs(data.data);
    } catch (error) {
        console.error('Error fetching GIFs:', error);
        showError('Sorry, we encountered an issue while fetching GIFs. Please try again.');
    }
}


function displayGifs(gifs) {
    gifContainer.innerHTML = '';
    if (gifs.length === 0) {
        gifContainer.innerHTML = '<p>No GIFs found. Try another search.</p>';
        return;
    }

    gifs.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title || 'GIF'; 
        img.title = gif.title; 
        gifContainer.appendChild(img);
    });
}


function showError(message) {
    gifContainer.innerHTML = `<p>${message}</p>`;
}


function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        fetchGifs(query);
    }
}


searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});
