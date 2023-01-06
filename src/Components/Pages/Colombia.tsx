import React, { useEffect, useRef, useState} from 'react'
import '../../Styles/Colombia.css'
import {CardCol} from '../CardCol'
import {Question} from '../Question'
import {ColNavbar} from '../ColNavbar'
import {Footer} from '../Footer'
import { useNavigate } from 'react-router'


const cardsCont = [
    {
        title: "Enjoy on your TV.",
        description: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
        imgLink:"https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png",
        videoLink:"https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v",
        videoXY: [80, 10],
        videoDim: {
            topFactor:0.15,
            leftFactor:0.15,
            heightFactor:0.65,
            widthFactor:0.75
        },
    },
    {
        title: "Download your shows to watch offline.",
        description: "Save your favorites easily and always have something to watch.",
        imgLink:"https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg",
        aditionalIMG:{
            containerStyle:{
                zIndex:"100",
                marginLeft:"15%",
                marginBottom:"5%",
                outlineColor:"rgba(255, 255, 255, 0.25)",
                outline:"1px solid",
                borderRadius:"5px",
                padding:"2%",
                backgroundColor:"black",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center", 
                width:"fit-content",
                minWidth:"60%"
                },
            fImgStyle:{
                height:"3.5rem",
                marginRight:"3%"
                },
            firstIMG:"https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png",
            titleStyle:{
                color:"white",
                fontWeight:"600",
                fontSize:"1.5vw"
                },
            title:"Stranger Things",
            subTitleStyle:{
                color:"#0071eb",
                fontSize:"1.5vw"
                },
            subTitle:"Downloading...",
            sImgStyle:{
                height:"3.5rem"
            },
            sirstIMG:"https://i.pinimg.com/originals/16/24/0b/16240bf292e64ec97568759ced2ce5fe.gif"


        }
    }, 
    {
        title: "Watch everywhere.",
        description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.",
        imgLink:"https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png",
        videoLink:"https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v",
        videoXY: [110, -30], 
        videoDim: {
            topFactor:0.1,
            leftFactor:0.175,
            heightFactor:0.5,
            widthFactor:0.65
        },
    }
    , 
    {
        title: "Create profiles for kids.",
        description: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
        imgLink:"https://occ-0-2612-3933.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABfpnX3dbgjZ-Je8Ax3xn0kXehZm_5L6-xe6YSTq_ucht9TI5jwDMqusWZKNYT8DfGudD0_wWVVTFLiN2_kaQJumz2iivUWbIbAtF.png?r=11f"
    }
]

const questionsColombia = [
    {
        id:1,
        question:"What is Netflix?",
        answer:["Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.", "You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"]
    }, 
    {
        id:2,
        question:"How much does Netflix cost?", 
        answer:"Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from COP16,900 to COP38,900 a month. No extra costs, no contracts."
    },
    {
        id:3,
        question:"Where can I watch?", 
        answer:["Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.", "You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."]
    }, 
    {
        id:4,
        question:"How do I cancel?",
        answer:"Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
    },
    {
        id:5,
        question:"What can I watch in Netflix?",
        answer:"Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
    },
    {
        id:6,
        question:"Is Netflix good for kids?",
        answer:["The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.", "Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see."]
    }
]

interface IColombia {
    setEmail: (email:string) => void;
}

