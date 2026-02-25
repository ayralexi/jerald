import { renderNavigation } from './navigation.js';
import { loadAndRenderCards } from './load-cards.js';
import { initHamburger } from './hamburger.js';

document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();

    initHamburger();

    // Get current page name from URL path - handles all page locations correctly
    const pathname = window.location.pathname;
    const pageMatch = pathname.match(/([a-z0-9-]+\.html)/i);
    const currentPage = pageMatch ? pageMatch[1] : 'n8n.html';

    loadAndRenderCards(currentPage);

    document.dispatchEvent(new CustomEvent('pageInitialized', {
        detail: { page: currentPage }
    }));
});
