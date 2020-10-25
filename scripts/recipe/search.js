$(document).ready(function() {
    let urlParams = new URLSearchParams(window.location.search)
    let cal = urlParams.get('calories')
    let t = urlParams.get('meal')
    if(t!=null&&cal!=null){
      fetchData(cal,t)
      $("#searchCalSlider").val(cal)
      $("#searchCalOutput").val(cal)
      $(`[value="${t}"]`).attr("checked","true")
    }
    else
      $(`[value="breakfast"]`).attr("checked","true")
})
function showError(){
  $("#resultsView").html(`<div class="notification is-danger">
  <i class='bx bx-error'></i> Nie znaleziono przepisów spełniających podane kryteria.
</div>`)
}
function fetchData(calories,type){
    fetch(`/api/menu/single?calories=${calories}&type=${type}`).then(data=>{
      if(data.status!=200){
        showError()
        return
      }
        data.json().then(recipe=>{
            console.log(recipe)
              let card=new RecipeCard(recipe)
                $("#resultsView").append(card.generatedHTML)
        })
    }).catch(error=>{
        console.error(error)
    })
}