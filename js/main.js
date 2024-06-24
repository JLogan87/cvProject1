function initialize() {
    // Initialize the date picker
    setupDatePicker();

    // Display times in capitals
    initializeCityTimes();

    // Set interval to update the city times every minute
    setInterval(initializeCityTimes, 60000);

    // Update days based on selected month and year
    updateDays();

    // Add event listener for the fetch fact button
    const fetchFactButton = document.querySelector('#date-picker button');
    if (fetchFactButton) {
        fetchFactButton.addEventListener('click', fetchFact);
    }
}

// Ensure the DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', initialize);


initializeBoard();
renderBoard();
