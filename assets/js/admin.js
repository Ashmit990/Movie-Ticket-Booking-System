document.body.style.backgroundColor="#3D3E3D"
let savedContainer=document.querySelector(".saved-container")
const localPercentage=4
const vatPercentage=13
const totalPercentage=17


let keysArray=JSON.parse(localStorage.getItem('savedTickets'))

keysArray.forEach((key) => {
    let data = JSON.parse(localStorage.getItem(key)) || []

    
   
    let { movie, date, time, selectedSeats, totalPrice, personName, email, address }=data

    let uniqueSeats=`${movie}_${time}_${date}_seats`
    let uniquePrices=`${movie}_${time}_${date}_price`

    console.log(data)
    let totalPriceAmount = totalPrice;
    let netAmount = parseInt(totalPriceAmount - (totalPercentage / 100 * totalPriceAmount));
    let localAmount = parseInt(localPercentage / 100 * totalPriceAmount);
    let vatAmount = parseInt(vatPercentage / 100 * totalPriceAmount);

    let boxMain = document.createElement("div");
    let button = document.createElement("button");
    button.classList.add("save-my-tickets");
    button.textContent = "Remove Ticket";
    boxMain.classList.add("main-box");

    let qrImage = document.createElement("img");
    qrImage.classList.add("qr-code");

    qrImage.src=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${movie} `
    

    boxMain.innerHTML = `
        <div class="initial-ticket-container">
            <p class="ticket-title">GalaxyCinema</p>
            <div class="qr-container"></div>
            <p class="ticket-movie-name">${movie}</p>
                <div class="all-details">
                    <p class="seat-details">Seats: <span class="all-seats">${selectedSeats}</span></p>
                    <p class="seat-details">Time: <span class="all-seats" id="user-time">${time}</span></p>
                    <p class="seat-details">Date: <span class="all-seats" id="user-date">${date}</span></p>
                    <p class="seat-details">Name: <span class="all-seats" id="user-name">${personName}</span></p>
                    <p class="seat-details">E-Mail: <span class="all-seats" id="user-mail">${email}</span></p>
                    <p class="seat-details">Address: <span class="all-seats" id="user-address">${address}</span></p>
                </div>
                <div class="price-details">
                    <p class="price-title">Price Breakdown</p>
                    <p class="breakdown-details">Net Price: Rs.<span class="all-breakdown" id="net-price">${netAmount}</span></p>
                    <p class="breakdown-details">Local Tax (4%): Rs.<span class="all-breakdown" id="local-tax">${localAmount}</span></p>
                    <p class="breakdown-details">VAT (13%): Rs.<span class="all-breakdown" id="vat">${vatAmount}</span></p>
                    <p style="font-size: 16px;" class="breakdown-details" class="total-price">Total Price: <span class="all-breakdown" id="total-price">Rs.${totalPriceAmount}</span></p>
                </div>
            </div>`


    boxMain.querySelector(".qr-container").appendChild(qrImage);

    qrImage.onload = function() {
        boxMain.append(button);
        savedContainer.append(boxMain);
    };
    
    
    button.addEventListener("click", function () {

        let popup = document.querySelector(".popup");
        let removeBtn = document.querySelector(".removeIt");
        popup.style.display="block"
        
        if (popup && removeBtn) {
            removeBtn.addEventListener("click", function () {
                popup.style.display = "none";
                localStorage.removeItem(uniqueSeats);
                localStorage.removeItem(uniquePrices);
                boxMain.remove();
                localStorage.removeItem(key);
        
                keysArray = keysArray.filter(k => k !== key);
                localStorage.setItem('savedTickets', JSON.stringify(keysArray));
            });
        } else {
            console.error("Popup or remove button not found");
        }
        
        
       
    });


   
    
});
