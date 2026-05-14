'use strict';

(function () {
    const trigger = document.getElementById('search-trigger');
    const overlay = document.getElementById('search-overlay');
    const backdrop = document.getElementById('search-overlay-backdrop');
    const panel = overlay ? overlay.querySelector('.search-panel') : null;
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    if (!trigger || !overlay || !input || !results) return;

    let fuse = null;
    let indexLoaded = false;
    let selectedIndex = -1;
    let previouslyFocused = null;

    // ── Open / close ──────────────────────────────────────────────────────

    function openSearch() {
        if (overlay.classList.contains('is-open')) return;
        previouslyFocused = document.activeElement;
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // Defer focus to allow the transition to start
        requestAnimationFrame(() => input.focus());
        loadIndex();
    }

    function closeSearch() {
        if (!overlay.classList.contains('is-open')) return;
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        input.value = '';
        hideResults();
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
            previouslyFocused.focus();
        }
    }

    trigger.addEventListener('click', openSearch);

    // Close on backdrop click (but not on clicks inside the panel)
    backdrop.addEventListener('click', closeSearch);
    if (panel) {
        panel.addEventListener('click', (e) => e.stopPropagation());
    }

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Cmd/Ctrl+K to open
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (overlay.classList.contains('is-open')) {
                closeSearch();
            } else {
                openSearch();
            }
            return;
        }
        // Esc closes
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
            e.preventDefault();
            closeSearch();
        }
    });

    // ── Index loading ─────────────────────────────────────────────────────

    function loadIndex() {
        if (indexLoaded) return;
        fetch('/index.json')
            .then((r) => r.json())
            .then((data) => {
                fuse = new Fuse(data, {
                    keys: [
                        { name: 'title', weight: 0.6 },
                        { name: 'content', weight: 0.4 },
                    ],
                    threshold: 0.35,
                    includeMatches: true,
                    minMatchCharLength: 2,
                    ignoreLocation: true,
                });
                indexLoaded = true;
                if (input.value.trim()) runSearch(input.value.trim());
            })
            .catch(() => { /* silently ignore fetch errors */ });
    }

    // ── Search ────────────────────────────────────────────────────────────

    input.addEventListener('input', () => {
        const q = input.value.trim();
        if (!q) { hideResults(); return; }
        if (!fuse) return; // still loading
        runSearch(q);
    });

    function runSearch(q) {
        const hits = fuse.search(q, { limit: 8 });
        renderResults(hits, q);
    }

    function renderResults(hits, q) {
        selectedIndex = -1;
        if (!hits.length) {
            results.innerHTML = `<li class="search-no-results">No results for "<strong>${escapeHtml(q)}</strong>"</li>`;
            results.hidden = false;
            return;
        }

        results.innerHTML = hits.map(({ item, matches }) => {
            const excerpt = buildExcerpt(item.content, matches, q);
            return `<li role="option" aria-selected="false">
                <a class="search-result-item" href="${escapeHtml(item.url)}">
                    ${item.section ? `<span class="search-result-section">${escapeHtml(item.section)}</span>` : ''}
                    <span class="search-result-title">${escapeHtml(item.title)}</span>
                    ${excerpt ? `<span class="search-result-excerpt">${excerpt}</span>` : ''}
                </a>
            </li>`;
        }).join('');

        results.hidden = false;
    }

    function hideResults() {
        results.hidden = true;
        results.innerHTML = '';
        selectedIndex = -1;
    }

    // ── Keyboard navigation ───────────────────────────────────────────────

    input.addEventListener('keydown', (e) => {
        const items = results.querySelectorAll('.search-result-item');
        if (!items.length) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelected(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelected(items);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            items[selectedIndex].click();
        }
    });

    function updateSelected(items) {
        items.forEach((el, i) => {
            const li = el.closest('li');
            const active = i === selectedIndex;
            li.setAttribute('aria-selected', active);
            if (active) el.scrollIntoView({ block: 'nearest' });
        });
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    function buildExcerpt(content, matches, q) {
        if (!content) return '';
        const contentMatch = matches && matches.find((m) => m.key === 'content');
        let start = 0;
        if (contentMatch && contentMatch.indices.length) {
            start = Math.max(0, contentMatch.indices[0][0] - 40);
        }
        let snippet = content.slice(start, start + 160);
        if (start > 0) snippet = '…' + snippet;
        if (start + 160 < content.length) snippet += '…';
        const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        snippet = escapeHtml(snippet).replace(
            new RegExp(`(${escaped})`, 'gi'),
            '<mark>$1</mark>'
        );
        return snippet;
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }
})();
