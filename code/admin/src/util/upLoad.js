import axios from "axios";

function upLoad(path,userForm){
    const params = new FormData()
    for(let i in userForm){
        params.append(i,userForm[i])
    }
    return axios.post(path,params,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }).catch((error)=>{
        console.log("请求错误",error)
    })
}

export default upLoad