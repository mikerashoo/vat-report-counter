import { STOCK_ACTIONS } from "../constants/stockActions";
import { message } from "antd";
const INITIAL_STATE = {  
    loading: false,
    error: null,
    message: null,
    is_loan_modal_visible: false,
    data: {
        categories: [],
        transactions: [],
        customers: [],
        loan: null
    }, 
}

const MESSAGE_ID = "MESSAGE_ID";
export const stockReducers = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case STOCK_ACTIONS.FETCH_STOCK_ACTION:
        return {
            ...state, 
            loading: true 
        }
        
        case STOCK_ACTIONS.SHOW_STOCK_DETAIL_ACTION:  
        return {
            ...state, 
            loading: false,
            data: {...state.data, 
                categories: action.categories 
            }
        }
        
        case STOCK_ACTIONS.FETCH_TRANSACTIONS_ACTION:
        return {
            ...state, 
            loading: true 
        }
        
        case STOCK_ACTIONS.SHOW_TRANSACTIONS_ACTION:  
        return {
            ...state, 
            loading: false,
            data: {
                ...state.data, 
                transactions: action.transactions 
            }
        }
        
        case STOCK_ACTIONS.SHOW_STOCK_ERROR_ACTION: 
        return {
            ...state, 
            loading: false,
            error: action.error
        }   
        
        case STOCK_ACTIONS.SAVE_NEW_TRANSACTION_ACTION: 
        return {
            ...state, 
            loading: true, 
        }   
        
        case STOCK_ACTIONS.ADD_NEW_TRANSACTION_ACTION: 
        let transactions = state.data.transactions;
        transactions.push(action.transaction); 
        message.success('ዕቃው ተመርጣል፡፡');
        return {
            ...state, 
            loading: false, 
            data: {
                ...state.data,
                transactions
            }
        }   
        
        case STOCK_ACTIONS.CHANGE_TRANSACTION_ACTION: 
        let trans = action.transaction;
        let _transactions = state.data.transactions.map((transaction, i) => trans.item.id == transaction.item.id ? {...trans} : {...transaction})
        
        return {
            ...state,
            data: {
                ...state.data,
                transactions: _transactions
            }
        }
        
        case STOCK_ACTIONS.REMOVE_TRANSACTION_ACTION:  
        transactions = state.data.transactions.filter((transaction, i) => (transaction.item.id != action.transaction.item.id));             
        return {
            ...state,
            data: {
                ...state.data,
                transactions
            }
        }
        
        case STOCK_ACTIONS.ADD_NEW_SELL_ACTION:  
        message.loading({content: 'በመመዝገብ ላይ... እባኮ ትንሽ ይታገሱ!', key: MESSAGE_ID});
        return {
            ...state,
            data: {
                ...state.data, 
                loading: true,
            }
        }
        
        case STOCK_ACTIONS.CLEAR_TRANSACTIONS_ACTION:   
        message.success({content: 'ሽያጩ በትክክል ተመዝግብዋል!', key: MESSAGE_ID, duration: 3});

        return {
            ...state,
            is_loan_modal_visible: false,
            data: {
                ...state.data,
                transactions: [],
                loading: false,
                loan: null,
            }
        }
        
        case STOCK_ACTIONS.ADD_NEW_LOAN_ACTION:   
        let loan = action.loan;  
        return {
            ...state, 
            is_loan_modal_visible: false ,
            data: {
                ...state.data,
                loan
            }
        }
        
        case STOCK_ACTIONS.CLEAR_LOAN_ACTION:   
        return {
            ...state, 
            is_loan_modal_visible: false,
            data: {
                ...state.data,
                loan: null
            }
        }
        
        case STOCK_ACTIONS.SHOW_LOAN_MODAL_ACTION:  
        return {
            ...state,
            is_loan_modal_visible: true
        }
        
        case STOCK_ACTIONS.HIDE_LOAN_MODAL_ACTION:  
        return {
            ...state,
            is_loan_modal_visible: false
        }
        case STOCK_ACTIONS.FETCH_CUSTOMERS_ACTION: 
        return {
            ...state, 
            loading: true 
        }
        case STOCK_ACTIONS.SHOW_CUSTOMERS_ACTION:    
        return {
            ...state, 
            loading: false,
            data: {
                ...state.data,
                customers: action.customers
            }
        }
        
        default: return state;
    }
}