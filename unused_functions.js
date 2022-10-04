// WORKING FUNCTIONS NOT NEEDED IN THE PROJECT AT THE MOMENT


// FUNCTIONS TO TEST ONCLICK ATTRIBUTE OF BUTTON
const testButton = () => {
    console.log('the button click ran the function')
}

// GETS ALL THE DELETE BUTTONS AND ADDS EVENT LISTENER TO THE BUTTON
function getDelete() {
    const deleteButton = document.querySelectorAll('.cardButtonDelete')
    console.log(deleteButton)
    deleteButton[1].addEventListener('click', ()=> console.log('Hello World!'))
}

function getEdit() {
    const editButtons = document.querySelectorAll('.cardButtonEdit')
    for (let button of editButtons) {
        let movieId = button.id
        button.addEventListener("click", function () {
            console.log(movieId)
        }, false)
        //console.log(button)
    }}



