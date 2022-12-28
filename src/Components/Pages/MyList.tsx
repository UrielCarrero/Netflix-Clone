import React,{useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router';
import { NavBar } from '../NavBar'
import { Footer } from '../Footer';
import { FavoritesContainer } from '../FavoritesContainer';
import { ModalDescription } from '../ModalDescription';
import '../../Styles/MyList.css'

interface IMyList {
    logout: () => void;
    state: {
        user:any;
        content: any;
    };
    getFavorites: (favorites:Array<{category:string, page:string, id:string}>) => void;
    gatherDescription: (id:number, category:string, page:string) => void;
    setLoadState: (newcontent_state:any) => void;
    addToFavorites: (id:number, page:string, category:string) => void;
}

export const MyList = ({logout, state, getFavorites, gatherDescription, setLoadState,
    addToFavorites}:IMyList) => {

    let [scrolledDown, setScrolledDown] = useState(0);
    let [modalOpened, setModalOpened] = useState(false);
    let [displayNavBar, setDisplayNavBar] = useState(true);
    let [loadedContent, setLoadedContent] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{

        if(!loadedContent && state.content.content_state.favorites !== "loaded"){
            getFavorites(state.user.favorites)
            setLoadedContent(true)
        }
        

        if (typeof window !== "undefined" ) {
            window.addEventListener("scroll", ( ev:any) =>{
                setScrolledDown(window.pageYOffset)
            });
        }

        if (scrolledDown>=58){
            setDisplayNavBar(false)
        }
        else{
            setDisplayNavBar(true)
        }

        if(!state.user.active){
            navigate('/col')
        }

        console.log(state.content.content_state.favorites)

    },[scrolledDown, state])

    const changeModalState = (isOpen:boolean) =>{

        setModalOpened(isOpen)
    }

    return(<>

    <div  className={`${modalOpened?'bigmodal__show':' '} modal__container`}>    
        <ModalDescription isOpened={modalOpened} changeModalState={changeModalState}
                        state={state.content} setLoadState={setLoadState} page={'Inicio'}/>
    </div>

    <div className='mylist__container'>
        <div className='nav__mylist' style={{visibility:`${displayNavBar?'visible':"hidden"}`}}>
            <NavBar  hide={false} logout={logout}/>
        </div>

        <h3 style={{position:displayNavBar?'static':'fixed'}}>Mi lista</h3>
        <div style={{minHeight:"500px", width:"100%"}}>

            {   
                state.content.favorites!==undefined?
                    <FavoritesContainer favorites={state.content.favorites} 
                    changeModalState={changeModalState} gatherDescription={gatherDescription}
                    addToFavorites={addToFavorites}/>
                    :<></>
            }

        </div>
        <div className='mainfooter__container'>
            <Footer />
        </div>



    </div>

    </>)
}