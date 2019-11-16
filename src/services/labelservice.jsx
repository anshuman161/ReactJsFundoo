import axios from 'axios';
const baseURL = process.env.REACT_APP_Base_URL

const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

export  function getLables(token) {
   console.log('user' ,localStorage.getItem('token'));
    return axios.get(baseURL + '/labels/fetchalllabel',{ headers:{'token':token}}
    )
}
export  function addLables(data) {
  console.log('user' ,localStorage.getItem('token'));
   return axios.post(baseURL + '/labels/addlables',data,{ headers:{'token':localStorage.getItem('token')}}
   )
}
export  function deleteLabel(labelId) {
  console.log('user delete labels' ,localStorage.getItem('token'));
  console.log('user labelId ',labelId)
   return axios.delete(baseURL + '/labels/deleteLabels?labelId='+labelId, { headers:{'token':localStorage.getItem('token')}}
   )
}
export  function editLabel(labelId ,data) {
  console.log('user edit labels' ,localStorage.getItem('token'));
  console.log('user data ',data)
   return axios.put(baseURL + '/labels/editLabels?labelId='+labelId , data, { headers:{'token':localStorage.getItem('token')}}
   )
}
export  function addLabelOnNotes(labelId,noteId) {
  console.log('user labels assign to note' ,localStorage.getItem('token'));
  console.log('noteId----', noteId)
  console.log('label----', labelId)
   return axios.put(baseURL + '/labels/addNotesLables?labelId='+labelId+'&noteId='+noteId ,null, { headers:{'token':localStorage.getItem('token')}}
   )
}
export  function deleteLabelOnNotes(labelId,noteId) {
  console.log('user labels assign to note' ,localStorage.getItem('token'));
  console.log('noteId----', noteId)
  console.log('label----', labelId)
   return axios.delete(baseURL + '/labels/deleteNotesLables?labelId='+labelId+'&noteId='+noteId , { headers:{'token':localStorage.getItem('token')}}
   )
}
