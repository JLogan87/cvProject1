// datepicker.js

const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const fetchFactButton = document.getElementById('fetch-fact-button');

// Default preselected values
const defaultMonth = '01'; // E.g., January
const defaultDay = '01';   // E.g., 1st day of the month

let selectedDay = defaultDay; // Initialize selected day

// Update days in the select based on the selected month
function updateDays() {
    const selectedMonth = monthSelect.value;
    const daysInMonth = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();

    // Preserve the currently selected day
    const currentSelectedDay = daySelect.value;

    daySelect.innerHTML = ''; // Clear existing options
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }

    // Restore the selected day if it exists in the new options
    if (currentSelectedDay && currentSelectedDay <= daysInMonth) {
        daySelect.value = currentSelectedDay;
    } else {
        daySelect.value = defaultDay; // Or set to default if out of range
    }

    selectedDay = daySelect.value; // Update selected day
}

// Populate months in the month select
function populateMonths() {
    const months = [
        { value: '01', name: 'January' },
        { value: '02', name: 'February' },
        { value: '03', name: 'March' },
        { value: '04', name: 'April' },
        { value: '05', name: 'May' },
        { value: '06', name: 'June' },
        { value: '07', name: 'July' },
        { value: '08', name: 'August' },
        { value: '09', name: 'September' },
        { value: '10', name: 'October' },
        { value: '11', name: 'November' },
        { value: '12', name: 'December' }
    ];

    months.forEach(month => {
        const option = document.createElement('option');
        option.value = month.value;
        option.textContent = month.name;
        monthSelect.appendChild(option);
    });

    // Set default selected month
    monthSelect.value = defaultMonth;
}

// Setup date picker functionality
function setupDatePicker() {
    populateMonths();
    updateDays();

    // Set default selected day
    daySelect.value = defaultDay;

    // Add event listeners
    monthSelect.addEventListener('change', updateDays);

    if (fetchFactButton) {
        fetchFactButton.addEventListener('click', () => {
            const selectedMonth = monthSelect.value;
            const selectedDay = daySelect.value;
            fetchFact(selectedMonth, selectedDay);
        });
    }
}

// Ensure the DOM is fully loaded before initializing date picker
document.addEventListener('DOMContentLoaded', setupDatePicker);
