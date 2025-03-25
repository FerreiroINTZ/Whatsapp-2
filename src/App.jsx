import { useState, useEffect } from "react"

import SideBar from "./components/sidebar/sidebar.jsx"
import Chate from "./components/chate/chate.jsx"
import MainMenu from "./components/mainMenu/mainMenu.jsx"

function App() {
  const [hableToEnter, setHableToEnter] = useState(true)
  const [userData, setUserData] = useState(null)

  async function fetchData_WaitMenuAnimation(){
    const promises = []
    var userData = fetch("http://localhost:3000")
    promises.push(userData)

    const waitAnimation = new Promise(resolve => 
      setTimeout(() => resolve("Resolvido!"), 6000))
    promises.push(waitAnimation)
    
    const resultado = await Promise.all(promises)
    const userDataObject = await resultado[0].json()
    console.log(resultado)
    console.log(userDataObject);
    setUserData(() =>{return userDataObject})
    console.log(userData)

    const waitExitAnimation = await new Promise(resolve => 
      setTimeout(() => {
        setHableToEnter(x => {return true}); 
        resolve("Resolvido"); 
      }, 2000))
  }

  useEffect(() =>{
    fetchData_WaitMenuAnimation()
  }, [])

  if(hableToEnter){
    return (
      <>
        <SideBar />
        <Chate />
      </>
    )
    // return <MainMenu enter={hableToEnter}/>
  }else{
    return <MainMenu enter={userData}/>
  }

}

export default App
