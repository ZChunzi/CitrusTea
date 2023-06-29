
/**
 * 弹窗按钮组件
 * @param {object} options 配置选项
 * @param {function} options.requestFunction 请求函数，点击按钮时执行的异步函数
 * @param {string} options.value 按钮显示的文本内容
 * @param {number} options.duration 弹窗显示的持续时间（单位：毫秒）
 * @param {string} options.className 按钮的CSS类名
 */
export const ButtonAlert = async ({requestFunction, value, duration,className}) => {
    let button = document.createElement("button");
    let app = document.getElementById("app");
    button.innerText = value;
    button.className = className;
    const handleButtonClick = async () => {
        const data = await requestFunction(button);
        AlertMessage(data, duration);
    };

    button.addEventListener("click", handleButtonClick);

    app.appendChild(button);
};

/**
 * 弹窗组件
 * @param {string} data 弹窗显示的文本内容
 * @param {number} duration 弹窗显示的持续时间（单位：毫秒）
 */
export const AlertMessage = async (data, duration=2000) => {
    let app = document.getElementsByTagName('body')[0]
    const style = {
        position: "fixed",
        top: "10%",
        left: "47%",
        zIndex: 9999999,
        background: "#229954 ",
        borderRadius: "3px",
        color: "rgb(255, 255, 255)",
        fontSize: "0.8em",
        padding: "0.8em",
    };
    let floatingDiv = document.createElement("div");
    floatingDiv.innerText = data;
    floatingDiv.className = "floating-div";
    Object.assign(floatingDiv.style, style);

    // 将悬浮的 div 添加到 app 中
    app.appendChild(floatingDiv);
    floatingDiv.style.transition = `transform ${duration / 1000}s linear`;
    floatingDiv.style.transform = "translateY(0)";

    // 设置消失时间
    setTimeout(() => {
        floatingDiv.remove();
    }, duration);
};

/**
 * 按钮组件
 * @param {object} options 配置选项
 * @param {function} options.requestFunction 点击按钮时执行的异步函数
 * @param {string} options.value 按钮显示的文本内容
 * @param {string} options.className 按钮的CSS类名
 */
export const Button = async ({requestFunction, value,className}) => {
    let button = document.createElement("button");
    let app = document.getElementById("app");
    button.innerText = value;
    button.className = className;
    button.addEventListener("click", async () => {
        await requestFunction();
    });

    app.appendChild(button);
};