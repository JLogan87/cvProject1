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
