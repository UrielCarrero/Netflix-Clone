import React, {useState, useRef} from 'react';
import { useNavigate } from 'react-router';
import '../Styles/ModalDescription.css'
import ReactPlayer from "react-player";

interface IModal {
    isOpened:boolean;
    changeModalState: (isOpen:boolean) => void; 
    state: any;
    setLoadState: (newcontent_state:any) => void;
    page:string;
    
}

export const ModalDescription = ({isOpened, changeModalState,setLoadState, state, page}:IModal) => {
    const navigate = useNavigate();
    let [mute, setMute] = useState(true)
    let [showTrailer, setShowTrailer] = useState("notStarted")
    const mainImgRef = useRef<any>()



    if(state.modalMovie!==undefined){
        return(<>
            <div className={`${isOpened?'':'hidemodal__overlay'} modal__overlay`}>
    
                <div style={isOpened?{top:"50%", left:"17%"}:{}} className={`${isOpened?'':'hidebig__modalcontent'} bigmodal__content`}>
                    <div ref={mainImgRef} className='modalmedia__container'>
                        <img  style={{zIndex:"1"}} src={state.modalMovie.imgLink}/>
    
                        <ReactPlayer
                            style={{zIndex:showTrailer==="readyToStart" || showTrailer==="playAgain"?"2":"-50", position:"absolute", top:"0"}}
                            width={typeof mainImgRef.current !=="undefined" && mainImgRef.current!== null? mainImgRef.current.offsetWidth:"100%"} 
                            height={typeof mainImgRef.current !=="undefined" && mainImgRef.current!==null? mainImgRef.current.offsetHeight:"100%"}
                            muted={mute}
                            playing={showTrailer==="readyToStart" || showTrailer==="playAgain"?true:false}
                            controls={false}
                            url={state.modalMovie.trailer}
                            onReady={()=>{setShowTrailer("readyToStart")}}
                            onEnded={()=>{setShowTrailer("Finished")}} 
                            />
    
                        <div className='close__button'>
                            <i onClick={()=>{
                                setLoadState({
                                    carousels:state.content_state.carousels,
                                    watch: state.content_state.watch,
                                    modal: "not loaded",
                                    mainContent:state.content_state.mainContent
                                })
                                changeModalState(false)
                                }} className="ri-close-line"></i>
                        </div>
    
                        <div className='overlaped__message'>
                            <div className='modaltitle__container'>
                                <img src={state.modalMovie.imgTitle} />
                            </div>
                            <div className='modalmedia__inputs'>
                                <span>
                                    <button onClick={()=>{
                                        navigate(`/watch/${state.modalMovie.id}&${page}&${state.modalMovie.category}`)
                                    }}><i className="ri-play-fill"></i>Reproducir</button>
                                    <i className="bigadd__modal ri-add-line"></i>
                                    <i className="big__thumb ri-thumb-up-fill"></i>
                                </span>
                                <span>
                                    {
                                        mute?
                                            <span className='mutemodal__button' onClick={()=>setMute(false)}>
                                                <i className="ri-volume-mute-line"></i>
                                            </span>:
                                            <span className='mutemodal__button' onClick={()=>{
                                                            showTrailer==="readyToStart" || showTrailer==="playAgain"?
                                                                setMute(true):
                                                                setShowTrailer("readyToStart")
    
                                                                                    }}>
                                                <i className="ri-volume-up-line"></i>
                                            </span>
                                    }
                                </span>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className='modaldescription__container'>
                        <span>
                            
                            <div className='bigmodal__maininfo'>
                                <span className='modalcontent__compatibility'>{state.modalMovie.compatibility} % para ti</span>
                                <span> {state.modalMovie.year} </span>
                                <span className='clasification__bigmodal'>+{state.modalMovie.clasification}
                                    <span className='bmclasification__frame'></span>
                                </span>
                                <span>{state.modalMovie.seasons} </span>
                                <i className="ri-hd-line"></i>
                            </div>
                            <div className='bigmodal__descriptiontext'>
                                {state.modalMovie.description}
                            </div>
    
                        </span>
                        <span className='bigmodal__details'>
                            <div>
                                <p>
                                <span className='bm__subtitle'>Elenco: </span> 
                                {
                                state.modalMovie.cast.slice(0,3).map((item:any, index:number)=>{
                                    return(
                                        <span key={index}>
                                            {index!==0?', ':''}
                                            {item}
                                        </span>
                                    )
                                })}
                                </p>
                                
                            </div>
                            <div>
                                <p>
                                <span className='bm__subtitle'>Generos: </span>
                                {
    
                                    state.modalMovie.genres.map((item:any, index:number)=>{
                                        return(
                                            <span key={index}>
                                                {index!==0?', ':''}
                                                {item}
                                            </span>
                                        )
                                    })
                                }
                                </p>
    
                            </div>
                            <div>
                                <p>
                                <span className='bm__subtitle'>Este titulo es: </span>
                                <span>{state.modalMovie.mainGenre}</span>
                                </p>  
                                
                            </div>
                            
                        </span>
                    </div>
                    <div className='bigmdetails__content'>
                        <h3>Acerca de <strong>{state.modalMovie.title}</strong></h3>
                        <div>
                            <p>
                            <span className='bm__subtitle'>Creado por: </span>
                            {state.modalMovie.authors.map((item:any, index:number)=>{
                                return(
                                    <span key={index}>
                                        {index!==0?<>{", "}</>:<>{""}</>}
                                        {item}
                                    </span>
                                )
                            })}
                            </p>
                            
                        </div>
                        <div>
                            <p>
                            <span className='bm__subtitle'>Elenco: </span>
                            {
                                state.modalMovie.cast.map((item:any, index:number) =>{
                                    return(
                                        <span key={index}>
                                            {index!==0?<>{", "}</>:<>{""}</>}
                                            {item} 
                                        </span>
                                    )
                                })
                            }
                            </p>
    
                        </div>
                        <div>
                            <p>
                            <span className='bm__subtitle'>Generos: </span>
                            
                            {
                                state.modalMovie.genres.map((item:any, index:number)=>{
                                    return(
                                        <span key={index}>
                                            {index!==0?<>{", "}</>:<>{""}</>}
                                            {item}
                                        </span>
                                    )
                                })
                            }
                            </p>
                            
                        </div>
                        <div>
                            <p>
                            <span className='bm__subtitle'>Este titulo es: </span> 
                            {state.modalMovie.mainGenre}
                            </p>
                            
                        </div>
                    </div>
                    <div>
                    </div>
                </div>  
            </div>
        </>)
    }
    else{
        return(
            <></>
        )
    }
    
}