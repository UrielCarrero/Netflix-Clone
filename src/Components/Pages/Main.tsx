import React, {useLayoutEffect, useRef, useState, useEffect} from 'react'
import {Route, Routes, Navigate, BrowserRouter, useParams} from 'react-router-dom';

import {Colombia} from './Colombia'
import { Login } from './Login';
import { Browse } from './Browse';
import { Series } from './Series';
import { Lastest } from './Lastest';
import { Watch } from './Watch';
import { SignIn } from './SignIn';
import { MyList } from './MyList';
import { RootState, AppDispatch } from '../../Redux/store/ConfigureStore';
import { emailValidation , passwordValidation, logout, gatherCarouselContent,
    gatherPlayInfo, setLoadState, gatherDescription, setEmail, getFavorites, addToFavorites} from '../../Redux/ActionCreator';
import { connect } from 'react-redux';


import '../../Styles/Main.css'


interface IPropsMain {
    state: any;
    emailValidation: (email:string) => void;
    passwordValidation: ({email,password}:any) => void;
    logout: () =>void;
    gatherCarouselContent: (categories: Array<string>, page: string) => void;
    gatherPlayInfo: (id:number, category:string, page:string) => void;
    setLoadState: (newcontent_state:any) => void;
    gatherDescription: (id:number, category:string, page:string) => void;
    setEmail: (email:string) => void;
    getFavorites: (favorites:Array<{category:string, page:string, id:string}>) => void;
    addToFavorites: (id:number, page:string, category:string) => void;
}

const mapStateToProps = (state:RootState) => {
    return ({
      state: state
    });
  };

const mapDispatchToProps = (dispatch:AppDispatch) => {
return ({
    emailValidation: (email:string) => {dispatch(emailValidation(email))},
    passwordValidation: ({email,password}:any) => {dispatch(passwordValidation({email,password}))},
    logout: () => {dispatch(logout())},
    gatherCarouselContent: (categories: Array<string>, page: string) => (dispatch(gatherCarouselContent(categories, page))),
    gatherPlayInfo: (id:number, category:string, page:string) => (dispatch(gatherPlayInfo(id, category, page))),
    setLoadState: (newcontent_state:any) => (dispatch(setLoadState(newcontent_state))),
    gatherDescription: (id:number, category:string, page:string) => (dispatch(gatherDescription(id, category, page))),
    setEmail: (email:string) => (dispatch(setEmail(email))),
    getFavorites: (favorites:Array<{category:string, page:string, id:string}>) => (dispatch(getFavorites(favorites))),
    addToFavorites: (id:number, page:string, category:string) => dispatch(addToFavorites(id, category, page)),
})}

const Main = ({state, emailValidation, passwordValidation, setEmail, logout, gatherCarouselContent, gatherPlayInfo, setLoadState, 
    gatherDescription, getFavorites, addToFavorites}:IPropsMain):JSX.Element => {

    const Watchmovie = ():JSX.Element => {
       const {movieId, page, category} = useParams()
       if(movieId !== undefined && page !== undefined && category !== undefined)
        {
            return(
                <Watch id={parseInt(movieId)} gatherPlayInfo={gatherPlayInfo}
                    state={state.content} page={page} category={category} />
                ) 
        }
        else{
            return(
            <>
            </>
            )
        }
    }

    return(<>


        <div className='main__container'>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/col'/> } />
                <Route path='/col' element={<Colombia setEmail={setEmail}/>}/>
                <Route path='/login' element={<Login emailValidation={emailValidation}
                                                    passwordValidation={passwordValidation}
                                                    state={state.user} />} />

                <Route path='/browse' element={<Browse setLoadState={setLoadState} 
                                                    state={{user:state.user, content:state.content}}
                                                    logout={logout}
                                                    gatherCarouselContent={gatherCarouselContent}
                                                    gatherDescription={gatherDescription}
                                                    addToFavorites={addToFavorites}/>}/>
                <Route path='/series' element={<Series logout={logout}/>} />
                <Route path='/lastest' element={<Lastest/>}/>
                <Route path='/mylist' element={<MyList  setLoadState={setLoadState}
                                                        gatherDescription={gatherDescription}
                                                        logout={logout}
                                                        state={{user:state.user, content:state.content}}
                                                        getFavorites={getFavorites}
                                                        addToFavorites={addToFavorites}/>}/>
                <Route path='/watch/:movieId&:page&:category' element={< Watchmovie />}/>
                <Route path="/signup" element = {<SignIn />} />
            </Routes>
        </BrowserRouter>
        </div>

    </>)
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);