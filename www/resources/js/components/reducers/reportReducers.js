import { message } from 'antd';
import {REPORT_ACTION_CONSTANTS} from '../constants/reportConstants';

const INITIAL_STATE = {
        data: [],
        loading: false,
        error: false,
        is_save_successful: false,
        selected: null,
}

const reporReducers = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case REPORT_ACTION_CONSTANTS.FETCH_REPORTS_ACTION:
            return {
                ...state,
                    loading: true,
                    error: false
            }

        case REPORT_ACTION_CONSTANTS.FETCH_REPORTS_SUCCESS_ACTION:
            return {
                ...state,
                    data: action.reports,
                    loading: false,
                    error: false
            }

        case REPORT_ACTION_CONSTANTS.FETCH_REPORTS_ERROR_ACTION:
            return {
                ...state,
                    ...state.reports,
                    loading: false,
                    error: action.error
            }
        case REPORT_ACTION_CONSTANTS.SAVE_REPORT_ACTION:
            return {
                ...state,
                    ...state.reports,
                    loading: true,
                    error: false ,
                is_save_successful: false
            }

        case REPORT_ACTION_CONSTANTS.SAVE_REPORT_SUCCESS_ACTION:
            return {
                ...state,
                    ...state.reports,
                    loading: false,
                    error: false,
                    is_save_successful: true
            }
        case REPORT_ACTION_CONSTANTS.SAVE_REPORT_ERROR_ACTION:
            return {
                ...state,
                    ...state.reports,
                    loading: false,
                    error: action.error,
                is_save_successful: false
            }

        case REPORT_ACTION_CONSTANTS.FETCH_REPORT_DETAIL_ACTION:
            return {
                ...state,
                loading: true
            }
        case REPORT_ACTION_CONSTANTS.FETCH_REPORT_DETAIL_SUCCESS_ACTION:
            return {
                ...state,
                loading: false,
                selected: action.report
            }
        case REPORT_ACTION_CONSTANTS.FETCH_REPORT_DETAIL_ERROR_ACTION:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default: return state;
    }
}

export default reporReducers;
