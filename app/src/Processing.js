import React, { useEffect, useRef, useState } from "react";

let VisionModule = require("./vision_utils.js");

export const ImageProcessor = (originImgRef, processedImgRef) => {
  const [visionUtilMod, setVisionUtilMod] = useState(null);

  useEffect(() => {
    (async () => {
      const mod = await VisionModule();
      setVisionUtilMod(mod);
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  console.log(originImgRef);
  if (visionUtilMod) {
    if (originImgRef?.current) {
      const canvas = originImgRef.current.toCanvas();
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // allocate wasm memory
      const memory = visionUtilMod._malloc(imageData.data.length); // Allocating WASM memory
      visionUtilMod.HEAPU8.set(imageData.data, memory); // Copying JS image data to WASM memory
      visionUtilMod._processImage(memory, imageData.width, imageData.height);
      console.log(imageData.data.length);
      const finalImage = visionUtilMod.HEAPU8.subarray(
        memory,
        memory + imageData.data.length
      );

      // free memory to prevent browser crash
      visionUtilMod._free(memory); // Freeing WASM memory
      console.log(imageData.data);
      console.log(finalImage);

      if (processedImgRef?.current) {
        const outputCanvas = processedImgRef.current;
        const outputCtx = outputCanvas.getContext("2d");
        imageData.data.set(finalImage);
        console.log(imageData.data);
        outputCtx.putImageData(imageData, 0, 0);
      }
    }
  }
};
