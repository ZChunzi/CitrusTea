
import { home } from '../view/index.js';
import {goRouter} from '../app.js'
/**
 * 
 * 此处用来配置路由
 * 
 * */
export const routes = {
    "/": {
        handler: home,
        routes: {
            "new": {
                handler: async () => {
                    alert("New Route");
                }
            }
        }
    },
    "/home": {
        handler: home,
        routes: {
            "/me": {
                handler: async () => {
                    alert("New Route2222");
                },
                routes: {
                    "/infomation": {
                        handler: async () => {
                            alert("New Route333");
                        },
                    }
                }
            }
        }
    },
    "/about": {
        handler: async () => {
            let app = document.getElementById('app')
            let btn = document.createElement('button')
            btn.addEventListener('click',()=>{
                goRouter('/home')
            })
            btn.innerText = '点击返回首页'
            app.appendChild(btn)
        },
        routes:{
            "/new":{
                handler: () => import('../view/poem.tea').then(module => module.default()),
            }
        }
    },
    "/poem": {
        handler: () => import('../view/poem.tea').then(module => module.default()),
        meta: { requiresAuth: true}
    }, 
    "/tea": {
        handler: () => import('../view/demo.tea').then(module => module.default()),
        meta: { requiresAuth: true }
    },
    "/test":{
        handler: () => import('../view/test.tea').then(module => module.default())
    },
};

export const gorouter = (message) => {
    goRouter(message)
};

