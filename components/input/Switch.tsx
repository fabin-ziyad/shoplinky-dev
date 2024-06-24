import React from 'react';
import * as Switch from '@radix-ui/react-switch';

const SwitchDemo = ({ toggle, handleToggle }:any) => {
  const css = `
    .switch-root {
      width: 44px;
      height: 20px;
      background-color: gray;
      border-radius: 9999px;
      position: relative;
    }
    .switch-root.checked {
      background-color: black;
    }
    .switch-thumb {
      display: block;
      width: 17px;
      height: 17px;
      background-color: white;
      border-radius: 9999px;
      transition: transform 100ms;
      transform: translateX(2px);
      transition-duration: 0.4s;
    }
    .switch-thumb.checked {
      transform: translateX(25px);
      transition-duration: 0.4s;
    }
  `;

  return (
    <>
      <style>{css}</style>
      <form>
        <div className="flex items-center">
          <Switch.Root
            id="airplane-mode"
            className={`switch-root ${toggle ? 'checked' : ''}`}
            checked={toggle}
            onCheckedChange={handleToggle}
          >
            <Switch.Thumb className={`switch-thumb ${toggle ? 'checked' : ''}`} />
          </Switch.Root>
        </div>
      </form>
    </>
  );
};

export default SwitchDemo;
