import React, { ReactElement } from 'react';
import './navContent.styl';

export default function NavContent(): ReactElement {
  return (
    <div className="navContent">
      <div className="flex justify-between">
        <div><b>title</b></div>
        <div>search</div>
      </div>

      <div className="navContent__detail">
        <a href="https://www.baidu.com" className="navContent__item">
          <div className="navContent__item__logo">
            <img src="https://www.jianfast.com/static/home/images/siteimg/i0.png" alt="logo" />
          </div>
          <div className="navContent__item__text"><b>说明</b></div>
        </a>
      </div>
    </div>
  );
}
