interface BaseParam{
  value: string | any[];
  errorMsg: string;
}

interface MaxLengthParam extends BaseParam{
  max?: number;
}

interface MinLengthParam extends BaseParam {
  min?: number;
}

export const inputCheck = {
  isNotEmpty({ value, errorMsg }: BaseParam): string {
    return value === '' ? errorMsg : '';
  },
  maxLength({ value, max = 0, errorMsg }: MaxLengthParam): string {
    return value.length > max ? errorMsg : '';
  },
  minLength({ value, min = 1, errorMsg }: MinLengthParam): string {
    return value.length < min ? errorMsg : '';
  },
};

export default {};
