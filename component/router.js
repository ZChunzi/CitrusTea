/**
 * 路由函数，用于切换页面内容
 * @param {object} routes 路由映射表，包含不同路由对应的处理函数
 * @param {string} path 当前路径
 */
export const router = async (routes, path) => {
  const currentPath = path || getCurrentPath();
  const route = routes[currentPath];

  if (route) {
    clearAppNode();
    await route();
  } else {
    handleNotFoundRoute();
  }
};

/**
 * 清空页面内容
 */
const clearAppNode = () => {
  let app = document.getElementById("app");
  while (app.firstChild) {
    app.firstChild.remove();
  }
};

/**
 * 处理找不到路由的情况
 */
const handleNotFoundRoute = () => {
  let app = document.getElementById("app");
  app.innerHTML = "404: Page Not Found";
};

/**
 * 获取当前路径
 * @returns {string} 当前路径
 */
const getCurrentPath = () => {
  return window.location.pathname;
};
