import React, { ReactElement } from 'react';

export interface ButtonProps {
  type?: 'primary' | 'default';
  size?: 'big' | 'medium' | 'small';
}

export default function Button(): ReactElement {
  return (
    <button type="button">按钮</button>
  );
}
