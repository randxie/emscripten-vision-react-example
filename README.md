# emscripten-vision

## Prerequisite

1. Install emscripten by following instructions in https://emscripten.org/docs/getting_started/downloads.html
2. Run build scripts
3. Build opencv wasm: `EMSCRIPTEN=~/emsdk/upstream/emscripten python3 opencv/platforms/js/build_js.py opencv/build_wasm --build_wasm`

## Set up Cpp in VSCode

Add and change the path to workspace.json
```
{
    "C_Cpp.default.includePath": [
        "${workspaceFolder}/opencv/include",
        "/home/randxie/emsdk/upstream/emscripten/system/include",
    ],
}
```

## Build wasm

```
cd build
emcmake cmake ..
emmake make
```

It will generate vision_utils.wasm.

## Run the react app
Make sure you have done "nvm use v16.13.2"

## Reference

[1] https://github.com/taylorjg/emscripten-opencv
[2] https://blog.logrocket.com/image-styling-and-filters-using-webassembly/