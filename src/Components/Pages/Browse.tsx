import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import {CarouselNetflix} from '../CarouselNetflix'
import { MainMedia } from '../MainMedia';
import { ModalDescription } from '../ModalDescription';
import { NavBar } from '../NavBar';
import {Footer} from '../Footer'
import '../../Styles/Browse.css';
import * as video from '../../Assets/Trol_Traileroficial_Netflix.mp4'


interface IBrowse {
    logout: () => void;
    state: {
        user:any;
        content: any;
    };
    gatherCarouselContent: (categories: Array<string>, page: string) => void;
    setLoadState: (newcontent_state:any) => void;
    gatherDescription: (id:number, category:string, page:string) => void;
    addToFavorites: (id:number, page:string, category:string) => void;
}

 

export const Browse = ({logout, state, gatherCarouselContent, 
    setLoadState, gatherDescription, addToFavorites}:IBrowse):JSX.Element => {

    let [scrolledDown, setScrolledDown] = useState(0);
    let [modalOpened, setModalOpened] = useState(false);
    const navigate = useNavigate();

    

    const changeModalState = (isOpen:boolean) =>{

        setModalOpened(isOpen)
    }

    useEffect(() => {

    if(state.content.content_state.carousels==='not loaded'){
        gatherCarouselContent([
            "Las 10 peliculas más populares de Colombia hoy",
            "Tendencias"], "Inicio")
    }
    else if (state.content.content_state.carousels==='loaded' && state.content.content_state.watch!=='not loaded'){
        setLoadState({
            carousels:"loaded",
            watch:"not loaded",
            modal:state.content.content_state.modal,
            mainContent:state.content.content_state.mainContent
        })
    }

    if (typeof window !== "undefined" ) {
        window.addEventListener("scroll", ( ev:any) =>{
            setScrolledDown(window.pageYOffset)
        });
      }
    
    if(!state.user.active){
        navigate('/col')
    }

    }, [state]);

    return(<>

        <div  className={`${modalOpened?'bigmodal__show':' '} modal__container`}>
            
            <ModalDescription isOpened={modalOpened} changeModalState={changeModalState}
                            state={state.content} setLoadState={setLoadState} page={'Inicio'}/>
        </div>

        <div className={`${modalOpened?'background__bigmodal':''}`}>

        <div style={modalOpened?{}:{opacity:"1", zIndex:"500"}} className={`${scrolledDown> 10?'nav__black ':''}nav__wrapper`}>
            <NavBar hide={false} logout={logout}/>
        </div>
        <div style={modalOpened?{overflowY:"hidden"}:{opacity:"1", zIndex:"50"}} className='browser__wrapper'>
            <div className='mainmedia__container'>
                < MainMedia 
                    trailer={video}
                    imgLink="http://occ-0-6357-420.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABdfy4Vjee1YJHRy8r_J8q7rsM970_M-3rOirAlF-5dABNreBTvmuCQVM66xCN3Lk-stqtQX-wBPofD-hYTIEM0h_Hs4TTvrD6ZVh.webp?r=f10"
                    imgTitle='https://occ-0-6357-420.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABU8ewhc_9sYuc3j1s4xrgkAyGdvNkTkBYkjOlj2uFHLl2QlN_cLx0Wz7FipS6ugaqMfz-FK-x_BEy64HfEzKABuRlXguN_o6uthzZXPdRvNxTmOO9_81uXXYydGftPUbZtx5Th8J2EnL2x2Zic_r70iQ0dFjC4nfxklb4tFNrE95YZ5ZtHfC2A.webp'
                    description='Cuando una explosión en las montañas noruegas despierta a un antiguo trol, las autoridades designan a una osada paleontóloga para que evite que cause estragos en el lugar.'
                    clasification="13"
                    pauseVideo={modalOpened}
                    changeModalState={changeModalState}
                    gatherDescription={gatherDescription}
                    page={'Inicio'}
                />
            </div>
            
            <div className='carousel__container'>
                {
                    state.content.Carrousels!==undefined?
                        state.content.Carrousels.map((item:any)=>{
                            return(
                                <CarouselNetflix isTop={item.isTop} movies={item.content} title={item.category} 
                                changeModalState={changeModalState} page={"Inicio"}
                                gatherDescription={gatherDescription}
                                addToFavorites={addToFavorites}
                                user_favorites={state.user.favorites}
                                />
                            )
                        }):
                        <>Loading..</>
                }
            </div>
            <div style={{backgroundColor:"#141414", height:"35px"}}>


            </div>
          
        </div>

        <div className='mainfooter__container'>
            <Footer />
        </div>  

        </div>
           </>)
}