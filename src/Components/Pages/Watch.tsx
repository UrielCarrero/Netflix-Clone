import React,{useState, useEffect} from 'react'
import {Oval} from 'react-loader-spinner'
import ReactPlayer from "react-player";
import '../../Styles/Watch.css'

interface IWatch {
    id:number;
    gatherPlayInfo: (id:number, category:string, page:string) => void;
    state:any;
    category:string;
    page:string;

}

export const Watch = ({id, gatherPlayInfo, state, page, category}:IWatch):JSX.Element => {

    let [playVideo, setPlayVideo] = useState(true)
    let [videoLoaded, setVideoLoaded] = useState(false)
    let [mute, setMute] = useState(true)
    let [showIcons, setShowIcons] = useState(true)
    let [showTitle, setShowTitle] = useState(true)

    /*let video="https://www.youtube.com/embed/cpUG34Lor8A?autoplay=1"
    let imgLink="https://imgs.search.brave.com/SAmHm7lK6FbWT3noCDNsgzEdYwqKhCH3StQuMd-8b9U/rs:fit:718:375:1/g:ce/aHR0cHM6Ly9pbXBh/Y3RvY2FzdGV4LmNv/bS5hci93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMi8xMC9uZXRm/bGl4LTEtNzE4eDM3/NS5qcGc"
    let title="Los Entresijos de la Fifa"*/

    useEffect(()=>{

        console.log(state.content_state.watch)
        if (state.content_state.watch === "not loaded"){
            gatherPlayInfo(id, category, page)
        }



        videoLoaded?null:
            setTimeout(()=>setShowTitle(false), 5000)
            setTimeout(()=>setShowIcons(false), 10000)
    },[])

    if(state.playInfo!== undefined){
        return(
            <>
    
            <div className='watch__container' style={videoLoaded?{zIndex:"50"}:{zIndex:"-50", opacity:"0"}}>
                <ReactPlayer
    
                    onMouseMoveCapture={()=>{
                        setShowIcons(true)
                        setTimeout(()=>setShowIcons(false), 5000)}}
                    style={{marginTop:"-4%"}}
                    width={"100%"}
                    height={"108%"}
                    controls={true}
                    playing={playVideo}
                    onReady={()=>{
                        setPlayVideo(true) 
                        setVideoLoaded(true)  
                        setTimeout(()=>setMute(false), 500)
                    }}
                    muted={mute}
                    onPause={()=>{setPlayVideo(false)}}
                    onPlay={()=>{setPlayVideo(true)}}
                    url={state.playInfo.trailer}
                    config={{
                        youtube: {
                            playerVars: { showinfo: 1,
                                        modestbranding: 1,
                                        autoplay:1
                                }
    
                        }}}
                    //onProgress={(state:any)=>{state.playedSeconds===2?setVideoLoaded(true):null}}
                    //onDuration={(duration:number)=>{setVideoDuration(duration)}}
                    />
    
                <div className='watch__videotitle'>
                    <h3 className={`${showIcons?'':'hidewatch__icons' } video__subtitle`}>{state.playInfo.title}</h3>
                </div>
                
            </div>
            
            <div style={showTitle?{zIndex:"100",opacity:"1"}:{zIndex:"-100",opacity:"0"}} className='start__videotitle'>
                    {state.playInfo.title}
            </div>
            </>)
    }
    else{
        return(
            <>
                    <div className='spinner__container' style={videoLoaded?{zIndex:"-50"}:{zIndex:"50"}}>
            <Oval
            ariaLabel="loading-indicator"
            height={100}
            width={100}
            strokeWidth={5}
            strokeWidthSecondary={1}
            color="#e50914"
            secondaryColor="transparent"
            />
        </div>

        
        </>
        )
    }

}