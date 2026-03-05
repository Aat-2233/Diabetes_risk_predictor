/* ===================================================
   Performance Page JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', function() {
    calculatePerformanceStats();
    animateTable();
    updateBadges();
});

/**
 * Calculate and display performance statistics
 */
function calculatePerformanceStats() {
    const rows = document.querySelectorAll('.perf-row');
    const accuracyValues = [];
    let bestAccuracy = 0;
    let bestModel = '';

    rows.forEach(row => {
        const accuracy = parseFloat(row.getAttribute('data-accuracy'));
        accuracyValues.push(accuracy);

        if (accuracy > bestAccuracy) {
            bestAccuracy = accuracy;
            bestModel = row.querySelector('.model-name')?.textContent || 'N/A';
        }
    });

    // Calculate average accuracy
    const avgAccuracy = accuracyValues.length > 0 
        ? (accuracyValues.reduce((a, b) => a + b, 0) / accuracyValues.length * 100).toFixed(2)
        : 0;

    // Update DOM elements
    const avgAccuracyEl = document.getElementById('avg-accuracy');
    const bestAccuracyEl = document.getElementById('best-accuracy');

    if (avgAccuracyEl) {
        avgAccuracyEl.textContent = avgAccuracy + '%';
        animateCounter(avgAccuracyEl, 0, avgAccuracy, 1000);
    }

    if (bestAccuracyEl) {
        bestAccuracyEl.textContent = (bestAccuracy * 100).toFixed(2) + '%';
    }
}

/**
 * Animate counter from 0 to target value
 */
function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toFixed(2) + '%';
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(2) + '%';
        }
    }, 16);
}

/**
 * Animate table rows on load
 */
function animateTable() {
    const rows = document.querySelectorAll('.perf-row');
    rows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(10px)';
        setTimeout(() => {
            row.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Update badge colors based on accuracy
 */
function updateBadges() {
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        const accuracy = parseFloat(badge.getAttribute('data-accuracy'));
        
        if (accuracy >= 0.85) {
            badge.style.background = 'var(--success-light)';
            badge.style.color = 'var(--success)';
        } else if (accuracy >= 0.75) {
            badge.style.background = '#fef3c7';
            badge.style.color = '#d97706';
        } else if (accuracy >= 0.65) {
            badge.style.background = '#fef3c7';
            badge.style.color = '#d97706';
        } else {
            badge.style.background = 'var(--danger-light)';
            badge.style.color = 'var(--danger)';
        }
    });
}

/**
 * Add hover effects to table rows
 */
document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.perf-row');
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(99, 102, 241, 0.1)';
        });
        row.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
    });
});
