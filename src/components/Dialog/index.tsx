import React, { ReactElement, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './dialog.styl';

export interface DialogProps {
  visible?: boolean;
  title?: string;
  width?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  children?: ReactElement;
}

export default function Dialog(props: DialogProps): null {
  const isInit = useRef(true);
  let wrapper: HTMLElement;

  const {
    visible = false, title, children, width, onClose,
  } = props;
  const dialog = (
    <div className="dialog-wrap" style={{ visibility: visible ? 'visible' : 'hidden' }}>
      <div
        className="dialog"
        style={{ width: width || '520px', visibility: visible ? 'visible' : 'hidden' }}
      >
        <button
          type="button"
          className="dialog__close not-focus"
          onClick={() => {
            if (onClose) onClose();
          }}
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

  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
    } else if (!wrapper) {
      wrapper = document.createElement('div');
      document.body.appendChild(wrapper);
      ReactDOM.render(dialog, wrapper);
      console.log('effect', visible, wrapper);
    }
  }, [visible]);

  return null;
}
