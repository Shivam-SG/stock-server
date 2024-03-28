const User = require("../models/user");

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createUser = async(req,res) =>{
    const user = req.body
    const query = {email: user.email}
    try {
        const existingUser = await User.findOne(query);
        if(existingUser){
            return res.status(301).json({message: "user already exist!"})
        }
        const result = await User.create(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteUser = async(req, res) =>{
    const userId = req.params.id;
    try {
        const deleteUser = await User.findByIdAndDelete(userId);
        if(!deleteUser){
            return res.status(404).json({message: "user not found!"});
        }
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getAdmin = async(req, res) =>{
    const email = req.params.email;
    const query = {email: email};
    try {
        const user = await User.findOne(query);
        if(email !== req.decoded.email){
            return res.status(403).send({message: "forbidden access"})
        }
        let admin = false;
        if(user){
            admin = user?.role === "admin";
        }
        res.status(200).json({admin})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const makeAdmin = async (req, res) => {
    const userId = req.params.id;
    try {
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { role: "admin" },
            { new: true, runValidators: true }
        );
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    getAdmin,
    makeAdmin
}