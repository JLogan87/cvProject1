function initialize() {
    // Initialize the date picker
    setupDatePicker();

    // Display times in capitals
    initializeCityTimes();

    // Set interval to update the city times every minute
    setInterval(initializeCityTimes, 60000);

    // Update days based on selected month and year
    updateDays();

}


document.addEventListener('DOMContentLoaded', initialize);


initializeBoard();
renderBoard();
