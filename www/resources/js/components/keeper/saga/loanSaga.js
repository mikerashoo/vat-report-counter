import {put, call, all, takeLatest} from 'redux-saga/effects';   
import { addLoanPaymentAction, showUnpaidLoansAction, showUnpaidLoansErrorAction, showLoanPaymentsAction } from "../actions/loanActions";
import { fetchUnpaidLoansApi, saveLoanPaymentApi, fetchLoanPaymentsApi } from '../apis/loanApi';
import { UNPAID_LOAN_ACTIONS } from '../constants/loanActions';

function* fetchUnpaidLoansSaga(){
    try {  
        const loansData = yield call(fetchUnpaidLoansApi); 
        yield put (showUnpaidLoansAction(loansData));
    }
    catch (error) {
        yield put (showUnpaidLoansErrorAction('Problem with fetching unpaid loans. please try again!'))
    }
}   
 
function* saveLoanPaymentSaga(action){
    try {  
        const loansData = yield call(saveLoanPaymentApi, action.payment); 
        yield put (addLoanPaymentAction(loansData));
    }
    catch (error) {
        yield put (showUnpaidLoansErrorAction('Problem with saving unpaid loans. please try again!'))
    }
}

function* fetchLoanPaymentsSaga(action){
    try {  
        const paymentsData = yield call(fetchLoanPaymentsApi, action.user_id);  
        yield put (showLoanPaymentsAction(paymentsData));
    }
    catch (error) {
        yield put (showUnpaidLoansErrorAction('Problem with saving unpaid loans. please try again!'))
    }
}

function* loanSaga(){
    yield all([
      yield takeLatest(UNPAID_LOAN_ACTIONS.FETCH_UNPAID_LOANS_ACTION, fetchUnpaidLoansSaga),  
      yield takeLatest(UNPAID_LOAN_ACTIONS.SAVE_LOAN_PAYMENT_ACTION, saveLoanPaymentSaga),  
      yield takeLatest(UNPAID_LOAN_ACTIONS.FETCH_LOAN_PAYMENTS_ACTION, fetchLoanPaymentsSaga),  
    ]) 
  } 
  export default loanSaga;