class RecipeCard{
    constructor(data){
        let mealTypes={
            "Breakfast":"Śniadanie",
            "Lunch":"Lunch",
            "Dinner":"Obiad",
            "Snack":"Przekąska"
        }
        this.generatedHTML=`<div class="card">
        <a href="/recipe/view?id=${data.id}">
        <div class="card-image">
          <figure class="image is-2by1">
            <img src="${data.pictureUrl}">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">${data.name}</p>
              <p class="subtitle is-6">${data.calories} kalorii &nbsp;&CenterDot; ${data.mealTypes.map(function (key) {
                return "<span class='tag'>"+mealTypes[key]+"</span>"
            }).join("")}</p>
            </div>
          </div>
        </div>
        </a>
      </div>`
    }
}