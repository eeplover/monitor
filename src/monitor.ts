declare global {
  interface SendData {
    type?: string;
    message?: string;
  }
  interface BaseOptions {
    data?: SendData;
  }
  type SendFn = (info: SendData) => void;
  type Options = BaseOptions & {
    data?: SendData;
    send: SendFn;
  };
}
abstract class Monitor {
  constructor(options: BaseOptions) {
    const { data } = options;
    this.init(data);
  }
  abstract init(data?: SendData): void;
  abstract report(info: SendData): void;
}

export default Monitor;
