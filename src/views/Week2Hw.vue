<script setup>
import axios from 'axios';
import {onMounted, ref} from 'vue';

const api = "https://todolist-api.hexschool.io";
// 註冊
const signupField =ref({
    email: "",
    password: "",
    nickname: ""
})
const signupRes=ref("");
const signup = async () => {
    console.log("signupRes:",signupRes.value);
    try {
        const res = await axios.post(`${api}/users/sign_up`, signupField.value);
        console.log(res);
        signupRes.value = res.data.uid;
        
    } catch (error) {
        console.log(error.response.data);
    }

}
// 登入
const signInField =ref({
    email: "",
    password: ""
})
const signInRes=ref("");
const signIn = async () => {
    console.log("signInRes:",signInRes.value);
    try {
        const res = await axios.post(`${api}/users/sign_in`, signInField.value);
        console.log(res);
        document.cookie = `customTodoToken=${res.data.token}`;
        signInRes.value = res.data.token;
        
    } catch (error) {
        console.log(error.response.data);
    }

}

// 驗證登入
//屬於自動觸發，要使用 onMounted
const user = ref({
    nickname:"",
    uid:""
})

var token = document.cookie.replace(
        /(?:(?:^|.*;\s*)customTodoToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
    );

onMounted(async ( )=> {
    
    var token = document.cookie.replace(
        /(?:(?:^|.*;\s*)customTodoToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
    );
    // console.log(token);
    const res = await axios.get(`${api}/users/checkout`, {
        // token放在headers裡面
        headers:{
            Authorization:token
        }
    });
    console.log(res);
    user.value=res.data;
    getTodoList();
    
})

// 登出
// const tokenSignOut = ref('');
// const signOut = async () => {

//     try {
//         const res = await axios.post(`${api}/users/sign_out`,
//         {},
//         {
//             headers: {
//             Authorization: tokenSignOut.value,
//             },
//         });
//         console.log(response.data);
//     } catch (error) {
//         tokenSignOut.value = '登出錯誤: ' + error.message;
//     }

// }



const signOut = async () => {
    try {
        const response = await axios.post(
        `${api}/users/sign_out`,
        {},
        {
            headers: {
                Authorization: token,
        },
        }
        );
        alert(response.data.message);
    } catch (error) {
        console.log(error.response);
    }
};

// async function name(params) {
    
// }
// 代辦清單
//1.取得代辦清單
const todoList=ref([]);//查看api得出的data是個[]。

const getTodoList = async () => {

    const response = await axios.get(`${api}/todos`, {
        headers: {
        Authorization: token,
        },
    });
    todoList.value = response.data.data;
};


// 2.新增代辦事項
const newTodoItem = ref("");
const addTodoItem = async () => {
    if(newTodoItem.value===""){
        return
    };
    const newTodo = {
        content: newTodoItem.value,
    };

    try {
        const res = await axios.post(`${api}/todos/`,newTodo, {
            headers: {
            Authorization: token,
            }
        });
        // console.log(res);

        
    } catch (error) {
        console.log(error.response);
    }
    newTodoItem.value = '';
    getTodoList();

}

// 3.刪除代辦清單
const deleteTodoItem = async (id) => {
    // console.log("刪除鍵",id)
    try {
        await axios.delete(`${api}/todos/${id}`, {
            headers: {
            Authorization: token,
            },
        });
    } catch (error) {
        console.log(error.response);
    }

    getTodoList();
};

// 4.更改代辦清單狀態(status)
const toggleTodoItem = async (id) => {
    // console.log("更改代辦清單狀態",id)
    try {
        await axios.patch(`${api}/todos/${id}/toggle`,{}, {
            headers: {
            Authorization: token,
            },
        });
    } catch (error) {
        console.log(error.response);
    }

    getTodoList();
};

// 5.編輯代辦事項內容
const tempEditText = ref(null);

const prepareEdit=(id)=>{

    const index = todoList.value.findIndex(todo =>todo.id===id);

    // console.log(id,todoList.value,index);
    // console.log(todoList.value[index]);
    tempEditText.value= {...todoList.value[index]}
    // console.log(tempEditText.value);
}
const confirmEdit= async(id)=>{

    const index = todoList.value.findIndex(todo =>todo.id===tempEditText.value.id);
    // todoList.value[index].content=tempEditText.value.content;
    todoList.value[index]=tempEditText.value;
    const editedContent = tempEditText.value.content;

        await axios.put(`${api}/todos/${id}`, {content:editedContent}, {
        headers: {
        Authorization: token,
        },
    });
    getTodoList();
    // tempEditText.value = "";
    
    // console.log(index)
}
// const updateTodo = async (id) => {
//     const todo = todos.value.find((todo) => todo.id === id);
//     todo.content = todoEdit.value[id];
//     await axios.put(`${site}/todos/${id}`, todo, {
//         headers: {
//         Authorization: token,
//         },
//     });
//     getTodos();
//     todoEdit.value = {
//         ...todoEdit.value,
//         [id]: '',
//     };
// };
// const updateTodoEdit = (event, id) => {
//     todoEdit.value = {
//         ...todoEdit.value,
//         [id]: event.target.value,
//     };
// };



</script>
<template>
    <div class="container">
        <RouterLink to="/" class="link">回首頁</RouterLink>
        <h2>這是Week2Hw.vue</h2>
        <h3>製作todo API</h3>
        <!-- 註冊 -->
        <div>
            <h2>註冊</h2>
            <input type="email" placeholder="請輸入email" v-model="signupField.email">
            <input type="password" placeholder="請輸入密碼" v-model="signupField.password">
            <input type="text" placeholder="請輸入暱稱" v-model="signupField.nickname">
            <br> 
            {{ signupField }}
            <br>
            <button type="button" @click="signup">註冊</button>
            UID:{{ signupRes }}
        </div>
        <!-- 登入 -->
        <div>
            <h2>登入</h2>
            <input type="email" placeholder="請輸入email" v-model="signInField.email">
            <input type="password" placeholder="請輸入密碼" v-model="signInField.password">
            <br> 
            {{ signInField }}
            <br>
            <button type="button" @click="signIn">登入</button>
            <p>token:{{ signInRes }}</p>
        </div>
        <!-- 登出 -->
        <div>
            <h2>登出</h2>
            <button type="button" @click="signOut">登出</button>

        </div>
        <!-- 驗證登入 -->
        <div>
            <h2>驗證是否登入成功</h2>
            <div v-if="user.uid">
                <p>uid:{{ user.uid }}</p>
                <p>nickname:{{ user.nickname }}</p>
        <!-- 代辦清單 -->
                <div class="todoList">
                    <div class="inputArea">
                        <input type="text" class="text" placeholder="請輸入新增項目" v-model="newTodoItem">
                        <button type="button" class="btn" @click="addTodoItem">+</button>
                    </div>
                    <div class="listArea">
                        
                        <ul class="list">
                            <li v-for="(todo, index) in todoList" :key="todo.id">
                                <div>
                                    {{ todo.content }} {{ todo.status ? '完成' : '未完成' }}
                                    <button type="button" @click="deleteTodoItem(todo.id)">Delete</button>
                                    <button type="button" @click="prepareEdit(todo.id)">編輯代辦內容</button>
                                    <button type="button" @click="toggleTodoItem(todo.id)">Toggle Status</button>
                                </div>
                                <!-- (v-if)判斷，需要編輯才會出現 -->
                                <div v-if="tempEditText!==null && tempEditText.id=== todo.id">
                                        <input type="text" v-model="tempEditText.content"/>
                                        <button type="button" @click="confirmEdit(tempEditText.id)" >
                                            確認編輯
                                        </button>
                                        <button type="button" @click="tempEditText={}">取消編輯</button>
                                </div> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-else>
                您尚未登入
            </div>
            <div>
                <button type="button" @click="getTodoList">取得token</button>
            </div>
        </div>


    </div>

</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap");

* {
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: "Noto Sans TC", sans-serif;
}
.container{
    max-width: 960px;
    margin:0 auto ;
}

body {
    background-color: #00c787;
    display: flex;
    justify-content: center;
}

.todoList {
    background-color: #fff;
    width:720px;
    padding: 30px;
    margin-top: 50px;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
.todoList .inputArea {
    display: flex;
    border-radius: 25px;
    overflow: hidden;
}
.todoList .inputArea .text {
    flex-grow: 1;
    border: none;
    background-color: #f0f4f8;
    padding: 10px 15px;
    outline: none;
}
.todoList .inputArea .btn {
    background-color: #007c87;
    border: none;
    color: #fff;
    padding: 10px 15px;
    cursor: pointer;
}
.todoList .list li {
    /* display: flex; */
    padding: 15px;
    border-bottom: 1px solid #eee;
}
.todoList .list label {
    flex-grow: 1;
}
.todoList .list .checkBox {
    margin-right: 15px;
}
.todoList .list .deleteBtn {
    background-color: none;
    border: none;
    cursor: pointer;
    opacity: 0.3;
}
.todoList .list .deleteBtn:hover {
    opacity: 1;
}
</style>