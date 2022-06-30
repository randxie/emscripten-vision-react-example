# emscripten-vision

## Prerequisite

### Required packages

To compile C++ code into wasm and run the React app, we need:
1. emscripten, install by following instructions in https://emscripten.org/docs/getting_started/downloads.html
2. node.js

### Compile opencv

1. `git submodule init` to pull opencv repo
2. Find out your emscripten path `$EMSCRIPTEN_PATH`
3. Build opencv wasm by running `EMSCRIPTEN=$EMSCRIPTEN_PATH python3 opencv/platforms/js/build_js.py opencv/build_wasm --build_wasm`

For linux machine, the common EMSCRIPTEN_PATH is `export EMSCRIPTEN_PATH=~/emsdk/upstream/emscripten`

### [Can Skip] Set up Cpp in VSCode

Modify and add the path to workspace.json.
```
{
    "C_Cpp.default.includePath": [
        "${workspaceFolder}/opencv/include",
        "/home/randxie/emsdk/upstream/emscripten/system/include",
    ],
}
```

### Compiler C++ into wasm

```
make build-wasm
```

It will generate `vision_utils.js` that gets copied to `app/src`.

### Run the react app

```
make run-app
```

## Reference

[1] https://github.com/taylorjg/emscripten-opencv
[2] https://blog.logrocket.com/image-styling-and-filters-using-webassembly/