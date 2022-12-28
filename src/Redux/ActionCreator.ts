import * as Types from './Types';
import * as ActionTypes from './ActionTypes';
import Content from '../Assets/Content.json';


export const emailValidation = (email:string) => (dispatch:any) => {
    fetch("https://fakestoreapi.com/users")
    .then(response => response.json())
    .then(response => {
        const validation = response.find(( user:Types.IUserProps)=>{
            if(user.email===email){
                return true;
            }
            })
        dispatch(setEmailState(validation===undefined?false:true, email))
        validation===undefined?
            dispatch(errUser("No podemos encontrar una cuenta con esta dirección de email. Por favor reintenta ingresar con tu correo y contraseña")):
            dispatch(setValidationState("found email"))
            

    })
    .catch(err => {
        dispatch(errUser(err));
    });
}

export const passwordValidation = ({email ,password}:any) => (dispatch:any) => {
    
    fetch("https://fakestoreapi.com/users")
    .then(response => response.json())
    .then(response => {
        const user = response.find(( user:Types.IUserProps)=>{return (user.email === email)})
        if(user === undefined){
            dispatch(setValidationState("email not found"))
            throw "No podemos encontrar una cuenta con esta dirección de email. Por favor reintenta ingresar con tu correo y contraseña"
        }
        if (user.password === password){
            let newUser = {
                email: user.email,
                password: user.password,
                username: user.username
            }
            dispatch(setUser(newUser))
            dispatch(setValidationState("validated user"))
        }
        else{
            dispatch(setValidationState("wrong password"))
            dispatch(errUser("Contraseña incorrecta, porfavor intentelo de nuevo."))
        }

    })
    .catch(err => {
        dispatch(errUser(err));
    });
}

export const setEmail = (email:string) => {
    return {
        type: ActionTypes.SET_EMAIL,
        payload: email
    }
}

export const setEmailState = (result:boolean, email:string) => {
    const action={
        type: ActionTypes.SET_EMAILSTATE,
        payload: {result: result, email: email}
     }
    return action
}

export const setValidationState = (state:string) => {
    const action={
        type: ActionTypes.SET_VALIDATIONSTATE,
        payload: state
     }
    return action
}

export const errUser = (err:string):any =>{
    const action={
        type: ActionTypes.ERR_USER,
        payload: err
     }
    return action
} 

export const setUser = (user:any) => {
    const action={
        type: ActionTypes.SET_USER,
        payload: user
     }
    return action
}

export const logoutUser = () => {
    const action={
        type: ActionTypes.LOGOUT_USER,
        payload: null
     }
    return action
}

export const logout = () => (dispatch:any) => {
    dispatch(logoutUser())
    //dispatch(cleanCart())
}

export const gatherCarouselContent = (categories: Array<string>, page: string) => (dispatch:any) => {
    let carousels:any = []
    const content:any = Content;
    categories.map((category)=>{
        console.log(category)
        let contents = content[page][category].info.map((item:any)=>{
            return(
                {
                    id:item.id,
                    imgLink:item.imgLink,
                    topImgLink:item.topImgLink,
                    compatibility: item.compatibility,
                    clasification: item.clasification,
                    seasons: item.seasons,
                    keywords: item.keywords,
                    trailer: item.trailer,
                }
            )    
        })

        carousels.push({
            category: category,
            isTop: content[page][category].isTop,
            content: contents
        })    
    })
        


    dispatch(setCarousels(carousels))
}

export const setCarousels = (carousels:any) => {
    return(
        {
            type: ActionTypes.SET_CAROUSELS,
            payload: carousels
        }
    )
}

export const gatherPlayInfo = (id:number, category:string, page:string) => (dispatch:any) => {
    const content:any = Content;
    let video:any;
    if(category!=="mainMedia"){
        video = content[page][category].info.find((item:any)=>item.id===id)
    }
    else{
        video = content[page][category].info
    }

    dispatch(setPlayInfo({
        id:video.id,
        title:video.title,
        imgLink:video.imgLink,
        trailer:video.trailer
    }))

}

export const setPlayInfo = (playInfo:any) => {
    return({
        type:ActionTypes.SET_PLAYINFO,
        payload: playInfo
    })
}

export const setLoadState = (newcontent_state:any) => {
    return(
    {
        type:ActionTypes.SETLOAD_STATE,
        payload: newcontent_state
    }
    )
}

export const gatherDescription = (id:number, category:string, page:string) => (dispatch:any) => {
    const content:any = Content;
    let content_info:any;
    if(category!=="mainMedia"){
        content_info = content[page][category].info.find((item:any)=>item.id===id)
    }
    else{
        content_info = content[page][category].info
    }
    dispatch(setDescription({
        id:content_info.id,
        title:content_info.title,
        imgLink:content_info.imgLink,
        imgTitle:content_info.imgTitle,
        description:content_info.description,
        clasification:content_info.clasification,
        compatibility: content_info.compatibility,
        year:content_info.year,
        seasons: content_info.seasons,
        cast: content_info.cast,
        genres:content_info.genres,
        mainGenre: content_info.mainGenre,
        authors:content_info.authors,
        trailer: content_info.trailer,
        category:category
    }))
}

export const setDescription = (content_info:any) => {
    return({
        type: ActionTypes.SET_DESCRIPTION,
        payload: content_info
    }
    )
}

export const getFavorites = (favorites:Array<{category:string, page:string, id:string}>) => (dispatch:any) => {
    const content:any = Content;
    
    console.log(favorites)

    let favorites_cont:any = []
    favorites.map((item)=>{
        
        let favorite = content[item.page][item.category].info[item.id]
        favorites_cont.push({
            id:favorite.id,
            imgLink:favorite.imgLink,
            compatibility: favorite.compatibility,
            clasification: favorite.clasification,
            seasons: favorite.seasons,
            keywords: favorite.keywords,
            trailer: favorite.trailer,
            category: item.category,
            page: item.page,
        })
    })

    dispatch(setFavorites(favorites_cont))
    
}

export const setFavorites = (favorites:any) => {

    return(
        {
            type:ActionTypes.SET_FAVORITES,
            payload:favorites
        }
    )
}

export const addToFavorites = (id:number, page:string, category:string ) => {
    return(
        {
            type: ActionTypes.ADDTO_FAVORITES,
            payload: {
                id:id,
                page:page,
                category:category
            }
        }
    )
}
