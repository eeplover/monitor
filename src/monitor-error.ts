import { merge } from './utils';
import Monitor from './monitor';
class ErrorMonitor extends Monitor {
  public data: SendData;
  public send: SendFn;
  constructor(options: Options) {
    super(options);
    const { data, send } = options;
    this.data = merge({}, data);
    this.send = send;
  }
  public init(data?: SendData): void {
    this.data = merge({}, this.data, data);
    // 捕获全局 Promise 异常
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      this.report({ message: event.reason });
    });
    // 捕获全局 js 异常
    window.addEventListener('error', (event: ErrorEvent) => {
      this.report(event);
    });
    // 捕获文件加载异常
    window.addEventListener(
      'error',
      (event: ErrorEvent) => {
        this.report(event);
      },
      true
    );
    // 捕获请求异常，封装 XMLHttpRequest 和 Fetch
    const rawXMLHttpRequest = window.XMLHttpRequest;
    const rawFetch = window.fetch;
    // TODO
  }

  public report(info: SendData): void {
    info = merge({}, this.data, info);
    this.send(info);
  }
}

export default ErrorMonitor;
