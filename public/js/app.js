console.log("client side javascript file is loaded")


// this works in the client side only and uses the then to give a response to the client 


//home work, using the client url for an address, use the fetch function to display content to the browser


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

// selecting the html elements by their ID, paragragph 1
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")


// telling the brower not to refresh or stopping the form from refreshing
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    
    // this places or renders values into the html elements 
    messageOne.textContent = "Loading...."
    messageTwo.textContent = ""

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
            }
            else {
                // console.log(data.location)
                messageOne.textContent = data.location
                messageTwo.textContent = data.temperature
                // console.log(data.summary)
                // console.log(data.probability)
            }
        })
    })
    
   console.log('testing!')
    
})