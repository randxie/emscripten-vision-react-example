import { useWasm } from "react-wasm";
import { createWebVisionModule } from "./vision_utils";

// supposing an "add.wasm" module that exports a single function "add"
export const ImageProcessor = (imgRef) => {
  // load wasm
  /*
  const { loading, error, wasmData } = useWasm({
    url: wasmBin,
  });

  if (loading) {
    console.log("Loading...");
    return;
  }
  if (error) {
    console.log("Seeing error: " + error);
    return;
  }
  const { wasmModule, wasmInstance } = wasmData;
  */

  // Get image from Konva Image layer.
  const canvas = imgRef.toCanvas();
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //wasmInstance.exports.processImage(imageData, canvas.width, canvas.height);
};
