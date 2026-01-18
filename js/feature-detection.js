/**
 * Feature Detection
 * Detects browser support for modern CSS features and displays appropriate badges
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFeatureDetection);
    } else {
        initFeatureDetection();
    }

    function initFeatureDetection() {
        console.log('Feature detection initializing...');

        // Run detection for all features
        detectAllFeatures();

        console.log('Feature detection complete');
    }

    /**
     * Check if a CSS feature is supported using @supports
     * @param {string} property - CSS property to check
     * @param {string} value - CSS value to check
     * @returns {boolean} - Whether the feature is supported
     */
    function supportsCSS(property, value) {
        if (typeof CSS !== 'undefined' && CSS.supports) {
            return CSS.supports(property, value);
        }
        return false;
    }

    /**
     * Check if a selector is supported using @supports selector()
     * @param {string} selector - CSS selector to check
     * @returns {boolean} - Whether the selector is supported
     */
    function supportsSelector(selector) {
        if (typeof CSS !== 'undefined' && CSS.supports) {
            return CSS.supports('selector(' + selector + ')');
        }
        return false;
    }

    /**
     * Feature detection map
     * Maps feature IDs to section IDs and detection methods
     */
    const features = {
        'has-selector': {
            name: ':has() Selector',
            sectionId: 'has-selector',
            detect: () => {
                // Use :has(+ *) for robust detection with relative selectors
                return supportsSelector(':has(+ *)');
            }
        },
        'container-queries': {
            name: 'Container Queries',
            sectionId: 'container-queries',
            detect: () => {
                return supportsCSS('container-type', 'inline-size');
            }
        },
        'carousel': {
            name: 'Scroll Snap',
            sectionId: 'carousel',
            detect: () => {
                // Check for scroll-snap-align which is newer spec
                return supportsCSS('scroll-snap-align', 'start');
            }
        },
        'modals': {
            name: 'Popover API',
            sectionId: 'modals',
            detect: () => {
                // Check for :popover-open pseudo-class
                return supportsSelector(':popover-open');
            }
        },
        'animations': {
            name: '@starting-style & allow-discrete',
            sectionId: 'animations',
            detect: () => {
                // Check for transition-behavior: allow-discrete
                // This is a good proxy for the whole animation suite
                return supportsCSS('transition-behavior', 'allow-discrete');
            }
        },
        'anchor-positioning': {
            name: 'Anchor Positioning',
            sectionId: 'anchor-positioning',
            detect: () => {
                return supportsCSS('anchor-name', '--test');
            }
        },
        'modal-trigger': {
            name: 'Popover Target',
            sectionId: 'modal-trigger',
            detect: () => {
                // Check if popovertarget attribute is supported
                return 'popoverTargetElement' in HTMLButtonElement.prototype;
            }
        },
        'observers': {
            name: 'Observer APIs',
            sectionId: 'observers',
            detect: () => {
                // Check for all three Observer APIs
                return typeof IntersectionObserver !== 'undefined' &&
                       typeof ResizeObserver !== 'undefined' &&
                       typeof MutationObserver !== 'undefined';
            }
        },
        'scroll-state': {
            name: 'scroll-state()',
            sectionId: 'scroll-state',
            detect: () => {
                // Check for container-type: scroll-state support
                return supportsCSS('container-type', 'scroll-state');
            }
        },
        'styleable-select': {
            name: 'Styleable Select',
            sectionId: 'styleable-select',
            detect: () => {
                return supportsCSS('appearance', 'base-select');
            }
        }
    };

    /**
     * Detect all features and update UI
     */
    function detectAllFeatures() {
        const results = {};

        Object.keys(features).forEach(featureId => {
            const feature = features[featureId];
            const isSupported = feature.detect();
            results[featureId] = isSupported;

            // Update badge and show fallback if needed
            updateSupportBadge(feature.sectionId, isSupported);

            if (!isSupported) {
                showFallbackMessage(feature.sectionId);
            }

            console.log(`${feature.name}: ${isSupported ? '✓ Supported' : '✗ Not Supported'}`);
        });

        return results;
    }

    /**
     * Update support badge based on actual browser support
     * Changes the badge class and text if needed
     */
    function updateSupportBadge(sectionId, isSupported) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const badge = section.querySelector('.support-badge');
        if (!badge) return;

        // If not supported, update the badge
        if (!isSupported) {
            // Remove all support classes
            badge.classList.remove('widely-supported', 'good-support', 'emerging');
            badge.classList.add('not-supported');
            badge.textContent = 'Not Supported';
        }
        // Otherwise keep the default badge from HTML
    }

    /**
     * Display fallback message for unsupported features
     */
    function showFallbackMessage(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const demoContainer = section.querySelector('.demo-container');
        if (!demoContainer) return;

        // Check if fallback message already exists
        if (demoContainer.querySelector('.fallback-message')) return;

        // Create fallback message
        const fallback = document.createElement('div');
        fallback.className = 'fallback-message';
        fallback.innerHTML = `
            <p><strong>⚠️ Browser Support Notice:</strong></p>
            <p>Your browser does not support this feature. Please use a modern browser
            (Chrome, Firefox, Safari, or Edge) to see this demonstration.</p>
            <p>You can still read the code examples and documentation below.</p>
        `;

        // Insert at the top of demo container
        demoContainer.insertBefore(fallback, demoContainer.firstChild);
    }

    /**
     * Get detection results for all features
     * Useful for debugging
     */
    function getDetectionResults() {
        const results = {};
        Object.keys(features).forEach(featureId => {
            const feature = features[featureId];
            results[featureId] = {
                name: feature.name,
                supported: feature.detect()
            };
        });
        return results;
    }

    // Expose API for external use
    window.FeatureDetection = {
        features: features,
        supportsCSS: supportsCSS,
        supportsSelector: supportsSelector,
        detectAllFeatures: detectAllFeatures,
        getDetectionResults: getDetectionResults
    };

})();
