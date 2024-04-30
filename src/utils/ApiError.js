class ApiError extends Error{
    constructor(
        statusCode,
        message="There is something wrong",
        errors=[],
        stack=""
    ){
        super(message),
        this.statusCode=statusCode,
        this.data=null,
        this.message=message,
        this.errors=errors
        this.sucess=false

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
    
}
export {ApiError}