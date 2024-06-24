setupDatePicker();
displayTimeInCapitals();
setInterval(displayTimeInCapitals, 60000); 


function initialize() {
   
    updateDays(); 

   
    const fetchFactButton = document.querySelector('#date-picker button');
    if (fetchFactButton) {
        fetchFactButton.addEventListener('click', fetchFact);
    }

}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
});
