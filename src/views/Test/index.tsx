import React, { ReactElement, useState } from 'react';

export default function Index(): ReactElement {
  const [name, setName] = useState('Test');

  return (
    <div>
      <p>
        Name is:
        {name}
      </p>
      <button type="button" onClick={() => { setName(`${name + 1}`); }}>改变</button>
    </div>
  );
}
