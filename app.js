const transitionElement = document.querySelector("#transition");

import { createQueryString, fieldsEnum, directionEnum } from "./js/gql.js";
import { config } from './js/settings.js';
import {timeAgo} from './js/utils.js';

const searchParams = new URLSearchParams(window.location.search)
const username = searchParams.get('username');
const amount = searchParams.has('amount')? searchParams.get('amount') : 20;
const field = searchParams.has('field')? searchParams.get('field'): 'UPDATED_AT';
const direction = searchParams.has('direction') ? searchParams.get('direction') : 'DESC';
const noOfTopics = searchParams.has('topics') ? searchParams.get('topics'): 5;

const query = createQueryString(username, amount, field, direction, noOfTopics)

document.addEventListener('DOMContentLoaded', (e) => {
  console.log(window.location);
  setTimeout(() => {
    transitionElement.classList.remove('is-active')
  }, 400);
})


const navSearchInput = document.querySelector('#nav-search-input');
navSearchInput.addEventListener('keyup', e => {
  if(e.key == "Enter"){
    console.log(navSearchInput.value);
    transitionElement.classList.add('is-active');
    console.log(window.location);
    window.location = `profile.html?username=${navSearchInput.value || "null"}`;
  }
})

document.addEventListener('keyup', e => {
  if(e.key == "/" && !e.ctrlKey && !e.altKey && !(document.activeElement === navSearchInput)){
    navSearchInput.focus();
    // navSearchInput.parentElement.style.width="350px"
    console.log({activeElement : document.activeElement, input: navSearchInput});
  }
})

if(window.location.pathname == `/profile.html` || window.location.pathname == `/hubFindr/profile.html`){

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

  fetch(config.apiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', "Authorization" : `bearer ${token}` },
    body: query,
  })
  .then(res => res.json())
  .then( (data) => {
    console.log(data)
    const {data: {user}} = data;
    if(!user){
      // Render Error Page
      console.log({user});
      window.location = `404.html`;
      return;
    }
    console.log({user});
    const ui = new UI();
    ui.showProfile(user);
    ui.showRepos(user, field, timeAgo, fieldsEnum,).then(() => {
      setTimeout(() => {
        transitionElement.classList.remove('is-active')
        const section = document.querySelector('.profile-username');
        const topBarProfile = document.querySelector('.top-bar-profile');
        const options = {
          rootMargin: "-80px"
        };
        const observer = new IntersectionObserver(function(entries, observer){

          entries.forEach(entry => {
            if(!entry.isIntersecting){
              topBarProfile.classList.add('show');
              console.log(topBarProfile.querySelector('#top-bar-profile-avatar'));
            } else {
              topBarProfile.classList.remove('show');
            }
            console.log(entry);
          })
        }, options)
        observer.observe(section);
      }, 400);
    })
  });
}