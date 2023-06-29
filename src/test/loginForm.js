export const TeaLoginForm = async () => {
    let usernameTag = document.getElementById('Tea-login-username')
    let passwordTag = document.getElementById('Tea-login-password')
    if (usernameTag.value === '') {
        throw usernameTag.getAttribute('warn');
    }
    if(passwordTag.value === ''){
        throw passwordTag.getAttribute('warn')
    }
    return new Promise((resolve, reject) => {
        const data = {
            username: usernameTag.value,
            password: passwordTag.value,
        };
        resolve(data); // 将数据对象传递给resolve
    });
}
