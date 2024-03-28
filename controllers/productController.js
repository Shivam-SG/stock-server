const productModel = require("../models/productModel.js");
const fs = require("fs");

const CreateProductController = async(req, res) =>{
    try {
        const {name, description} = req.fields;
        const {imageUrl} = req.files;

        switch(true){
            case !name:
                return res.status(500).send({error:"name is required"})
            case !description:
                return res.status(500).send({error:"description is required"})
            case !imageUrl || imageUrl.size>1000000000000:
                return res.status(500).send({error:"imageUrl is required"})
        }
        const products = new productModel({...req.fields, })
        if(imageUrl){
            products.imageurl.data = fs.readFileSync(imageUrl.path);
            products.imageurl.contentType = imageUrl.type;
        }
        await products.save()
        res.status(201).send({
            success: true,
            message:"created successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error"
        })
    }
};
const UpdateProductController = async(req, res) =>{
    try {
        const {name, description, price} = req.fields;
        const {imageUrl} = req.files;

        switch(true){
            case !name:
                return res.status(500).send({error:"name is required"})
            case !description:
                return res.status(500).send({error:"description is required"})
            case !price:
                return res.status(500).send({error:"price is required"})
            case !imageUrl || imageUrl.size>1000000000000:
                return res.status(500).send({error:"imageUrl is required"})
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, },
            {new: true});
            
        if(imageUrl){
            products.imageurl.data = fs.readFileSync(imageUrl.path);
            products.imageurl.contentType = imageUrl.type;
        }
        await products.save()
        res.status(201).send({
            success: true,
            message:"updated successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error"
        })
    }
};

const getProductController = async (req, res) =>{
    try {
        const products = await productModel.find({}).select("-imageurl").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:"allProducts",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error: error.message,
            message:"error"
        })
    }
};

const ProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("imageurl");

        if (product.imageurl.data) {
            res.set("Content-Type", product.imageurl.contentType);
            return res.status(200).send(Buffer.from(product.imageurl.data, 'binary'));
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error",
            error
        });
    }
};

const DeleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-imageurl");
        res.status(200).send({
            success:true,
            message:"deleted",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error",
            error
        })
    }
};

const SingleProductController = async (req, res) => {
    try {
        const id = req.params.pid;
        const product = await productModel.findById(id);
        if(!product){
            return res.status(404).json({msg:"not found"});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error:error});
    }
};







module.exports = {CreateProductController, UpdateProductController, getProductController, ProductPhotoController, DeleteProductController, SingleProductController};