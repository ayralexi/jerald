export async function loadAndRenderCards(pageName) {
    try {
        const jsonPath = `../data/${pageName.replace('.html', '.json')}`;

        const response = await fetch(jsonPath);
        if (!response.ok) {
            console.warn(`Cards data not found for ${pageName}`);
            return;
        }

        const cardsData = await response.json();

        renderCards(cardsData);

        document.dispatchEvent(new CustomEvent('cardsLoaded', {
            detail: { count: cardsData.length }
        }));
    } catch (error) {
        console.error('Error loading cards:', error);
    }
}

export function setupContentUpdateListener() {
    document.addEventListener('contentUpdated', async (event) => {
        const href = event.detail.page;
        const pageName = href.split('/').pop();
        await loadAndRenderCards(pageName);
    });
}

function renderCards(cardsData) {
    const cardsContainer = document.querySelector('.cards');
    if (!cardsContainer) return;

    const header = document.createElement('div');
    header.className = 'cards-header';
    const title = document.createElement('span');
    title.textContent = 'QUICK ACCESS';
    const count = document.createElement('span');
    count.textContent = `${cardsData.length} resources`;
    header.appendChild(title);
    header.appendChild(count);
    
    cardsContainer.innerHTML = '';
    cardsContainer.appendChild(header);

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