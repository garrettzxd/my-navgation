import { inputCheck } from '@/helper/formCheck';

type RuleNameType = 'isNotEmpty' | 'maxLength' | 'minLength';

interface RuleItem {
  ruleName: RuleNameType;
  errorMsg: string;
  [key: string]: any;
}

interface CheckClassAddParam {
  value: any;
  ruleList: RuleItem[];
}

interface CatchItem extends RuleItem{
  value: any,
  [key: string]: any;
}

export default class CheckClass {
  cache: CatchItem[] = [];

  add(data: CheckClassAddParam): void {
    const { value, ruleList } = data;
    ruleList.forEach((item) => {
      this.cache.push({ value, ...item });
    });
  }

  start(): string {
    for (let i = 0, len = this.cache.length; i < len; i += 1) {
      const { ruleName } = this.cache[i];
      const checkFunction = inputCheck[ruleName];
      if (checkFunction) {
        const result = checkFunction(this.cache[i]);
        if (result) return result;
      }
    }
    return '';
  }
}
