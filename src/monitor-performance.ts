import { merge } from './utils';
import Monitor from './monitor';
export class PerformanceMonitor extends Monitor {
  public data: SendData;
  public send: SendFn;
  constructor(options: Options) {
    super(options);
    const { data, send } = options;
    this.data = merge({}, data);
    this.send = send;
  }
  public init(data: SendData): void {
    this.data = merge({}, this.data, data);
    // 离开页面的时候上报
    window.addEventListener(
      'unload',
      () => {
        const info = {};
        this.report(info);
      },
      false
    );
  }
  public report(info: SendData): void {
    info = merge({}, this.data, info);
    this.send(info);
  }
}

export default PerformanceMonitor;
