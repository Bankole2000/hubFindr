const searchButton = document.querySelector('#home-search');
const searchInput = document.querySelector("#home-search-input");
const mobileSearchInput = document.querySelector('#mobile-search-input');
const mobileSearchButton = document.querySelector('#mobile-search-button');
const transitionElement = document.querySelector("#transition");

searchButton.addEventListener("click", e => {
  e.preventDefault();
  const {value: username} = searchInput;
  console.log({username});
  if(username){
    transitionElement.classList.add('is-active');
    console.log(window.location);
    window.location = `/profile.html?username=${username}`;
  }
})

mobileSearchButton.addEventListener("click", e => {
  e.preventDefault();
  const {value: username} = mobileSearchInput;
  console.log({username});
  
    transitionElement.classList.add('is-active');
    console.log(window.location);
    window.location = `/profile.html?username=${username}`;
})