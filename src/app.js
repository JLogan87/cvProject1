let currentDate = new Date();

function displayDate() {
  const dateDisplay = document.getElementById('time-display');
  dateDisplay.innerText = currentDate.toLocaleDateString(); 
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