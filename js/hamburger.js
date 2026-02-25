/*Hamburger menu functionality */

export function initHamburger() {
    setupSidebarMobileToggle();
    setupBrandClick();
}

export function setupBrandClick() {
    const brand = document.querySelector('.brand');
    
    if (!brand) {
        return;
    }

    brand.addEventListener('click', () => {
        // Clear current page from sessionStorage
        sessionStorage.removeItem('currentPage');
        // Navigate to index
        window.location.href = '../index.html';
    });
}

export function setupSidebarMobileToggle() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.querySelector('.sidebar');
    const app = document.querySelector('.app');

    if (!hamburgerBtn || !sidebar || !app) {
        console.warn('Hamburger menu elements not found');
        return;
    }

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = sidebar.classList.contains('open');
        
        if (isOpen) {
            sidebar.classList.remove('open');
            app.classList.remove('sidebar-open');
            document.body.classList.remove('sidebar-open');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        } else {
            sidebar.classList.add('open');
            app.classList.add('sidebar-open');
            document.body.classList.add('sidebar-open');
            hamburgerBtn.classList.add('active');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
        }
    });

    app.addEventListener('click', (e) => {
        if (e.target === app && app.classList.contains('sidebar-open')) {
            sidebar.classList.remove('open');
            app.classList.remove('sidebar-open');
            document.body.classList.remove('sidebar-open');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });

    document.querySelectorAll('.nav a').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                app.classList.remove('sidebar-open');
                document.body.classList.remove('sidebar-open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('open');
            app.classList.remove('sidebar-open');
            document.body.classList.remove('sidebar-open');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
}
