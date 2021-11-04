import {ItemActionConstants} from '../constants/itemActionConstants'
export const fetchItemsFromLastReportAction = () => ({
    type: ItemActionConstants.FETCH_ITEMS_FROM_LAST_REPORT_ACTION
});

export const showItemsAction = (items) => ({
    type: ItemActionConstants.SHOW_ITEMS_ACTION,
    items
});

export const showItemsFetchingErrorAction = (error) => ({
    type: ItemActionConstants.SHOW_ITEMS_FETCHIN_ERROR_ACTION,
    error
});

export const saveItemAction = (item) => ({
    type: ItemActionConstants.SAVE_ITEMS_ACTION,
    item
});

export const addItemAction = (item) => ({
    type: ItemActionConstants.ADD_ITEMS_ACTION,
    item
});

export const saveItemErrorAction = (error) => ({
    type: ItemActionConstants.SAVE_ITEM_ERROR_ACTION,
    error
});

export const getStartingDateAction = () => ({
    type: ItemActionConstants.FETCH_STARTING_DATE_FROM_LAST_REPORT
});

export const setStartingDateAction = (starting_date) => ({
    type: ItemActionConstants.SET_STARTING_DATE_FROM_LAST_REPORT,
    starting_date
});

export const saveTransactionAction = (transaction) => ({
    type: ItemActionConstants.SAVE_ITEM_TRANSACTIONS_ACTION,
    transaction
});

export const saveTransactionSuccessAction = () => ({
    type: ItemActionConstants.SAVE_ITEM_TRANSACTIONS_SUCCESS_ACTION
});

export const saveTransactionErrorAction = (error) => ({
    type: ItemActionConstants.SAVE_ITEM_TRANSACTIONS_ERROR_ACTION,
    error
});

export const showNewItemModalAction = () => ({
    type: ItemActionConstants.SHOW_NEW_ITEM_MODAL_ACTION
});

export const hideNewItemModalAction = () => ({
  type: ItemActionConstants.HIDE_NEW_ITEM_MODAL_ACTION,
});

export const showItemSellAction = (item) => ({
  type: ItemActionConstants.SHOW_ITEM_SELL_ACTION,
  item
});

export const hideItemSellAction = () => ({
  type: ItemActionConstants.HIDE_ITEM_SELL_ACTION
});

export const showItemPurchaseAction = () => ({
  type: ItemActionConstants.SHOW_ITEM_PURCHASE_ACTION,
});

export const hideItemPurchaseAction = () => ({
  type: ItemActionConstants.HIDE_ITEM_PURCHASE_ACTION
});





