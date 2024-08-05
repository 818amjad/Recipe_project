import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import foodImg from '../assets/foodRecipe.png'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios'

export const RecipeItem = () => {
    let recipes = useLoaderData()
    const navigate=useNavigate()
    const [allRecipes,setAllRecipes]=useState()
    const [isFavRecipe,setIsFavRecipe]=useState(false)
    let path = window.location.pathname === "/myRecipe" ? true : false
    let favItems=JSON.parse(localStorage.getItem("fav")) ?? []
    console.log(allRecipes)

    useEffect(()=>{
        setAllRecipes(recipes)
    },[recipes,isFavRecipe])

    const onDelete=async(id)=>{
        await axios.delete(`http://localhost:5000/recipe/${id}`)
        .then(res=>console.log(res))
        setAllRecipes(rescipes=>rescipes.filter(recipe=>recipe._id !==id))
        favItems=favItems.filter(recipe=>recipe._id!==id)
        localStorage.setItem("fav",JSON.stringify(favItems))
    }
    const favRecipe=(item)=>{
        console.log(favItems.filter(recipe=>recipe._id===item._id))
        favItems=favItems.filter(recipe=>recipe._id===item._id).length===0 ? [...favItems,item] :favItems.filter(fav=>fav._id!==item._id)
        console.log(favItems)
        localStorage.setItem("fav",JSON.stringify(favItems))
        setIsFavRecipe(pre=>!pre)
    }
    return (
        <>
            <div className='card-container'>
                {
                    allRecipes?.map((item, index) => {
                        return (
                            <div className='card' key={index} onDoubleClick={()=>navigate(`/recipe/${item._id}`)}>
                                <img src={`http://localhost:5000/images/${item.coverImage}`} width="120px" height="100px"></img>
                                <div className='card-body'>
                                    <div className='title'>{item.title}</div>
                                    <div className='icons'>
                                        <div className='timer'><BsStopwatchFill />30min</div>
                                       { (!path) ? <FaHeart onClick={()=>favRecipe(item)}
                                        style={{color:(favItems.some(res=>res._id===item._id)) ? "red" : ""}}/> :
                                        <div className='action'>
                                            <Link to={`/edit-recipe/${item._id}`} className="editIcon"><FaRegEdit /></Link>
                                            <MdDelete onClick={()=>onDelete(item._id)} className='deleteIcon'/>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}
