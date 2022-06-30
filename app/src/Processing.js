import { useEffect, useState } from "react";

let VisionModule = require("./vision_utils.js");

export const ImageProcessor = (originImgRef) => {
  // The wasm module is lazily loaded.
  const [visionUtilMod, setVisionUtilMod] = useState(null);

  // the output canvas
  const outputCanvas = document.createElement("canvas");

  // Load wasm module
  useEffect(() => {
    (async () => {
      const mod = await VisionModule();
      setVisionUtilMod(mod);
    })();

    return () => {};
  }, []);

  if (visionUtilMod) {
    if (originImgRef?.current) {
      // Get original image
      const canvas = originImgRef.current.toCanvas();
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const width = imageData.width;
      const height = imageData.height;

      // allocate wasm memory
      const memory = visionUtilMod._malloc(imageData.data.length);

      // copy JS image data to wasm memory.
      visionUtilMod.HEAPU8.set(imageData.data, memory);

      // Run the function that process the image.
      visionUtilMod._processImage(memory, width, height);

      // copy data from wasm memory back to JS image data.
      const outputImage = visionUtilMod.HEAPU8.subarray(
        memory,
        memory + imageData.data.length
      );

      // free memory to prevent browser crash
      visionUtilMod._free(memory);

      // Set output canvas to the processed image.
      outputCanvas.width = width;
      outputCanvas.height = height;
      const outputCtx = outputCanvas.getContext("2d");
      const processedImg = outputCtx.createImageData(
        imageData.width,
        imageData.height
      );
      processedImg.data.set(outputImage);
      outputCtx.putImageData(processedImg, 0, 0);
    }
  }

  return outputCanvas;
};
