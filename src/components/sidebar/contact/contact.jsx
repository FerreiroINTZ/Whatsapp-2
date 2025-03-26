
import "./contact.css"
export default function contact({user, chate_id, setCurrentChat}){
    return(
        <div className="contacts-card" onClick={() => setCurrentChat(chate_id)}>
            <div className="usersPohtos"></div>
            <p className="userContact">{user}</p>
            </div>
    )
}