var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSumbit(event) {
    event.preventDefault();
    
    var searchInputVal = document.querySelector('#search-input').val();
    var formatInputVal = document.querySelector('#format-input').val();

    if (!searchInputVal) {
        console.error("Man you're too cool! We don't know this band!")
        return;
    }

    var queryString = './results.html' + searchInputVal + '&format=' + formatInputVal; 

    location.assign(queryString);
}



searchFormEl.addEventListener('click' , handleSearchFormSumbit);
// searchFormEl.addEventListener('sumbit' , handleSearchFormSumbit);