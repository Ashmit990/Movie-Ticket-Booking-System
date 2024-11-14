import { movies } from './movies.js';  //importing array of movies

let moviesBox=document.querySelector(".movies-box")
let searchBtn=document.querySelector(".search-icon")
let imgContainer=document.querySelector(".img-container")
let movieTime=document.querySelector("#time")
let dateSelected=false


let todayDate = document.querySelector(".todayDate");
let tomorrowDate = document.querySelector(".tomorrowDate");
let afterTomDate = document.querySelector(".afterr-tomm");
let afterTomAfterDate = document.querySelector(".afterr-tomm-afterr");

let today = new Date();
let tomorrow = new Date(today);
let afterTomorrow = new Date(today);
let afterTomorrowAfter = new Date(today);

tomorrow.setDate(today.getDate() + 1);
afterTomorrow.setDate(today.getDate() + 2);
afterTomorrowAfter.setDate(today.getDate() + 3);

let options = { month: 'short', day: 'numeric' };

todayDate.textContent = today.toLocaleDateString('en-US', options);
tomorrowDate.textContent = tomorrow.toLocaleDateString('en-US', options);
afterTomDate.textContent = afterTomorrow.toLocaleDateString('en-US', options);
afterTomAfterDate.textContent = afterTomorrowAfter.toLocaleDateString('en-US', options);

function createCards([title,movie]){
  let {runtime,image,genre}=movie //destructuring object inside movies array
return `<div class="movies ${genre}" id="${title}">
                <img src="${image}" alt="" class="movie1">
                <div class="overlay"></div>
                <div class="details">
                    <p class="movie-name">${title.replace("_"," ")}</p>
                    <p class="runtime">${runtime}</p>
                    
                </div>
                <button class="buy-ticket" id="buyTicketBtn">Buy Ticket <a href="booking.html"></a></button>
            </div>`//making a card layout for movie

}
moviesBox.innerHTML=Object.entries(movies).map(createCards).join('')//converts the object into html elements and return a new array of html to each and every objects
// Display Movies Function
function displayMovies() {
  imgContainer.style.display = "none";
  moviesBox.style.display = "none";

  // Get genre type from search input and convert to lowercase for case-insensitive match
  let genreType = searchInput.value.toLowerCase();

  // Filter movies based on the genre
  let filteredGenre = Object.entries(movies).filter(
    ([title, movie]) => movie.genre.toLowerCase() === genreType
  );

  // Generate HTML content for the filtered movies
  moviesBox.innerHTML = filteredGenre.map(([title, movie]) => {
    let { runtime, image, genre } = movie;
    return `<div class="movies ${genre}" id="${title}">
                <img src="${image}" alt="" class="movie1">
                <div class="overlay"></div>
                <div class="details">
                    <p class="movie-name">${title.replace(/_/g, " ")}</p>
                    <p class="runtime">${runtime}</p>
                </div>
                <button class="buy-ticket" id="buyTicketBtn">Buy Ticket</button>
            </div>`;
  }).join("");

  // Show the filtered movies
  moviesBox.style.display = "flex";
  attachEventListener()
}

// Event listener for the search button
searchBtn.addEventListener("click", displayMovies);


 let todayRadio=document.querySelector("#today")
let tomorrowRadio=document.querySelector("#tomorrow")
let afterTomRadio=document.querySelector("#after-tom")
let afterTomAfterRadio=document.querySelector("#after-tom-after")


let realDate;
function attachEventListener(){
  let buyBtn=document.querySelectorAll("#buyTicketBtn")
  buyBtn.forEach((btn)=>{
    btn.addEventListener("click",function(e){
      if(todayRadio.checked){
         realDate=todayDate.textContent
         dateSelected=true
      }else if(tomorrowRadio.checked){
       realDate=tomorrowDate.textContent
       dateSelected=true
      }else if(afterTomRadio.checked){
       realDate=afterTomDate.textContent
       dateSelected=true
      }else if(afterTomAfterRadio.checked){
       realDate=afterTomAfterDate.textContent
       dateSelected=true
      }
   
      let data={
       movie:e.target.parentElement.id.replace("_"," "),
       date:realDate,
       time:movieTime.value
      }
  
      localStorage.setItem('movieData', JSON.stringify(data))
     if(dateSelected){
       window.location.href="/Movie-Booking/components/booking.html"
     }else{
      alert("Please Select Your Date")
     }
     
      
   })
  })
}
attachEventListener()


 const slides=document.querySelectorAll(".slides img");
let slideIndex=0;
let intervalId=null;

initializeSlider()
let searchInput=document.querySelector(".search")
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

const myTicketSection=document.querySelector(".my-ticket")
myTicketSection.addEventListener("click",function(){
  window.location.href=`/Movie-Booking/components/myTicket.html`
})




