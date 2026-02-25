/**
 * Load and render cards from JSON data
 */
export async function loadAndRenderCards(pageName) {
    try {
        // Determine JSON file path based on page name
        const jsonPath = `../data/${pageName.replace('.html', '.json')}`;

        // Fetch the JSON data
        const response = await fetch(jsonPath);
        if (!response.ok) {
            console.warn(`Cards data not found for ${pageName}`);
            return;
        }

        const cardsData = await response.json();

        // Render cards
        renderCards(cardsData);

        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('cardsLoaded', {
            detail: { count: cardsData.length }
        }));
    } catch (error) {
        console.error('Error loading cards:', error);
    }
}

/**
 * Render cards from data array
 */
function renderCards(cardsData) {
    const cardsContainer = document.querySelector('.cards');
    if (!cardsContainer) return;

    // Create header with resource count
    const header = document.createElement('div');
    header.className = 'cards-header';
    const title = document.createElement('span');
    title.textContent = 'QUICK ACCESS';
    const count = document.createElement('span');
    count.textContent = `${cardsData.length} resources`;
    header.appendChild(title);
    header.appendChild(count);
    
    // Clear existing content and add header
    cardsContainer.innerHTML = '';
    cardsContainer.appendChild(header);

    // Create and append cards
    cardsData.forEach(card => {
        const article = document.createElement('article');
        article.className = 'card';
        
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        
        const cardTitle = document.createElement('h3');
        cardTitle.textContent = card.title;
        
        const description = document.createElement('p');
        description.textContent = card.description;
        
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(description);
        
        const link = document.createElement('a');
        link.className = 'card-action';
        link.href = card.url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.setAttribute('aria-label', `Open ${card.title}`);
        
        // Create icon image
        const img = document.createElement('img');
        img.src = '../assests/icons/top-right.png';
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
        link.appendChild(img);
        
        article.appendChild(cardContent);
        article.appendChild(link);
        cardsContainer.appendChild(article);
    });
}


