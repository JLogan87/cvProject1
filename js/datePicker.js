const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');

// Update days in the select based on the selected month
function updateDays() {
    const selectedMonth = monthSelect.value;
    const daysInMonth = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();

    daySelect.innerHTML = ''; // Clear existing options
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }
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
}

// Setup date picker functionality
function setupDatePicker() {
    populateMonths();
    updateDays();

    // Add event listeners
    monthSelect.addEventListener('change', updateDays);
    daySelect.addEventListener('change', () => {
        const selectedMonth = monthSelect.value;
        const selectedDay = daySelect.value;
        fetchFact(selectedMonth, selectedDay);
    });
}

// Ensure the DOM is fully loaded before initializing date picker
document.addEventListener('DOMContentLoaded', setupDatePicker);
