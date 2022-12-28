import React from "react";
import '../Styles/CardCol.css';

interface ICardCol {
    title:string;
    description:string;
    imgLink:string;
    videoLink?:string;
    videoStyle?:any;
    videoXY?:Array<number>;
    changeOrder?:boolean;
    aditionalIMG?:any;
}

export const CardCol = ({title, description, imgLink, videoLink, videoStyle, videoXY, changeOrder, aditionalIMG}:ICardCol):JSX.Element =>{
    /*<video className="card__video" style={{left:`${videoXY[0]}px`,top:`${videoXY[1]}px`}} src={videoLink} autoplay/>*/
    return(<>
        <div className="row card__container">

            <div className="leftcard__container" style={changeOrder?{order:2, justifyContent:"flex-start" }:{}}>
                <div className="text__cardcontent">
                    <h2 className="card__title">{title}</h2>
                    <p className="card__description">{description}</p>
                </div>
            </div>

            <div className="rightcard__container" style={changeOrder?{order:1 }:{}}>
                <img className="card__img" src={imgLink} alt="car img" />
                {aditionalIMG!==null && aditionalIMG!==undefined?
                <>
                    <div style={{...aditionalIMG.containerStyle}}>
                        <img style={{...aditionalIMG.fImgStyle}} src={aditionalIMG.firstIMG} />
                        <span>
                            <span style={{...aditionalIMG.titleStyle}}>{aditionalIMG.title}</span><br/>
                            <span style={{...aditionalIMG.subTitleStyle}}>{aditionalIMG.subTitle}</span>
                        </span>
                        <img style={{...aditionalIMG.sImgStyle}} src={aditionalIMG.sirstIMG} />
                    </div>
                </>:<></>}
                {videoLink!==null && videoXY !== undefined?
                    <>
                        <video className="card__video" style={{left:`${videoXY[0]}px`,top:`${videoXY[1]}px`, ...videoStyle}} autoPlay loop>
                        <source src={videoLink} />
                        </video>
                    </> 
                    :<></>}
            </div>

        </div>
    </>)
}