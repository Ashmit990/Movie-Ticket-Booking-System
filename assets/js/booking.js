document.body.style.backgroundColor="#2A2D2A"
let totalMoney=document.querySelector(".money")
const selectedMovie=document.querySelector(".selected-name")
const selectedDate=document.querySelector(".selected-date")
const selectedTime=document.querySelector("#selected-time")
let seatContainer=document.querySelector(".seats-screen")
let proceedBtn=document.querySelector(".proceed-btn")


let seatSelectedNum=0

let rows=['A','B','C','D','E','F','G','H','I','J','K']
let seatsPerRow=18
 
function generateSeats(){
    rows.forEach((row)=>{
        let seatRow=document.createElement("div")
        seatRow.classList.add("seat-row")

        for(let i=1; i<=seatsPerRow; i++){
            let seatBox=document.createElement("div")
            seatBox.classList.add("box")

            let seatImg=document.createElement("img")
            seatImg.src=`/Movie-Booking/Photos/Seats.png`;
            seatImg.classList.add("seat-img")

            let seatName=document.createTextNode(`${row}${i}`)

            seatBox.appendChild(seatImg)
            seatBox.appendChild(seatName)

            seatRow.appendChild(seatBox)
        }
        seatContainer.appendChild(seatRow)
    })
}

generateSeats()

const seatImage = document.querySelectorAll(".seat-img");
let totalPrice = 0; 

// Load saved seat and price data when the page loads
window.addEventListener("load", loadSeats);

// Click event for seat selection
seatImage.forEach((img) => {
    

    img.addEventListener("click", () => {
        img.classList.toggle("red-img");
        if (img.classList.contains("red-img")) {
            img.src = "/Movie-Booking/Photos/red-seat.png";
            totalPrice += 300; // Add price
        } else {
            img.src = "/Movie-Booking/Photos/Seats.png";
            totalPrice -= 300; // Subtract price
        }

        totalMoney.textContent = totalPrice; // Update displayed total
        saveSeats(); // Save current seat and price data
    });
});

let details = JSON.parse(localStorage.getItem('movieData'));
selectedMovie.textContent = details.movie.replace("_"," ");
selectedDate.textContent = details.date;
selectedTime.textContent = details.time;

// Save selected seats and total price to localStorage
function saveSeats() {
    // Get indices of selected seats
    const selectedIndices = Array.from(seatImage).reduce((selected, img, index) => {
        if (img.classList.contains("red-img")) {
            selected.push(index);
        }
        return selected;
    }, []);

    // Get text content of each selected seat's parent element
    const selectedSeatNames = Array.from(seatImage)
        .filter(img => img.classList.contains("red-img"))
        .map(img => img.parentElement.textContent)
        .join(", ");

    // Update details object with selected seats and total price
    details.selectedSeats = selectedSeatNames;
    details.totalPrice = totalPrice;

    // Save unique keys in localStorage for each movie/time/date
    let uniqueSeats = `${details.movie}_${details.time}_${details.date}_seats`;
    let uniquePrices = `${details.movie}_${details.time}_${details.date}_price`;
    
    localStorage.setItem(uniqueSeats, JSON.stringify(selectedIndices));
    localStorage.setItem(uniquePrices, totalPrice);
    localStorage.setItem("movieData", JSON.stringify(details)); // Update localStorage with modified details
    

    // Log the updated details to the console
    console.log("Updated details:", details);
}


// Load saved seats and price from localStorage
function loadSeats() {
    let uniqueSeats = `${details.movie}_${details.time}_${details.date}_seats`;
    let uniquePrices = `${details.movie}_${details.time}_${details.date}_price`;

    let totalSeats = JSON.parse(localStorage.getItem(uniqueSeats)) || [];
    totalPrice = parseInt(localStorage.getItem(uniquePrices)) || 0; // Load saved price

    totalSeats.forEach((index) => {
        seatImage[index].classList.add("red-img");
        seatImage[index].src = "/Movie-Booking/Photos/red-seat.png";
        seatImage[index].style.pointerEvents = "none";  
    });
    totalMoney.textContent = totalPrice; // Display the loaded price
}

proceedBtn.addEventListener("click",function(){
window.location.href=`/Movie-Booking/components/confirmation.html`
})
