import {createStore} from 'redux';

const reducers = (state, action) => {

    if (action.type === "SIGNIN") {
        return {
            user: action.user
        }
    } 
    if (action.type === "SIGNOUT") {
        return {
            ...state,
            user: null
        }
    }
    if (action.type === "SET_ACTIVE_TAB") {
        return {
            ...state,
            activeTab: action.id,
        }
    }
    if (action.type === "SET_TITLE") {
        return {
            ...state,
            headerTitle: action.card
        }
    }

    return state
}

export default createStore(reducers,{
    user: null,
    activeTab: null,
    headerTitle: 'BIENVENIDO',
})