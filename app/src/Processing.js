import { useEffect, useState } from "react";

let VisionModule = require("./vision_utils.js");

export const ImageProcessor = (originImgRef) => {
  const [visionUtilMod, setVisionUtilMod] = useState(null);
  const processedImgCanvas = document.createElement("canvas");

  useEffect(() => {
    (async () => {
      const mod = await VisionModule();
      setVisionUtilMod(mod);
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  if (visionUtilMod) {
    if (originImgRef?.current) {
      const canvas = originImgRef.current.toCanvas();
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // allocate wasm memory
      const memory = visionUtilMod._malloc(imageData.data.length); // Allocating WASM memory
      visionUtilMod.HEAPU8.set(imageData.data, memory); // Copying JS image data to WASM memory
      visionUtilMod._processImage(memory, imageData.width, imageData.height);

      // copy data from wasm memory to JS image data.
      const finalImage = visionUtilMod.HEAPU8.subarray(
        memory,
        memory + imageData.data.length
      );

      // free memory to prevent browser crash
      visionUtilMod._free(memory); // Freeing WASM memory

      processedImgCanvas.width = imageData.width;
      processedImgCanvas.height = imageData.height;
      const outputCtx = processedImgCanvas.getContext("2d");
      const processedImg = outputCtx.createImageData(
        imageData.width,
        imageData.height
      );

      processedImg.data.set(finalImage);
      outputCtx.putImageData(processedImg, 0, 0);
    }
  }

  return processedImgCanvas;
};
