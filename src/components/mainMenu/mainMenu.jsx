import "./mainMenu.css"
import {motion} from "framer-motion"
import whatsapp2Image from "../../imgs/whatsapp2.png"
import { useEffect, useState } from "react"

export default function mainMenu({enter}){
    const [animateStates, setAnimateStates] = useState({
        text: {y: 0, opacity: 1}, 
        logo: {y: 0, opacity: 1}})

    useEffect(() =>{
        console.log(enter)
        // Muda animacao para a saida
        if(enter){
            setAnimateStates(x => {return {        
                text: {y: -20, opacity: 0},
                logo: {y: 20, opacity: 0}}})
        }
    }, [enter])
    return(
        <div id="mainMenu">
            <motion.p
                initial={{y: 20, opacity: 0}}
                animate={animateStates.text}
                transition={{duration: 1}}
            >Whatsapp 2</motion.p>
            <motion.div 
                id="whatsapp2Image"
                initial={{y: -20, opacity: 0}}
                animate={animateStates.logo}
                transition={{duration: 1}}>
                <img
                    src={whatsapp2Image}
                    alt="whatsapp 2 Image" />
            </motion.div>
        </div>
    )
}