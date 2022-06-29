import { useWasm } from "react-wasm";

const getImageData = () => {
  const canvas = document.getElementById("input-image");
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return imageData;
};

// supposing an "add.wasm" module that exports a single function "add"
const WasmLoader = () => {
  const { loading, error, wasmData } = useWasm({
    url: "/vision_utils.wasm",
  });

  if (loading) return "Loading...";
  if (error) return "An error has occurred";

  const { wasmModule, wasmInstance } = wasmData;
  const { imgData, width, height } = getImageData();
  const addr = wasmInstance.exports.processImage(imgData, width, height);
  wasmModule._free(addr);
  return <div>addr</div>;
};
