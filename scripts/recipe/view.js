$(document).ready(function() {
    let urlParams = new URLSearchParams(window.location.search)
    let id=urlParams.get('id')
    fetchData(id)
})
function showNotFoundError(){
    $("#nameField").text("Nie znaleziono")
    $("#descField").text("Przepraszamy, nie udało się znaleźć tego przepisu.")
    $("#imageField").addClass("is-danger")
    $("#recipeSection").addClass("is-hidden")
}
function fetchData(id){
  fetch(`/api/recipes/${id}`).then(data=>{
    if(data.status!=200){
      showNotFoundError()
      return
    }
    data.json().then(recipeData=>{
      console.log(recipeData)
    let mealTypes={
        "Breakfast":"Śniadanie",
        "Lunch":"Lunch",
        "Dinner":"Obiad",
        "Snack":"Przekąska"
    }
    $("#nameField").text(recipeData.name)
    $("#descField").text(recipeData.description)
    $("#imageField").css("background-image",`url("${recipeData.pictureUrl.replaceAll(" ","%20")}")`)
    $("#caloriesField").html(recipeData.calories+" kalorii &nbsp;&CenterDot;")
    recipeData.mealTypes.forEach(meal=>{
        $("#mealsField").append(`<span class="tag">${mealTypes[meal]}</span> `)
    })
    recipeData.ingredients.forEach(ingredient=>{
        $("#ingredientsField").append(`<li>${ingredient}</li>`)
    })
    if(recipeData.steps.length==1){
      $("#stepsField").text(recipeData.steps[0])
      return
    }
    for(let i=1;i<=recipeData.steps.length;i++){
        $("#stepsField").append(`
        <div class="step-item">
        <div class="step-marker">${i}</div>
      </div>`)
    }
      $("#stepsField").append(`<div class="steps-content" id="stepper"></div>`)
    recipeData.steps.forEach((step)=>{
        $("#stepper").append(`<div class="step-content has-text-centered">
        <p>${step}</p>
      </div>`)
    })
    $("#stepsField").append(`<div class="steps-actions">
    <div class="steps-action">
      <a href="#" data-nav="previous" class="button">Poprzedni</a>
    </div>
    <div class="steps-action">
      <a href="#" data-nav="next" class="button">Następny</a>
    </div>
  </div>`)
  bulmaSteps.attach()
  })
}).catch(error=>{
  console.error(error)
  showNotFoundError()
})
}