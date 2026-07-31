import authService from "../services/authService.js"; // Import the authService module

// Register a new user
export const registerUser = async (req, res) => {
    try{
    const {full_name,email,password} = req.body; // Destructure the request body to get the user details

    // Validate the input fields
    if(!full_name || !email || !password){
        return res.status(400).json({message: "Please provide all required fields"});
    }
    // Call the authService to register the user
    const {user, token} = await authService.registerUser(full_name,email,password);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
       message: "User registered successfully",
       user
   });
   } catch (error) {
    res.status(500).json({message: error.message});
   }
}

export const loginUser = async (req, res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "Please provide all required fields"});
        }

        const {user,token} = await authService.loginUser(email,password);

        res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
       });
       return res.status(200).json({
           message: "User logged in successfully",
           user
       });
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await authService.getUserById(req.user.id);

        res.set({
            "Cache-Control": "no-store",
            "Pragma": "no-cache",
            "Expires": "0"
        });

        return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        });
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
