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

  // extract orange part in the original image.
  cv::Mat matOut;
  cv::cvtColor(matIn, matOut, cv::COLOR_RGBA2BGR);
  cv::cvtColor(matOut, matOut, cv::COLOR_BGR2HSV);
  cv::Mat mask;
  cv::inRange(matOut, cv::Scalar(5, 50, 50), cv::Scalar(45, 255, 255), mask);

  // Draw orange contour.
  std::vector<std::vector<cv::Point>> contours;
  std::vector<cv::Vec4i> hierarchy;
  cv::findContours(mask, contours, hierarchy, cv::RETR_TREE,
                   cv::CHAIN_APPROX_SIMPLE);

  for (auto it = contours.begin(); it != contours.end(); ++it) {
    cv::drawContours(matIn, contours, it - contours.begin(),
                     cv::Scalar(255, 69, 0), 5);
  }

  EM_ASM({ console.log("[DEBUG] Send message from wasm"); });
}
}
