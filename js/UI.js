export default class UI {
  constructor() {
    this.profile = document.querySelector('#profile');
    this.repos = document.querySelector('#repos');
    this.repoPill = document.querySelector('#repositories-count');
    this.topBarProfile = document.querySelector('.top-bar-profile');
    this.mobileProfile = document.querySelector('#mobile-profile');
  }

  async showProfile(user){
    this.mobileProfile.innerHTML = `
    <div style="display: flex; padding: 16px; align-items: center;">
    <div style="display: flex; align-items: center;  color: var(--theme-grey);">
      <div style="flex: 2; margin-right: 16px; display: flex; align-items: center;">

        <img src="${user.avatarUrl}" alt="${user.login}" style="border-radius: 50%;" width="100%"/>
      </div>
      <div style="flex: 10">
        <p style="font-size: 26px; line-height: 32px; font-weight: 600; display: ${user.name ? 'block' : 'none'}">${user.name}</p>
        <p style="font-size: 20px; line-height: 24px; font-weight: 300;">${user.login}</p>
      </div>
    </div>
  </div>
  <div style="padding: 0 16px; border-bottom: 1px solid var(--border-grey)">
    <div style="display: flex; padding: 4px 8px; border: 1px solid var(--border-grey); border-radius: 10px;">
      <p><span>${user.status?.emojiHTML ? user.status.emojiHTML : '💭'}</span><span>&nbsp; ${user.status?.message ? user.status.message : ''}</span></p>
    </div>
    <p style="margin-top: 10px">${user.bio ? user.bio : ''}</p>
    <a href="https://github.com/${user.login}?tab=repositories" target="_blank" rel="noreferrer" style="width: 100%; border: 1px solid var(--border-grey); padding: 5px; display: block; text-align: center; margin: 10px 0px; border-radius: 5px; color: var(--text-black)">Follow</a>
    <p class="profile-contact-item" style="display: ${user.company ? 'block': 'none'}">
      <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
        <use xlink:href="#company-icon" />
      </svg>
    ${user.company}</p>
    <p class="profile-contact-item" style="display: ${user.location ? 'block': 'none'}">
      <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
        <use xlink:href="#location-icon" />
      </svg>
    ${user.location}</p>
    <p class="profile-contact-item" style="display: ${user.email ? 'block': 'none'}">
      <a href="mailto:${user.email}">
      <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
        <use xlink:href="#email-icon" />
      </svg>
    ${user.email}</a></p>
    <p class="profile-contact-item" style="display: ${user.websiteUrl ? 'block': 'none'}">
    <a href="${user.websiteUrl}" target="_blank" rel="noreferrer">
      <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
        <use xlink:href="#website-icon" />
      </svg>
    ${user.websiteUrl}</a></p>
    <p class="profile-contact-item" style="display: ${user.twitterUsername ? 'block': 'none'}">
    <a href="https://twitter.com/${user.twitterUsername}" target="_blank" rel="noreferrer">
      <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
        <use xlink:href="#twitter-icon" />
      </svg>
    ${user.twitterUsername}</a></p>
    <div style="margin-bottom: 16px; display: flex; align-items: center; justify-content: flex-start; font-size: 13px; flex-wrap: wrap;">
      <span style="display: flex; align-items: center;">
        <a class="following" href="https://github.com/${user.login}?tab=followers" target="_blank" rel="noreferrer" style="display: flex; align-items: center;">
          <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
            <use xlink:href="#followers-icon" />
          </svg>
          <span style="font-weight: 500;">${user.followers.totalCount > 1000 ? (user.followers.totalCount/1000).toFixed(1) + 'k' : user.followers.totalCount}&nbsp;</span> 
          followers &nbsp; 
        </a> &middot; &nbsp;
      </span>
      <span style="display: flex; align-items: center;">
        <a class="following" href="https://github.com/${user.login}?tab=following" target="_blank" rel="noreferrer">
          <span style="font-weight: 500;">${user.following.totalCount > 1000 ? (user.following.totalCount/1000).toFixed(1)+'k' : user.following.totalCount}</span> 
          following &nbsp;
        </a>&middot;
      </span>
      <span style="display: flex; align-items: center;">
        <a class="following" href="https://github.com/${user.login}?tab=stars" target="_blank" rel="noreferrer" style="display: flex; align-items: center;">
          <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
            <use xlink:href="#star-empty-icon" />
          </svg>
          <span style="font-weight: 500;">${user.starredRepositories.totalCount}</span>
        </a>
      </span>
    </div>
  </div>
    `
    
    this.profile.innerHTML = `
    <div class="profile-image lg-only">
    <div class="user-image">
      <img src="${user.avatarUrl}" alt="${user.login}" class="avatar">
      <div class="user-status" style="display: ${user.status? 'inline-block': 'none'}">
        <div class="user-status-details"><span class="status-emoji">${user.status?.emojiHTML ? user.status.emojiHTML : '💭'}</span><span class="status-text">${user.status?.message ? user.status.message : ''}</span></div>
      </div>
    </div>
  </div>
  <div class="profile-bio lg-only" >
    <h1 class="profile-name" id="profile-name">${user.name ? user.name : ''}</h1>
    <h2 class="profile-username">${user.login}</h2>
    <p class="profile-short-bio">${user.bio ? user.bio : ''}</p>
    <a href="https://github.com/${user.login}?tab=repositories" target="_blank" rel="noreferrer"><button class="btn btn-small btn-block"><p style="font-size: 15px; line-height: 30px">Follow</p></button></a>
    <div style="margin-bottom: 16px; display: flex; align-items: center; justify-content: flex-start; font-size: 13px; flex-wrap: wrap;">
      <span style="display: flex; align-items: center;">
        <a class="following" href="https://github.com/${user.login}?tab=followers" target="_blank" rel="noreferrer" style="display: flex; align-items: center;">
          <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
            <use xlink:href="#followers-icon" />
          </svg>
          <span style="font-weight: 500;">${user.followers.totalCount > 1000 ? (user.followers.totalCount/1000).toFixed(1) + 'k' : user.followers.totalCount}&nbsp;</span> 
          followers &nbsp; 
        </a> &middot; &nbsp;
      </span>
      <span style="display: flex; align-items: center;">
        <a class="following" href="https://github.com/${user.login}?tab=following" target="_blank" rel="noreferrer">
          <span style="font-weight: 500;">${user.following.totalCount > 1000 ? (user.following.totalCount/1000).toFixed(1) + 'k' : user.following.totalCount}</span> 
          following &nbsp;
        </a>&middot;
      </span>
      <span style="display: flex; align-items: center;">
        <a class="following" href="https://github.com/${user.login}?tab=stars" target="_blank" rel="noreferrer" style="display: flex; align-items: center;">
          <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
            <use xlink:href="#star-empty-icon" />
          </svg>
          <span style="font-weight: 500;">${user.starredRepositories.totalCount}</span>
        </a>
      </span>
    </div>
    
    <p class="profile-contact-item" style="display: ${user.company ? 'block': 'none'}">
    <a>  
    <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
        <use xlink:href="#company-icon" />
      </svg>
    ${user.company}</a></p>
    <p class="profile-contact-item" style="display: ${user.location ? 'block': 'none'}">
    <a>  
    <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
        <use xlink:href="#location-icon" />
      </svg>
    ${user.location}</a></p>
    <p class="profile-contact-item" style="display: ${user.email ? 'block': 'none'}">
      <a href="mailto:${user.email}">
      <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
        <use xlink:href="#email-icon" />
      </svg>
    ${user.email}</a></p>
    <p class="profile-contact-item" style="display: ${user.websiteUrl ? 'block': 'none'}">
    <a href="${user.websiteUrl}" target="_blank" rel="noreferrer">
      <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
        <use xlink:href="#website-icon" />
      </svg>
    ${user.websiteUrl}</a></p>
    <p class="profile-contact-item" style="display: ${user.twitterUsername ? 'block': 'none'}">
    <a href="https://twitter.com/${user.twitterUsername}" target="_blank" rel="noreferrer">
      <svg class="profile-icon" viewBox="0 0 16 16" height="16" width="16">
        <use xlink:href="#twitter-icon" />
      </svg>
    ${user.twitterUsername}</a></p>
    
  </div>
    `
   document.querySelector('#nav-avatar').setAttribute('src', user.avatarUrl)
   const topBarAvatar = this.topBarProfile.querySelector('#top-bar-profile-avatar');
   const topBarLink = this.topBarProfile.querySelector('#top-bar-profile-link');
   const topBarName = this.topBarProfile.querySelector('#top-bar-profile-name');
   topBarAvatar.setAttribute('src', user.avatarUrl);
   topBarLink.setAttribute('href', `https://github.com/${user.login}?tab=repositories`);
   topBarLink.setAttribute('target', `_blank`);
   topBarLink.setAttribute('rel', `noreferrer`);
   topBarName.textContent = user.login
  }

  async showRepos(user, field, timeAgo, fieldsObject){
    const {repositories: {nodes}} = user;
    
    this.repos.innerHTML = `
    <div class="main-item">
      <input class="info" style="width: 100%;" type="text" placeholder="Find a repository...">
    </div>
    
    `
    if(nodes.length){
      this.repoPill.innerHTML = nodes.length;
      this.repos.innerHTML += `<div class="main-item">
        <p><strong>${nodes.length}</strong> result${nodes.length > 1 ? 's' : ''} of <strong>public repositories</strong> sorted by <strong>${fieldsObject[field]}</strong></p>
    </div>`
    
    nodes.forEach(repo => {
      const {repositoryTopics: {nodes: topics}, stargazerCount, forkCount, licenseInfo, primaryLanguage, updatedAt} = repo;
      const agoInEnglish = timeAgo(updatedAt);
      
      const renderLanguageHTML = () => {
        if(repo.primaryLanguage){
          return `
          <span class="repo-info-item">
            <span class="repo-language-color" style="background-color: ${repo.primaryLanguage?.color}"></span>
            <span>${repo.primaryLanguage.name}</span>
          </span>
          `;
        }
        return "";
      }
      const renderLicenseHTML = () => {  
        if(licenseInfo){
          return `<span class="repo-info-item">
          <svg class="repo-info-icon">
            <use xlink:href="#mit-license-icon" />
          </svg>
          <span>${licenseInfo.name}</span>
        </span>`
        }
        return '';
      }
      const topicsHTML = () => {
        let html = '';
        if(topics.length){
          topics.forEach(topic => {
            html += `<div class="tag-topic"><a href="${topic.url}" target="_blank" rel="noreferrer">${topic.topic.name}</a></div>`
          })
        }
        return html;
      }
      const renderStargazerHTML = () => {
        if(stargazerCount){
          return `<a href="${repo.url}/stargazers" target="_blank" rel="noreferrer" class="repo-info-item link-item">
          <svg class="repo-info-icon">
            <use xlink:href="#star-empty-icon" />
          </svg>   
          <span>${stargazerCount}</span>
        </a>`
        }
        return '';
      }
      const renderForkHTML = () => {
        if(forkCount){
          return `<a href="${repo.url}/network/members" target="_blank" rel="noreferrer" class="repo-info-item link-item">
          <svg class="repo-info-icon">
            <use xlink:href="#fork-icon" />
          </svg>   
          <span>${forkCount}</span>
        </a>`
        }
        return '';
      }
      this.repos.innerHTML += `
      <div class="repo-item">
      <div class="repo-item-details">
        <h1 class="repo-title"><a href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a></h1>
        <p class="repo-desc">${repo.shortDescriptionHTML}</p>
        <div class="repo-tags">
          ${topicsHTML()}
        </div>
        <div class="repo-info">
        
          ${renderLanguageHTML()}
          ${renderStargazerHTML()}
          ${renderForkHTML()}
          ${renderLicenseHTML()}
          
          <span class="repo-info-item">
            <span>Updated ${agoInEnglish}</span>
          </span>
        </div>
      </div>
      <a href="${repo.url}" target="_blank" rel="noreferrer" class="repo-item-button">
        <button class="btn btn-small" style="display: flex; align-items: center; justify-content: space-evenly;">
          <svg class="btn-icon btn-icon-left">
            <use xlink:href="#star-filled-icon" />
          </svg>
          Star
        </button>
      </a>
    </div>
      `
    });
  } 
  
  else {
    this.repoPill.style.display = "none";
    this.repos.innerHTML += `
    <div style=" padding: 32px; font-size: 23px; font-weight: 600; margin-top: 32px; text-align: center;">
      <p>${user.login} doesn't have any public repositories yet</p>
    </div>
    `
  }
  }

  toggleMenu(){
    document.querySelector("#mobile-dropdown").classList.toggle("dropdown-show");
  }

  showSettingsModal(){
    document.querySelector('#settings-modal').style.display = "block"
  }
  
  hideSettingsModal(){
    document.querySelector('#settings-modal').style.display = "none"
  }
}