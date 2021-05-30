export const createQueryString = (username, amount, field, direction, topics) => {
  return JSON.stringify({
    query: `query userRepos($username: String!, $amount: Int, $field: RepositoryOrderField!, $direction: OrderDirection!, $topics: Int){ 
      user(login: $username) { 
        login
        avatarUrl
        followers {
          totalCount
        }
        following {
          totalCount
        }
        starredRepositories{
          totalCount
        }
        company
        location
        email
        twitterUsername
        bio
        name
        websiteUrl
        status{
          emojiHTML
          emoji
          message
        }
        organizations(first: 5){
          nodes{
            avatarUrl
            name
            login
          }
        }
        sponsorshipsAsSponsor(first: 5){
          nodes{
            isOneTimePayment
          }
        }
        repositories(first: $amount, orderBy: {field: $field, direction:$direction}){
          nodes{
            name
            primaryLanguage{
              color
              name
            }
            url
            repositoryTopics(first: $topics){
              nodes {
                topic{
                  name
                }, 
                url
              }
            }
            stargazerCount
            forkCount
            licenseInfo {
              name
            }
            updatedAt
            shortDescriptionHTML
            description
          }
        }
      }
    }`, 
    variables: `{
      "username": "${username}", 
      "amount":${amount}, 
      "field": "${field}", 
      "direction": "${direction}", 
      "topics": ${topics}
    }`,
  })
}

export const fieldsEnum = {
  CREATED_AT : 'last created', 
  UPDATED_AT : 'last updated',
  PUSHED_AT: 'last pushed to',
  NAME: 'name',
  STARGAZERS: 'no of stars'
}

export const directionEnum = {
  ASC: 'ascending order', 
  DESC: 'descending order',
}