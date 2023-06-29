import { AlertMessage } from "./buttonAlert.js";
export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentPath = this.getCurrentPath();
    this.route = this.findRoute(this.routes, this.currentPath);
  }

  push(to) {
    window.history.pushState(null, null, to);
    this.currentPath = this.getCurrentPath();
    this.route = this.findRoute(this.routes, this.currentPath);
    this.create();
  }


  //路由守卫配置
  guard() {
    let token = sessionStorage.getItem('token');

    if (!token) {
      try {
        this.auth = this.route.meta.requiresAuth
      } catch (error) {
        this.auth = false
      }
      if (this.currentPath !== '/tea' && this.auth !== true) {
        AlertMessage("请先登录")
        this.push('/tea');
      }
    } else {
      if (this.currentPath === '/tea') {
        this.push('/home');
      }
    }

  }

  async create() {
    this.guard()
    if (this.route) {
      this.clearAppNode();
      await this.route.handler();
    } else {
      this.handleNotFoundRoute();
    }
  }


  findRoute(routes, path) {
    const keys = Object.keys(routes);
    for (let i = 0; i < keys.length; i++) {
      const routePath = keys[i];
      const route = routes[routePath];
      if (path.startsWith(routePath)) {
        if (path === routePath || !route.hasOwnProperty("routes")) {
          return {
            path: routePath,
            handler: route.handler,
            meta: route.meta
          };
        } else if (typeof route === "object" && route.hasOwnProperty("routes")) {
          const subRoutePath = path.slice(routePath.length);
          const subRoute = this.findRoute(route.routes, subRoutePath);
          if (subRoute) {
            return {
              path: routePath + subRoute.path,
              handler: subRoute.handler
            };
          }
        }
      }
    }
    return null;
  }

  clearAppNode() {
    let app = document.getElementById("app");
    while (app.firstChild) {
      app.firstChild.remove();
    }
  }

  handleNotFoundRoute() {
    let app = document.getElementById("app");
    app.innerHTML = "404: 页面未找到";
  }

  getCurrentPath() {
    return window.location.pathname;
  }
}
