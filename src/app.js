let currentDate = new Date();

function displayDate() {
    const dateDisplay = document.getElementById('time-display');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    dateDisplay.innerText = currentDate.toLocaleString('en-US', options);
}

function moveForward() {
    currentDate.setDate(currentDate.getDate() + 1);
    displayDate();
}

function moveBackward() {
    currentDate.setDate(currentDate.getDate() - 1);
    displayDate();
}

displayDate();

function displayTimeInCapitals() {
    const cities = [
        { name: 'London', timeZone: 'Europe/London' },
        { name: 'New York', timeZone: 'America/New_York' },
        { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
        { name: 'Sydney', timeZone: 'Australia/Sydney' }
        // Add more cities as needed
    ];

    const now = new Date();

    let output = '<h2>Current Times:</h2>';

    cities.forEach(city => {
        const timeString = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: city.timeZone
        });

        output += `<p>${city.name}: ${timeString}</p>`;
    });

    // Display in modal window
    document.getElementById('other-cities-times').innerHTML = output;
    document.getElementById('myModal').style.display = 'block';
}

function openModal() {
    displayTimeInCapitals();
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}
