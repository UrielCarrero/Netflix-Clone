import { PayloadAction } from '@reduxjs/toolkit';
import * as Types from '../Types';
import * as ActionTypes from '../ActionTypes';

const initialUserState = {
    active:false,
    registered_email: false,
    user: {
        email:"",
        username:"",
        password:"",
    },
    errMess: "",
    validationProcess:"not started",
    favorites: [
        {
        page: "Inicio",
        category:"Tendencias", 
        id: 3
    },
    {
        page: "Inicio",
        category:"Tendencias", 
        id: 2
    },
    {
        page: "Inicio",
        category:"Tendencias", 
        id: 1
    },
    {
        page: "Inicio",
        category:"Tendencias", 
        id: 4
    },
    {
        page: "Inicio",
        category:"Tendencias", 
        id: 5
    }

    ]
}

export const User = (state = initialUserState  , action:PayloadAction<any>):Types.IUserState => {

    switch(action.type){

        case ActionTypes.SET_USER:
            return {...state, user:action.payload, active:true, errMess:""}
            
        case ActionTypes.SET_EMAIL:
            return {...state, user:{email:action.payload , username:"", password:""}}

        case ActionTypes.SET_EMAILSTATE:

            return {...state, registered_email:action.payload.result, user:{...state.user, email:action.payload.email}}
        case ActionTypes.ADDTO_FAVORITES:
            let copyFavorites = <any>[]
            let item:any
            if(state.favorites.length!==0){
                for(item of state.favorites){
                    copyFavorites.push({
                        id: item.id,
                        page: item.page,
                        category: item.category,
                    }) 
                }
    
                copyFavorites.push(action.payload)
            }
            else{
                copyFavorites[0]={...action.payload}
            }
            
            

            return {...state, favorites:copyFavorites}
        case ActionTypes.REMOVE_FAVORITE:
            copyFavorites = []
 
            for(item of state.favorites){
                copyFavorites.push({
                    id: item.id,
                    price: item.price,
                    image: item.image,
                    title: item.title,
                    page: item.page
                }) 
            }
            
            let selectedItem = copyFavorites.filter((product:any) => {
                return (product.title === action.payload.title)})[0]
            let index = copyFavorites.indexOf(selectedItem)

            copyFavorites.splice(index,1);

            return {...state, favorites:copyFavorites}

        case ActionTypes.SET_VALIDATIONSTATE:

            if(action.payload==="found email" || action.payload==="validated user")
            {
                return {...state, validationProcess:action.payload, errMess:""}
            }
            return {...state, validationProcess:action.payload}

        case ActionTypes.LOGOUT_USER:
                return {...state, ...initialUserState}
        case ActionTypes.ERR_USER:
            return {...state, errMess:action.payload}
        default:
            return state
    }

}