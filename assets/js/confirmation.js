document.body.style.backgroundColor="#949A94"
let showClock=document.querySelector(".showClock")
    let totalSeats=document.querySelector(".allSeats")
    let allMoney=document.querySelector(".allExpenses")
    let selectedTitle=document.querySelector(".selected-name")
    let selectedCalender=document.querySelector(".selected-date")
    let namePeople=document.querySelector("#name-people")
    let emailPeople=document.querySelector("#email-people")
    let addressPeople=document.querySelector("#address-people")
document.addEventListener("DOMContentLoaded",()=>{
    const urlParams= new URLSearchParams(window.location.search)
    const movieTime=urlParams.get('id')
    const seats=urlParams.get('seats')
    const totalExpenses=urlParams.get('money')
    const movieTitle=urlParams.get('name')
    const movieCalender=urlParams.get('date')
    console.log(seats)
    totalSeats.textContent=seats
    showClock.textContent=movieTime
    selectedTitle.textContent=movieTitle
    selectedCalender.textContent=movieCalender
    allMoney.textContent=`${totalExpenses}`
    console.log(movieTime)
})
const submitBtn=document.querySelector(".submit")

submitBtn.addEventListener("click", function() {
    const encodedMovie = decodeURIComponent(selectedTitle.textContent);
    const encodedDate = decodeURIComponent(selectedCalender.textContent);
    const encodedTime = decodeURIComponent(showClock.textContent);

    
    let ticketData = {
        movie: encodedMovie,
        date: encodedDate,
        time: encodedTime,
        seats: decodeURIComponent(totalSeats.textContent),
        price: decodeURIComponent(allMoney.textContent),
        name: decodeURIComponent(namePeople.value),
        email: decodeURIComponent(emailPeople.value),
        address: decodeURIComponent(addressPeople.value)
    };
    let uniqueKey = `${encodedMovie}_${encodedDate}_${encodedTime}`;

    localStorage.setItem(uniqueKey,JSON.stringify(ticketData))

    let keysArray=JSON.parse(localStorage.getItem('keys')) || []
    keysArray.push(uniqueKey)

    localStorage.setItem('keys',JSON.stringify(keysArray))
  

    window.location.href = '/Movie-Booking/components/myTicket.html';
});
