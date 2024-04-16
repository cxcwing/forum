
let int = 'int'
let user = {
    id: int,
    username: 'varchar(16)',
    password: 'varchar(16)',
    email: "varchar(50)",
    introduction: 'text',
    gender: "int",
    role: '	int',
    avatar: "text",//头像
    vip: 'int',
    jionTime: 'datetime',
    account: "int"
}
let users = {
    _id: int,
    username: "varchar(16)",
    password: 'varchar(16)',
    introduction: 'varchar(200)',
    gender: 'int',
    role: "int",
    avatar: 'varchar(500)',
    vip: "int",
    jionTime: 'datetime',
    toGood: "json",
    collection: "json",
    level: 'int',
    power: 'int',
    postNum: 'int',
    taleNum: 'int',
    marckTime: "bigint",
    toGoodPost: 'json',
    collectionPost: "json"
}

let tale = {
    id: 'int',
    title: 'varchar(60)',
    author: 'varchar(60)',
    time: 'datetime',
    // beGood:Number,
    whoGood: 'json',
    whoCollection: 'json',
    lookNumber: 'int',
    Comment: 'int',
    type: 'type ',
    cover: 'varchar(1000)	',
    isPublish: 'int',
    content: 'mediumtext',
    authorId: 'int',
    goodNumber: 'bigint',
    isPost: 'int'
}
let post = {
    id: 'int',
    title: 'varchar(60)',
    author: 'varchar(60)',
    time: 'datetime',
    // beGood:Number,
    whoGood: 'json',
    whoCollection: 'json',
    lookNumber: 'int',
    Comment: 'int',
    type: 'type ',
    cover: 'varchar(1000)',
    isPublish: 'int',
    content: 'mediumtext',
    authorId: 'int',
    goodNumber: 'bigint',
    isPost: 'int'
}

let Comment = {
    id: 'int',
    textId: 'int',
    content: 'varchar(400)',
    userId: 'int',
    userName: 'varchar(20)',
    userAvatar: 'varchar(400)',
    postId: 'int',
    time: 'datetime'
}

let token = {
    id: 'int',
    idcode: 'int',
    createtime: 'bigint',
    email: 'varchar(60)'
}

