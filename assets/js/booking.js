document.body.style.backgroundColor="#2A2D2A"
const seats=document.querySelectorAll(".box")
const seatImage=document.querySelectorAll(".seat-img")
let totalMoney=document.querySelector(".money")
const selectedMovie=document.querySelector(".selected-name")
const selectedDate=document.querySelector(".selected-date")
const selectedTime=document.querySelector("#selected-time")

let totalPrice=0
let seatSelectedNum=0
        seatImage.forEach((img)=>{
            img.addEventListener("click",()=>{
                img.classList.toggle("red-img")
                if(img.classList.contains("red-img")){
                    img.src="/Movie-Booking/Photos/red-seat.png"
                    totalPrice+=300
                    seatSelectedNum++
                }else{
                    img.src="/Movie-Booking/Photos/Seats.png"
                    totalPrice-=300
                    
                }
                totalMoney.textContent=totalPrice
                saveData()
            })
        })
        
        
        function saveData(){
            const selectedChairs=Array.from(seatImage).reduce((selected,img,index)=>{
                if(img.classList.contains("red-img")){
                       selected.push(index)
                }
                return selected
            },[])
            let selectedName=selectedMovie.textContent
            let dateSelected=selectedDate.textContent
            let selectionTime=selectedTime.textContent
            let uniqueElement1=`${selectedName}_${dateSelected}_${selectionTime}_selectedOnes`
            let uniqueElement2=`${selectedName}_${dateSelected}_${selectionTime}_totalPriceIncluded`
                    


            localStorage.setItem(uniqueElement1,JSON.stringify(selectedChairs))
            localStorage.setItem(uniqueElement2,totalPrice)
        }
        
        function loadData(){
            let selectedName=selectedMovie.textContent
            let dateSelected=selectedDate.textContent
            let selectionTime=selectedTime.textContent
            let uniqueElement1=`${selectedName}_${dateSelected}_${selectionTime}_selectedOnes`
            let uniqueElement2=`${selectedName}_${dateSelected}_${selectionTime}_totalPriceIncluded`
            const allSavedSeats=JSON.parse(localStorage.getItem(uniqueElement1)) || []
             totalPrice=parseInt(localStorage.getItem(uniqueElement2)) || 0
            allSavedSeats.forEach((index)=>{
                seatImage[index].classList.add("red-img")
                seatImage[index].src="Photos/red-seat.png";
                seatImage[index].style.pointerEvents="none"
                
            })
            totalMoney.textContent=totalPrice
        }
        window.addEventListener("load", loadData);


document.addEventListener("DOMContentLoaded",()=>{
    const urlParams=new URLSearchParams(window.location.search)
    const movieName=urlParams.get('id')
    const movieTime=urlParams.get('time')
    const movieShow=urlParams.get('show')
    console.log(movieName)
    console.log(movieTime)
    selectedMovie.textContent=movieName
    selectedDate.textContent=movieTime
    selectedTime.textContent=movieShow
})
const nextBtn=document.querySelector(".proceed-btn")
nextBtn.addEventListener("click",function (){
    
    
    
    showTime=selectedTime.value
    let realTime=encodeURIComponent(selectedTime.textContent)
    let realDate=encodeURIComponent(selectedDate.textContent)
    let realName=encodeURIComponent(selectedMovie.textContent)
    let selectedSeats=Array.from(seatImage).filter((seat)=>seat.classList.contains("red-img")).map((seat)=>seat.parentElement.textContent)
    allSeats=encodeURIComponent(selectedSeats.join(","))
    allExpenses=encodeURIComponent(totalMoney.textContent)
    console.log(allSeats)
    if(totalPrice>0){
        window.location.href='/Movie-Booking/components/confirmation.html?id='+realTime+'&seats='+allSeats+'&money='+allExpenses+'&date='+realDate+'&name='+realName
    }else{
        alert("Please select seats")
    }


})

