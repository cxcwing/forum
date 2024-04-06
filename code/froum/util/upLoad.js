import axios from "axios";

function upLoad(path,userForm){
    console.log(userForm)
    const params = new FormData()
    for(let i in userForm){
        // console.log(userForm[i])
        params.append(i,userForm[i])
    }
    // console.log(params)
    return axios.post(path,params,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }).catch((error)=>{
        console.log("请求错误",error)
    })
}

export default upLoad