export const Colombia = ({setEmail}:IColombia):JSX.Element => {
    //<img class="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/0ef67cc5-0aa7-47cf-87bd-7f595afc7cfb/963ba93e-6eab-41d1-8dca-4a14c64d1943/CO-en-20221107-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/0ef67cc5-0aa7-47cf-87bd-7f595afc7cfb/963ba93e-6eab-41d1-8dca-4a14c64d1943/CO-en-20221107-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w,  1500w, https://assets.nflxext.com/ffe/siteui/vlv3/0ef67cc5-0aa7-47cf-87bd-7f595afc7cfb/963ba93e-6eab-41d1-8dca-4a14c64d1943/CO-en-20221107-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="">
    const ref = useRef<any>();
    const imgRef= useRef<any>({
        current:{
            clientHeight:0
        }
    });
    const navigate = useNavigate();

    let changeOrder = true;
    let [classLabel, setClassLabel]=useState(false);
    let [openQuestion, setOpenQuestion] = useState(-1);
    let [mainHeight, setMainHeight] = useState(88);
    let [loadedImg, setLoadedImg] = useState(false);
    let [emailValue, setEmailValue] = useState("")

    useEffect(()=>{
        if (typeof window !== "undefined" ){
            window.addEventListener('resize', ()=>{
                if(imgRef.current!==null)
                    setMainHeight(imgRef.current.clientHeight)
            });
        }
        
        setMainHeight(imgRef.current.clientHeight)
    },[mainHeight, loadedImg, CardCol, imgRef])



    const setQuestion = (id:number) =>{

        setOpenQuestion(id)
    }

    return(<>

        <div className='overlaped__page'>
            <div ref={ref} className='navpage__container'>
                <ColNavbar />
            </div>
            <div ref={imgRef} className='maincolimg__container'>
                
                <img onLoad={(event)=>{
                    setLoadedImg(true)
                }} className="maincol__image" src="https://assets.nflxext.com/ffe/siteui/vlv3/0ef67cc5-0aa7-47cf-87bd-7f595afc7cfb/963ba93e-6eab-41d1-8dca-4a14c64d1943/CO-en-20221107-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
                    <div className='gradient__image'>   
                    </div>
                    <div className='message__container'>
                        <div className='col__title'>Unlimited movies, TV shows, and more.</div>
                        <div className='col__subtitle'>Watch anywhere. Cancel anytime.</div>
                        <div className='col__desc'>Ready to watch? Enter your email to create or restart your membership.</div>
                        <div className='getstr__cont'>
                            <span className='email__cont'>
                                <label className={classLabel?"active__label":""} htmlFor="email" >Email address</label>
                                <input onChange={(event)=>{setEmailValue(event.target.value)}} onFocus={()=>{setClassLabel(true)}} onBlur={()=>{setClassLabel(false)}} id="email" type="email" value={emailValue}/>
                            </span>
                            <span onClick={()=>{
                                setEmail(emailValue)
                                navigate('/login')
                            }} className='getstr__button'>
                                <input type="submit" value="Get started"/>
                                <i className="ri-arrow-right-s-line"></i>
                            </span>
                        </div>
                    </div>
    
            </div>
            
        </div>
    
    
    
        <div style={{height:`${mainHeight-88}px`}}>
    
        </div>
        {
            loadedImg?<>
                <div className='col__cards' >
                    {cardsCont.map((item:any, index)=>{
                        changeOrder = !changeOrder
                        return(
                            <div key={index}>
                                <CardCol title={item.title} 
                                        description={item.description}
                                        imgLink={item.imgLink}
                                        videoLink={item.videoLink}
                                        videoXY={item.videoXY}
                                        changeOrder={changeOrder}
                                        aditionalIMG={item.aditionalIMG}
                                        videoDim={item.videoDim}/>
                            </div>
                        )
                    })}
                </div>
                <div className='question__col'>
                    <h2>Frequently Asked Questions</h2>
                    {
                        questionsColombia.map((item:any, index)=>{
                            return(
                            <span key={index}>
                                <Question id={item.id} question={item.question} answer={item.answer} setQuestion={setQuestion}
                                    open={item.id===openQuestion?true:false}/>
                            </span>
                            )
                        })
                    }
            
                    <p>Ready to watch? Enter your email to create or restart your membership.</p>
                    <div className='getstrlow__cont'>

                            <span className='email__cont'>
                                <label className={classLabel?"active__label":""} htmlFor="email2" >Email address</label>
                                <input onChange={(event)=>{setEmailValue(event.target.value)}} onFocus={()=>{setClassLabel(true)}} onBlur={()=>{setClassLabel(false)}} id="email2" type="email" value={emailValue}/>
                            </span>
                            
                            <span onClick={()=>{
                                setEmail(emailValue)
                                navigate('/login')
                            }} className='getstr__button'>
                                <input type="submit" value="Get started"/>
                                <i className="ri-arrow-right-s-line"></i>
                            </span>

                        
                    </div>
                        
                </div>
            </>
            :<></>
        }
        <div className='mainfooter__container'>
            <Footer />
        </div>  
        
    
            
        </>)

    
}