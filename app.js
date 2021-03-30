const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');

function searchMeal(e){
    e.preventDefault();

    //Clear single Meal
    single_mealEl.innerHTML="";

    console.log(search)
}