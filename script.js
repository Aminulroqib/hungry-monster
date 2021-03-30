const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');

function searchMeal(e){
    e.preventDefault();

    //Clear single Meal
    // single_mealEl.innerHTML = "";

    //get search term
    const term = search.value

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then (data => {
           resultHeading.innerHTML = `
           <h2>Search Result for '${term}': </h2>
           `
           if (data.meals === null) {
               resultHeading.innerHTML = `<p>No search found. Try again!</p>`
               
           } else {
               mealEl.innerHTML = data.meals.map(
                   meal => `<div class = 'meal'> 
                   <img src='${meal.strMealThumb}' alt='${meal.strMeal}'>
                   <div class='meal-info' data-mealId='${meal.idMeal}'>
                    <h3>${meal.strMeal}</h3>

                   </div>
                   </div>`
               )
               .join('');
               
           }
        })
        search.value = ''
        
    } else {
        
    }

}

function getMealById(mealId){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
    })
}

function addMealToDOM(meal){
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(`${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`);
                console.log(newLocal);
            } else {
                break;
            }
            
        }
        single_mealEl.innerHTML = `
        <div class="single-meal">
        <h1> ${meal.strMeal} </h1>
        </div>
        `
}

// function addMealToDOM(meal){
//     const ingredients = [];

//     for (let i = 1; i <= 20; i++) {
//         if (meal[`strIngredient${i}`]) {
//             ingredients.push(`${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`);
//         } else {
//         };
//     }

//     single_mealEl.innerHTML = `
//     <div class='single-meal'>
//         <h1>${meal.strMeal}</h1>
//     </div>
//     `
// }
// //event listener
submit.addEventListener('submit', searchMeal)

mealEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item =>{
        if (item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false;
        }
    })

    if (mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealid')
        getMealById(mealId)
    }
    
})