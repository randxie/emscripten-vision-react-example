#include <emscripten.h>
#include <algorithm>
#include <cstring>
#include <opencv2/core/mat.hpp>
#include <opencv2/imgcodecs.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <vector>

using namespace std;
using namespace cv;

extern "C" {

EMSCRIPTEN_KEEPALIVE
void processImage(uchar *array, int width, int height) {
  Mat matIn(height, width, CV_8UC4, array);

  auto ksize = Size(25, 25);
  auto sigmaX = 0.5;
  Rect rect(0, 0, 100, 100);
  GaussianBlur(matIn, matIn, ksize, sigmaX, sigmaX);
  cv::rectangle(matIn, rect, cv::Scalar(0, 255, 0));
  EM_ASM({ console.log('I received: ' + $0); }, 100);
}
}
