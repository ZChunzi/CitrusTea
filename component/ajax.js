/**
 * ajax封装类
 * @class Ajax
 * @constructor
 * @param {}
 */
class Ajax {
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.xhr.overrideMimeType('application/json;charset=utf-8');
        this.xhr.withCredentials = false;
        this.baseurl = '';
        this.headers = {};
    }
    /**
     * 方法说明
     * @method create
     * @for Ajax
     * @param {string} baseurl 初始化连接
     */
    create(baseurl) {
        this.baseurl = baseurl;
        return this;
    }

    /**
     * 设置请求头
     * @method setHeader
     * @param {string} key 请求头键
     * @param {string} value 请求头值
     */
    setHeader(key, value) {
        this.headers[key] = value;
    }

    /**
     * 批量设置请求头
     * @method setHeaders
     * @param {object} headers 请求头对象
     */
    setHeaders(headers) {
        this.headers = Object.assign(this.headers, headers);
    }

    /**
     * 发起GET请求
     * @method get
     * @param {string} url 请求URL
     * @param {object} params 请求参数
     * @return {Promise} 请求的Promise对象
     */
    get(url, params = {}) {
        let requestUrl = `${this.baseurl}${url}`;
        if (Object.keys(params).length > 0) {
            requestUrl += '?';
            for (const key in params) {
                requestUrl += `${key}=${params[key]}&`;
            }
            requestUrl = requestUrl.slice(0, -1);
        }
        this.xhr.open('GET', requestUrl);
        this.setHeaders(this.headers);
        return this.sendRequest();
    }

    /**
     * 发起POST请求
     * @method post
     * @param {string} url 请求URL
     * @param {object} data 请求数据
     * @return {Promise} 请求的Promise对象
     */
    post(url, data = {}) {
        const requestUrl = `${this.baseurl}${url}`;
        this.xhr.open('POST', requestUrl);
        this.setHeaders(this.headers);
        this.xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        const requestBody = JSON.stringify(data);
        return this.sendRequest(requestBody);
    }

    /**
     * 发起put请求
     * @method put
     * @param {string} url 请求URL
     * @param {object} data 请求数据
     * @return {Promise} 请求的Promise对象
     */
    put(url, data = {}) {
        const requestUrl = `${this.baseurl}${url}`;
        this.xhr.open('PUT', requestUrl);
        this.setHeaders(this.headers);
        this.xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        const requestBody = JSON.stringify(data);
        return this.sendRequest(requestBody);
    }

    /**
     * 发起delete请求
     * @method delete
     * @param {string} url 请求URL
     * @param {object} params 请求参数
     * @return {Promise} 请求的Promise对象
     */
    delete(url) {
        const requestUrl = `${this.baseurl}${url}`;
        this.xhr.open('DELETE', requestUrl);
        this.setHeaders(this.headers);
        return this.sendRequest();
    }

    /**
     * 发送请求
     * @method sendRequest
     * @param {string} requestBody 请求体
     * @return {Promise} 请求的Promise对象
     */
    sendRequest(requestBody) {
        return new Promise((resolve, reject) => {
            this.xhr.onload = () => {
                if (this.xhr.readyState === 4) {
                    if (this.xhr.status === 200) {
                        let responseData;
                        try {
                            responseData = JSON.parse(this.xhr.responseText);
                        } catch {
                            responseData = this.xhr.responseText;
                        }
                        const response = { code: this.xhr.status, data: responseData };
                        resolve(response);
                    } else {
                        reject(new Error(this.xhr.statusText));
                    }
                }
            };

            this.xhr.onerror = () => {
                reject(new Error('Network Error'));
            };

            for (const key in this.headers) {
                this.xhr.setRequestHeader(key, this.headers[key]);
            }

            if (requestBody) {
                this.xhr.send(requestBody);
            } else {
                this.xhr.send();
            }
        });
    }
}

const ajax = new Ajax();

export default ajax;