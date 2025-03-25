import OunCard from "./ounCard/ounCard.jsx"
import SearchUsers from "./serachUsers/serachusers.jsx"
import "./sidebar.css"

import {motion} from "framer-motion"

export default function sideBar(){
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
        </motion.div>
    )
}