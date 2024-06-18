let currentDate = new Date();

    function displayDate() {
      const dateDisplay = document.getElementById('time-display');
      dateDisplay.innerText = currentDate.toLocaleDateString(); 
    } 


function moveForward() {
    currentDate.setDate(currentdate.getDate() +1)
}

function moveBackward() {
    currentDate.setDate(currentDate.getDate() - 1)
}

displayDate();