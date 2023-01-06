import React,{useState, useRef, useEffect} from 'react';
import '../Styles/CarouselModal.css'
import ReactPlayer from "react-player";
import { useNavigate } from 'react-router';

interface IModal {
    item:{
        id:number,
        imgLink:string,
        compatibility: string,
        clasification: string
        seasons: string,
        keywords: Array<string>,
        trailer: string
    };
    height:number;
    width:number;
    borderRight:boolean;
    borderLeft:boolean;
    changeModalState: (isOpen:boolean) => void;
    addToFavorites: (id:number, page:string, category:string) => void;
    category:string;
    page:string
    gatherDescription: (id:number, category:string, page:string) => void
    isFavorite:boolean
}

const customStyles = {

    backgroundColor: 'red', 
    position:"absolute",
  };

export const CarouselModal = ({borderLeft, borderRight ,item, width, height, 
    changeModalState, category, page, gatherDescription, isFavorite, addToFavorites}:IModal) => {
    
    const navigate = useNavigate();
    let [isHover, setIsHover] = useState(false)
    let [showTrailer, setShowTrailer] = useState(false)
    let [mute, setMute] = useState(true)
    let [favorite, setFavorite] = useState(false)

    const modalRef = useRef<any>();

    return(<>
        <span 
        ref={modalRef}
        style={{width:width, marginLeft:-width}}
        onMouseEnter={()=>{
            setIsHover(true)
        }}
        onMouseLeave={()=>{
            setIsHover(false)
            setShowTrailer(false)
        }}
        onClick={()=>{
            gatherDescription(item.id, category, page)
            changeModalState(true)}}
                    
        className={`modal__carousel slide__netflixcarrousel
                    ${isHover?'modal__show':'modal__hide'} 
                    ${borderLeft&&isHover?'modal__left ':''} 
                    ${borderRight&&isHover?'modal__right ':''}`}>
            <span style={{height:height,width:1*width}}>
                    {
                    isHover?
                        <ReactPlayer
                            style={{zIndex:"90"}}
                            width={width} 
                            height={height}
                            muted={mute}
                            playing={showTrailer}
                            controls={false}
                            url={item.trailer}
                            onReady={()=>{setShowTrailer(true)}}
                            onEnded={()=>{setShowTrailer(false)}}
                        />:
                        <></>
                    }
                    {   !showTrailer?
                            <img style={{height:height,width:1*width}} src={item.imgLink} />: 
                            <>
                            {
                                mute?
                                    <span className='mute__button' onClick={()=>setMute(false)}>
                                        <i className="ri-volume-mute-line"></i>
                                    </span>:
                                    <span className='mute__button' onClick={()=>setMute(true)}>
                                        <i className="ri-volume-up-line"></i>
                                    </span>
                            }
                            </>
                    }

            </span>
            {isHover?
            <div style={{width:width}} className='modal__content'>
                <div className='modalinput__panel'>
                    <span>
                    <i onClick={()=>{
                        
                        navigate(`/watch/${item.id}&${page}&${category}`)}} 
                        className="play__modal ri-play-fill"></i>
                    {isFavorite || favorite?
                    <i className="add__modal ri-check-line"></i>:
                    <i onClick={()=>{
                        addToFavorites(item.id, category, page)
                        setFavorite(true)
                    }} className="add__modal ri-add-line"></i>}
                    
                    <i className="ri-thumb-up-fill"></i>
                    </span>

                    <span className='modalinput__end'>
                        <i onClick={()=>{
                            gatherDescription(item.id, category, page)
                            changeModalState(true)}}
                            className="ri-arrow-down-s-line"></i>
                    </span>

                </div>

                <div>
                    <p className='modalcontent__compatibility'>{item.compatibility} % para ti</p>
                    <p className='clasification__modal'>+{item.clasification}</p>
                    <p>{item.seasons} temporadas</p>
                    <i className="ri-hd-line"></i>
                </div>

                <div>
                {
                item.keywords.map((keyword, index)=>{
                    return(
                        <>
                        <p key={index}>{keyword}</p> 
                        {index!==(item.keywords.length-1)?<span className="dot__keywords"></span>:<></>}
                        </>
                    )
                })
                }
                </div>



            </div>:<></>
            }
        </span>
 
        </>)
}