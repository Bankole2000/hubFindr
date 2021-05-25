// Initialize dynamic query fields (gql variables)
let amount = 20, field = 'UPDATED_AT', direction = 'DESC', noOfTopics = 9;

// Get Page elements
const searchButton = document.querySelector('#home-search');
const searchInput = document.querySelector("#home-search-input");
const mobileSearchInput = document.querySelector('#mobile-search-input');
const mobileSearchButton = document.querySelector('#mobile-search-button');
const navSearchInput = document.querySelector('#nav-search-input');
const transitionElement = document.querySelector("#transition");

// Allow user to reload page if any connection error
document.querySelector('#connect-retry').addEventListener('click',(e) =>{
  window.location.reload()
})

// Basic Page UI Functions
const toggleMenu = () => {
  document.querySelector("#mobile-dropdown").classList.toggle("dropdown-show");
}

const showSettingsModal = () => {
  document.querySelector('#settings-modal').style.display = "block"
}

const hideSettingsModal = () => {
  document.querySelector('#settings-modal').style.display = "none"
}

const visitLink = (link) => {
  window.open(link, '_blank');
}

// Settings Functions
const setDirection = (e) => {
  direction = e.value;
}

const setField = (e) => {
  field = e.value
}

const setAmount = (e) => {
  amount = Number(e.value) > 0 && Number(e.value) <= 20 ?  Number(e.value): 20;
}

const setNoOfTopics = (e) => {
  noOfTopics = Number(e.value) > 0 && Number(e.value) <= 9 ?  Number(e.value): 9;
}

// Add Event listeners
searchButton.addEventListener("click", e => {
  e.preventDefault();
  const {value: username} = searchInput;
  transitionElement.classList.add('is-active');
  window.location = `profile.html?username=${username || "null"}&amount=${amount}&field=${field}&direction=${direction}&noOfTopics=${noOfTopics}`;
})

mobileSearchButton.addEventListener("click", e => {
  e.preventDefault();
  const {value: username} = mobileSearchInput;
    transitionElement.classList.add('is-active');
    window.location = `profile.html?username=${username|| "null"}&amount=${amount}&field=${field}&direction=${direction}&noOfTopics=${noOfTopics}`;
})

navSearchInput.addEventListener('keyup', e => { 
  if(e.key == "Enter"){
    transitionElement.classList.add('is-active');
    window.location = `profile.html?username=${navSearchInput.value || "null"}&amount=${amount}&field=${field}&direction=${direction}&noOfTopics=${noOfTopics}`;
  }
  if(e.key == "Escape"){
    e.target.blur()
  }
})

searchInput.addEventListener('keyup', e => { 
  if(e.key == "Enter"){
    transitionElement.classList.add('is-active');
    window.location = `profile.html?username=${searchInput.value || "null"}&amount=${amount}&field=${field}&direction=${direction}&noOfTopics=${noOfTopics}`;
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

// Authenticate app
let token = localStorage.getItem('hubFindrToken')
if(!token){
  fetch('https://cribba-api.herokuapp.com/')
    .then(res => res.json())
    .then(data => {
      const {hubFindrToken} = data;
      localStorage.setItem('hubFindrToken', hubFindrToken)
      transitionElement.classList.remove('is-active');
    })
    .catch(err => {
      console.log({err});
      document.querySelector('#connect-error').style.display = "block";
    })
} else {
  setTimeout(() => {
    transitionElement.classList.remove('is-active');
  }, 400);
}