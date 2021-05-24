export const timeAgo = (datelike) => {
  const scale = ['year', 'month', 'day', 'hour', 'minute']
  const timeReference = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  const currentTime = Date.now()
  const updatedAt = Date.parse(new Date(datelike));
  const timeDiffInSecs = Math.floor((currentTime - updatedAt) / 1000);
  
  let timeScale = '', timeValue, agoInEnglish = '', timeDateOnly, timeFullDate;

  for (let i = 0; i < scale.length; i++) {
    const measure = scale[i];
    if(Math.floor(timeDiffInSecs / timeReference[measure]) >= 1){
      timeScale = measure;
      timeValue =  Math.floor(timeDiffInSecs / timeReference[measure]);      
      break
    }
  }
  
  timeFullDate = new Date(datelike).toLocaleString(['en-US'], {
    month: 'short', 
    day: '2-digit', 
    year: 'numeric'
  })

  timeDateOnly = new Date(datelike).toLocaleString(['en-US'], {
    month: 'short', 
    day: '2-digit',
  })

  switch (timeScale) {
    case "year":
      agoInEnglish = `on ${timeValue > 1 ? timeFullDate : timeDateOnly}`
      break;
    case "month":
      agoInEnglish = `${timeValue > 1 ? 'on ' + timeDateOnly : 'about a month ago'}`
      break;
    case "day":
      agoInEnglish = `${timeValue} day${timeValue > 1 ? 's': ''} ago`
      break;
    case "hour":
      agoInEnglish = `${timeValue} hour${timeValue > 1 ? 's': ''} ago`
      break;
    case "minute":
      agoInEnglish = `${timeValue} minute${timeValue > 1 ? 's': ''} ago`
      break;
    default:
      agoInEnglish = `a few seconds ago`
      break;
  }
  
  return agoInEnglish;
}