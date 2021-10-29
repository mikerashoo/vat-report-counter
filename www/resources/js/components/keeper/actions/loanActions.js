import {UNPAID_LOAN_ACTIONS} from '../constants/loanActions';

export const fetchUnpaidLoansAction = () => ({
    type: UNPAID_LOAN_ACTIONS.FETCH_UNPAID_LOANS_ACTION, 
});

export const showUnpaidLoansAction = (loans) => ({
    type: UNPAID_LOAN_ACTIONS.SHOW_UNPAID_LOANS_ACTION,
    loans
});

export const showUnpaidLoansErrorAction = (error) => ({
    type: UNPAID_LOAN_ACTIONS.SHOW_UNPAID_LOANS_ERROR_ACTION,
    error
});

export const saveLoanPaymentAction = (payment) => ({
    type: UNPAID_LOAN_ACTIONS.SAVE_LOAN_PAYMENT_ACTION,
    payment
});

export const addLoanPaymentAction = (payment) => ({
    type: UNPAID_LOAN_ACTIONS.ADD_LOAN_PAYMENT_ACTION,
    payment
});

export const fetchLoanPaymentsAction = (user_id) => ({
    type: UNPAID_LOAN_ACTIONS.FETCH_LOAN_PAYMENTS_ACTION,
    user_id
});

export const showLoanPaymentsAction = (payments) => ({
    type: UNPAID_LOAN_ACTIONS.SHOW_LOAN_PAYMENTS_ACTION,
    payments
});
