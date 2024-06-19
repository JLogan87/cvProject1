// Get references to the select elements
const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');

// Function to populate the day dropdown based on selected month and year
function populateDays() {
    daySelect.innerHTML = ''; // Clear existing options

    const selectedMonth = monthSelect.value;
    const selectedYear = yearSelect.value;

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }
}

// Function to populate the month dropdown
function populateMonths() {
    monthSelect.innerHTML = ''; // Clear existing options

    const months = [
        { value: 1, name: 'January' },
        { value: 2, name: 'February' },
        { value: 3, name: 'March' },
        { value: 4, name: 'April' },
        { value: 5, name: 'May' },
        { value: 6, name: 'June' },
        { value: 7, name: 'July' },
        { value: 8, name: 'August' },
        { value: 9, name: 'September' },
        { value: 10, name: 'October' },
        { value: 11, name: 'November' },
        { value: 12, name: 'December' }
    ];

    months.forEach(month => {
        const option = document.createElement('option');
        option.value = month.value;
        option.textContent = month.name;
        monthSelect.appendChild(option);
    });
}

// Function to populate the year dropdown with last 50 years
function populateYears() {
    yearSelect.innerHTML = ''; // Clear existing options

    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 50;

    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

// Initial function to set up the date picker
function setupDatePicker() {
    populateDays(); // Populate days based on current selected month and year
    populateMonths(); // Populate months
    populateYears(); // Populate years

    // Add event listeners to month and year selects to update days
    monthSelect.addEventListener('change', populateDays);
    yearSelect.addEventListener('change', populateDays);
}

// Function to fetch fact from Wikipedia based on selected date
function fetchFact() {
    const day = daySelect.value;
    const month = monthSelect.value;
    const year = yearSelect.value;

    const factDiv = document.getElementById('fact');
    factDiv.textContent = 'Loading...';

    fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`)
        .then(response => response.json())
        .then(data => {
            if (data.events && data.events.length > 0) {
                // Filter events based on year to match the selected year
                const event = data.events.find(event => event.year === year.toString());

                if (event) {
                    factDiv.innerHTML = `<h3>${event.year}: ${event.text}</h3><p><a href="https://en.wikipedia.org/wiki/${event.pages[0].normalizedtitle}" target="_blank">Read more</a></p>`;
                } else {
                    factDiv.textContent = 'No events found for this day.';
                }
            } else {
                factDiv.textContent = 'No events found for this day.';
            }
        })
        .catch(error => {
            factDiv.textContent = 'Error fetching data.';
            console.error(error);
        });
}

// Function to display current date and time in different cities
function displayTimeInCapitals() {
    const cities = [
        { name: 'London', timeZone: 'Europe/London' },
        { name: 'New York', timeZone: 'America/New_York' },
        { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
        { name: 'Sydney', timeZone: 'Australia/Sydney' }
    ];

    let output = '<h2>Current Times:</h2>';

    cities.forEach(city => {
        const cityTime = new Date().toLocaleString('en-US', { timeZone: city.timeZone });
        const timeString = new Date(cityTime).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        output += `<p>${city.name}: ${timeString}</p>`;
    });

    document.getElementById('other-cities-times').innerHTML = output;
}

// Initial setup
setupDatePicker(); // Initialize date picker
displayTimeInCapitals(); // Display current times in world cities
setInterval(displayTimeInCapitals, 60000); // Update city times every minute
