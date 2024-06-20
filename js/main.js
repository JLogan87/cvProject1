// Import necessary functions and constants from other files if needed
// Example: import { fetchFact, updateDays } from './fetchFact.js';
// Example: import { displayTimeInCapitals } from './timeDisplay.js';

// Initialize setup
setupDatePicker();
displayTimeInCapitals();
setInterval(displayTimeInCapitals, 60000); // Update city times every minute

// Function to initialize event listeners and coordinate components
function initialize() {
    // Initialize date picker if needed
    updateDays(); // Assuming this function updates days based on month and year

    // Add event listener for the Fetch Fact button
    const fetchFactButton = document.querySelector('#date-picker button');
    if (fetchFactButton) {
        fetchFactButton.addEventListener('click', fetchFact);
    }

    // Example: Add event listener for any city selection or time-related events
    // Example: const citySelector = document.getElementById('citySelector');
    // Example: if (citySelector) {
    // Example:     citySelector.addEventListener('change', displayTimeInCapitals);
    // Example: }

    // You may add more event listeners or integrate other functionality here
}

// Call initialize function on page load
document.addEventListener('DOMContentLoaded', () => {
    initialize();
});
