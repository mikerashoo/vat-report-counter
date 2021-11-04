import { message } from 'antd';
import {ItemActionConstants} from '../constants/itemActionConstants'

const INITIAL_STATE = {
    items: {
        data: [],
        loading: false,
        error: null
    },
    new_item: {
        data: null,
        loading: false,
        error: false
    },
    new_transaction: {
        transaction: null,
        loading: false,
        error: false,
        is_success: false
    },
    table_title: "ከመጨርሻው ረፖርት ጀምሮ",
    starting_date: "",
    is_new_item_modal_visible: false,
    is_item_sell_modal_visible: false,
    is_purchase_information_modal_visible: false,
    selected_item: null
};

const ItemReducers = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ItemActionConstants.FETCH_ITEMS_FROM_LAST_REPORT_ACTION:
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: true,
                    error: null
                },
                new_item: {
                    ...state.new_item
                },
                is_new_item_modal_visible: false,
                is_item_sell_modal_visible: false,
                selected_item: null
            }

        case ItemActionConstants.SHOW_ITEMS_ACTION:
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: false,
                    data: action.items,
                    error: null
                }
            }

        case ItemActionConstants.SHOW_ITEMS_FETCHIN_ERROR_ACTION:
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: false,
                    error: action.error,
                }
            }

        case ItemActionConstants.SAVE_ITEMS_ACTION:
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: true
                },
                new_item: {
                    ...state.new_item,
                    loading: true,
                    error: false
                }
            }

        case ItemActionConstants.SAVE_ITEM_ERROR_ACTION:
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: false
                },
                new_item: {
                    ...state.new_item,
                    loading: false,
                    error: true
                }
            }

        case ItemActionConstants.ADD_ITEMS_ACTION:

            let items = [...state.items.data];
            items.push(action.item);
            message.success({content: 'እቃው በትክክል ተመዝግቧል፡፡', key: "MESSAGE_KEY"});
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: false,
                    data: items
                },
                new_item: {
                    ...state.new_item,
                    loading: false,
                    error: false
                },
                is_new_item_modal_visible: false
            }

        case ItemActionConstants.SET_STARTING_DATE_FROM_LAST_REPORT:
            return {
                ...state,
                starting_date: action.starting_date
            }

        case ItemActionConstants.SAVE_ITEM_TRANSACTIONS_ACTION:
            return {
                ...state,
                new_transaction: {
                    ...state.new_transaction,
                    loading: true,
                    is_success: false
                },
                is_item_sell_modal_visible: false,
                selected_item: null
            }

        case ItemActionConstants.SAVE_ITEM_TRANSACTIONS_SUCCESS_ACTION:
            return {
                ...state,
                new_transaction: {
                    ...state.new_transaction,
                    loading: false,
                    error: false,
                    is_success: true
                },
                selected_item: null,
                is_item_sell_modal_visible: false,
                is_new_item_modal_visible: false,
                is_purchase_information_modal_visible: false,
            }

        case ItemActionConstants.SAVE_ITEM_TRANSACTIONS_ERROR_ACTION:
            message.error({content: 'መረጃው በትክክል አልተመዘገበም', key: 'save_item_message'});
            return {
                ...state,
                new_transaction: {
                    ...state.new_transaction,
                    loading: false,
                    error: action.error,
                    is_success: false
                }
            }

        case ItemActionConstants.SHOW_NEW_ITEM_MODAL_ACTION:
            return {
                ...state,
                is_new_item_modal_visible: true
            }

        case ItemActionConstants.HIDE_NEW_ITEM_MODAL_ACTION:
            return {
                ...state,
                is_new_item_modal_visible: false
            }


        case ItemActionConstants.SHOW_ITEM_SELL_ACTION:
            return {
                ...state,
                is_item_sell_modal_visible: true,
                selected_item: action.item
            }

        case ItemActionConstants.HIDE_ITEM_SELL_ACTION:
            return {
                ...state,
                is_item_sell_modal_visible: false,
                selected_item: null
            }

        case ItemActionConstants.SHOW_ITEM_PURCHASE_ACTION:
            return {
                ...state,
                is_purchase_information_modal_visible: true,
                selected_item: action.item
            }

        case ItemActionConstants.HIDE_ITEM_PURCHASE_ACTION:
            return {
                ...state,
                is_purchase_information_modal_visible: false,
                selected_item: null
            }



        default:
            return state;
    }
}

export default ItemReducers;
