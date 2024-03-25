let user = {
    id:1,
    username:'名称',
    password:'密码',
    email:"邮箱",
    introduction:'',
    gender:"性别",
    role:'身份',
    avatar:"",//头像
    vip:'',
    jionTime:'注册时间',
    account:"账号"
}

let users = {
    id:1,
    username:'名称',
    password:'密码',
    email:"邮箱",
    introduction:'',
    gender:"性别",
    role:'身份',
    avatar:"",//头像
    vip:'',
    jionTime:'注册时间',
    // account:"账号",使用邮箱代替
    toGood:[],//点赞作品id
    collection:[]//收藏作品id
}

let tale = {
    id:'0',
    title:'',
    author:'',
    time:'',
    // beGood:Number,
    whoGood:[],
    whoCollection:[],
    lookNumber:'',
    Comment:['id'],
    type:'',
    cover:'',
    isPublish:'',
    content:''
}

let Comment = {
    id:'',
    whoComment:'',
    time:'',

}