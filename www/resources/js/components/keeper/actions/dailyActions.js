import { DAILY_ACTIONS } from "../constants/dailyActions";

export const fetchDailyTransactionsAction = date => ({
    type: DAILY_ACTIONS.FETCH_DAILY_SELL_TRANSACTIONS, 
    date
});

export const showDailyTransactionsAction = item_transactions => ({
    type: DAILY_ACTIONS.SHOW_DAILY_SELL_TRANSACTIONS,
    item_transactions
}); 

export const fetchDailySellsAction = date => ({
    type: DAILY_ACTIONS.FETCH_DAILY_SELLS, 
    date
});

export const showDailySellsAction = sells => ({
    type: DAILY_ACTIONS.SHOW_DAILY_SELLS,
    sells
}); 

export const deleteDailySellAction = id => ({
    type: DAILY_ACTIONS.DELETE_SELL_ACTION, 
    id
});

export const removeSellAction = id => ({
    type: DAILY_ACTIONS.REMOVE_SELL_ACTION,
    id
}); 

export const showDailyTransactionsErrorAction = error => ({
    type: DAILY_ACTIONS.SHOW_DAILY_SELL_TRANSACTIONS_ERROR,
    error
}); 