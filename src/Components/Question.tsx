import React, {useState} from 'react'
import '../Styles/Question.css'


interface IQuestion {
    id: number,
    question:string;
    answer:Array<string>;
    setQuestion: (id:number) => void;
    open:boolean;
}

export const Question = ({id, question, answer, setQuestion, open}:IQuestion):JSX.Element => {

    
    return(<>
    <div className="question__container">
        <div className='question__card' onClick={()=>{open?setQuestion(-1):setQuestion(id)}}>
            {question}
            {open?<i className="ri-close-fill"></i>:<i className="ri-add-line"></i>}
        </div>
        <div className={`answer__card ${open?"show__answercard":"hide__answer"}`}>
            <div>
                {typeof answer === "string"?
                <p>{answer}</p>
                :answer.map((item, index)=> {
                    return(<>
                        <p key={index}>{item}</p>
                    </>)
                })
                }
            </div>
        </div>
    </div>
    </>)
}