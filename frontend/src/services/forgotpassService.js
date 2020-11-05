import axios from 'axios';
const baseUrl = 'http://localhost:3001/reset'

const resetUrl = 'http://localhost:3001/reset/new-password'

const forgotPass = async email => {
    const resp = await axios.post(baseUrl, email)
    return resp.data;
}

const resetPass = async newpass => {
   const resp = await axios.post(resetUrl, newpass)
   return resp.data; 
}

export default { forgotPass, resetPass }