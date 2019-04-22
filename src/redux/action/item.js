export const ITEM_ACTION_TYPE = {
    LOAD_ITEMS: "LOAD_ITEMS",
    LOAD_ITEMS_SUCCESSFULLY: "LOAD_ITEMS_SUCCESSFULLY",
    LOAD_ITEMS_FAILED: "LOAD_ITEMS_FAILED",
    UPDATE_ITEM: "UPDATE_ITEM",
    UPDATE_ITEM_SUCCESSFULLY: "UPDATE_ITEM_SUCCESSFULLY"
}


export const loadItemAction = () => ({
    type: ITEM_ACTION_TYPE.LOAD_ITEMS
});

export const loadItemSuccessfullyAction = data => ({
    type: ITEM_ACTION_TYPE.LOAD_ITEMS_SUCCESSFULLY,
    payload: {
        data
    }
});

export const loadItemFailedAction = data => ({
    type: ITEM_ACTION_TYPE.LOAD_ITEMS_FAILED,
    payload: {
        data
    }
});

export const updateItemAction = items => ({
    type: ITEM_ACTION_TYPE.UPDATE_ITEM,
    payload: {
        items
    }
});

export const updateItemSuccessfullyAction = data => ({
    type: ITEM_ACTION_TYPE.UPDATE_ITEM_SUCCESSFULLY,
    payload: {
        data
    }
});
