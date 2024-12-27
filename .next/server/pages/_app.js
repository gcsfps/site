/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./contexts/AuthContext.tsx":
/*!**********************************!*\
  !*** ./contexts/AuthContext.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    user: null,\n    token: null,\n    login: ()=>{},\n    logout: ()=>{},\n    isAuthenticated: false\n});\nfunction AuthProvider({ children }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [token, setToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Verificar se há token no localStorage\n        if (false) {}\n    }, []);\n    const login = (newToken, newUser)=>{\n        setToken(newToken);\n        setUser(newUser);\n        localStorage.setItem(\"token\", newToken);\n        localStorage.setItem(\"user\", JSON.stringify(newUser));\n    };\n    const logout = ()=>{\n        setToken(null);\n        setUser(null);\n        localStorage.removeItem(\"token\");\n        localStorage.removeItem(\"user\");\n        router.push(\"/login\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            token,\n            login,\n            logout,\n            isAuthenticated: !!token\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"c:\\\\Users\\\\cliente\\\\Documents\\\\github\\\\site\\\\contexts\\\\AuthContext.tsx\",\n        lineNumber: 60,\n        columnNumber: 5\n    }, this);\n}\nfunction useAuth() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0cy9BdXRoQ29udGV4dC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQThFO0FBQ3RDO0FBZ0J4QyxNQUFNTSw0QkFBY0wsb0RBQWFBLENBQWtCO0lBQ2pETSxNQUFNO0lBQ05DLE9BQU87SUFDUEMsT0FBTyxLQUFPO0lBQ2RDLFFBQVEsS0FBTztJQUNmQyxpQkFBaUI7QUFDbkI7QUFFTyxTQUFTQyxhQUFhLEVBQUVDLFFBQVEsRUFBaUM7SUFDdEUsTUFBTSxDQUFDTixNQUFNTyxRQUFRLEdBQUdaLCtDQUFRQSxDQUFjO0lBQzlDLE1BQU0sQ0FBQ00sT0FBT08sU0FBUyxHQUFHYiwrQ0FBUUEsQ0FBZ0I7SUFDbEQsTUFBTWMsU0FBU1gsc0RBQVNBO0lBRXhCRCxnREFBU0EsQ0FBQztRQUNSLHdDQUF3QztRQUN4QyxJQUFJLEtBQWtCLEVBQWEsRUFRbEM7SUFDSCxHQUFHLEVBQUU7SUFFTCxNQUFNSyxRQUFRLENBQUNjLFVBQWtCQztRQUMvQlQsU0FBU1E7UUFDVFQsUUFBUVU7UUFDUk4sYUFBYU8sT0FBTyxDQUFDLFNBQVNGO1FBQzlCTCxhQUFhTyxPQUFPLENBQUMsUUFBUUosS0FBS0ssU0FBUyxDQUFDRjtJQUM5QztJQUVBLE1BQU1kLFNBQVM7UUFDYkssU0FBUztRQUNURCxRQUFRO1FBQ1JJLGFBQWFTLFVBQVUsQ0FBQztRQUN4QlQsYUFBYVMsVUFBVSxDQUFDO1FBQ3hCWCxPQUFPWSxJQUFJLENBQUM7SUFDZDtJQUVBLHFCQUNFLDhEQUFDdEIsWUFBWXVCLFFBQVE7UUFDbkJDLE9BQU87WUFDTHZCO1lBQ0FDO1lBQ0FDO1lBQ0FDO1lBQ0FDLGlCQUFpQixDQUFDLENBQUNIO1FBQ3JCO2tCQUVDSzs7Ozs7O0FBR1A7QUFFTyxTQUFTa0I7SUFDZCxPQUFPNUIsaURBQVVBLENBQUNHO0FBQ3BCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWdlbmRhLXZpcC8uL2NvbnRleHRzL0F1dGhDb250ZXh0LnRzeD82ZDgxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VTdGF0ZSwgdXNlQ29udGV4dCwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuXG5pbnRlcmZhY2UgVXNlciB7XG4gIGlkOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEF1dGhDb250ZXh0VHlwZSB7XG4gIHVzZXI6IFVzZXIgfCBudWxsO1xuICB0b2tlbjogc3RyaW5nIHwgbnVsbDtcbiAgbG9naW46ICh0b2tlbjogc3RyaW5nLCB1c2VyOiBVc2VyKSA9PiB2b2lkO1xuICBsb2dvdXQ6ICgpID0+IHZvaWQ7XG4gIGlzQXV0aGVudGljYXRlZDogYm9vbGVhbjtcbn1cblxuY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0PEF1dGhDb250ZXh0VHlwZT4oe1xuICB1c2VyOiBudWxsLFxuICB0b2tlbjogbnVsbCxcbiAgbG9naW46ICgpID0+IHt9LFxuICBsb2dvdXQ6ICgpID0+IHt9LFxuICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFt0b2tlbiwgc2V0VG9rZW5dID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gVmVyaWZpY2FyIHNlIGjDoSB0b2tlbiBubyBsb2NhbFN0b3JhZ2VcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IHN0b3JlZFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG4gICAgICBjb25zdCBzdG9yZWRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKTtcblxuICAgICAgaWYgKHN0b3JlZFRva2VuICYmIHN0b3JlZFVzZXIpIHtcbiAgICAgICAgc2V0VG9rZW4oc3RvcmVkVG9rZW4pO1xuICAgICAgICBzZXRVc2VyKEpTT04ucGFyc2Uoc3RvcmVkVXNlcikpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGxvZ2luID0gKG5ld1Rva2VuOiBzdHJpbmcsIG5ld1VzZXI6IFVzZXIpID0+IHtcbiAgICBzZXRUb2tlbihuZXdUb2tlbik7XG4gICAgc2V0VXNlcihuZXdVc2VyKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBuZXdUb2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShuZXdVc2VyKSk7XG4gIH07XG5cbiAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICAgIHNldFRva2VuKG51bGwpO1xuICAgIHNldFVzZXIobnVsbCk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJyk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXInKTtcbiAgICByb3V0ZXIucHVzaCgnL2xvZ2luJyk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXJcbiAgICAgIHZhbHVlPXt7XG4gICAgICAgIHVzZXIsXG4gICAgICAgIHRva2VuLFxuICAgICAgICBsb2dpbixcbiAgICAgICAgbG9nb3V0LFxuICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6ICEhdG9rZW4sXG4gICAgICB9fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlQXV0aCgpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xufVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVJvdXRlciIsIkF1dGhDb250ZXh0IiwidXNlciIsInRva2VuIiwibG9naW4iLCJsb2dvdXQiLCJpc0F1dGhlbnRpY2F0ZWQiLCJBdXRoUHJvdmlkZXIiLCJjaGlsZHJlbiIsInNldFVzZXIiLCJzZXRUb2tlbiIsInJvdXRlciIsInN0b3JlZFRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInN0b3JlZFVzZXIiLCJKU09OIiwicGFyc2UiLCJuZXdUb2tlbiIsIm5ld1VzZXIiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwicmVtb3ZlSXRlbSIsInB1c2giLCJQcm92aWRlciIsInZhbHVlIiwidXNlQXV0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./contexts/AuthContext.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_font_google_target_css_path_pages_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/font/google/target.css?{\"path\":\"pages\\\\_app.tsx\",\"import\":\"Inter\",\"arguments\":[{\"subsets\":[\"latin\"]}],\"variableName\":\"inter\"} */ \"./node_modules/next/font/google/target.css?{\\\"path\\\":\\\"pages\\\\\\\\_app.tsx\\\",\\\"import\\\":\\\"Inter\\\",\\\"arguments\\\":[{\\\"subsets\\\":[\\\"latin\\\"]}],\\\"variableName\\\":\\\"inter\\\"}\");\n/* harmony import */ var next_font_google_target_css_path_pages_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_pages_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./contexts/AuthContext.tsx\");\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            className: (next_font_google_target_css_path_pages_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3___default().className),\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"c:\\\\Users\\\\cliente\\\\Documents\\\\github\\\\site\\\\pages\\\\_app.tsx\",\n                lineNumber: 12,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"c:\\\\Users\\\\cliente\\\\Documents\\\\github\\\\site\\\\pages\\\\_app.tsx\",\n            lineNumber: 11,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"c:\\\\Users\\\\cliente\\\\Documents\\\\github\\\\site\\\\pages\\\\_app.tsx\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFLTUE7QUFMeUI7QUFHd0I7QUFJdkQsU0FBU0UsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUMvQyxxQkFDRSw4REFBQ0gsK0RBQVlBO2tCQUNYLDRFQUFDSTtZQUFLQyxXQUFXTiwwSkFBZTtzQkFDOUIsNEVBQUNHO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJaEM7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FnZW5kYS12aXAvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XG5pbXBvcnQgeyBJbnRlciB9IGZyb20gJ25leHQvZm9udC9nb29nbGUnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dHMvQXV0aENvbnRleHQnO1xuXG5jb25zdCBpbnRlciA9IEludGVyKHsgc3Vic2V0czogWydsYXRpbiddIH0pO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPEF1dGhQcm92aWRlcj5cbiAgICAgIDxtYWluIGNsYXNzTmFtZT17aW50ZXIuY2xhc3NOYW1lfT5cbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPC9tYWluPlxuICAgIDwvQXV0aFByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcbiJdLCJuYW1lcyI6WyJpbnRlciIsIkF1dGhQcm92aWRlciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwibWFpbiIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();