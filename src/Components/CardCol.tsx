import React, {useRef, useEffect, useState} from "react";
import '../Styles/CardCol.css';

interface ICardCol {
    title:string;
    description:string;
    imgLink:string;
    videoLink?:string;
    videoDim?:any;
    videoXY?:Array<number>;
    changeOrder?:boolean;
    aditionalIMG?:any;
}

export const CardCol = ({title, description, imgLink, videoDim, videoLink, videoXY, changeOrder, aditionalIMG}:ICardCol):JSX.Element =>{


    const bgImgRef:any = useRef({
        current:{
            offsetLeft:0,
            offsetTop:0,
            offsetHeight:0,
            offsetWidth:0
        }
    })

    const [videoStyle, setVideoStyle] = useState({
                                                    top:0,
                                                    left:0,
                                                    height:120,
                                                    width:120
                                                })
    
    
    

    useEffect(()=>{

        if(videoLink!==undefined){
            window.addEventListener('resize', ()=>{
                if(bgImgRef.current!==null)
                    setVideoStyle({
                        top:bgImgRef.current.offsetTop + (videoDim.topFactor*bgImgRef.current.offsetHeight),
                        left:bgImgRef.current.offsetLeft + (videoDim.leftFactor*bgImgRef.current.offsetWidth),
                        height:videoDim.heightFactor*bgImgRef.current.offsetHeight,
                        width:videoDim.widthFactor*bgImgRef.current.offsetWidth
                    })
            });
    
            setVideoStyle({
                top:bgImgRef.current.offsetTop + (videoDim.topFactor*bgImgRef.current.offsetHeight),
                left:bgImgRef.current.offsetLeft + (videoDim.leftFactor*bgImgRef.current.offsetWidth),
                height:videoDim.heightFactor*bgImgRef.current.offsetHeight,
                width:videoDim.widthFactor*bgImgRef.current.offsetWidth
            })

        }
        

    },[bgImgRef.current])


    return(<>
        <div onLoad={()=>{
            videoLink!==undefined?
            setVideoStyle({
                top:bgImgRef.current.offsetTop + (videoDim.topFactor*bgImgRef.current.offsetHeight),
                left:bgImgRef.current.offsetLeft + (videoDim.leftFactor*bgImgRef.current.offsetWidth),
                height:videoDim.heightFactor*bgImgRef.current.offsetHeight,
                width:videoDim.widthFactor*bgImgRef.current.offsetWidth
            })
            :null
        }} className="row card__container">

            <div className="col-md-6 col-12 leftcard__container" style={changeOrder?{order:2, justifyContent:"flex-start" }:{}}>
                <div className="text__cardcontent">
                    <h2 className="card__title">{title}</h2>
                    <p className="card__description">{description}</p>
                </div>
            </div>

            <div className="col-md-6 col-12 rightcard__container" style={changeOrder?{order:1 }:{}}>
                <img onLoadedData={()=>{
                console.log("loadedIMG")
                setVideoStyle({
                    top:bgImgRef.current.offsetTop + (videoDim.topFactor*bgImgRef.current.offsetHeight),
                    left:bgImgRef.current.offsetLeft + (videoDim.leftFactor*bgImgRef.current.offsetWidth),
                    height:videoDim.heightFactor*bgImgRef.current.offsetHeight,
                    width:videoDim.widthFactor*bgImgRef.current.offsetWidth
                })
                }} ref={bgImgRef} className="card__img" src={imgLink} alt="car img" />

                
                {aditionalIMG!==null && aditionalIMG!==undefined?
                <>
                    <div style={{position:"absolute" ,...aditionalIMG.containerStyle}}>
                        <img className="subimg1__card" style={{...aditionalIMG.fImgStyle}} src={aditionalIMG.firstIMG} />
                        <span>
                            <span className="imgcard__text" style={{...aditionalIMG.titleStyle}}>{aditionalIMG.title}</span><br/>
                            <span className="imgcard__text" style={{...aditionalIMG.subTitleStyle}}>{aditionalIMG.subTitle}</span>
                        </span>
                        <img className="subimg2__card" style={{...aditionalIMG.sImgStyle}} src={aditionalIMG.sirstIMG} />
                    </div>
                </>:<></>}
                {
                videoLink!==null && videoXY !== undefined?
                    <>
                        <video className="card__video" style={{...videoStyle}} autoPlay loop>
                        <source src={videoLink} />
                        </video>
                    </> 
                    :<></>
                }
            </div>

        </div>
    </>)
}