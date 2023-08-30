const Product = require("../models/productModel"); //importing product model
const ErrorHandler= require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const  ApiFeatures = require("../utils/apifeatures");


//create product --Admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({       //201 response will generate after the request is success
        success:true,
        product
    })
});



//Get All Product
exports.getAllProducts = catchAsyncErrors(async(req,res)=>{ 

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature= new ApiFeatures(Product.find(), req.query)
    .search()
    .filter().pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success:true,
        products 
    })

});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async(req, res, next)=>{
    
    const product = await Product.findById(req.params.id);
    
    
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }


    res.status(200).json({
        success:true,
        product,
        productCount,
    })

});


//update product --Admin

exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{

    let product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true, 
        runValidators:true, 
        userFindModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
});

//Delete Product
exports.deleteProduct =catchAsyncErrors(async(req,res,next)=>{
    const id = req.params.id;
    const data = await Product.findByIdAndDelete(id);
    if(!data){
        res.status(404).json({
            message:"Product cannot be deleted"
        })
    }
    else{
        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
    })}

   
});