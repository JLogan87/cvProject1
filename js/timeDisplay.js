async function fetchCityTime(city) {
    try {
        const response = await fetch(`https://worldtimeapi.org/api/timezone/${city.timeZone}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const utcDateTime = new Date(data.datetime);
        const localDateTime = new Date(utcDateTime.toLocaleString('en-US', { timeZone: city.timeZone }));
        return localDateTime;
    } catch (error) {
        console.error(`Error fetching time for ${city.name}:`, error);
        return null;
    }
}


async function initializeCityTimes() {
    const cities = [
        { name: 'London', timeZone: 'Europe/London' },
        { name: 'New York', timeZone: 'America/New_York' },
        { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
        { name: 'Sydney', timeZone: 'Australia/Sydney' }
    ];

    let cityTimes = {};

    // Fetch the initial time for each city
    for (const city of cities) {
        const cityTime = await fetchCityTime(city);
        if (cityTime) {
            cityTimes[city.name] = cityTime;
        } else {
            cityTimes[city.name] = null;
        }
    }

    // Function to update the time display
    function updateTimeDisplay() {
        let output = '<h2>Current Times:</h2>';
        for (const city of cities) {
            if (cityTimes[city.name]) {
                cityTimes[city.name].setSeconds(cityTimes[city.name].getSeconds() + 1);
                const formattedTime = cityTimes[city.name].toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric', // Ensure seconds are displayed
                    hour12: true // 12-hour format
                });
                output += `<p>${city.name}: ${formattedTime}</p>`;
            } else {
                output += `<p>${city.name}: Error fetching time</p>`;
            }
        }
        const citiesTimesElement = document.getElementById('other-cities-times');
        if (citiesTimesElement) {
            citiesTimesElement.innerHTML = output;
        }
    }

    // Initial display
    updateTimeDisplay();

    // Update city times every second
    setInterval(updateTimeDisplay, 1000);
}

// Call the function to display city times initially
initializeCityTimes();
