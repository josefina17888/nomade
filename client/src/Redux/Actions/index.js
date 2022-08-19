const axios = require('axios');

export function postHost(payload) {
    return async function () {
        try {
            const response = await axios.post('/api/host', payload)
            return response

        } catch (error) {
            console.log(error)
        }
    }
}