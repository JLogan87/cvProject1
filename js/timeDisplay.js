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
