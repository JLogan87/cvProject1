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
                throw new Error(data.error.info || 'Unknown error');
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
                const year = randomEvent.year || 'Unknown year';
                const text = randomEvent.text || 'No event description available';
                const title = randomEvent.pages && randomEvent.pages.length > 0 ?
                    randomEvent.pages[0].normalizedtitle :
                    '';
                const link = title ?
                    `<a href="https://en.wikipedia.org/wiki/${title}" target="_blank">Read more</a>` :
                    '';

                factDiv.innerHTML = `<h3>${year}: ${text}</h3><p>${link}</p>`;
            } else {
                factDiv.textContent = 'No events found for this day.';
            }
        })
        .catch(error => {
            console.error('Error fetching and displaying data:', error);
            factDiv.textContent = 'Error fetching data. Please try again later.';
        });
}
