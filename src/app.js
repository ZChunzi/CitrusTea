import {Router} from './component/router.js';
import { routes } from './router/index.js';
import { $setToken } from './utils/request.js';

const router = new Router(routes);
router.create()

let token = sessionStorage.getItem('token');
if (token) {
  $setToken(token);
}

// const jump = async() => {
//   if(!token&&router.auth!==true){
//     console.log(router.auth)
//     await AlertMessage("test")
//     router.push('/tea');
//   }
// }

const goRouter = (to) => {
  router.push(to);
};

export { goRouter };
