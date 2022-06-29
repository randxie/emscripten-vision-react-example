set(OPENCV_DIR "opencv")

cmake_minimum_required(VERSION 3.1)
project(WebVision)

# Use C++ 17 by default
set(CMAKE_CXX_STANDARD 17)

# Set Release as default build type
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif(NOT CMAKE_BUILD_TYPE)

# Does not work
# find_package(OpenCV REQUIRED PATHS "${OPENCV_DIR}/build_wasm" NO_DEFAULT_PATH)

# Needed for opencv2/opencv.hpp
include_directories("${OPENCV_DIR}/include")

# Needed by opencv.hpp for opencv2/opencv_modules.hpp
include_directories("${OPENCV_DIR}/build_wasm")

# Needed by opencv_modules.hpp for every module
file(GLOB opencv_include_modules "${OPENCV_DIR}/modules/*/include")
include_directories(${opencv_include_modules})

# Add vision utils
add_executable(vision_utils src/vision_utils.cc)

# Link to opencv.js precompiled libraries
file(GLOB opencv_libs "${OPENCV_DIR}/build_wasm/lib/*.a")
target_link_libraries(vision_utils ${opencv_libs})

# There is an issue regarding the order in which libraries
# are passed to the compiler - pass libopencv_core.a last
# https://answers.opencv.org/question/186124/undefined-reference-to-cvsoftdoubleoperator/
file(GLOB opencv_lib_core "${OPENCV_DIR}/build_wasm/lib/libopencv_core.a")
target_link_libraries(vision_utils ${opencv_lib_core})

# Specify linker arguments
set_target_properties(vision_utils PROPERTIES LINK_FLAGS "-s EXPORTED_RUNTIME_METHODS=cwrap -s EXPORTED_FUNCTIONS=_free -s MODULARIZE=1 -s EXPORT_NAME=createWebVisionModule")
