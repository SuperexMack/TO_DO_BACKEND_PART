// so using this file we are going to show all the data to the user

import authMiddleware from "../authMiddleware"
import express, { Router } from "express"
import {Request , Response} from "express"
import {NewTodo} from "../db"
const router = Router()
declare global {
    namespace Express {
      interface Request {
        userid?: string; // Add userid property to Request interface
      }
    }
  }

// now fron the below route we are going to see the data 


router.get("/getmydata" , authMiddleware , async(req:Request , res:Response)=>{

    try{
    const userdata = await NewTodo.findOne({
        userid : req.userid
        
    })

    if(!userdata){
        return res.status(400).json({
            msg:"The data is not available"
        })
    }

    res.json({
        title : userdata.title,
        description : userdata.description
    })
}

catch(error){
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
}

})


export default router