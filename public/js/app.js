console.log('Client side javascript file is loaded')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
                console.log(data.error)
            }else{
                console.log(data)
                messageOne.textContent = ''
                messageTwo.textContent = 'Weather at '+location+' '+data.description+'. Temperature is '+data.temperature+' degrees & it feels like '+data.feelslike+' degrees !'
            }
        })
    })
})