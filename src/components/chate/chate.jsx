import "./chate.css"
import ChatBody from './chatBody/chatBody.jsx'


export default function chate({messages, setMessages, chatID}){
    
    if(messages){
        return(
            <>
                <ChatBody 
                    messages={messages} 
                    setMessages={setMessages} 
                    chatID={chatID}/>
            </>
        )
    }else{
        return(
            <>
                <div 
                    id="chate-not-selected" 
                    className="chate">Selecione um Usuario par ver a conversa</div>
            </>
        )
    }
}