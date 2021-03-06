//references
let triggerButton = document.getElementById("startTheProcess")
let randomMealURL = "https://www.themealdb.com/api/json/v1/1/random.php"
let mealSection = document.getElementById("mealSection")
let queryURL = "https://emojihub.herokuapp.com/api/random/group_neutral"
let emojiURL = "https://emojihub.herokuapp.com/api/random/group_"
var emojiGroup = "face_neutral"
let emojiSection = document.getElementById("emojiSection")

//functions
let triggerHandler = function(){
    fetchRandomMeal()
}


//fetcher

let fetchEmojiFacePositive = function(queryURL){
    fetch(queryURL)
    .then((response) =>{
        return response.json()
    })
    .then((data) =>{
        emojiCode = emojiDataHandler(data)
        //console.info(data.category)
        //console.log('hello')
    })
    .catch((serverError) =>{
        console.error(serverError)
    })
}

let fetchRandomMeal = function(){
     fetch(randomMealURL)
        .then((response) => {
            //console.info(response)
            return response.json()})
        .then((data) =>{
            //console.info(data)
            categoryOfFood = mealDataHandler(data)
            if(categoryOfFood == '[Beef]' || categoryOfFood == '[Chicken]' || 
            categoryOfFood == '[Lamb]' || categoryOfFood == '[Pork]' || categoryOfFood == '[Goat]')
            {
                emojiGroup = 'face_positive'
                queryURL = emojiURL + emojiGroup
                fetchEmojiFacePositive(queryURL)
                console.log(queryURL)
                console.info('I love meat!!!!!')
            }
            else if(categoryOfFood == '[Miscellaneous]' || categoryOfFood == '[Side]'  || 
            categoryOfFood == '[Breakfast]'|| categoryOfFood == '[Breakfast]'|| 
            categoryOfFood == '[Pasta]' || categoryOfFood == '[Seafood]'){
                emojiGroup = 'face_neutral'
                queryURL = emojiURL + emojiGroup
                fetchEmojiFacePositive(queryURL)
                console.log(queryURL)
                console.info('Not bad.')
            }
            else if(categoryOfFood == '[Dessert]'){
                emojiGroup = 'face_sick'
                queryURL = emojiURL + emojiGroup
                fetchEmojiFacePositive(queryURL)
                console.log(queryURL)
                console.info('Too Sweet.')
            }
            else{
                queryURL = "https://emojihub.herokuapp.com/api/random/group_face_negative"
                fetchEmojiFacePositive(queryURL)
                console.log(queryURL)
                console.info('NOOOOOOOOOOOOOO!!!!!!!')
            }  
        })
        
        .catch((serverError) =>{
            console.error(serverError)
        })
}


//handler

let emojiDataHandler = function(emojiData){
    while(emojiSection.firstChild){
        emojiSection.removeChild(emojiSection.firstChild)
    }
    let emoji = emojiData.htmlCode
    let emojiContainer = document.createElement('sp')
    emojiContainer.innerHTML = emoji
    emojiSection.appendChild(emojiContainer)
}


let mealDataHandler = function(mealData){

    //Delete Previous
    while(mealSection.firstChild){
        mealSection.removeChild(mealSection.firstChild)
    }
    while(mealSectionImg.firstChild){
        mealSectionImg.removeChild(mealSectionImg.firstChild)
    }

    let category = '[' + mealData.meals[0].strCategory + ']'
    let name = ' ' + mealData.meals[0].strMeal
    let thumb = mealData.meals[0].strMealThumb
    //console.info(category,' ',name)

    let categoryContainer = document.createElement('span')
    categoryContainer.innerText = category
    mealSection.appendChild(categoryContainer)

    let nameContainer = document.createElement('span')
    nameContainer.innerText = name
    mealSection.appendChild(nameContainer)

    let thumbContainer = document.createElement('img')
    thumbContainer.src = thumb
    thumbContainer.alt = name
    mealSectionImg.appendChild(thumbContainer)

    return category;
}






//events
triggerButton.addEventListener('click', triggerHandler)