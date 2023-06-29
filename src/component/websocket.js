export class WebSocketTool {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.onOpenCallback = null;
    this.onMessageCallback = null;
    this.onCloseCallback = null;
    this.onErrorCallback = null;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('连接已建立');
      if (this.onOpenCallback) {
        this.onOpenCallback();
      }
    };

    this.socket.onmessage = (event) => {
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data);
      }
    };

    this.socket.onclose = () => {
      console.log('连接已关闭');
      if (this.onCloseCallback) {
        this.onCloseCallback();
      }
    };

    this.socket.onerror = (error) => {
      console.error('发生错误:', error);
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
    };
  }

  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket 连接未建立');
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }

  setOnOpenCallback(callback) {
    this.onOpenCallback = callback;
  }

  setOnMessageCallback(callback) {
    this.onMessageCallback = callback;
  }

  setOnCloseCallback(callback) {
    this.onCloseCallback = callback;
  }

  setOnErrorCallback(callback) {
    this.onErrorCallback = callback;
  }
}