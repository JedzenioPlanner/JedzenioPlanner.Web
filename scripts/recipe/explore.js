let page=0
let fetching=true
let ids=[]
$(document).ready(function() {
    loadAll()
})
function loadAll(){
    $("#tab-all").addClass("is-active")
    $("#tab-favs").removeClass("is-active")
    $("#resultsView").html("")
    fetch(`/api/recipes/random`).then(data=>{
        if(data.status!=200){
            showError()
            return
        }
        data.json().then(recipes=>{
            ids=recipes
            page=0
            fetching=true
            fetchData(page)
        })
    }).catch(error=>{
        console.error(error)
        showError()
    })
}
function showError(){
    $("#resultsView").append(`<div class="notification is-danger">
    <i class='bx bx-error'></i> Nie udało się wczytać przepisów.
  </div>`)
}
function showEndInfo(){
    $("#resultsView").append(`<div class="notification is-info">
    <i class='bx bx-arrow-to-bottom'></i> Dotarłeś na koniec.
  </div>`)
}
async function fetchData(page){
    for(let i=page;i<page+10;i++){
        let data=await (await fetch(`/api/recipes/${ids[i]}`)).json()
        let c=new RecipeCard(data)
        $("#resultsView").append(c.generatedHTML)
    }
    fetching=false
}
$(window).on("scroll", function() {
    var scrollHeight = $(document).height();
    var scrollPos = $(window).height() + $(window).scrollTop();
    if((((scrollHeight - 300) >= scrollPos) / scrollHeight == 0) && !fetching){
        fetching=true
        page+=10
        fetchData(page)
     }
});