import exampleImage from "./sudoku-1.png";
import React, { useEffect, useRef } from "react";
import useImage from "use-image";
import { Image, Layer, Stage } from "react-konva";
import "./App.css";
import {ImageProcessor} from "./Processing";

function App() {
  const originalImgRef = useRef(null);
  const processedImgRef = useRef(null);
  const [image, _] = useImage(exampleImage, "Anonymous");
  const [processedImage, status] = useImage(exampleImage, "Anonymous");
  
  ImageProcessor(processedImgRef);

  return (
    <div className="App">
      <Stage
        width={image ? image.width * 3 : 0}
        height={image ? image.height : 0}
        draggable={false}
      >
        <Layer imageSmoothingEnabled={false}>
          <Image
            ref={originalImgRef}
            x={0}
            y={0}
            width={image ? image.width : 0}
            height={image ? image.height : 0}
            image={image}
            draggable={false}
          />
        </Layer>
        <Layer imageSmoothingEnabled={false}>
          <Image
            ref={processedImgRef}
            x={processedImage ? processedImage.width + 10 : 0}
            y={0}
            width={processedImage ? processedImage.width : 0}
            height={processedImage ? processedImage.height : 0}
            image={processedImage}
            draggable={false}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
