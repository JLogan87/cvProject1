async function fetchCityTime(city) {
    try {
        const response = await fetch(`https://worldtimeapi.org/api/timezone/${city.timeZone}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.datetime;
    } catch (error) {
        console.error(`Error fetching time for ${city.name}:`, error);
        return null;
    }
}

async function displayTimeInCapitals() {
    const cities = [
        { name: 'London', timeZone: 'Europe/London' },
        { name: 'New York', timeZone: 'America/New_York' },
        { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
        { name: 'Sydney', timeZone: 'Australia/Sydney' }
    ];

    let output = '<h2>Current Times:</h2>';

    for (const city of cities) {
        const cityTime = await fetchCityTime(city);
        if (cityTime) {
            const formattedTime = new Date(cityTime).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
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

// Call the function to display city times initially
displayTimeInCapitals();

// Update city times every minute
setInterval(displayTimeInCapitals, 1000);
