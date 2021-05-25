const searchButton = document.querySelector('#home-search');
const searchInput = document.querySelector("#home-search-input");
const mobileSearchInput = document.querySelector('#mobile-search-input');
const mobileSearchButton = document.querySelector('#mobile-search-button');
const navSearchInput = document.querySelector('#nav-search-input');
const transitionElement = document.querySelector("#transition");

const toggleMenu = () => {
  console.log("toggle Menu");
  document.getElementById("myDropdown").classList.toggle("show");
}

const showSettingsModal = () => {
  console.log('Show Settings Modal');
}

const hideSettingsModal = () => {
  console.log('Hide Settings Modal');
}

searchButton.addEventListener("click", e => {
  e.preventDefault();
  const {value: username} = searchInput;
  transitionElement.classList.add('is-active');
  window.location = `profile.html?username=${username}`;
})

mobileSearchButton.addEventListener("click", e => {
  e.preventDefault();
  const {value: username} = mobileSearchInput;
    transitionElement.classList.add('is-active');
    window.location = `profile.html?username=${username}`;
})

navSearchInput.addEventListener('keyup', e => { 
  if(e.key == "Enter"){
    transitionElement.classList.add('is-active');
    window.location = `profile.html?username=${navSearchInput.value || "null"}`;
  }
  if(e.key == "Escape"){
    e.target.blur()
  }
})

document.addEventListener('keyup', e => {
  if(e.key == "/" && !e.ctrlKey && !e.altKey && !(document.activeElement === navSearchInput)){
    navSearchInput.focus();
  }
})

let token = localStorage.getItem('hubFindrToken')
if(!token){
  fetch(config.authURL)
    .then(res => res.json())
    .then(data => {
      const {hubFindrToken} = data;
      localStorage.setItem('hubFindrToken', hubFindrToken)
      transitionElement.classList.remove('is-active');
    })
} else {
  setTimeout(() => {
    transitionElement.classList.remove('is-active');
  }, 400);
}