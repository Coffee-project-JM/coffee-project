"use strict"


function renderCoffee(coffee) {
    var html = '<div class="coffee col-sm-6 col-md-3 text-center ' + coffee.roast + '">';
    html += '<h3>' + coffee.name + '</h3>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    if (localStorage.getItem('localCoffee') != null) {
        for(var i = 0; i < JSON.parse(localStorage.getItem("localCoffee")).length; i++) {
            html += renderCoffee(JSON.parse(localStorage.getItem("localCoffee"))[i]);
        }
    }
    return html;
}

// function renderNewCoffees(coffees) {
//     var html = '';
//
//     return html;
// }

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var searchedName = roastSearch.value.toLowerCase()
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast && coffee.name.toLowerCase().includes(searchedName)){
            filteredCoffees.push(coffee);
        } else if (roastSelection.value === 'All' && coffee.name.toLowerCase().includes(searchedName)) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// var storageCoffee = [];
// storageCoffee = checkLocalStorage(storageCoffee);
// function checkLocalStorage(storageCoffee) {
//     var localStorageTest = localStorage.getItem('localCoffee');
//     if (localStorageTest === null) {
//         storageCoffee = [];
//     } else {
//         storageCoffee = JSON.parse(localStorage.getItem('localCoffee'));
//     }
//
//     localStorage.setItem('localCoffee', JSON.stringify(storageCoffee));
//
//     return storageCoffee;
// }

function addCoffee(e) {
    e.preventDefault();
    var newRoastType = newRoast.value;
    var addedName = newName.value;

    var localStorageTest = localStorage.getItem('localCoffee');
    var storageCoffee = [];
    if (localStorageTest === null) {
        storageCoffee = [];
    } else {
        storageCoffee = JSON.parse(localStorage.getItem('localCoffee'))
    }

    var newCoffee = {
        id: storageCoffee.length + 15,
        name: addedName,
        roast: newRoastType
    };

    storageCoffee.push(newCoffee);

    localStorage.setItem('localCoffee', JSON.stringify(storageCoffee));

    // return coffees.push(newCoffee);
}



// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var tbody = document.querySelector('#coffees');
var tbody2 = document.querySelector('#localCoffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var roastSearch = document.querySelector('#roastSearch');
var newRoast = document.querySelector('#roast-selection-add');
var newName = document.querySelector('#coffee-add');
var newCoffeeSubmit = document.querySelector('#submit-new');

tbody.innerHTML = renderCoffees(coffees);
// tbody2.innerHTML = renderNewCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);

roastSelection.addEventListener('change', updateCoffees);

roastSearch.addEventListener('input', updateCoffees);

newCoffeeSubmit.addEventListener('click', addCoffee);
newCoffeeSubmit.addEventListener('click', updateCoffees);
