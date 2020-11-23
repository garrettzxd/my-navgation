import { removeElement } from '@/helper/common';

interface JsonpParameter {
  url: string;
  callbackKey?: string;
  callback: (res: any) => void;
  params?: {
    [key: string]: string;
  }
}

/**
 * jsonp
 * @param url 请求地址
 * @param callback 请求回调函数
 * @param callbackKey 请求地址回调函数的key,
 * @param params 其他附加参数
 *
 * @example jsonp({url: 'https://google.com', callback: () => {}, callbackKey: 'cb');
 * => https://google.com?cb=callback
 * */
export default function jsonp({
  url, callback, callbackKey, params,
}: JsonpParameter): void {
  let finalUrl = `${url}?`;

  if (!callback || typeof callback !== 'function') {
    throw new Error('params callback missed!');
  }

  if (params) {
    Object.keys(params).forEach((key) => {
      finalUrl += `${key}=${encodeURIComponent(params[key])}&`;
    });
  }
  finalUrl += `${callbackKey || callback.name}=${callback.name}`;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = finalUrl;

  window[callback.name] = (res: any) => {
    window[callback.name] = undefined;
    removeElement(script);
    callback(res);
  };

  const head = document.getElementsByTagName('head');
  if (head && head[0]) {
    head[0].appendChild(script);
  }
}
