// fetch-data.js

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

function fetchFact(month, day) {
    const factDiv = document.getElementById('fact');
    factDiv.textContent = 'Loading...';

    let fetchTimeout = setTimeout(() => {
        factDiv.textContent = 'Loading took too long. Please try again.';
    }, 10000); // Timeout after 10 seconds

    fetchWikipediaEvents(month, day)
        .then(data => {
            clearTimeout(fetchTimeout); // Clear timeout once data is received

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
            clearTimeout(fetchTimeout); // Clear timeout in case of error

            console.error('Error fetching and displaying data:', error);
            factDiv.textContent = 'Error fetching data. Please try again later.';
        });
}
