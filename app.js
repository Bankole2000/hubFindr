// Get Elements
const transitionElement = document.querySelector("#transition");
const navSearchInput = document.querySelector('#nav-search-input');
const mobileSearchInput = document.querySelector('#mobile-search-input');
const mobileSearchButton = document.querySelector('#mobile-search-button');
const settingsAmountInput = document.querySelector('#amount')
const settingsFieldInput = document.querySelector('#field')
const settingsDirectionInput = document.querySelector('#direction')
const settingsNoOfTopicsInput = document.querySelector('#noOfTopics')


// Import / Declare Classes/Functions/Objects to be used
import { createQueryString, fieldsEnum } from "./js/gql.js";
import { config } from './js/settings.js';
import {timeAgo} from './js/utils.js';
import UI from "./js/UI.js";

// Initialize / Get Query params from URL 
const searchParams = new URLSearchParams(window.location.search)
const username = searchParams.get('username');
let amount = searchParams.has('amount')? searchParams.get('amount') : 20;
let field = searchParams.has('field')? searchParams.get('field'): 'UPDATED_AT';
let direction = searchParams.has('direction') ? searchParams.get('direction') : 'DESC';
let noOfTopics = searchParams.has('topics') ? searchParams.get('topics'): 5;

// Prefill Settings modal values
settingsAmountInput.value = amount; 
settingsDirectionInput.value = direction;
settingsFieldInput.value = field; 
settingsNoOfTopicsInput.value = noOfTopics;

// Create GQL query
const query = createQueryString(username, amount, field, direction, noOfTopics)

// EventListeners
// Allow user to reload page if any connection error
document.querySelector('#connect-retry').addEventListener('click',(e) =>{
  window.location.reload()
})

// Settings Inputs event listeners
settingsAmountInput.addEventListener('input', e => {
  amount = Number(e.target.value) > 0 && Number(e.target.value) <= 20 ?  Number(e.target.value) : 20;
})
settingsFieldInput.addEventListener('change', e => {
  field = e.target.value;
})
settingsDirectionInput.addEventListener('change', e => {
  direction = e.target.value;
})
settingsNoOfTopicsInput.addEventListener('input', e => {
  noOfTopics = Number(e.target.value) > 0 && Number(e.target.value) <= 9 ?  Number(e.target.value): 9;
})

// Submit Nav Input on enter key
navSearchInput.addEventListener('keyup', e => {
  if(e.key == "Enter"){
    transitionElement.classList.add('is-active');
    window.location = `profile.html?username=${navSearchInput.value || "null"}&amount=${amount}&field=${field}&direction=${direction}&noOfTopics=${noOfTopics}`;
  }
  if(e.key == "Escape"){
    e.target.blur()
  }
})

mobileSearchButton.addEventListener("click", e => {
  e.preventDefault();
  const {value: username} = mobileSearchInput;
    transitionElement.classList.add('is-active');
    window.location = `profile.html?username=${username|| "null"}&amount=${amount}&field=${field}&direction=${direction}&noOfTopics=${noOfTopics}`;
})

// Focus on nav input on / key
document.addEventListener('keyup', e => {
  if(e.key == "/" && !e.ctrlKey && !e.altKey && !(document.activeElement === navSearchInput)){
    navSearchInput.focus();
  }
})

// Make sure current page is profile page
if(window.location.pathname == `/profile.html` || window.location.pathname == `/hubFindr/profile.html`){
  // Fetch token if not in local storage
  let token = localStorage.getItem('hubFindrToken')
  if(!token){
    fetch(config.authURL)
      .then(res => res.json())
      .then(data => {
        const {hubFindrToken} = data;
        localStorage.setItem('hubFindrToken', hubFindrToken)
        token = hubFindrToken
      })
      .catch((err) => {
        console.log({err});
        document.querySelector('#connect-error').style.display = "block";
      })
  }
  // Query API
  fetch(config.apiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', "Authorization" : `bearer ${token}` },
    body: query,
  })
  .then(res =>  res.json())
  .then( (data) => {
    const {data: {user}} = data;
    if(!user){
      // If no user redirect to 404 Page
      window.location = `404.html`;
      return;
    }
    // instantiate new UI object
    const ui = new UI();
    
    // Output/Render user profile
    ui.showProfile(user); 
    
    // Output/Render user repos
    ui.showRepos(user, field, timeAgo, fieldsEnum,).then(() => {
      document.title = `${user.login}'s Profile | HubFindr`;
      
      // Mount Menu & Settings toggle Event listeners 
      document.querySelector('#menu-toggle').addEventListener('click', ui.toggleMenu)
      document.querySelectorAll('.show-settings-modal').forEach((el) => {
        el.addEventListener('click', ui.showSettingsModal)
      })
      document.querySelector('#hide-settings-modal').addEventListener('click', ui.hideSettingsModal)
      document.querySelector('#hide-settings-button').addEventListener('click', ui.hideSettingsModal)
      
      // Finally present Profile
      setTimeout(() => {
        // Remove transition element
        transitionElement.classList.remove('is-active')

        // Set Intersection observer (for sticky bar profile on scroll)
        const targetSection = document.querySelector('.profile-username');
        const topBarProfile = document.querySelector('.top-bar-profile');
        const options = {
          rootMargin: "-80px"
        };
        const observer = new IntersectionObserver(function(entries){
          entries.forEach(entry => {
            if(!entry.isIntersecting){
              topBarProfile.classList.add('show');
            } else {
              topBarProfile.classList.remove('show');
            }
          })
        }, options)
        observer.observe(targetSection);
      }, 200);
    })
  })
  .catch((err) => {
    console.log({err});
    document.querySelector('#connect-error').style.display = "block";
  })
}
