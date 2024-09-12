import { validateEmail } from "../utils/validateEmail.js";

export const signUpController = async(req, res)=>{ 
    try {
        let {username, password,email , confirmPassword, gender } = req.body;
        if(!username || !password || !email || !confirmPassword || !gender ){
         return res.json({"error":"Please fill all the fields!!"})  ;
        
        }
        if(confirmPassword != password){return res.json({"error":"password and confirmPassword match nhii hue hh!!"})  ;}
        if(!validateEmail(email)){return res.json({"error":"email is not valid"})  ;}

        //finding user if it already exist in db 


        // if user dont exist
        // hash password 


        // then create a account in db
        

        // login krdoo --- token generate krdo jwt se and cookie set krdooo

        // user ki details send krdooo 


        console.log("signup route");
        res.json({username,password,email,gender})


    } catch (error) {
        res.json({"error":"something went wrong in signup route"});
        console.log(error.message);
    }
  
}

export const loginController = (req, res)=>{
    let {username, password } = req.body;

    if(!username || !password  ){
        return res.json({"error":"Please fill all the fields!!"})  ;
       
    }

    // user ko db se find kroo 

    // if user dne => redirect krdo signup route pr 

    // if user exist then compare password and hashpassword using bcrypt 

    // if password matches then token generate kro and cookie set krdooo 

    // user ki details send krdooo


    console.log("login route");
    res.json({username:username,password})
}

export const logoutController = (req, res)=>{
    // cookie ko delete kr do
    
    console.log("logout route");
    res.json({"hii":"Hgfd"})
}

