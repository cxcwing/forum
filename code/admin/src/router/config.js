import home from '../views/home/home.vue'

import userList from '@/views/user-manage/userList.vue'
import userAdd from '@/views/user-manage/userAdd.vue'
import userEdit from '@/views/user-manage/userEdit.vue'

import postAdd from '@/views/post-manage/postAdd.vue'
import postEdit from '@/views/post-manage/postEdit.vue'
import postList from '@/views/post-manage/postList.vue'

import taleAdd from '@/views/tale-manage/taleAdd.vue'
import taleEdit from '@/views/tale-manage/taleEdit.vue'
import taleList from '@/views/tale-manage/taleList.vue'

const routes = [
    {
        path:'/home',
        component:home
    },
    {
        path:'/user-manage/userList',
        component:userList
    },
    {
        path:'/user-manage/userAdd',
        component:userAdd
    },
    {
        path:'/user-manage/userEdit',
        component:userEdit
    },
    //
    {
        path:'/post-manage/postList',
        component:postList
    },
    {
        path:'/post-manage/postAdd',
        component:postAdd
    },
    {
        path:'/post-manage/postEdit/:id',
        component:postEdit
    },
    //
    {
        path:'/tale-manage/taleAdd',
        component:taleAdd
    }, 
    {
        path:'/tale-manage/taleEdit/:id',
        component:taleEdit
    }, 
    {
        path:'/tale-manage/taleList',
        component:taleList
    }, 
    {
        path:"/",
        redirect:"/home"
    },

]

export default routes