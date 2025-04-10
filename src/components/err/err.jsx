import React from 'react'
import {motion} from "framer-motion"

import "./errorPage.css"

function err() {
  return (
    <motion.div
        initial={{y: 100, opacity: 0}}
        animate={{y: 0, opacity: 1, transition:{duration: 1.5, ease: "easeInOut"}}}
        id="errorPage"
    >
        <h2>Houve algum Erro!</h2>
        <p>Por favor, atualize a Pagina ou tente outra hora.</p>
        </motion.div>
  )
}

export default err