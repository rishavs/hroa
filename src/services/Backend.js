const Backend = {
    register_user: async (uname, pass) => {
        const payload = {
            "username": uname,
            "password": pass
          }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        try {
            const response = await fetch(`http://localhost:3000/api/users/`, options)
            const json = await response.json();
            console.log(json)
            return json
        } catch (err) {
            console.log('Error getting documents', err)
        }
    },
    login: async (uname, pass) => {
        const payload = {
            "username": uname,
            "password": pass
          }
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        };
        try {
            const response = await fetch(`http://localhost:3000/api/auth/`, options)
            const json = await response.json();
            console.log(json)
            return json
        } catch (err) {
            console.log('Error getting documents', err)
        }
    },
    get_auth_token: async (uname, pass) => {
   
    },
    set_auth_token: async() => {

    },
    logout: async () => {

    }

}

export default Backend;