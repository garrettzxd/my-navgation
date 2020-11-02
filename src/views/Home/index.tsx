import React, { ReactElement, useState } from 'react';
import loadable from '@loadable/component';
import './index.styl';

const NavContent = loadable(() => import('./NavContent'));

export default function Home(): ReactElement {
  return (
    <div className="home">
      <NavContent />
    </div>
  );
}
