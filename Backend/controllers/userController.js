import validator from 'validator';
import bcrypt from "bcrypt"
import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken";


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
 }


// route for user login
const loginUser = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
     return res.json({success:false, message:"User doesn't exist"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token })
      
    } else {
      res.json({success:false, message:"Invalid credentials"})
    }


    
  } catch (error) {

    console.log(error);
    res.json({ success: false, message: error.message });
  }
  
}

// route for user registration
const registerUser = async (req, res) => {
  
  try {
    const { name, email, password } = req.body;

    // if (name || email || password) {
    //   console.log(` name = ${name} , email = ${email},  password=  ${password}`)
    // }

    // checking user already exist 
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({success:false,message:"user already exist"})
      
    }
    // validating email formate and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length <8) {
      return res.json({ success: false, message: "Please enter a Strong password atlest 8 character" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name,
      email,
      password:hashPassword
    })
    const user = await newUser.save();

    const token = createToken(user._id)
    res.json({success:true,token})


      
    } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
    }
  
}



// admin login and token generated
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          email: email,
          isAdmin: true,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({ success: true, token });
    }

    return res.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
