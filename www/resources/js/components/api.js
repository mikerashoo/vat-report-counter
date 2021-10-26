import axios from 'axios'
import { ITEM_API_URLS } from './constants/apiConstants';

export const fetchItems = async () => {
    const call = await axios.get(ITEM_API_URLS.FETCH_ITEMS_URL);
    let response = await call.data;
    return response;
}

export const fetchItemsFromLastReportApi = async () => {
    const call = await axios.get(ITEM_API_URLS.ITEMS_FROM_LAST_REPORT_URL);
    let response = await call.data;
    return response;
}

export const saveItemApi = async (item) => {
    const call = await axios.post(ITEM_API_URLS.SAVE_ITEM_URL, item);
    const response = await call.data;
    return response;
}

export const getStartingDateApi = async () => {
    const call = await axios.get(ITEM_API_URLS.LAST_STARTING_DATE_URL);
    const response = await call.data;
    return response;
}

export const saveTransactionApi = async (transaction) => {
    const call = await axios.post(ITEM_API_URLS.SAVE_TRANSACTION_URL, transaction);
    const response = await call.data;
    console.log("api response", response);
    return response;
}
