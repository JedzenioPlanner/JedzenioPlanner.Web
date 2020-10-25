let count=1
$("#addStepBtn").click(()=>{
    $("#allSteps").append(`<div class="field stepMaker" id="step${count+1}">
    <div class="columns">
      <div class="column is-1">
        <p class="is-size-1 stepLabel">${ $(".stepMaker").length+1}.</p>
        <button class="button is-fullwidth" onclick="removeStep(${count+1})">Usuń</button>
      </div>
    <div class="column">
    <div class="control">
      <textarea class="textarea stepField" placeholder="Podaj opis kroku"></textarea>
    </div>
    </div>
    </div>
  </div>`)
})
function removeStep(id){
    if($(".stepMaker").length>1){
    $("#step"+id).remove()
    fixNumbers()
    }
}
function fixNumbers(){
    let num=1
    for(let i of $(".stepLabel")){
        i.innerText=num+"."
        num++
    }
}
function showValidationError(fieldId,alertId,message,hasErrors=false){
        $(alertId).text(message)
        $(alertId).removeClass("is-hidden")
        if(!hasErrors)
        $('html, body').animate({
            scrollTop: $(fieldId).offset().top-50
        }, 500)
}
function sendForm(){
  if(!validate())
    return
  $("#submitBtn").prop("disabled", true)
  let file = $('#photoField')[0].files[0]
  let formData = new FormData()
  formData.append('file', file)
    fetch('/api/recipes/pictures', {
    method: 'POST',
    body: formData,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(
    response => response.text().then((res)=>{
      if(response.status!=200){
        showValidationError("#photoField","#uploadFailed","Nie udało się przesłać zdjęcia.")
        $("#submitBtn").prop("disabled", false)
      }
      else{
        let recipeData=prepareData()
        recipeData["pictureUrl"]="/api/recipes/pictures/"+res
        fetch('/api/recipes', {
          method: 'POST',
          body: JSON.stringify(recipeData),
          headers:{"content-type":"application/json","Authorization": `Bearer ${token}`},
        }).then((response)=>{
          $("#submitBtn").prop("disabled", false)
          if(response.status==200)
            location.href="/recipe/explore"
          else
            showValidationError("#okButton","#serverError","Nie udało się dodać przepisu, spróbuj ponownie.")
        }).catch(error=>{
          console.error(error)
          $("#submitBtn").prop("disabled", false)
          showValidationError("#okButton","#serverError","Nie udało się dodać przepisu, spróbuj ponownie.")
        })
      }
    })
  ).catch((
    error)=>{
    console.error(error)
    showValidationError("#photoField","#uploadFailed","Nie udało się przesłać zdjęcia.")
    $("#submitBtn").prop("disabled", false)
    })
}
function validate(){
  let hasErrors=false
  if($("#nameField").val()==""){
    showValidationError("#nameField","#nameInvalid","Wprowadź nazwę przepisu.",hasErrors)
    hasErrors=true
  }
  if($("#mealsField").val().length==0){
    showValidationError("#mealsFieldCont","#mealsInvalid","Wybierz przynajmniej 1 posiłek.",hasErrors)
    hasErrors=true
  }
  if($('#photoField')[0].files.length==0){
    showValidationError("#photoField","#uploadFailed","Nie wybrano zdjęcia.",hasErrors)
    $("#submitBtn").prop("disabled", false)
    hasErrors=true
  }
  if($("#descField").val()==""){
    showValidationError("#descField","#descInvalid","Podaj krótki opis swojego przepisu.",hasErrors)
    hasErrors=true
  }
  if($("#caloriesField").val()==""){
    showValidationError("#caloriesField","#caloriesInvalid","Określ przybliżoną kaloryczność swojego dania.",hasErrors)
    hasErrors=true
  }
  if($("#ingredientsField").val().length==0){
    showValidationError("#ingredientsFieldCont","#ingredientsInvalid","Podaj produkty niezbędne do przygotowania tego dania.",hasErrors)
    hasErrors=true
  }
  return !hasErrors
}
function prepareData(){
  let data={
    "name":$("#nameField").val(),
    "mealTypes":$("#mealsField").val(),
    "description":$("#descField").val(),
    "calories":Number($("#caloriesField").val()),
    "ingredients":$("#ingredientsField").val().split(","),
    "steps":$(".stepField").map(function() {
      return $(this).val()
    }).get()
  }
  console.log(data)
  return data
}
