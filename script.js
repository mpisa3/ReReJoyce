// Main JavaScript for re:rejoyce website

// Navigation handling
document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-view');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });
    
    // Handle hash changes (for back/forward navigation)
    window.addEventListener('hashchange', handleHashChange);
    
    // Load initial page based on hash or default to home
    handleHashChange();
    
    // Render episodes grid
    renderEpisodesGrid();
});

function navigateToPage(pageName, episodeNumber = null) {
    const pages = document.querySelectorAll('.page-view');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    
    // Remove active class from all nav links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Show target page
    if (episodeNumber !== null) {
        // Show episode detail page
        document.getElementById('episode-detail-page').classList.add('active');
        renderEpisodeDetail(episodeNumber);
        // Update nav to show episodes as active
        const episodesLink = document.querySelector('[data-page="episodes"]');
        if (episodesLink) episodesLink.classList.add('active');
    } else {
        // Show regular page
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update active nav link
        const activeLink = document.querySelector(`[data-page="${pageName}"]`);
        if (activeLink) activeLink.classList.add('active');
    }
    
    // Update URL hash
    if (episodeNumber !== null) {
        window.location.hash = `episode-${episodeNumber}`;
    } else {
        window.location.hash = pageName;
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function handleHashChange() {
    const hash = window.location.hash.slice(1) || 'home';
    
    // Check if it's an episode hash
    if (hash.startsWith('episode-')) {
        const episodeNumber = parseInt(hash.replace('episode-', ''));
        navigateToPage('episode-detail', episodeNumber);
    } else {
        navigateToPage(hash);
    }
}

function renderEpisodesGrid() {
    const grid = document.getElementById('episodes-grid');
    if (!grid) return;
    
    grid.innerHTML = episodesData.map(episode => `
        <div class="episode-card" data-episode="${episode.number}" data-episode-num="${episode.number}">
            <div class="episode-number">Episode ${episode.number}</div>
            <h3 class="episode-title">${episode.title}</h3>
            <p class="episode-homeric">${episode.homeric}</p>
            <div class="episode-meta">
                <div class="episode-meta-item">
                    <span class="episode-meta-label">Time:</span> ${episode.time}
                </div>
                <div class="episode-meta-item">
                    <span class="episode-meta-label">Place:</span> ${episode.place}
                </div>
                <div class="episode-meta-item">
                    <span class="episode-meta-label">Technique:</span> ${episode.technique}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers to episode cards
    const cards = grid.querySelectorAll('.episode-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const episodeNum = parseInt(card.getAttribute('data-episode'));
            navigateToPage('episode-detail', episodeNum);
        });
    });
}

function renderEpisodeDetail(episodeNumber) {
    const episode = episodesData.find(ep => ep.number === episodeNumber);
    if (!episode) return;
    
    const container = document.getElementById('episode-detail-content');
    if (!container) return;
    
    container.innerHTML = `
        <a href="#episodes" class="back-to-episodes" data-page="episodes">← Back to All Episodes</a>
        
        <div class="episode-header">
            <div class="episode-header-number">Episode ${episode.number}</div>
            <h1 class="episode-header-title">${episode.title}</h1>
            <p class="episode-header-homeric">${episode.homeric}</p>
            
            <div class="episode-schema-grid">
                <div class="schema-item">
                    <div class="schema-label">Time</div>
                    <div class="schema-value">${episode.time}</div>
                </div>
                <div class="schema-item">
                    <div class="schema-label">Place</div>
                    <div class="schema-value">${episode.place}</div>
                </div>
                <div class="schema-item">
                    <div class="schema-label">Organ</div>
                    <div class="schema-value">${episode.organ}</div>
                </div>
                <div class="schema-item">
                    <div class="schema-label">Art</div>
                    <div class="schema-value">${episode.art}</div>
                </div>
                <div class="schema-item">
                    <div class="schema-label">Color</div>
                    <div class="schema-value">${episode.color}</div>
                </div>
                <div class="schema-item">
                    <div class="schema-label">Symbol</div>
                    <div class="schema-value">${episode.symbol}</div>
                </div>
                <div class="schema-item">
                    <div class="schema-label">Technique</div>
                    <div class="schema-value">${episode.technique}</div>
                </div>
            </div>
        </div>
        
        <div class="episode-content">
            <div class="episode-section">
                <h3>Overview</h3>
                <p>${episode.overview}</p>
            </div>
            
            <div class="episode-section">
                <h3>Key Themes</h3>
                <ul>
                    ${episode.themes.map(theme => `<li>${theme}</li>`).join('')}
                </ul>
            </div>
            
            <div class="episode-section">
                <h3>Historical & Cultural Context</h3>
                <p>${episode.context}</p>
            </div>
            
            ${episode.keyPassages ? `
                <div class="episode-section">
                    <h3>Key Passages & Moments</h3>
                    <ul>
                        ${episode.keyPassages.map(passage => `<li>${passage}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${episode.annotations ? `
                <div class="episode-section">
                    <h3>Annotations & Commentary</h3>
                    <p style="font-style: italic; color: var(--slate); margin-bottom: 1.5rem; font-size: 0.95rem;">
                        The following annotations draw from The Joyce Project and other scholarly sources to illuminate specific aspects of this episode.
                    </p>
                    ${episode.annotations.map(annotation => `
                        <div style="margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(30,58,95,0.03) 0%, rgba(201,169,97,0.03) 100%); border-left: 3px solid var(--gold); border-radius: 4px;">
                            <h4 style="font-family: var(--display); font-size: 1.3rem; color: var(--oxford-blue); margin-bottom: 0.8rem;">${annotation.heading}</h4>
                            <p style="line-height: 1.8; margin: 0;">${annotation.content}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${renderNavigationButtons(episodeNumber)}
        </div>
    `;
    
    // Add click handler to back button
    const backButton = container.querySelector('.back-to-episodes');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('episodes');
        });
    }
    
    // Add click handlers to prev/next buttons
    const prevButton = container.querySelector('.episode-nav-prev');
    const nextButton = container.querySelector('.episode-nav-next');
    
    if (prevButton) {
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            const prevNum = parseInt(prevButton.getAttribute('data-episode'));
            navigateToPage('episode-detail', prevNum);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            const nextNum = parseInt(nextButton.getAttribute('data-episode'));
            navigateToPage('episode-detail', nextNum);
        });
    }
}

function renderNavigationButtons(currentEpisode) {
    const hasPrev = currentEpisode > 1;
    const hasNext = currentEpisode < 18;
    
    let html = '<div class="episode-navigation" style="margin-top: 3rem; padding-top: 2rem; border-top: 2px solid var(--light-slate); display: flex; justify-content: space-between; gap: 1rem;">';
    
    if (hasPrev) {
        const prevEpisode = episodesData.find(ep => ep.number === currentEpisode - 1);
        html += `
            <a href="#episode-${currentEpisode - 1}" class="episode-nav-prev" data-episode="${currentEpisode - 1}" 
               style="flex: 1; padding: 1rem; background: var(--warm-white); border: 2px solid var(--oxford-blue); 
               border-radius: 4px; text-decoration: none; color: var(--deep-blue); transition: all 0.3s ease;">
                <div style="font-size: 0.9rem; font-weight: 600; color: var(--slate); margin-bottom: 0.3rem;">← Previous Episode</div>
                <div style="font-size: 1.1rem; font-weight: 700;">Episode ${prevEpisode.number}: ${prevEpisode.title}</div>
            </a>
        `;
    } else {
        html += '<div style="flex: 1;"></div>';
    }
    
    if (hasNext) {
        const nextEpisode = episodesData.find(ep => ep.number === currentEpisode + 1);
        html += `
            <a href="#episode-${currentEpisode + 1}" class="episode-nav-next" data-episode="${currentEpisode + 1}"
               style="flex: 1; padding: 1rem; background: var(--warm-white); border: 2px solid var(--oxford-blue); 
               border-radius: 4px; text-decoration: none; color: var(--deep-blue); text-align: right; transition: all 0.3s ease;">
                <div style="font-size: 0.9rem; font-weight: 600; color: var(--slate); margin-bottom: 0.3rem;">Next Episode →</div>
                <div style="font-size: 1.1rem; font-weight: 700;">Episode ${nextEpisode.number}: ${nextEpisode.title}</div>
            </a>
        `;
    } else {
        html += '<div style="flex: 1;"></div>';
    }
    
    html += '</div>';
    
    // Add hover styles via JavaScript
    setTimeout(() => {
        const navButtons = document.querySelectorAll('.episode-nav-prev, .episode-nav-next');
        navButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                btn.style.borderColor = 'var(--burnt-orange)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = 'none';
                btn.style.borderColor = 'var(--oxford-blue)';
            });
        });
    }, 100);
    
    return html;
}

// Smooth scroll for CTA button
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cta-button')) {
        e.preventDefault();
        const targetPage = e.target.getAttribute('data-page');
        if (targetPage) {
            navigateToPage(targetPage);
        }
    }
});
