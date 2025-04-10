import { useState, useEffect } from "react"

import SideBar from "./components/sidebar/sidebar.jsx"
import Chate from "./components/chate/chate.jsx"
import MainMenu from "./components/mainMenu/mainMenu.jsx"
import ErrorPage from "./components/err/err.jsx"

function App() {
  // espera o animacao e o fetch acabar para mostrar a pagina
  const [hableToEnter, setHableToEnter] = useState(true)
  
  // o id (cookie) e o nome do usuario
  const [userData, setUserData] = useState(null)
  // o id (cookie) e o nome do usuario
  const [chates, setChates] = useState(null)
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState(null)

  async function fetchData_WaitMenuAnimation(url, metodo){
    const promises = []
    
    console.log("Metodos :", metodo)
    if(metodo == "GET"){
      var fectData = fetch(url, 
        {method: metodo, credentials: "include"})
    }else{
      var fectData = fetch(url, 
        {
          method: metodo, 
          headers:{
            "Content-Type": "application/json"
          },
          credentials: "include",
        body: JSON.stringify({cookie: document.cookie.slice(7)})})
      }
      promises.push(fectData)
    
    // isso representa o tempo que a animcao inicial vai demorar pra parar
    const waitAnimation = new Promise(resolve => 
      setTimeout(() => resolve("Resolvido!"), 0)) // 3000
    promises.push(waitAnimation)
    
    try{
      // caso o Promise.all de errado, userData sera fasle, e o erro sera renderizado!
      const waitPromises = await Promise.all(promises)

      const userDataObject = await waitPromises[0].json()

      setUserData(() =>{return userDataObject[0]})
      setChates(() => {return userDataObject[1]})
    }catch{
      // se o request do fetch falhar vai cair aqui.
      userData(false)
    }finally{
      // isso permite que o componente principal seja renderizado
      const waitExitAnimation = await new Promise(resolve => 
        setTimeout(() => {
          setHableToEnter(x => {return true}); 
          resolve("Resolvido"); 
        }, 2000))
    }

  }

  async function fetchChateMessage(){
    var fetchMessages = await fetch("http://localhost:3000/getMessages", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({chate_id: currentChat})
    })

    fetchMessages = await fetchMessages.json()
    console.log("fetchMessages: ",fetchMessages)
    setMessages(() => {return fetchMessages})
  }

  // E a primeira funcao a ser executado do codigo!
  // Busca o usuario com base no Cookie
  useEffect(() =>{
    if(!document.cookie.includes("whatsappCookie")){
      fetchData_WaitMenuAnimation("http://localhost:3000/setUser", "GET")
    }else{
      fetchData_WaitMenuAnimation("http://localhost:3000/getUser", "POST")
    }
  }, [])

  useEffect(() =>{
    console.log(userData)
  }, userData)

  // quando clicar em um cahte ele pesquisara pelas conversas
  useEffect(()=>{
    if(currentChat){
      fetchChateMessage()
      console.log("chate atual: ", currentChat)
    }else{
      console.log("selecione um chate!")
    }
  }, [currentChat])


  if(hableToEnter){
    if(!userData){
      return (<ErrorPage />)
    }
    return (
      <>
        <SideBar chates={chates} setCurrentChat={setCurrentChat}/>
        <Chate 
          messages={messages} 
          setMessages={setMessages} 
          chatID={currentChat}/>
      </>
    )
    // return <MainMenu enter={hableToEnter}/>
  }else{
    return <MainMenu enter={userData}/>
  }

}

export default App
