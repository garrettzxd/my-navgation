export const removeElement = (ele: HTMLElement): void => {
  const parent = ele.parentElement;
  if (!parent) {
    throw new Error(`element ${ele.tagName} do not have parent`);
    return;
  }

  parent.removeChild(ele);
};

export default {};
