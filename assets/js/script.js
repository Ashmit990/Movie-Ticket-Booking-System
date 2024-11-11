const slides=document.querySelectorAll(".slides img");
let slideIndex=0;
let intervalId=null;

initializeSlider()

function initializeSlider(){
    if(slides.length>0){
        slides[slideIndex].classList.add("displaySlide");
        intervalId=setInterval(nextSlide,3000);
    }
   
};

function showSlide(index){
    if(index>=slides.length){
        slideIndex=0
    }else if(index<0){
        slideIndex=slides.length-1
    }
  slides.forEach((slide)=>{
    slide.classList.remove("displaySlide")
  })
  slides[slideIndex].classList.add("displaySlide")
};

function prevSlide(){
  slideIndex--
  showSlide(slideIndex)
};

function nextSlide(){
  slideIndex++
  showSlide(slideIndex)
};
 const searchInput=document.querySelector(".search")
 const searchBtn=document.querySelector(".search-icon")
 const imageContainer=document.querySelector(".img-container")
 const allMovies=document.querySelectorAll(".movies")
 
function displayMovies(genre){
  allMovies.forEach((movie)=>movie.style.display="none")
  imageContainer.style.display="none"
  const genreMovie=document.querySelectorAll(`.movies.${genre}`)
  genreMovie.forEach((movie)=>movie.style.display="flex")
}
searchBtn.addEventListener("click",()=>{
  let searchedGenre=searchInput.value.toLowerCase()
  displayMovies(searchedGenre)
})
const afterTom=document.querySelector(".afterr-tomm")
const afterTomAfter=document.querySelector(".afterr-tomm-afterr")
const todayDate=document.querySelector(".todayDate")
const tomorrowDate=document.querySelector(".tomorrowDate")
const timeSelected=document.querySelector("#time")
const today=new Date()
const tomorrow=new Date()
const afterTomorrowDate=new Date()
const afterTomAfterDate=new Date()
today.setDate(today.getDate())
tomorrow.setDate(tomorrow.getDate()+1)
afterTomorrowDate.setDate(afterTomorrowDate.getDate()+2)
afterTomAfterDate.setDate(afterTomAfterDate.getDate()+3)
todayTime=today.toDateString()
tomorrowTime=tomorrow.toDateString()
afterTomorrowAfter=afterTomAfterDate.toDateString()
afterTomorrow=afterTomorrowDate.toDateString()
todayDate.textContent=todayTime.slice(4,10)
tomorrowDate.textContent=tomorrowTime.slice(4,10)
afterTom.textContent=afterTomorrow.slice(4,10)
afterTomAfter.textContent=afterTomorrowAfter.slice(4,10)

let timeSelection=false

const allTicketBtn=document.querySelectorAll(".buy-ticket")
allTicketBtn.forEach((btn)=>{
  btn.addEventListener("click",function(){{
    let clickedMovie=this
    console.log(clickedMovie.parentElement.id)
    const encodedId = encodeURIComponent(clickedMovie.parentElement.id);
    let encodedTime=""
    let afterTomRadio=document.querySelector("#after-tom")
    let afterTomAfterRadio=document.querySelector("#after-tom-after")
    let todayRadio=document.querySelector("#today")
    let tomorrowRadio=document.querySelector("#tomorrow")
    const timeReal=timeSelected.value
    let timeShow=encodeURIComponent(timeReal)
    if(afterTomRadio&&afterTomRadio.checked){
      timeSelection=true
       encodedTime=encodeURIComponent(afterTomRadio.nextElementSibling.textContent)
      console.log(encodedTime)
   }else if(afterTomAfterRadio&&afterTomAfterRadio.checked){
    timeSelection=true
    encodedTime=encodeURIComponent(afterTomAfterRadio.nextElementSibling.textContent)

   }else if(todayRadio&&todayRadio.checked){
    timeSelection=true
    encodedTime=encodeURIComponent(todayRadio.nextElementSibling.textContent)
   }
   else if(tomorrowRadio&&tomorrowRadio.checked){
    timeSelection=true
    encodedTime=encodeURIComponent(tomorrowRadio.nextElementSibling.textContent)
   }
   if(timeSelection){
    window.location.href = '/Movie-Booking/components/booking.html?id=' + encodedId +'&time=' + encodedTime+'&show='+timeShow
   }else{
    alert("Please select time !")
   }
   

  }

  })
})
const myTicketSection=document.querySelector(".my-ticket")
myTicketSection.addEventListener("click",function(){
  window.location.href=`/Movie-Booking/components/myTicket.html`
})




