exports.loginMapper = (data,statusCode,token)=>{
    if (statusCode==404) {
        return {
            "status": "404",
            "error": data.message,
        }  
    }else{
        return {
            "status": "201",
            message:"Successfully Login!",
            data: {...data},
            token:token,
        } 
    }    
}