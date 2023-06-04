import { $get, $post, $put, $setToken } from '../request/request.js';
import { ButtonAlert } from '../component/buttonAlert.js'
import { router } from '../component/router.js'


/**
 * 
 * 实现路由执行函数
 * 
 * 
*/
const home = async () => {
    // 路由实现
    const Lottery = async () => {
        $setToken("token");
        let data = await $post("do", {});
        return data.code//解析请求到的数据支持Json格式，例如：{"code":200,"cishu":100}
    };

    ButtonAlert({
        //使用组件
        requestFunction: Lottery,//设置组件奠基时执行函数
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
};

/**
 * 
 * 此处用来配置路由
 * 
 * */
const routes = {
    //配置路由
    "/": home,//根路径执行home函数
    "/home": home,
    "/about": async () => {
        ButtonAlert({
            requestFunction: async () => {
                gorouter("/home")
            },
            value: "跳转测试",
            className: "test"
        });
    },
    "/poem": async () => {
        //输出诗句
        let app = document.getElementById("app");
        let poem = document.createElement("pre")
        poem.className = "divtest"
        poem.innerText = "蒹葭苍苍，白露为霜。\n所谓伊人，在水一方。\n溯洄从之，道阻且长。\n溯游从之，宛在水中央。\n蒹葭萋萋，白露未晞。\n所谓伊人，在水之湄。\n溯洄从之，道阻且跻。\n溯游从之，宛在水中坻。\n蒹葭采采，白露未已。\n所谓伊人，在水之涘。\n溯洄从之，道阻且右。\n溯游从之，宛在水中沚。"
        app.appendChild(poem)
    }
};

router(routes);//调用路由函数

// 监听<a>标签的点击事件，进行路由切换
document.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        event.preventDefault(); // 阻止<a>标签的默认跳转行为
        const href = event.target.getAttribute("href");
        window.history.pushState(null, null, href); // 切换路由，并更新URL
        router(routes); // 切换页面内容
    }
})


const gorouter = (message) => {
    //跳转函数
    window.history.pushState(null, null, message); // 切换路由，并更新URL
    router(routes); // 切换页面内容
};