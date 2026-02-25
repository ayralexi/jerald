const navItems = [
  {
    label: 'n8n',
    href: 'n8n.html',
    iconSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
  },
  {
    label: 'Railway and Databases',
    href: 'railway-and-databases.html',
    iconSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>'
  },
  {
    label: 'Accounts and Credentials',
    href: 'accounts-and-credentials.html',
    iconSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
  },
  {
    label: 'Trello Boards',
    href: 'trello-boards.html',
    iconSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'
  }
];

export function renderNavigation() {
  const navElement = document.querySelector('.nav');
  
  if (!navElement) {
    console.warn('Navigation element not found');
    return;
  }

  // Get current page filename more robustly
  const pathname = window.location.pathname;
  const pageMatch = pathname.match(/([a-z0-9-]+\.html)/i);
  const currentPage = pageMatch ? pageMatch[1] : 'n8n.html';

  let ul = navElement.querySelector('ul');
  if (ul) {
    ul.remove();
  }

  ul = document.createElement('ul');

  navItems.forEach((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    a.href = item.href;
    
    // Create icon span with SVG
    const iconSpan = document.createElement('span');
    iconSpan.className = 'nav-icon';
    iconSpan.innerHTML = item.iconSvg;
    a.appendChild(iconSpan);
    
    // Create label span
    const labelSpan = document.createElement('span');
    labelSpan.className = 'nav-label';
    labelSpan.textContent = item.label;
    a.appendChild(labelSpan);

    if (currentPage.toLowerCase() === item.href.toLowerCase()) {
      a.classList.add('active');
    }

    a.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all nav links
      document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to clicked link
      a.classList.add('active');
      
      // Perform page transition
      performPageTransition(item.href);
    });

    li.appendChild(a);
    ul.appendChild(li);
  });


  navElement.appendChild(ul);
}


function performPageTransition(href) {
    const mainElement = document.querySelector('.main');

    mainElement.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = href;
    }, 300);
}
