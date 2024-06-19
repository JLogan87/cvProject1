const currentDate = new Date();
const timeZones = {
    "London": 0,          // UTC+0
    "Tokyo": 9,           // UTC+9
    "New York": -4,       // UTC-4 (Eastern Daylight Time)
    "Pyongyang": 9        // UTC+9 (Pyongyang Time)
};

function displayDate() {
    const dateDisplay = document.getElementById('time-display');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    dateDisplay.innerText = currentDate.toLocaleString('en-US', options);

    // Update world cities times when date changes
    displayTimeInCapitals();
}

function moveForward() {
    currentDate.setDate(currentDate.getDate() + 1);
    displayDate();
}

function moveBackward() {
    currentDate.setDate(currentDate.getDate() - 1);
    displayDate();
}



// Function to display times of world cities
function displayTimeInCapitals() {
    const cities = [
        { name: 'London', timeZone: 'Europe/London' },
        { name: 'New York', timeZone: 'America/New_York' },
        { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
        { name: 'Sydney', timeZone: 'Australia/Sydney' }
        // Add more cities as needed
    ];

    let output = '<h2>Current Times:</h2>';

    cities.forEach(city => {
        const cityDate = new Date(currentDate.toLocaleString('en-US', { timeZone: city.timeZone }));
        const timeString = cityDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: city.timeZone
        });

        output += `<p>${city.name}: ${timeString}</p>`;
    });

    // Display in modal window
    document.getElementById('other-cities-times').innerHTML = output;
}

let selectedCity = null;
let intervalID = null;

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
    if (!selectedCity) {
        document.getElementById('clock').textContent = timeString;
    }
}

function showTime(timeZone) {
    if (intervalID) {
        clearInterval(intervalID);
    }
    selectedCity = timeZone;
    intervalID = setInterval(() => {
        const now = new Date();
        const options = {
            timeZone: timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const parts = formatter.formatToParts(now);
        const timeString = parts.map(({ type, value }) => value).join('');
        const cityName = timeZone.split('/')[1].replace('_', ' ');
        document.getElementById('clock').textContent = `${cityName}: ${timeString}`;
    }, 1000);
}
function createCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
        dayElement.onclick = () => fetchFact(day, month + 1, year);
        calendar.appendChild(dayElement);
    }
}

function fetchFact(day, month, year) {
    const factDiv = document.getElementById('fact');
    factDiv.textContent = 'Loading...';
    const dateStr = `${month}_${day}`;

    fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`)
        .then(response => response.json())
        .then(data => {
            if (data.events && data.events.length > 0) {
                const event = data.events[0];
                factDiv.innerHTML = `<h3>${event.year}: ${event.text}</h3><p><a href="https://en.wikipedia.org/wiki/${event.pages[0].normalizedtitle}" target="_blank">Read more</a></p>`;
            } else {
                factDiv.textContent = 'No events found for this day.';
            }
        })
        .catch(error => {
            factDiv.textContent = 'Error fetching data.';
            console.error(error);
        });
}

// Initial call to display the local clock immediately
updateClock();
createCalendar();
// Update the local clock every second
setInterval(updateClock, 1000);