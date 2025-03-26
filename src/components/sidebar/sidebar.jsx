import OunCard from "./ounCard/ounCard.jsx"
import SearchUsers from "./serachUsers/serachusers.jsx"
import Contact from "./contact/contact.jsx"
import "./sidebar.css"

import {motion} from "framer-motion"

export default function sideBar({chates, setCurrentChat}){
    
    return(
        <motion.div
        // initial={{x: -400}}
        // animate={{x: 0}}
        transition={{
            type: "spring",
            stiffness: 25,
            dumping: 10
        }}
        id="sidebar">
            <OunCard />
            <SearchUsers />
            <ul>
                {chates?.map(x => 
                (<Contact 
                    key={x.chate_id}
                    user={x.nome} 
                    chate_id={x.chate_id}
                    setCurrentChat={setCurrentChat}/>))}
            </ul>
        </motion.div>
    )
}