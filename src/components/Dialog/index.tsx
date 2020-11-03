import React, { ReactElement } from 'react';
import closeImage from '../../static/image/close.png';
import './dialog.styl';

export interface DialogProps {
  visible?: boolean;
  title?: string;
  width?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  children?: ReactElement;
}

export default function Dialog(props: DialogProps): ReactElement {
  const {
    title, children, width, onClose,
  } = props;
  return (
    <div className="dialog-wrap">
      <div className="dialog" style={{ width: width || '520px' }}>
        <button
          type="button"
          className="dialog__close not-focus"
          onClick={() => { if (onClose) onClose(); }}
        >
          x
        </button>

        <header className="dialog__header">
          <b>{title}</b>
        </header>

        <div className="dialog__body">
          {children}
        </div>

        <footer className="dialog__footer">
          footer
        </footer>
      </div>
    </div>
  );
}
