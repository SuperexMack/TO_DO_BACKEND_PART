// so this will contain all the signin and signout code

import express , { Router } from "express"
import {Request , Response} from "express"
import zod from "zod"
import jwt from "jsonwebtoken"
import {NewTodo} from "../db"
import {NewUser} from "../db"
import authMiddleware from "../authMiddleware"
const router = Router()
const MYSCRETCODE = "MACK06062003"
const app = express();
app.use(express.json());

const checker = zod.object({
   username : zod.string().email(),
   password : zod.string(),
   
})




// use of signup is to add new users into the database
router.post("/signup" , async(req:Request , res:Response)=>{
   
   //here first we are going to check that whether the input given by the user is correct or not
   const {success} = checker.safeParse(req.body)
   console.log(req.body)
   console.log(req.body.username)
   console.log(req.body.password)
   console.log("first")
   if(!success){
      console.log("second")
      return res.status(400).json({
        msg:"Your entries are unable to pass our test"
     })
   }

   // now we are going to check that same email ke kahin koi dusra userName to nahi signup nahi kar raha na

   let oldUser = await NewUser.findOne({
    username:req.body.username
   })

   if(oldUser){
    res.json({
        msg: "User with this username is already regestired"
    })
   }


   const user = await NewUser.create({
    username : req.body.username,
    password: req.body.password,

   })

   const userid = user._id;
   // now we are reached to this line now we know that this user do not exist so we are going to register this user

   const token = jwt.sign({
      userid
   },MYSCRETCODE)

   res.json({
    msg:"User Registered successfully",
    token:token
   })



})

const todoChecker = zod.object({
   title : zod.string(),
   description : zod.string()
})


router.post("/addData", authMiddleware, async (req: Request, res: Response) => {
   // Extract userid from authMiddleware
   const userid = (req as any).userid;

   // Check if userid is available
   if (!userid) {
      return res.status(400).json({
         msg: "Userid is required."
      });
   }

   // Validate todo data
   const { success } = todoChecker.safeParse(req.body);
   if (!success) {
      return res.status(400).json({
         msg: "The data you are trying to give is not valid || You had not entered a valid data"
      });
   }

   try {
      // Create new todo with userid
      await NewTodo.create({
         userid: userid, // Attach userid here
         title: req.body.title,
         description: req.body.description
      });

      res.json({
         msg: "Your data had been added to the database"
      });
   } catch (error) {
      console.error("Error adding todo:", error);
      res.status(500).json({
         msg: "An error occurred while adding todo."
      });
   }
});


const signuser = zod.object({
   username : zod.string(),
   password : zod.string()
})

router.post("/signin" , async(req:Request , res:Response)=>{
   // so here we are going to make the signin

   const {success} = signuser.safeParse(req.body)
   if(!success){
      res.status(400).json({
         msg:"Your data is either incorrect || you had entered the wrong data"
      })
   }

   const user = await NewUser.findOne({
      username : req.body.username,
      password : req.body.password
   })

   if(user){
      const token = jwt.sign({
         userid : user._id
      },MYSCRETCODE)

      res.json({
         msg:"welcome back",
         token:token
      })
   }

   res.status(400).json({
      msg:"user do not exist"
   })


})


export default router