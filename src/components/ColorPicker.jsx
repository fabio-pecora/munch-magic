import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

function ColorPicker({handleColorChange, color}) {

  return (
    <div>
      <ChromePicker color={color} onChange={handleColorChange} />
    </div>
  );
}

export default ColorPicker;
