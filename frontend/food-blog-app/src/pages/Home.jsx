import { useNavigate } from 'react-router-dom'
import foodImg from '../assets/foodRecipe.png'
import { RecipeItem } from '../components/RecipeItem'
import { useState } from 'react'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

export default function Home() {
    const navigate=useNavigate()
    const [isOpen,setIsOpen]=useState(false)
    const addRecipe=()=>{
        let token=localStorage.getItem("token")
        if(token)
            navigate("/add-recipe")
        else
            setIsOpen(true)
    }
    return (
        <>
            <section className="home">
                <div className="left">
                    <h1>Food Recipe</h1>
                    <h5>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. </h5>
                    <button onClick={addRecipe}>Share your recipe</button>
                </div>
                <div className="right">
                    <img src={foodImg} width="320px" height="300px"/>
                </div>
            </section>
        
            <div className='bg'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#D4F6E8" fillOpacity="1" d="M0,96L21.8,106.7C43.6,117,87,139,131,122.7C174.5,107,218,53,262,37.3C305.5,21,349,43,393,85.3C436.4,128,480,192,524,181.3C567.3,171,611,85,655,58.7C698.2,32,742,64,785,106.7C829.1,149,873,203,916,218.7C960,235,1004,213,1047,186.7C1090.9,160,1135,128,1178,144C1221.8,160,1265,224,1309,240C1352.7,256,1396,224,1418,208L1440,192L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>   
            </div>
            { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
            <div className='recipe'>
                <RecipeItem/>
            </div>
        </>
    )
}


