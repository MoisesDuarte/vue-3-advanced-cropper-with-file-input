export function resizeDataUrlImage({ dataUrl, width, height }) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const resizedDataUrl = canvas.toDataURL();
      resolve(resizedDataUrl);
    };

    img.src = dataUrl;
  });
}

