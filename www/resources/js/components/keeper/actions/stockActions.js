import { STOCK_ACTIONS } from "../constants/stockActions";

export const fetchStocksAction = () => ({
    type: STOCK_ACTIONS.FETCH_STOCK_ACTION, 
});

export const showStocksAction = categories => ({
    type: STOCK_ACTIONS.SHOW_STOCK_DETAIL_ACTION,
    categories
});

export const fetchTransactionsAction = () => ({
    type: STOCK_ACTIONS.FETCH_TRANSACTIONS_ACTION, 
});

export const showTransactionsAction = transactions => ({
    type: STOCK_ACTIONS.SHOW_TRANSACTIONS_ACTION,
    transactions
});

export const showStocksError = (error) => ({
    type: STOCK_ACTIONS.SHOW_STOCK_ERROR_ACTION,
    error
});  
export const saveNewTransactionAction = (transaction) => ({
    type: STOCK_ACTIONS.SAVE_NEW_TRANSACTION_ACTION,
    transaction
});  

export const addNewTransactionAction = (transaction) => ({
    type: STOCK_ACTIONS.ADD_NEW_TRANSACTION_ACTION,
    transaction
});  
export const changeTransactionAction = (transaction) => ({
    type: STOCK_ACTIONS.CHANGE_TRANSACTION_ACTION,
    transaction
});  
export const removeTransactionAction = (transaction) => ({
    type: STOCK_ACTIONS.REMOVE_TRANSACTION_ACTION,
    transaction
});  

export const saveNewSellAction = (sell) => ({
    type: STOCK_ACTIONS.ADD_NEW_SELL_ACTION, 
    sell
});  
export const clearTransactionsAction = () => ({
    type: STOCK_ACTIONS.CLEAR_TRANSACTIONS_ACTION, 
});  

export const showLoanModalAction = () => ({
    type: STOCK_ACTIONS.SHOW_LOAN_MODAL_ACTION,  
});  

export const hideLoanModalAction = () => ({
    type: STOCK_ACTIONS.HIDE_LOAN_MODAL_ACTION, 
});  

export const addNewLoanAction = (loan) => ({
    type: STOCK_ACTIONS.ADD_NEW_LOAN_ACTION, 
    loan
});  
export const clearLoanAction = () => ({
    type: STOCK_ACTIONS.CLEAR_LOAN_ACTION, 
});  

export const fetchCustomersAction = () => ({
    type: STOCK_ACTIONS.FETCH_CUSTOMERS_ACTION,
})

export const showCustomersAction = (customers) => ({
    type: STOCK_ACTIONS.SHOW_CUSTOMERS_ACTION,
    customers
})