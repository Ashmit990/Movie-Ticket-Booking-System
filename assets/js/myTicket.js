document.body.style.backgroundColor="#3D3E3D"
let savedContainer=document.querySelector(".saved-container")
const localPercentage=4
const vatPercentage=13
const totalPercentage=17

let keysArray=JSON.parse(localStorage.getItem('keys'))

keysArray.forEach((key) => {
    let data = JSON.parse(localStorage.getItem(key)) || []
    let uniqueElement1 = `${data.movie}_${data.date}_${data.time}_selectedOnes`;
    let uniqueElement2 = `${data.movie}_${data.date}_${data.time}_totalPriceIncluded`;

    console.log(data)
    let totalPriceAmount = data.price;
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
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data.movie}`;

    boxMain.innerHTML = `
        <div class="initial-ticket-container">
            <p class="ticket-title">GalaxyCinema</p>
            <div class="qr-container"></div>
            <p class="ticket-movie-name">${data.movie}</p>
                <div class="all-details">
                    <p class="seat-details">Seats: <span class="all-seats">${data.seats}</span></p>
                    <p class="seat-details">Time: <span class="all-seats" id="user-time">${data.time}</span></p>
                    <p class="seat-details">Date: <span class="all-seats" id="user-date">${data.date}</span></p>
                    <p class="seat-details">Name: <span class="all-seats" id="user-name">${data.name}</span></p>
                    <p class="seat-details">E-Mail: <span class="all-seats" id="user-mail">${data.email}</span></p>
                    <p class="seat-details">Address: <span class="all-seats" id="user-address">${data.address}</span></p>
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
    
    button.addEventListener("click", function () {

        let popup=document.querySelector(".popup")
        let removeBtn=document.querySelector(".removeIt")
        let cancelBtn=document.querySelector(".cancel")
        popup.style.display="flex";
        removeBtn.addEventListener("click",function(){
            popup.style.display="none"
            localStorage.removeItem(uniqueElement1)
        localStorage.removeItem(uniqueElement2)
        
        boxMain.remove();

       
        localStorage.removeItem(key);

       

        
        keysArray = keysArray.filter(k => k !== key);
        localStorage.setItem('keys', JSON.stringify(keysArray));
        })
        
       
    });


    qrImage.onload = function() {
        boxMain.append(button);
        savedContainer.append(boxMain);
    };
    
});
