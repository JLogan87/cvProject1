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

function fetchFact() {
    const day = daySelect.value;
    const month = monthSelect.value;

    const factDiv = document.getElementById('fact');
    factDiv.textContent = 'Loading...';

    fetchWikipediaEvents(month, day)
        .then(data => {
            if (data.events && data.events.length > 0) {
                const randomEvent = data.events[Math.floor(Math.random() * data.events.length)];
                factDiv.innerHTML = `<h3>${randomEvent.year}: ${randomEvent.text}</h3><p><a href="https://en.wikipedia.org/wiki/${randomEvent.pages[0].normalizedtitle}" target="_blank">Read more</a></p>`;
            } else {
                factDiv.textContent = 'No events found for this day.';
            }
        })
        .catch(error => {
            factDiv.textContent = 'Error fetching data. Please try again later.';
            console.error('Error fetching data:', error);
        });
}
