import axios from 'axios';
const baseURL = process.env.REACT_APP_Base_URL
const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

const headers = {'Content-Type': 'application/json', 
                      'token': localStorage.getItem('token')} ;


export  function addCollabarator(data) {
    
   console.log('inside addcollaboratar service=======',data)
    return axios.post(baseURL + '/notes/addcollaborator?noteId='+data.noteId+'&email='+data.email, data, {headers: {'token' :  localStorage.getItem('token')}}
    )
}

export  function getCollabarator(noteId) {
  console.log('get collaboratar service=======',noteId)
  return axios.get(baseURL + '/notes/getcollaborator?noteId='+noteId, {headers: {'token' :  localStorage.getItem('token')}}
    )
}