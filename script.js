const secondHalf = document.getElementById('second-half');
const closeButton = document.getElementById('close');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const randomDish = document.getElementById('random-dish');

randomDish.addEventListener('click',() => {
    modal.style.display = 'block';
})

closeButton.addEventListener('click',() => {
    modal.style.display = 'none';
})

document.addEventListener("click", (event) => {
    if (event.target === modal && modal.style.display==='block') {
      modal.style.display = 'none';
    }
});

function getRandomMeal(){

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        displayRandomMeal(data)
    })
    .catch((err) => console.log('Error :',err))

}

getRandomMeal()

function displayRandomMeal(data){
    const foodImage = data.meals[0].strMealThumb;
    const imageSpace = document.getElementById('random-dish');
    imageSpace.src = `${foodImage}`;
    const foodName = data.meals[0].strMeal;
    const nameSpace = document.getElementById('dish-name');
    nameSpace.innerText = `${foodName}`

    for (let i=1;i<=20;i++){
        const ingredientName = data.meals[0][`strIngredient${i}`];
        const ingredientMeasure = data.meals[0][`strMeasure${i}`];

        if (ingredientName) {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add('ingredient');

        const ingredientNameDiv = document.createElement('div');
        const ingredientNameTag = document.createElement('h3');
        ingredientNameTag.innerText = ingredientName;

        const quantityDiv = document.createElement('div');
        const quantity = document.createElement('h3');
        quantity.innerText = ingredientMeasure;

        ingredientNameDiv.appendChild(ingredientNameTag);
        quantityDiv.appendChild(quantity);
        ingredientDiv.appendChild(ingredientNameDiv);
        ingredientDiv.appendChild(quantityDiv);
        modalBody.appendChild(ingredientDiv);
        }
    }
}

function searchMeal(query){

    document.getElementById('category').innerText = query
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data.meals)
        mealList = data.meals
        appendData(mealList)
    })
    .catch((err) => console.log(err))

}

function handleKeyPress(event){

    if (event.key === 'Enter' || event.keyCode === 13){
        const query = document.getElementById('input').value
        console.log(query)
        searchMeal(query)
    }

}

function appendData(data){

    secondHalf.innerHTML = ''
    data.forEach((el => {
        const dishDiv = document.createElement('div');
        dishDiv.classList.add('dish');

        const img = document.createElement('img');
        img.src = el.strMealThumb;

        const namePara = document.createElement('p');
        namePara.textContent = el.strMeal;

        dishDiv.appendChild(img);
        dishDiv.appendChild(namePara);
        secondHalf.appendChild(dishDiv);
    }))

}
