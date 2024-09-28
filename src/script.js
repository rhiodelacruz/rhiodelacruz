const apiKey = 'ouCIbE9Z94NvJKCs6tVZbX7RWUGqHll4';


const baseUrls = {
    emailed: `https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${apiKey}`,
    viewed: `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${apiKey}`,
    shared: `https://api.nytimes.com/svc/mostpopular/v2/shared/7.json?api-key=${apiKey}`,
    sports: `https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=${apiKey}`,
    world: `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${apiKey}`,
    arts: `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${apiKey}`
};


async function fetchArticles(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayArticles(data.results);
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}


function displayArticles(articles) {
    const articleContainer = document.getElementById('article-list');
    articleContainer.innerHTML = '';  
    
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        
        const title = document.createElement('h2');
        title.textContent = article.title;

        
        const abstract = document.createElement('p');
        abstract.textContent = article.abstract;

        
        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Read Full Article';
        link.target = '_blank';  

        
        articleElement.appendChild(title);
        articleElement.appendChild(abstract);
        articleElement.appendChild(link);

        
        articleContainer.appendChild(articleElement);
    });
}


document.getElementById('category').addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    fetchArticles(baseUrls[selectedCategory]);
});


document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value;
    if (query) {
        const searchUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`;
        fetchArticles(searchUrl);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    fetchArticles(baseUrls.emailed);
});