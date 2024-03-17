import axios from 'axios'

const upLoad = (url,userForm)=>{
    const params = new FormData()
    for(let i in userForm){
        params.append(i,userForm[i])
    }
    console.log(params)
    return axios.post(url,params,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }).catch((err)=>{
        console.log("错误",err)
    })
}

export default upLoad