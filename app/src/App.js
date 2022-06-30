import exampleImage from "./orange.jpg";
import React, { useRef } from "react";
import useImage from "use-image";
import { Image, Layer, Stage } from "react-konva";
import "./App.css";
import { ImageProcessor } from "./Processing";

function App() {
  const originalImgRef = useRef(null);
  
  const [image, _] = useImage(exampleImage, "Anonymous");

  return (
    <div className="App">
      <Stage
        width={image ? image.width * 5 : 0}
        height={image ? image.height * 5 : 0}
        draggable={false}
      >
        <Layer imageSmoothingEnabled={false}>
          <Image
            ref={originalImgRef}
            x={10}
            y={0}
            width={image ? image.width : 0}
            height={image ? image.height : 0}
            image={image}
            draggable={true}
          />
          <Image
            x={image ? image.width + 20 : 0}
            y={0}
            image={ImageProcessor(originalImgRef)}
            draggable={true}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
