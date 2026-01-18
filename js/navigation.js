/**
 * Navigation.js
 * Handles tab navigation for feature showcase
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }

    function initNavigation() {
        const tabs = document.querySelectorAll('.nav-tab');
        const sections = document.querySelectorAll('.feature-section');

        if (!tabs.length || !sections.length) {
            console.warn('Navigation: No tabs or sections found');
            return;
        }

        // Add click event listeners to all tabs
        tabs.forEach(tab => {
            tab.addEventListener('click', handleTabClick);
        });

        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);

        // Handle URL hash on load (for deep linking)
        handleInitialHash();

        console.log('Navigation initialized');
    }

    /**
     * Handle tab click events
     */
    function handleTabClick(event) {
        const clickedTab = event.currentTarget;
        const targetId = clickedTab.getAttribute('data-tab');

        if (!targetId) {
            console.warn('Navigation: Tab missing data-tab attribute');
            return;
        }

        switchToTab(targetId);

        // Update URL hash for bookmarking
        history.pushState(null, '', `#${targetId}`);
    }

    /**
     * Switch to a specific tab and show corresponding section
     */
    function switchToTab(tabId) {
        const tabs = document.querySelectorAll('.nav-tab');
        const sections = document.querySelectorAll('.feature-section');

        // Deactivate all tabs
        tabs.forEach(tab => {
            const isActiveTab = tab.getAttribute('data-tab') === tabId;

            tab.classList.toggle('active', isActiveTab);
            tab.setAttribute('aria-selected', isActiveTab.toString());

            // Update tabindex for keyboard navigation
            tab.setAttribute('tabindex', isActiveTab ? '0' : '-1');
        });

        // Hide all sections and show the target section
        sections.forEach(section => {
            const isActiveSection = section.id === tabId;
            section.classList.toggle('active', isActiveSection);
            section.setAttribute('aria-hidden', (!isActiveSection).toString());
        });

        // Scroll to top of main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Handle keyboard navigation (Arrow keys, Home, End)
     */
    function handleKeyboardNavigation(event) {
        const activeTab = document.querySelector('.nav-tab.active');
        if (!activeTab) return;

        // Only handle keyboard events when a tab has focus
        if (!activeTab.matches(':focus')) return;

        const tabs = Array.from(document.querySelectorAll('.nav-tab'));
        const currentIndex = tabs.indexOf(activeTab);

        let newIndex = currentIndex;

        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                // Move to previous tab
                event.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                break;

            case 'ArrowRight':
            case 'ArrowDown':
                // Move to next tab
                event.preventDefault();
                newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                break;

            case 'Home':
                // Move to first tab
                event.preventDefault();
                newIndex = 0;
                break;

            case 'End':
                // Move to last tab
                event.preventDefault();
                newIndex = tabs.length - 1;
                break;

            default:
                return;
        }

        // Switch to new tab and focus it
        if (newIndex !== currentIndex) {
            const newTab = tabs[newIndex];
            const targetId = newTab.getAttribute('data-tab');
            switchToTab(targetId);
            newTab.focus();

            // Update URL hash
            history.pushState(null, '', `#${targetId}`);
        }
    }

    /**
     * Handle initial URL hash on page load (for deep linking)
     */
    function handleInitialHash() {
        const hash = window.location.hash.slice(1); // Remove '#' character

        if (hash) {
            const targetSection = document.getElementById(hash);
            if (targetSection && targetSection.classList.contains('feature-section')) {
                switchToTab(hash);
                return;
            }
        }

        // No valid hash, ensure first tab is active
        const firstTab = document.querySelector('.nav-tab');
        if (firstTab) {
            const firstTabId = firstTab.getAttribute('data-tab');
            switchToTab(firstTabId);
        }
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        handleInitialHash();
    });

    // Expose switchToTab for external use if needed
    window.FeatureNavigation = {
        switchToTab: switchToTab
    };

})();
