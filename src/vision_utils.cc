#include <emscripten.h>
#include <algorithm>
#include <cstring>
#include <opencv2/core/mat.hpp>
#include <opencv2/imgcodecs.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <vector>

extern "C" {

EMSCRIPTEN_KEEPALIVE
void processImage(uchar *array, int width, int height) {
  cv::Mat matIn(height, width, CV_8UC4, array);
  cv::flip(matIn, matIn, 1);

  EM_ASM({ console.log("[DEBUG] Send message from wasm"); });
}
}
