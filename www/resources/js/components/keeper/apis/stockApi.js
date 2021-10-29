import { FETCH_CUSTOMERS_URL, FETCH_STOCK_ITEMS_URL, FETCH_TRANSACTIONS_URL, SAVE_NEW_SELL_URL } from "../constants/api";
import axios from 'axios'; 

export const fetchStocksApi = async () => {   
  const call = await axios.get(FETCH_STOCK_ITEMS_URL); 
  let response = await call.data;  
  return await response;
} 
 
export const fetchTransactionsApi = async () => {   
  const call = await axios.get(FETCH_TRANSACTIONS_URL); 
  let response = await call.data;  
  return await response;
} 
 
export const saveNewSellApi = async (sell) => {  
  const call = await axios.post(SAVE_NEW_SELL_URL, sell); 
  let response = await call.data;  
  return await response;
} 
 
  
export const fetchCustomersApi = async () => {   
  const call = await axios.get(FETCH_CUSTOMERS_URL); 
  let response = await call.data;  
  return await response;
} 