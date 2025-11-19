"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./src/middleware.js":
/*!***************************!*\
  !*** ./src/middleware.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(middleware)/./node_modules/next/dist/compiled/react/react.react-server.js\");\n\n\nfunction middleware(req) {\n    const { pathname } = req.nextUrl;\n    // console.log(req.nextUrl);\n    if (pathname.startsWith(\"/admin\")) {\n        const admin_token = req.cookies.get(\"admin_token\");\n        if (!admin_token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/admin-login\", req.url));\n        }\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (middleware);\nconst config = {\n    matcher: [\n        \"/admin/:path*\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEyQztBQUNqQjtBQUUxQixTQUFTRSxXQUFXQyxHQUFHO0lBQ3JCLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdELElBQUlFLE9BQU87SUFDaEMsNEJBQTRCO0lBQzVCLElBQUlELFNBQVNFLFVBQVUsQ0FBQyxXQUFXO1FBQ2pDLE1BQU1DLGNBQWNKLElBQUlLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO1FBQ3BDLElBQUksQ0FBQ0YsYUFBYTtZQUNoQixPQUFPUCxxREFBWUEsQ0FBQ1UsUUFBUSxDQUFDLElBQUlDLElBQUksZ0JBQWdCUixJQUFJUyxHQUFHO1FBQzlEO0lBQ0Y7SUFDQSxPQUFPWixxREFBWUEsQ0FBQ2EsSUFBSTtBQUMxQjtBQUVBLGlFQUFlWCxVQUFVQSxFQUFDO0FBRW5CLE1BQU1ZLFNBQVM7SUFDcEJDLFNBQVM7UUFBQztLQUFnQjtBQUM1QixFQUFFIiwic291cmNlcyI6WyJEOlxcV3MgQ3ViZSBUZWNoIFByb2plY3RcXEZ1bGwgU3RhY2sgUHJvamVjdFxcSVNob3BcXGZyb250ZW5kXFxzcmNcXG1pZGRsZXdhcmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmZ1bmN0aW9uIG1pZGRsZXdhcmUocmVxKSB7XHJcbiAgY29uc3QgeyBwYXRobmFtZSB9ID0gcmVxLm5leHRVcmw7XHJcbiAgLy8gY29uc29sZS5sb2cocmVxLm5leHRVcmwpO1xyXG4gIGlmIChwYXRobmFtZS5zdGFydHNXaXRoKFwiL2FkbWluXCIpKSB7XHJcbiAgICBjb25zdCBhZG1pbl90b2tlbiA9IHJlcS5jb29raWVzLmdldChcImFkbWluX3Rva2VuXCIpO1xyXG4gICAgaWYgKCFhZG1pbl90b2tlbikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KG5ldyBVUkwoXCIvYWRtaW4tbG9naW5cIiwgcmVxLnVybCkpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gTmV4dFJlc3BvbnNlLm5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWlkZGxld2FyZTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XHJcbiAgbWF0Y2hlcjogW1wiL2FkbWluLzpwYXRoKlwiXSxcclxufTtcclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlJlYWN0IiwibWlkZGxld2FyZSIsInJlcSIsInBhdGhuYW1lIiwibmV4dFVybCIsInN0YXJ0c1dpdGgiLCJhZG1pbl90b2tlbiIsImNvb2tpZXMiLCJnZXQiLCJyZWRpcmVjdCIsIlVSTCIsInVybCIsIm5leHQiLCJjb25maWciLCJtYXRjaGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.js\n");

/***/ })

});