import { useEffect, useState } from "react"
import Modal from "./Modal"
import InputForm from "./InputForm"
import { NavLink } from "react-router-dom"


export default function Navbar() {
  const [isOpen,setIsOpen]=useState(false)
  let token=localStorage.getItem("token")
  const [isLogin,setIsLogin]=useState(token ? false :true)

  useEffect(()=>{
    setIsLogin(token ? false :true)
  },[token])

  const checkLogin=()=>{
    if(token){
      setIsLogin(true)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
    else{
      setIsOpen(true)
    }
   
  }
  return (
   <>
    <header>
        <h2>RECIPES</h2>
        <ul>
            <li><NavLink  to="/" >Home</NavLink></li>
            <li onClick={()=>isLogin && setIsOpen(true)}>
              <NavLink  to={!isLogin ? "/myRecipe":"/"} >My Recipe</NavLink></li>
            <li  onClick={()=>isLogin && setIsOpen(true)}><NavLink  to={!isLogin ? "/favRecipe":"/"}>Favourites</NavLink></li>
            <li onClick={checkLogin} ><p className="login">{isLogin ? "Login" :"Logout"}</p></li>
        </ul>
    </header>
   { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
   </>
  )
}