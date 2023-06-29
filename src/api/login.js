import { $post,$setToken } from "../utils/request.js";
import { AlertMessage } from "../component/buttonAlert.js";
import { goRouter } from "../app.js";

export const login = async (username,password) => {
    let data = await $post('login',{username:username,password:password})
    if(data.code!=200){
        AlertMessage(data.message);
        return false;
    }
    sessionStorage.setItem('token', data.token);
    $setToken(data.token);
    return true
}

export const exit = () => {
    
    if(!sessionStorage.getItem('token')){
        AlertMessage("您还未登录");
        return
    }
    sessionStorage.clear('token')
    AlertMessage("您已退出");
    $setToken("")
    goRouter('/tea')
    
}