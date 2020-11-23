import googleLogo from '@/static/image/search/google-logo.png';
import baiduLogo from '@/static/image/search/baidu-logo.png';
import bingLogo from '@/static/image/search/biying-logo.png';
import { UnknownObj } from '@/global/global';
import { SearchSourceItem } from './index.d';

export const searchList: SearchSourceItem[] = [
  {
    name: 'Google',
    id: 'google',
    image: googleLogo,
    baseUrl: 'https://www.google.com/complete/search',
    callbackKey: 'jsonp',
    getParams(value: string): UnknownObj {
      return {
        client: 'youtube',
        q: value,
      };
    },
  },
  {
    name: '百度',
    id: 'baidu',
    image: baiduLogo,
    baseUrl: 'http://suggestion.baidu.com/su',
    callbackKey: 'cb',
    getParams(value: string): UnknownObj {
      return {
        wd: value,
        p: 3,
      };
    },
  },
  {
    name: 'Bing',
    id: 'bing',
    image: bingLogo,
    baseUrl: 'https://api.bing.com/qsonhs.aspx',
    callbackKey: 'cb',
    getParams(value: string): UnknownObj {
      return {
        type: 'cb',
        q: value,
      };
    },
  },
];

export default {};
