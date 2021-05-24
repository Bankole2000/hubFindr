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
  CREATED_AT : 'created at', 
  UPDATED_AT : 'last updated',
  PUSHED_AT: 'pushed at',
  NAME: 'name',
  STARGAZERS: 'stargazers'
}

export const directionEnum = {
  ASC: 'ascending order', 
  DESC: 'descending order',
}