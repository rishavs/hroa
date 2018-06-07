const Backend = {
    register_user: async (email, name, pass) => {
        const payload = {
            "email": email,
            "name": name,
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
            const response = await fetch(`http://localhost:3000/api/users/`, options)
            const json = await response.json();
            console.log(json)
        } catch (err) {
            console.log('Error getting documents', err)
        }
    },
    get_auth_token: async (uname, pass) => {
        const payload = {
            "strategy": "local",
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
            const response = await fetch(`http://localhost:3030/api/sensors/`, options)
        } catch (err) {
            console.log('Error getting documents', err)
        }

    
    }

}

export default Backend;