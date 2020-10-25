$(document).ready(function() {
    let urlParams = new URLSearchParams(window.location.search)
    let cal = urlParams.get('calories')
    let qt = urlParams.get('quantity')
    if(cal!=null&&qt!=null){
      fetchData(cal,qt)
      $("#calSlider").val(cal)
      $("#qtSlider").val(qt)
      $("#calOutput").val(cal)
      $("#qtOutput").val(qt)
    }
})
function showError(){
  $("#resultsView").html(`<div class="notification is-danger">
  <i class='bx bx-error'></i> Nie można wygenerować jadłospisu dla podanych parametrów.
</div>`)
}
function fetchData(calories,quantity){
    fetch(`/api/menu?caloriesTarget=${calories}&mealsAmount=${quantity}`).then(data=>{
      if(data.status!=200){
        showError()
        return
      }
        data.json().then(recipes=>{
            console.log(recipes)
            recipes.mealPlanRows.forEach(recipe => {
              let card=new RecipeCard(recipe.recipe)
              $("#resultsView").append(card.generatedHTML)
            })
        })
    }).catch(error=>{
        console.error(error)
    })
}