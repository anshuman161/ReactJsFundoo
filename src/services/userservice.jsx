import axios from 'axios'
const config = {
  headers: {
    'Content-Type': 'application/json',
  }
};


const baseURL = process.env.REACT_APP_Base_URL
console.log("token", baseURL);
export  function doRegistration(data) {
      console.log(data);
      return  axios.post(baseURL+'/goRegister', data, config);
}
export function doLogIn(data) {
      console.log(data);
      return  axios.post(baseURL+'/goLogin', data, config);
}
export function doforgetPassword(data) {
  
    console.log('inside forget password servie' + data);
    return  axios.post(baseURL+'/forgetPassword' , data, config);
}

export function doResetPassword(data, token) {
  console.log('inside service token' + token.token);
  return axios.post(baseURL+'/reset',data ,{headers:{'token':token.token}});
}

