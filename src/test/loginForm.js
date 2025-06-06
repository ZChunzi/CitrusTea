export const TeaLoginForm = async () => {
    let usernameTag = document.getElementById('Tea-login-username')
    let passwordTag = document.getElementById('Tea-login-password')
    const username = usernameTag.value.trim()
    const password = passwordTag.value.trim()
    if (username === '') {
        throw usernameTag.getAttribute('warn');
    }
    if (password === '') {
        throw passwordTag.getAttribute('warn')
    }
    return new Promise((resolve, reject) => {
        const data = {
            username,
            password,
        };
        resolve(data); // 将数据对象传递给resolve
    });
}
