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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    user: null,\n    isAuthenticated: false,\n    logout: ()=>{}\n});\nfunction AuthProvider({ children }) {\n    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (session?.user?.email) {\n            fetch(`/api/profile/${session.user.id}`).then((res)=>res.json()).then((data)=>{\n                setUser({\n                    ...data,\n                    id: session.user.id,\n                    email: session.user.email\n                });\n            }).catch(console.error);\n        } else {\n            setUser(null);\n        }\n    }, [\n        session\n    ]);\n    const logout = async ()=>{\n        await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.signOut)({\n            redirect: false\n        });\n        router.push(\"/login\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            isAuthenticated: status === \"authenticated\",\n            logout\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"c:\\\\Users\\\\cliente\\\\Documents\\\\github\\\\site\\\\contexts\\\\AuthContext.tsx\",\n        lineNumber: 78,\n        columnNumber: 5\n    }, this);\n}\nfunction useAuth() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0cy9BdXRoQ29udGV4dC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBOEU7QUFDeEI7QUFDZDtBQXlDeEMsTUFBTVEsNEJBQWNQLG9EQUFhQSxDQUFrQjtJQUNqRFEsTUFBTTtJQUNOQyxpQkFBaUI7SUFDakJDLFFBQVEsS0FBTztBQUNqQjtBQUVPLFNBQVNDLGFBQWEsRUFBRUMsUUFBUSxFQUFpQztJQUN0RSxNQUFNLEVBQUVDLE1BQU1DLE9BQU8sRUFBRUMsTUFBTSxFQUFFLEdBQUdYLDJEQUFVQTtJQUM1QyxNQUFNWSxTQUFTVixzREFBU0E7SUFDeEIsTUFBTSxDQUFDRSxNQUFNUyxRQUFRLEdBQUdkLCtDQUFRQSxDQUFjO0lBRTlDRCxnREFBU0EsQ0FBQztRQUNSLElBQUlZLFNBQVNOLE1BQU1VLE9BQU87WUFDeEJDLE1BQU0sQ0FBQyxhQUFhLEVBQUVMLFFBQVFOLElBQUksQ0FBQ1ksRUFBRSxDQUFDLENBQUMsRUFDcENDLElBQUksQ0FBQyxDQUFDQyxNQUFRQSxJQUFJQyxJQUFJLElBQ3RCRixJQUFJLENBQUMsQ0FBQ1I7Z0JBQ0xJLFFBQVE7b0JBQ04sR0FBR0osSUFBSTtvQkFDUE8sSUFBSU4sUUFBUU4sSUFBSSxDQUFDWSxFQUFFO29CQUNuQkYsT0FBT0osUUFBUU4sSUFBSSxDQUFDVSxLQUFLO2dCQUMzQjtZQUNGLEdBQ0NNLEtBQUssQ0FBQ0MsUUFBUUMsS0FBSztRQUN4QixPQUFPO1lBQ0xULFFBQVE7UUFDVjtJQUNGLEdBQUc7UUFBQ0g7S0FBUTtJQUVaLE1BQU1KLFNBQVM7UUFDYixNQUFNTCx3REFBT0EsQ0FBQztZQUFFc0IsVUFBVTtRQUFNO1FBQ2hDWCxPQUFPWSxJQUFJLENBQUM7SUFDZDtJQUVBLHFCQUNFLDhEQUFDckIsWUFBWXNCLFFBQVE7UUFDbkJDLE9BQU87WUFDTHRCO1lBQ0FDLGlCQUFpQk0sV0FBVztZQUM1Qkw7UUFDRjtrQkFFQ0U7Ozs7OztBQUdQO0FBRU8sU0FBU21CO0lBQ2QsT0FBTzlCLGlEQUFVQSxDQUFDTTtBQUNwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FnZW5kYS12aXAvLi9jb250ZXh0cy9BdXRoQ29udGV4dC50c3g/NmQ4MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlc3Npb24sIHNpZ25PdXQgfSBmcm9tICduZXh0LWF1dGgvcmVhY3QnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuXG5pbnRlcmZhY2UgVXNlciB7XG4gIGlkOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBlc3RhYmxpc2htZW50TmFtZT86IHN0cmluZztcbiAgcGhvbmU/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBwcm9maWxlSW1hZ2U/OiBzdHJpbmc7XG4gIGNvdmVySW1hZ2U/OiBzdHJpbmc7XG4gIGFkZHJlc3M/OiB7XG4gICAgY2VwOiBzdHJpbmc7XG4gICAgc3RyZWV0OiBzdHJpbmc7XG4gICAgbnVtYmVyOiBzdHJpbmc7XG4gICAgY29tcGxlbWVudD86IHN0cmluZztcbiAgICBuZWlnaGJvcmhvb2Q/OiBzdHJpbmc7XG4gICAgY2l0eT86IHN0cmluZztcbiAgICBzdGF0ZT86IHN0cmluZztcbiAgfTtcbiAgb3BlbmluZ0hvdXJzPzoge1xuICAgIFtrZXk6IHN0cmluZ106IHtcbiAgICAgIG9wZW46IHN0cmluZztcbiAgICAgIGNsb3NlOiBzdHJpbmc7XG4gICAgfTtcbiAgfTtcbiAgc29jaWFsTWVkaWE/OiB7XG4gICAgaW5zdGFncmFtPzogc3RyaW5nO1xuICAgIGZhY2Vib29rPzogc3RyaW5nO1xuICAgIHdoYXRzYXBwPzogc3RyaW5nO1xuICB9O1xuICBzdWJzY3JpcHRpb24/OiBhbnk7XG59XG5cbmludGVyZmFjZSBBdXRoQ29udGV4dFR5cGUge1xuICB1c2VyOiBVc2VyIHwgbnVsbDtcbiAgaXNBdXRoZW50aWNhdGVkOiBib29sZWFuO1xuICBsb2dvdXQ6ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoQ29udGV4dFR5cGU+KHtcbiAgdXNlcjogbnVsbCxcbiAgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSxcbiAgbG9nb3V0OiAoKSA9PiB7fSxcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gQXV0aFByb3ZpZGVyKHsgY2hpbGRyZW4gfTogeyBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlIH0pIHtcbiAgY29uc3QgeyBkYXRhOiBzZXNzaW9uLCBzdGF0dXMgfSA9IHVzZVNlc3Npb24oKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlPFVzZXIgfCBudWxsPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzZXNzaW9uPy51c2VyPy5lbWFpbCkge1xuICAgICAgZmV0Y2goYC9hcGkvcHJvZmlsZS8ke3Nlc3Npb24udXNlci5pZH1gKVxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIHNldFVzZXIoe1xuICAgICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICAgIGlkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICBlbWFpbDogc2Vzc2lvbi51c2VyLmVtYWlsLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFVzZXIobnVsbCk7XG4gICAgfVxuICB9LCBbc2Vzc2lvbl0pO1xuXG4gIGNvbnN0IGxvZ291dCA9IGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBzaWduT3V0KHsgcmVkaXJlY3Q6IGZhbHNlIH0pO1xuICAgIHJvdXRlci5wdXNoKCcvbG9naW4nKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBdXRoQ29udGV4dC5Qcm92aWRlclxuICAgICAgdmFsdWU9e3tcbiAgICAgICAgdXNlcixcbiAgICAgICAgaXNBdXRoZW50aWNhdGVkOiBzdGF0dXMgPT09ICdhdXRoZW50aWNhdGVkJyxcbiAgICAgICAgbG9nb3V0LFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUF1dGgoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VTZXNzaW9uIiwic2lnbk91dCIsInVzZVJvdXRlciIsIkF1dGhDb250ZXh0IiwidXNlciIsImlzQXV0aGVudGljYXRlZCIsImxvZ291dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwiZGF0YSIsInNlc3Npb24iLCJzdGF0dXMiLCJyb3V0ZXIiLCJzZXRVc2VyIiwiZW1haWwiLCJmZXRjaCIsImlkIiwidGhlbiIsInJlcyIsImpzb24iLCJjYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsInJlZGlyZWN0IiwicHVzaCIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VBdXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./contexts/AuthContext.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_font_google_target_css_path_pages_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/font/google/target.css?{\"path\":\"pages\\\\_app.tsx\",\"import\":\"Inter\",\"arguments\":[{\"subsets\":[\"latin\"]}],\"variableName\":\"inter\"} */ \"./node_modules/next/font/google/target.css?{\\\"path\\\":\\\"pages\\\\\\\\_app.tsx\\\",\\\"import\\\":\\\"Inter\\\",\\\"arguments\\\":[{\\\"subsets\\\":[\\\"latin\\\"]}],\\\"variableName\\\":\\\"inter\\\"}\");\n/* harmony import */ var next_font_google_target_css_path_pages_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_pages_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./contexts/AuthContext.tsx\");\n\n\n\n\n\nfunction MyApp({ Component, pageProps: { session, ...pageProps } }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_auth_react__WEBPACK_IMPORTED_MODULE_2__.SessionProvider, {\n        session: session,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_3__.AuthProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: (next_font_google_target_css_path_pages_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_4___default().className),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"c:\\\\Users\\\\cliente\\\\Documents\\\\github\\\\site\\\\pages\\\\_app.tsx\",\n                    lineNumber: 14,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"c:\\\\Users\\\\cliente\\\\Documents\\\\github\\\\site\\\\pages\\\\_app.tsx\",\n                lineNumber: 13,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"c:\\\\Users\\\\cliente\\\\Documents\\\\github\\\\site\\\\pages\\\\_app.tsx\",\n            lineNumber: 12,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"c:\\\\Users\\\\cliente\\\\Documents\\\\github\\\\site\\\\pages\\\\_app.tsx\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQU1NQTtBQU55QjtBQUdtQjtBQUNLO0FBSXZELFNBQVNHLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxXQUFXLEVBQUVDLE9BQU8sRUFBRSxHQUFHRCxXQUFXLEVBQVk7SUFDMUUscUJBQ0UsOERBQUNKLDREQUFlQTtRQUFDSyxTQUFTQTtrQkFDeEIsNEVBQUNKLCtEQUFZQTtzQkFDWCw0RUFBQ0s7Z0JBQUtDLFdBQVdSLDBKQUFlOzBCQUM5Qiw0RUFBQ0k7b0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS2xDO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ2VuZGEtdmlwLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnO1xuaW1wb3J0IHsgSW50ZXIgfSBmcm9tICduZXh0L2ZvbnQvZ29vZ2xlJztcbmltcG9ydCB7IFNlc3Npb25Qcm92aWRlciB9IGZyb20gJ25leHQtYXV0aC9yZWFjdCc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0cy9BdXRoQ29udGV4dCc7XG5cbmNvbnN0IGludGVyID0gSW50ZXIoeyBzdWJzZXRzOiBbJ2xhdGluJ10gfSk7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHM6IHsgc2Vzc2lvbiwgLi4ucGFnZVByb3BzIH0gfTogQXBwUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8U2Vzc2lvblByb3ZpZGVyIHNlc3Npb249e3Nlc3Npb259PlxuICAgICAgPEF1dGhQcm92aWRlcj5cbiAgICAgICAgPG1haW4gY2xhc3NOYW1lPXtpbnRlci5jbGFzc05hbWV9PlxuICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgICAgPC9tYWluPlxuICAgICAgPC9BdXRoUHJvdmlkZXI+XG4gICAgPC9TZXNzaW9uUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xuIl0sIm5hbWVzIjpbImludGVyIiwiU2Vzc2lvblByb3ZpZGVyIiwiQXV0aFByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJzZXNzaW9uIiwibWFpbiIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

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