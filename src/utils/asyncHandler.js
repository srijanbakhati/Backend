const asyncHandler=(requestHandler)=>{
    return(req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((error)=>next(error))
    }
}

export {asyncHandler};






















// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try{
//         await fn(req,res,next)
//     }catch(error){
//         res.status(error.code).json({
//             sucess:false,
//             message:error.message
//         })
//     }
// }