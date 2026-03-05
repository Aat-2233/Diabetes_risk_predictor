/* ===================================================
   Main Page JavaScript - BMI Calculator & Prediction
   =================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initBMICalculator();
    initPredictionForm();
});

/**
 * Initialize BMI Calculator with multiple modes and unit support
 */
function initBMICalculator() {
    const bmiBtn = document.querySelector('.bmi-btn');
    const bmiPopup = document.querySelector('.bmi-popup');
    const bmiCalcBtn = document.getElementById('bmi-calc');
    const bmiInput = document.querySelector('input[name="BMI"]');

    if (!bmiBtn || !bmiPopup) return;

    // Toggle BMI popup on hover
    const bmiContainer = document.querySelector('.bmi-container');
    if (bmiContainer) {
        bmiContainer.addEventListener('mouseenter', () => {
            bmiPopup.style.opacity = '1';
            bmiPopup.style.pointerEvents = 'auto';
        });
        bmiContainer.addEventListener('mouseleave', () => {
            bmiPopup.style.opacity = '0';
            bmiPopup.style.pointerEvents = 'none';
        });
    }

    // Initialize mode selector
    addBMIMode();

    if (bmiCalcBtn) {
        bmiCalcBtn.addEventListener('click', calculateBMI);
    }
}

/**
 * Add mode selector to BMI calculator
 */
