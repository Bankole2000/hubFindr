export const config = {
  darkMode: false, 
  apiURL: `https://api.github.com/graphql`, 
  authURL: `https://cribba-api.herokuapp.com/`, 
  appSettings: {
    amount: 20, 
    field: 'UPDATED_AT', 
    direction: 'DESC',
    topics: 5
  }
}