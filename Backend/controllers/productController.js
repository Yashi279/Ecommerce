const Product = require("../models/productModel"); //importing product model
const ErrorHandler= require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



//create product --Admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.create(req.body);

    res.status(201).json({       //201 response will generate after the request is success
        success:true,
        product
    })
});



//Get All Product
exports.getAllProducts = catchAsyncErrors(async(req,res)=>{ 
    
    const products = await Product.find();

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
        product
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

    const product = await Product.findById(req.params.id);
    const product_id = req.params.id;

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    //await product.remove();
    await product.delete(product_id);

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
});