export function imageToBase64(file, quality = 0.7) {
  return new Promise((resolve, reject) => {
    // Log the original file size
    console.log("Original File Size:", (file.size / 1024).toFixed(2), "KB");

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Adjust the quality for compression
      const dataUrl = canvas.toDataURL(file.type, quality);

      // Calculate and log the size of the compressed image
      const compressedSize = Math.round((dataUrl.length * (3/4)) / 1024);
      console.log("Compressed File Size:", compressedSize, "KB");

      resolve(dataUrl);
    };

    img.onerror = () => {
      reject(new Error('There was an error loading the image.'));
    };

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
