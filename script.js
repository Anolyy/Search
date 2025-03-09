const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

const API_KEY = 'AIzaSyB7Z0Udvm9F0yFKXa4knn49ShZmULDs_7g'; // API Key của bạn
const CX = 'c5159675e17ba454f'; // Search Engine ID của bạn

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchGoogle(query);
    }
});

async function searchGoogle(query) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) {
        console.error('Error fetching search data:', error);
        searchResults.innerHTML = '<li>Error fetching data. Please try again later.</li>';
    }
}

function displayResults(items) {
    searchResults.innerHTML = '';
    if (items && items.length > 0) {
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                <p>${item.snippet}</p>
            `;
            searchResults.appendChild(li);
        });
    } else {
        searchResults.innerHTML = '<li>No results found.</li>';
    }
}