import axios from 'axios';

const baseURL = process.env.REACT_APP_Base_URL
const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
export  function getNotes(token) {
   console.log('user' ,localStorage.getItem('token'));
    return axios.get(baseURL + '/notes/fetchallnotes',{ headers:{'token':token}}
    )
}

export  function saveNotes(data) {
  console.log(data);
  return  axios.post(baseURL+'/notes/creation', data, { headers:{'token':localStorage.getItem('token')}});
}
export  function updateNote(noteId, note) {
  console.log('user update notes' ,noteId);
  console.log('user data ',note)
   return axios.put(baseURL + '/notes/updation/'+noteId, note, { headers:{'token':localStorage.getItem('token')}}
   )
}
export  function colorNote(color,noteId) {
  console.log('user token notes' ,localStorage.getItem('token'));
  console.log('user noteId ',noteId)
  console.log('color noteId ',color)
   return axios.put(baseURL + '/notes/color/'+noteId+'?color='+color,null,{ headers:{'token':localStorage.getItem('token')}}
   )
}
export  function archiveTrue(noteId) {
  console.log('user token notes' ,localStorage.getItem('token'));
  console.log('user noteId ',noteId)
   return axios.get(baseURL + '/notes/changearchivetrue/'+noteId, { headers:{'token':localStorage.getItem('token')}}
   )
}
export  function archivefalse(noteId) {
  console.log('user token notes' ,localStorage.getItem('token'));
  console.log('user noteId ',noteId)
   return axios.get(baseURL + '/notes/changearchivefalse/'+noteId, { headers:{'token':localStorage.getItem('token')}}
   )
}
export  function isTrashTrue(noteId) {
  console.log('user token notes' ,localStorage.getItem('token'));
  console.log('user noteId ',noteId)
   return axios.get(baseURL + '/notes/changetrashtrue/'+noteId, { headers:{'token':localStorage.getItem('token')}}
   )
}
export  function isTrashfalse(noteId) {
  console.log('user token notes' ,localStorage.getItem('token'));
  console.log('user noteId ',noteId)
   return axios.get(baseURL + '/notes/changetrashfalse/'+noteId, { headers:{'token':localStorage.getItem('token')}}
   )
}
export  function deleteNote(noteId) {
  console.log('user token notes' ,localStorage.getItem('token'));
  console.log('user noteId ',noteId)
   return axios.delete(baseURL + '/notes/deletion/'+noteId, { headers:{'token':localStorage.getItem('token')}}
   )
}
export  function archiveNote(token) {
  console.log('user token ',token)
   return axios.get(baseURL + '/notes/fetcharchivenote', { headers:{'token':token}}
   )
}
export  function fetchTrashNote(token) {
  console.log('user token ',token)
   return axios.get(baseURL + '/notes/fetchnotestobin', { headers:{'token':token}}
   )
}
export  function addReminder(noteId,data) {
  console.log('remainder user' ,localStorage.getItem('token'));
  console.log(' reminder noteid :  ',noteId);
  console.log('remainder date: ',data);
  var date = new Date(data.remindme);
  let datetime=date.toISOString();
  console.log('date time :',datetime);
return axios.put(baseURL+'/notes/reminder?noteId='+noteId+'&reminderDate='+datetime,null,{headers: {'token' :  localStorage.getItem('token')}}
  )
}
export  function getReminderNotes(token) {
  console.log('user' ,localStorage.getItem('token'));
   return axios.get(baseURL + '/notes/getreminder',{ headers:{'token':token}}
   )
}
export  function deleteReminderNotes(noteId) {
  console.log('user' ,localStorage.getItem('token'));
   return axios.delete(baseURL + '/notes/deleteRemainder?noteId='+noteId,{headers: {'token' :  localStorage.getItem('token')}}
   )
}
export  function deletecollabarednote(noteId, email) {
  
  return axios.post(baseURL + '/notes/deletenoteonuser?noteId=' + noteId+'&email='+email, null,{headers: {'token' :  localStorage.getItem('token')}}
  )
}
