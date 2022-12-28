import React,{useState, useRef, useEffect} from 'react'
import {CarouselModal} from '../Components/CarouselModal'
import '../Styles/FavoritesContainer.css'

interface ICarrouselNetflix {
    favorites:{
        id:number;
        imgLink:string;
        compatibility: string;
        clasification: string;
        seasons: string;
        keywords: Array<string>;
        trailer: string;
        category: string;
        page: string;
    }[];
    changeModalState: (isOpen:boolean) => void;
    gatherDescription: (id:number, category:string, page:string) => void
    addToFavorites: (id:number, page:string, category:string) => void;
}

export const FavoritesContainer = ({favorites, changeModalState , gatherDescription, addToFavorites}:ICarrouselNetflix) => {

    let [slideDimensions, setSlideDimensions] = useState<{width:number, height:number}>({width:20, height:139});
    let [windowWidth, setWindowWidth] = useState<number>()

    const sliderRef = useRef<any>();
    const modalRef = useRef<any>();

    useEffect(()=>{

        if (typeof window !== "undefined" && windowWidth !== undefined) {
          window.addEventListener("resize", () =>{
            setWindowWidth(window.innerWidth)})
          window.addEventListener("load", () =>{
            setWindowWidth(window.innerWidth)})
          window.addEventListener("loadstart", () =>{
            setWindowWidth(window.innerWidth)})
        }
  
        if(windowWidth !== undefined){
  
          let slideWidth = windowWidth - (0.1131*windowWidth)

  
          if(windowWidth >= 992){
            setSlideDimensions({width: 90/5 , height: slideWidth*0.5655/5})      
          }
          else if(windowWidth >= 768){
            setSlideDimensions({width: 90/4 , height: slideWidth*0.5655/4})
          }
          else if(windowWidth >= 576){
            setSlideDimensions({width: 90/3 , height: slideWidth*0.5655/3})
          }
          else if(windowWidth < 576){
            setSlideDimensions({width: 90/2 , height: slideWidth*0.5655/2})
          }
          else{
            setSlideDimensions({width: 90/5 , height: slideWidth*0.5655/5})
          }
          renderIndividualSlides()
        }
        else{
          setWindowWidth(window.innerWidth)
        }
        
      },[windowWidth, favorites])
  

    const renderIndividualSlides = ():Array<JSX.Element> => {
        let slidesArray = [];
        let slideWidth = windowWidth!==undefined?windowWidth - (0.1131*windowWidth):1222
        let slidesInCarrousel = windowWidth!==undefined?Math.floor(90/slideDimensions.width):5

        for( let i = 0; i < (favorites.length/slidesInCarrousel); i++){
            
          slidesArray.push(<>
            <div style={{height:`${0.5*slideDimensions.height}px`}}></div>
            <span className='favorites__row'>
              {
              favorites.slice(i*slidesInCarrousel, (i*slidesInCarrousel)+slidesInCarrousel).map((item:any, index:number)=>{  

                return(
                <>
                <span key={index} >
                <span 
                    style={windowWidth!==undefined?{width: `${slideDimensions.width}%`, height:`${slideDimensions.height}px`}:
                    {width:`20%`, height:`139px`}}
                    ref = {modalRef}
                    className='slide__netflixcarrousel'>
                    <img src={item.imgLink} />
                </span>
                <CarouselModal 
                    addToFavorites={addToFavorites}
                    changeModalState={changeModalState}
                    borderLeft={index===0?true:false}
                    borderRight={index===(favorites.slice(i*slidesInCarrousel, (i*slidesInCarrousel)+slidesInCarrousel).length-1)?true:false}
                    height={typeof(windowWidth)==="undefined"?0:modalRef.current.offsetHeight} 
                    width={typeof(windowWidth)==="undefined"?0:(slideDimensions.width/100)*windowWidth} 
                    item={item}
                    category={item.category}
                    page={item.page}
                    gatherDescription={gatherDescription}
                    isFavorite={true}
                    />
                </span>
            
                </>)

              })
              }
            </span>
            </>)
        }
        return slidesArray
        }
    

    return(<>
        {
            renderIndividualSlides().map((item) => {
                return(item)
            })
        }
    </>)
}