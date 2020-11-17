import { UnknownObj } from '@/global/global';

interface findIndexParameter {
  source: UnknownObj[];
  key: string;
  value: unknown;
}

// eslint-disable-next-line
const findIndex = ({ source, key, value }: findIndexParameter): number => {
  return source.reduce((acc, item, index) => {
    // eslint-disable-next-line no-param-reassign
    if (item[key] === value) acc = index;
    return acc;
  }, -1);
};

export default findIndex;
