import { renderNavigation } from './navigation.js';
import { loadAndRenderCards, setupContentUpdateListener } from './load-cards.js';
import { initHamburger } from './hamburger.js';

document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();

    initHamburger();

    setupContentUpdateListener();

    const pathname = window.location.pathname;
    const pageMatch = pathname.match(/([a-z0-9-]+\.html)/i);
    const currentPage = pageMatch ? pageMatch[1] : 'n8n.html';

    loadAndRenderCards(currentPage);

    document.dispatchEvent(new CustomEvent('pageInitialized', {
        detail: { page: currentPage }
    }));
});
