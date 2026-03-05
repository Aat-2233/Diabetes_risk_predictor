// ===================================================
// Diabetes Prediction App — Interactive Scripts
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    // -------- Animated Progress Bars --------
    animateBars();

    // -------- BMI Calculator Popup --------
    setupBMICalculator();

    // -------- DPF Tooltip --------
    setupDPFTooltip();

    // -------- Scroll to results if present --------
    const results = document.getElementById('results');
    if (results) {
        setTimeout(() => {
            results.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
});


// ===========================================
// Animated Progress Bars
// ===========================================
function animateBars() {
    const diabeticBar = document.getElementById('diabetic-bar');
    const nonDiabeticBar = document.getElementById('non-diabetic-bar');

    if (diabeticBar) {
        const width = diabeticBar.getAttribute('data-width');
        // Delay so the CSS transition is visible
        setTimeout(() => {
            diabeticBar.style.width = width + '%';
        }, 200);
    }

    if (nonDiabeticBar) {
        const width = nonDiabeticBar.getAttribute('data-width');
        setTimeout(() => {
            nonDiabeticBar.style.width = width + '%';
        }, 400);
    }
}


// ===========================================
// BMI Calculator Popup
// ===========================================
function setupBMICalculator() {
    const bmiGroup = document.getElementById('bmi-group');
    const popup = document.getElementById('bmi-popup');
    const weightInput = document.getElementById('bmi-weight');
    const heightInput = document.getElementById('bmi-height');
    const resultDisplay = document.getElementById('bmi-result');
    const useBtn = document.getElementById('bmi-use-btn');
    const bmiField = document.getElementById('bmi');

    if (!bmiGroup || !popup) return;

    let computedBMI = null;
    let hideTimeout = null;

    // Show popup on hover over the group (label area)
    bmiGroup.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        popup.classList.add('visible');
    });

    bmiGroup.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            popup.classList.remove('visible');
        }, 300);
    });

    // Keep popup open when hovering over the popup itself
    popup.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
    });

    popup.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            popup.classList.remove('visible');
        }, 300);
    });

    // Calculate BMI live as user types
    function calcBMI() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        if (weight > 0 && height > 0) {
            computedBMI = (weight / (height * height)).toFixed(1);
            resultDisplay.textContent = 'BMI: ' + computedBMI;
            resultDisplay.style.color = '';
        } else {
            computedBMI = null;
            resultDisplay.textContent = 'BMI: —';
        }
    }

    weightInput.addEventListener('input', calcBMI);
    heightInput.addEventListener('input', calcBMI);

    // "Use This Value" button fills the BMI form field
    useBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (computedBMI !== null) {
            bmiField.value = computedBMI;
            // Flash confirmation
            bmiField.style.borderColor = '#10b981';
            bmiField.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.25)';
            setTimeout(() => {
                bmiField.style.borderColor = '';
                bmiField.style.boxShadow = '';
            }, 1200);
            popup.classList.remove('visible');
        } else {
            resultDisplay.textContent = 'Enter weight & height';
            resultDisplay.style.color = '#ef4444';
        }
    });
}


// ===========================================
// Diabetes Pedigree Function Tooltip
// ===========================================
function setupDPFTooltip() {
    const dpfGroup = document.getElementById('dpf-group');
    const tooltip = document.getElementById('dpf-tooltip');

    if (!dpfGroup || !tooltip) return;

    let hideTimeout = null;

    dpfGroup.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        tooltip.classList.add('visible');
    });

    dpfGroup.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            tooltip.classList.remove('visible');
        }, 300);
    });

    tooltip.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
    });

    tooltip.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            tooltip.classList.remove('visible');
        }, 300);
    });
}
