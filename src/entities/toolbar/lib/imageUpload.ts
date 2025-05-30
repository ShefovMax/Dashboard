import type { Dispatch } from 'redux';

import { addElement } from '@entities/canvas/model/slice';

const imageUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  canvasWidth: number,
  canvasHeight: number,
  dispatch: Dispatch
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    const src = ev.target?.result as string;

    dispatch(
      addElement({
        id: crypto.randomUUID(),
        type: 'image',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        canvasWidth,
        canvasHeight,
        src
      })
    );
  };
  reader.readAsDataURL(file);
};

export default imageUpload;
