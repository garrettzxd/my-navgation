import { UnknownObj } from '@/global/global';

export interface SearchSourceItem {
  name: string;
  id: string;
  image: string;
  baseUrl: string;
  callbackKey: string;
  getParams: (val: string) => UnknownObj;
}

export default {};
