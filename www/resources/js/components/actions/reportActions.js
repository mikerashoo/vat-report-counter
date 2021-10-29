import {REPORT_ACTION_CONSTANTS} from '../constants/reportConstants'

export const fetchReportsAction = () => ({
    type: REPORT_ACTION_CONSTANTS.FETCH_REPORTS_ACTION,
});

export const fetchReportsSuccessAction = (reports) => ({
    type: REPORT_ACTION_CONSTANTS.FETCH_REPORTS_SUCCESS_ACTION,
    reports
});

export const fetchReportsErrorAction = (error) => ({
    type: REPORT_ACTION_CONSTANTS.FETCH_REPORTS_ERROR_ACTION,
    error
});


export const saveReportAction = (report) => ({
    type: REPORT_ACTION_CONSTANTS.SAVE_REPORT_ACTION,
    report
});

export const saveReportSuccessAction = (report) => ({
    type: REPORT_ACTION_CONSTANTS.SAVE_REPORT_SUCCESS_ACTION,
    report
});

export const saveReportErrorAction = (error) => ({
    type: REPORT_ACTION_CONSTANTS.SAVE_REPORT_ERROR_ACTION,
    error
});

export const fetchReportDetailAction = (id) => ({
  type: REPORT_ACTION_CONSTANTS.FETCH_REPORT_DETAIL_ACTION,
  id
});

export const fetchReportDetailSuccessAction = (report) => ({
  type: REPORT_ACTION_CONSTANTS.FETCH_REPORT_DETAIL_SUCCESS_ACTION,
  report
});

export const fetchReportDetailErrorAction = (error) => ({
  type: REPORT_ACTION_CONSTANTS.FETCH_REPORT_DETAIL_ERROR_ACTION,
  error
});

