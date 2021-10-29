import axios from "axios";
import { REPORT_API_URLS } from "../constants/apiConstants";

export const saveReportApi = async (report) => {
    const call = await axios.post(REPORT_API_URLS.SAVE_REPORT_URL, report);
    const response = await call.data;
    return response;
}

export const fetchReportsApi = async () => {
    const call = await axios.get(REPORT_API_URLS.FETCH_REPORTS_URL);
    const response = await call.data;
    return response;
}

export const fetchReportDetailApi = async (report_id) => {
    const call = await axios.get(REPORT_API_URLS.FETCH_REPORT_DETAIL_URL + report_id);
    const response = await call.data;
    return response;
}
