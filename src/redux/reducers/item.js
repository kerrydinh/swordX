import { ITEM_ACTION_TYPE } from '../action/item';
import cloneDeep from 'lodash/cloneDeep';

const initialState = {
    listItems: [],
    currentUpdatingItems: []
}

export default function(state = initialState, action) {
    switch(action.type) {

        case ITEM_ACTION_TYPE.LOAD_ITEMS_SUCCESSFULLY: {
            return {
                ...state,
                listItems: action.payload
            };
        }

        case ITEM_ACTION_TYPE.UPDATE_ITEM: {
            const updatingItems = action.payload.items;
            const listItems = cloneDeep(state.listItems);
            const updatingIds = updatingItems.map(item => item.index);
            updatingItems.forEach((updatingItem) => {
                const i = listItems.findIndex(item => item === updatingItem.index);
                if (i  > -1) {
                    listItems[i].budget = updatingItem.budget;
                }
            });
            return {
                ...state,
                listItems: listItems,
                currentUpdatingItems: updatingIds
            };
        }


        case ITEM_ACTION_TYPE.UPDATE_ITEM_SUCCESSFULLY: {
            return {
                ...state,
                currentUpdatingItems: []
            };
        }


        default:
            return state;
    }
}