function addBMIMode() {
    const bmiPopup = document.querySelector('.bmi-popup');
    if (!bmiPopup) return;

    // Check if mode selector already exists
    if (bmiPopup.querySelector('.bmi-mode-selector')) return;

    const modeSelector = document.createElement('div');
    modeSelector.className = 'bmi-mode-selector';
    modeSelector.innerHTML = `
        <div class="mode-tabs">
            <button type="button" class="mode-tab active" data-mode="calculator">Calculate</button>
            <button type="button" class="mode-tab" data-mode="input">Direct Input</button>
        </div>
    `;

    // Insert mode selector at the top
    const h4 = bmiPopup.querySelector('h4');
    if (h4) {
        h4.insertAdjacentElement('afterend', modeSelector);
    }

    // Mode switching functionality
    const tabs = modeSelector.querySelectorAll('.mode-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchBMIMode(this.getAttribute('data-mode'));
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialize with calculator mode
    switchBMIMode('calculator');
}

/**
 * Switch between BMI calculation and direct input modes
 */
function switchBMIMode(mode) {
    const bmiPopup = document.querySelector('.bmi-popup');
    if (!bmiPopup) return;

    // Remove existing input fields
    const existingFields = bmiPopup.querySelectorAll('.bmi-field');
    existingFields.forEach(field => field.remove());

    if (mode === 'calculator') {
        // Calculator mode with unit options
        const fieldHtml = `
            <div class="bmi-field">
                <div class="unit-selector">
                    <label><input type="radio" name="unit-system" value="metric" checked> Metric</label>
                    <label><input type="radio" name="unit-system" value="imperial"> Imperial</label>
                </div>
            </div>
            <div class="bmi-field metric-fields">
                <label>Weight (kg)<input type="number" id="bmi-weight-kg" placeholder="kg" step="0.1"></label>
                <label>Height (cm)<input type="number" id="bmi-height-cm" placeholder="cm" step="0.1"></label>
                <div class="unit-info">BMI = weight(kg) / height(m)²</div>
            </div>
            <div class="bmi-field imperial-fields" style="display: none;">
                <label>Weight (lbs)<input type="number" id="bmi-weight-lbs" placeholder="lbs" step="0.1"></label>
                <div class="height-imperial">
                    <label>Feet<input type="number" id="bmi-height-ft" placeholder="ft" step="1" min="0"></label>
                    <label>Inches<input type="number" id="bmi-height-in" placeholder="in" step="0.1" min="0" max="11"></label>
                </div>
                <div class="unit-info">BMI = weight(lbs) × 703 / height(inches)²</div>
            </div>
        `;
        
        const resultDiv = bmiPopup.querySelector('.bmi-result');
        resultDiv?.insertAdjacentHTML('beforebegin', fieldHtml);

        // Unit system toggle
        const unitRadios = bmiPopup.querySelectorAll('input[name="unit-system"]');
        unitRadios.forEach(radio => {
            radio.addEventListener('change', toggleUnitSystem);
        });

    } else if (mode === 'input') {
        // Direct input mode
        const fieldHtml = `
            <div class="bmi-field">
                <label>BMI Value<input type="number" id="bmi-direct-input" placeholder="Enter BMI (e.g., 25.5)" step="0.1" min="10" max="60"></label>
                <div class="unit-info">Enter your BMI directly and click "Set BMI"</div>
            </div>
        `;
        
        const resultDiv = bmiPopup.querySelector('.bmi-result');
        resultDiv?.insertAdjacentHTML('beforebegin', fieldHtml);
    }
}

/**
 * Toggle between metric and imperial unit systems
 */
function toggleUnitSystem(e) {
    const bmiPopup = document.querySelector('.bmi-popup');
    if (!bmiPopup) return;

    const metricFields = bmiPopup.querySelector('.metric-fields');
    const imperialFields = bmiPopup.querySelector('.imperial-fields');

    if (e.target.value === 'metric') {
        metricFields.style.display = 'block';
        imperialFields.style.display = 'none';
    } else {
        metricFields.style.display = 'none';
        imperialFields.style.display = 'block';
    }
}

/**
 * Calculate BMI based on current mode and unit system
 */
function calculateBMI() {
    const bmiPopup = document.querySelector('.bmi-popup');
    const bmiInput = document.querySelector('input[name="BMI"]');
    const resultDiv = bmiPopup.querySelector('.bmi-result');

    if (!resultDiv) return;

    const activeTabs = bmiPopup.querySelectorAll('.mode-tab.active');
    const activeMode = activeTabs.length > 0 ? activeTabs[0].getAttribute('data-mode') : 'calculator';

    let bmi = null;
    let category = '';

    if (activeMode === 'input') {
        // Direct input mode
        const directInput = document.getElementById('bmi-direct-input');
        if (!directInput || !directInput.value) {
            resultDiv.innerHTML = '<span class="error">Please enter a BMI value</span>';
            return;
        }
        bmi = parseFloat(directInput.value);
    } else {
        // Calculator mode
        const unitSystem = bmiPopup.querySelector('input[name="unit-system"]:checked')?.value;

        if (unitSystem === 'metric') {
            const weight = parseFloat(document.getElementById('bmi-weight-kg')?.value);
            const height = parseFloat(document.getElementById('bmi-height-cm')?.value);

            if (!weight || !height || weight <= 0 || height <= 0) {
                resultDiv.innerHTML = '<span class="error">Please enter valid weight and height</span>';
                return;
            }

            bmi = weight / ((height / 100) ** 2);
        } else {
            const weight = parseFloat(document.getElementById('bmi-weight-lbs')?.value);
            const feet = parseFloat(document.getElementById('bmi-height-ft')?.value) || 0;
            const inches = parseFloat(document.getElementById('bmi-height-in')?.value) || 0;

            if (!weight || (feet === 0 && inches === 0) || weight <= 0) {
                resultDiv.innerHTML = '<span class="error">Please enter valid weight and height</span>';
                return;
            }

            const totalInches = feet * 12 + inches;
            bmi = (weight * 703) / (totalInches ** 2);
        }
    }

    // Categorize BMI
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 25) {
        category = 'Normal Weight';
    } else if (bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    // Display result
    resultDiv.innerHTML = `
        <div class="bmi-calc-result">
            <div class="result-value">${bmi.toFixed(2)}</div>
            <div class="result-category">${category}</div>
            <button type="button" class="btn-use-bmi">Use This BMI</button>
        </div>
    `;

    // Add event listener to use BMI button
    const useBmiBtn = resultDiv.querySelector('.btn-use-bmi');
    if (useBmiBtn) {
        useBmiBtn.addEventListener('click', () => {
            bmiInput.value = bmi.toFixed(2);
            resultDiv.innerHTML = `<span class="success">✓ BMI set to ${bmi.toFixed(2)}</span>`;
        });
    }
}

/**
 * Initialize prediction form
 */
function initPredictionForm() {
    const form = document.getElementById('predict-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Form will submit normally, but you can add pre-submission logic here
            console.log('Prediction form submitted');
        });
    }

    // Initialize progress bar animations after prediction
    initProgressBars();
}

/**
 * Initialize and animate progress bars for prediction results
 */
function initProgressBars() {
    const diabeticBar = document.getElementById('diabetic-bar');
    const nonDiabeticBar = document.getElementById('non-diabetic-bar');

    if (diabeticBar && diabeticBar.getAttribute('data-width')) {
        const width = diabeticBar.getAttribute('data-width');
        setTimeout(() => {
            diabeticBar.style.width = width + '%';
        }, 100);
    }

    if (nonDiabeticBar && nonDiabeticBar.getAttribute('data-width')) {
        const width = nonDiabeticBar.getAttribute('data-width');
        setTimeout(() => {
            nonDiabeticBar.style.width = width + '%';
        }, 100);
    }
}

/**
 * Tooltip for diabetes pedigree function
 */
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);

    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - 10) + 'px';
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(t => t.remove());
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', initTooltips);
