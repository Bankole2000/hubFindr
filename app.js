// Get Elements
const transitionElement = document.querySelector("#transition");
const navSearchInput = document.querySelector('#nav-search-input');


// Import / Declare Classes/Functions/Objects to be used
import { createQueryString, fieldsEnum } from "./js/gql.js";
import { config } from './js/settings.js';
import {timeAgo} from './js/utils.js';
import UI from "./js/UI.js";

const toggleMenu = () => {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Get Query params from URL
const searchParams = new URLSearchParams(window.location.search)
const username = searchParams.get('username');
const amount = searchParams.has('amount')? searchParams.get('amount') : 20;
const field = searchParams.has('field')? searchParams.get('field'): 'UPDATED_AT';
const direction = searchParams.has('direction') ? searchParams.get('direction') : 'DESC';
const noOfTopics = searchParams.has('topics') ? searchParams.get('topics'): 5;

// Create GQL query
const query = createQueryString(username, amount, field, direction, noOfTopics)

// EventListeners
// Submit Nav Input on enter key
navSearchInput.addEventListener('keyup', e => {
  if(e.key == "Enter"){
    transitionElement.classList.add('is-active');
    window.location = `profile.html?username=${navSearchInput.value || "null"}`;
  }
  if(e.key == "Escape"){
    e.target.blur()
  }
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
  }
  // Query API
  fetch(config.apiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', "Authorization" : `bearer ${token}` },
    body: query,
  })
  .then(res => res.json())
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
      }, 400);
    })
  });
}
