const axios = require('axios');

(async () => {

    const result = await axios({
        url: 'http://localhost:4000/graphql',
        method: 'POST',
        data: {
            query: `
            query ExampleQuery {
                all {
                  first_name
                  last_name
                  role {
                    wage
                    realWage
                    boss {
                      email
                      phone
                    }
                  }
                }
                }
                
            `
        }
    }).then((result) => {
        console.log(result.data)
    })
})()