import { merge } from './utils';
import Monitor from './monitor';
class Log extends Monitor {
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
  }
  public report(info: SendData): void {
    info = merge({}, this.data, info);
    this.send(info);
  }
}

export default Log;
