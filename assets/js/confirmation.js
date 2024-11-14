document.body.style.backgroundColor="#949A94"
let showClock=document.querySelector(".showClock")
    let totalSeats=document.querySelector(".allSeats")
    let allMoney=document.querySelector(".allExpenses")
    let selectedTitle=document.querySelector(".selected-name")
    let selectedCalender=document.querySelector(".selected-date")
   
    let submitBtn=document.querySelector(".submit")
 let details=JSON.parse(localStorage.getItem('movieData'))
 console.log(details)

 let {movie,date,time,selectedSeats,totalPrice}=details

 selectedTitle.textContent=movie
 totalSeats.textContent=selectedSeats
 allMoney.textContent=totalPrice
 selectedCalender.textContent=date
 showClock.textContent=time

 let uniqueKey=`${movie}_${time}_${date}_details`


 submitBtn.addEventListener("click",function(){
    let namePeople=document.querySelector("#name-people").value
    let emailPeople=document.querySelector("#email-people").value
    let addressPeople=document.querySelector("#address-people").value

    details.personName=namePeople
    details.email=emailPeople
    details.address=addressPeople
   
    localStorage.setItem('movieData',JSON.stringify(details))
    
 let updatedDetails = JSON.parse(localStorage.getItem('movieData'))

 
    console.log(details)

    localStorage.setItem(uniqueKey,JSON.stringify(details))

    let savedTickets=JSON.parse(localStorage.getItem('savedTickets')) || []
    savedTickets.push(uniqueKey)
    localStorage.setItem('savedTickets',JSON.stringify(savedTickets))

   redirectToPage(namePeople,emailPeople,addressPeople);
       
    

   

    
 })

 function redirectToPage(name, email, address) {
   if (name === "Ashmit Dahal" && email === "ashmitcristiano07@gmail.com" && address === "Naya Baneshwor, Kathmandu") {
       window.location.href = "/Movie-Booking/components/admin.html";
   } else {
       window.location.href = "/Movie-Booking/components/myTicket.html";
   }
}
