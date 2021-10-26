import { FETCH_USERS_URL, SAVE_NEW_USER } from "../constants/api";
import axios from 'axios'; 
export const fetchUsersApi = async () => {   
  const call = await axios.get(FETCH_USERS_URL); 
  let response = await call.data; 
  return await response;
}

export const saveNewUserApi = async (user) => {   
  const call = await axios.post(SAVE_NEW_USER, user); 
  let response = await call.data;  
  return await response;
}
