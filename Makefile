# Build wasm
build-wasm:
	cd build && emcmake cmake .. && emmake make clean && emmake make && cd ..
	mv build/vision_utils.js app/src

run-app:
	cd app && npm start