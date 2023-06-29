import { $get, $post, $put, $setToken } from '../utils/request.js';
import { ButtonAlert } from '../component/buttonAlert.js'
import { gorouter } from '../router/index.js'
import{  test } from '../component/form-input.js'


/**
 * 
 * 实现路由执行函数
 * 
 * 
*/
export const home = async () => {
    // 路由实现
    const Lottery = async () => {
        let data = await $post("do", {});
        return data.code//解析请求到的数据支持Json格式，例如：{"code":200,"cishu":100}
    };

    ButtonAlert({
        //使用组件
        requestFunction: Lottery,//设置组件点击时执行函数
        value: "Post测试",
        duration: 2000,
        className: "test"
    });

    ButtonAlert({
        requestFunction: async () => {
            let data = await $get("add", {})//发起请求
            return data.cishu;//解析请求到的数据支持Json格式，例如：{"code":200,"cishu":100}
        },
        value: "Get测试",
        duration: 2000,
        className: "test"
    });
    // test({
    //     buttonValue:"测试字符",
    //     buttonClick: ()=>{
    //         gorouter('/tea')
    //     },
    // })
};



// 监听<a>标签的点击事件，进行路由切换
document.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        event.preventDefault(); // 阻止<a>标签的默认跳转行为
        const href = event.target.getAttribute("href");
        gorouter(href)
    }
})


