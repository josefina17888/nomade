const axios = require('axios');

export function postHost(payload) {
    return async function () {
        try {
            const response = await axios.post('http://localhost:3001/api/host', payload)
            console.log(payload)
            return response

        } catch (error) {
            console.log(error)
        }
    }
}