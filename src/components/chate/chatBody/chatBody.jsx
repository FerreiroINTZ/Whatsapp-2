import send_msg from "../../../imgs/send_msg.png"
import { useState, useEffect, useRef } from "react"

export default function chatBody({messages, setMessages, chatID}){

    const [newMesage, setNewMesage] = useState("")
    const chatBodyElement = useRef()

    async function sendNewMesage(){
        var sendMesage = await fetch("http://localhost:3000/sendMessage",{
            method: "POST",
            headers:{
                "Content-Tipe": "apllication/json"
            },
            body: JSON.stringify({content: newMesage, chatID: chatID}),
            credentials: "include"
        })
        sendMesage = await sendMesage.json()
        console.log(messages)
        setMessages(x => {return [...x, {
            content: newMesage, 
            sender_id: document.cookie.slice(7),
            nome: "Gabriel"
        }]})
        setNewMesage(() => {return ""})
    }

    useEffect(() =>{
        if(!newMesage){
            chatBodyElement.current.scrollTo({top: chatBodyElement.current.offsetHeight + 10000})
        }
    }, [newMesage])

    useEffect(() =>{
        if(!newMesage){
            console.log("Mensagem resetada!")
        }
        console.log(newMesage)
    }, [newMesage])

    return(
        <div id="chatBody" className="chate">
            <ul ref={chatBodyElement}>
                {messages?.map(x => {
                    if(x.sender_id == document.cookie.slice(7)){
                        return (<li className="msg you">
                            <p className="userName">You</p>
                            <p className="userContent">{x.content}</p>
                            </li>)
                    }else{
                        return (<li className="msg they">
                            <p className="userName">{x.nome}</p>
                            <p className="userContent">{x.content}</p>
                            </li>)
                    }
                })}
            </ul>
            <div id="msg-field">
                <input
                    type="text" 
                    placeholder="Write Somenthing" 
                    value={newMesage}
                    onChange={e => setNewMesage(e.target.value)}/>
                    <div 
                        className="send_msg"
                        onClick={() => sendNewMesage()}>
                        <img src={send_msg} alt="" />
                    </div>
            </div>
        </div>
    )
}