async function initializeCityTimes() {
    const cities = [
        { name: 'London', timeZone: 'Europe/London' },
        { name: 'New York', timeZone: 'America/New_York' },
        { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
        { name: 'Sydney', timeZone: 'Australia/Sydney' }
    ];

    let cityTimes = {};

    function getCityTime(city) {
        const now = new Date();
        return new Date(now.toLocaleString('en-US', { timeZone: city.timeZone }));
    }

    for (const city of cities) {
        cityTimes[city.name] = getCityTime(city);
    }

    function updateTimeDisplay() {
        let output = '<h2>Current Time Around The World:</h2>';
        for (const city of cities) {
            if (cityTimes[city.name]) {
                cityTimes[city.name].setSeconds(cityTimes[city.name].getSeconds() + 1);
                const formattedTime = cityTimes[city.name].toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
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

    updateTimeDisplay();
    setInterval(updateTimeDisplay, 1000);
}

initializeCityTimes();
