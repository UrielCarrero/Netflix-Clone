import { PayloadAction } from '@reduxjs/toolkit';
import * as Types from '../Types';
import * as ActionTypes from '../ActionTypes';
import { Action } from '@remix-run/router';

const initialContentState = {
    content_state:{
        carousels:"not loaded",
        watch:"not loaded",
        modal:"not loaded",
        mainContent:"not loaded",
        favorites:"not loaded"
    }
}

export const Content = (state = initialContentState, action:PayloadAction<any>):Types.IContentState => {
    switch(action.type){

        case ActionTypes.SET_DESCRIPTION:
            return {...state, content_state:{...state.content_state, modal:"loaded"}, modalMovie: action.payload}

        case ActionTypes.SETLOAD_STATE:
            if(action.payload.modal==="not loaded")
            {
                return {...state, content_state: action.payload, modalMovie: undefined}
            }
            return {...state, content_state: action.payload}

        case ActionTypes.SET_PLAYINFO:
            return {...state, content_state:{...state.content_state, watch:"loaded"}, playInfo: action.payload}

        case ActionTypes.SET_FAVORITES:
            return {...state, content_state:{...state.content_state, favorites:"loaded"}, favorites:action.payload}

        case ActionTypes.SET_CAROUSELS:

            return {...state, content_state:{...state.content_state, carousels:"loaded"}, Carrousels: action.payload}

        default:
            return state
    }
}