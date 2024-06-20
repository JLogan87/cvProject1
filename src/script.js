const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');

// Function to populate the day dropdown based on selected month and year
function updateDays() {
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

// Function to populate the year dropdown with last 50 years
function populateYears() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 50;

    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

// Function to set up the date picker
function setupDatePicker() {
    populateMonths();
    populateYears();
    updateDays();

    monthSelect.addEventListener('change', updateDays);
    yearSelect.addEventListener('change', updateDays);
}

function fetchWikipediaEvents(month, day) {
    const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error.info);
            }
            return data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw new Error('Error fetching data from Wikipedia API');
        });
}

// Function to fetch and display events on the selected date
function fetchFact() {
    const day = daySelect.value;
    const month = monthSelect.value;

    const factDiv = document.getElementById('fact');
    factDiv.textContent = 'Loading...';

    fetchWikipediaEvents(month, day)
        .then(data => {
            if (data.events && data.events.length > 0) {
                factDiv.innerHTML = '';
                data.events.forEach(event => {
                    factDiv.innerHTML += `<h3>${event.year}: ${event.text}</h3><p><a href="https://en.wikipedia.org/wiki/${event.pages[0].normalizedtitle}" target="_blank">Read more</a></p>`;
                });
            } else {
                factDiv.textContent = 'No events found for this day.';
            }
        })
        .catch(error => {
            factDiv.textContent = 'Error fetching data. Please try again later.';
            console.error('Error fetching data:', error);
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

// Initialize setup
setupDatePicker();
displayTimeInCapitals();
setInterval(displayTimeInCapitals, 60000); // Update city times every minute
