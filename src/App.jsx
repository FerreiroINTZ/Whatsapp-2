import { useState, useEffect } from "react"

import SideBar from "./components/sidebar/sidebar.jsx"
import Chate from "./components/chate/chate.jsx"
import MainMenu from "./components/mainMenu/mainMenu.jsx"

function App() {
  const [hableToEnter, setHableToEnter] = useState(true)

  const [userData, setUserData] = useState(null)
  const [chates, setChates] = useState(null)
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState(null)

  async function fetchData_WaitMenuAnimation(url, metodo){
    const promises = []

    if(metodo == "GET"){
      var userData = fetch(url, 
        {method: metodo, credentials: "include"})
    }else{
      var userData = fetch(url, 
        {
          method: metodo, 
          headers:{
            "Content-Type": "application/json"
          },
        body: JSON.stringify({cookie: document.cookie.slice(7)})})
      }
      promises.push(userData)

    const waitAnimation = new Promise(resolve => 
      setTimeout(() => resolve("Resolvido!"), 0)) // 3000
    promises.push(waitAnimation)
    
    const waitPromises = await Promise.all(promises)
    const userDataObject = await waitPromises[0].json()
    // console.log(waitPromises)
    // console.log(userDataObject);
    setUserData(() =>{return userDataObject[0]})
    setChates(() => {return userDataObject[1]})

    const waitExitAnimation = await new Promise(resolve => 
      setTimeout(() => {
        setHableToEnter(x => {return true}); 
        resolve("Resolvido"); 
      }, 2000))
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

  useEffect(() =>{
    if(!document.cookie){
      fetchData_WaitMenuAnimation("http://localhost:3000/setUser", "GET")
    }else{
      fetchData_WaitMenuAnimation("http://localhost:3000/getUser", "POST")
    }
  }, [])

  useEffect(()=>{
    // console.log(userData)
  }, [userData])

  useEffect(()=>{
    // console.log("Chates do usuario:", chates)
  }, [chates])

  useEffect(() =>{
    console.log("mensagens: ", messages)
  }, [messages])

  useEffect(()=>{
    if(currentChat){
      fetchChateMessage()
      console.log("chate atual: ", currentChat)
    }else{
      console.log("selecione um chate!")
    }
  }, [currentChat])


  if(hableToEnter){
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
