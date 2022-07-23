"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./assets/main.css");
const ai_1 = require("../node_modules/react-icons/ai");
const gi_1 = require("../node_modules/react-icons/gi");
const si_1 = require("../node_modules/react-icons/si");
const io5_1 = require("../node_modules/react-icons/io5");
const io_1 = require("../node_modules/react-icons/io");
const App = () => {
    const root = document.getElementById("root");
    const innerBody = document.getElementById("inner_body");
    const imgLoad = document.getElementById("imgLoad");
    const [url, setUrl] = (0, react_1.useState)(null);
    const [widthInput, setWidthInput] = (0, react_1.useState)(null);
    const [heightInput, setHeightInput] = (0, react_1.useState)(null);
    const initialImgLoadStyle = {
        maxWidth: "80%",
        maxHeight: "60%",
    };
    const [imgLoadStyle, setImgLoadStyle] = (0, react_1.useState)(initialImgLoadStyle);
    (0, react_1.useEffect)(() => {
        imgLoadStyle !== initialImgLoadStyle &&
            setImgLoadStyle(initialImgLoadStyle);
    }, [url]);
    const drag = (0, react_1.useRef)(false);
    const left = "left";
    const right = "right";
    const top = "top";
    const bottom = "bottom";
    const dragDirection = (0, react_1.useRef)(null);
    const previousClient = (0, react_1.useRef)({
        x: 0,
        y: 0
    });
    const moreDirection = document.getElementById("moreDirection");
    const onChangeWidthInput = (event) => {
        const value = event.target.value;
        setWidthInput(value);
    };
    const onChangeHeightInput = (event) => {
        const value = event.target.value;
        setHeightInput(value);
    };
    const resizerByKeypressBtn = (event) => {
        event.preventDefault();
        const style = {
            width: widthInput === null ? "auto" : `${widthInput}px`,
            height: heightInput === null ? "auton" : `${heightInput}px`
        };
        setImgLoadStyle(style);
    };
    const onMouseOverActualBtn = (event) => {
        const currentTarget = event.currentTarget;
        const fileType = currentTarget.nextElementSibling;
        fileType === null || fileType === void 0 ? void 0 : fileType.classList.toggle("on");
    };
    const onMouseOutActualBtn = (event) => {
        const currentTarget = event.currentTarget;
        const fileType = currentTarget.nextElementSibling;
        (fileType === null || fileType === void 0 ? void 0 : fileType.classList.contains("on")) && (fileType === null || fileType === void 0 ? void 0 : fileType.classList.remove("on"));
    };
    const onChangeFile = (event) => {
        const files = event.target.files;
        if (files !== null) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setUrl(fileUrl);
        }
        else {
            console.log("There is no file");
        }
    };
    const onClickMoreDirectionBtn = (event) => {
        if (moreDirection !== null) {
            onMouseOverMoreDirectionBtn(event);
            moreDirection.classList.toggle("on");
        }
    };
    function onMouseOverMoreDirectionBtn(event) {
        if (!(moreDirection === null || moreDirection === void 0 ? void 0 : moreDirection.classList.contains("on"))) {
            const currentTarget = event.currentTarget;
            const btnExplainBubble = currentTarget.getElementsByClassName("btnExplainBubble")[0];
            btnExplainBubble.classList.toggle("on");
        }
    }
    ;
    const onClickMoreDirectionCloseBtn = () => {
        moreDirection === null || moreDirection === void 0 ? void 0 : moreDirection.classList.remove("on");
    };
    const onMouseDownResizerBtn = (event, direction) => {
        drag.current = true;
        previousClient.current = {
            x: event.clientX,
            y: event.clientY
        };
        dragDirection.current = direction;
    };
    const onMouseMoveImgLoad = (event) => {
        var _a, _b;
        if (drag.current) {
            const changeX = event.clientX - previousClient.current.x;
            const changeY = event.clientY - previousClient.current.y;
            const imageDoc = document.getElementById("image");
            if (imageDoc !== null) {
                const imgWidth = imageDoc.offsetWidth;
                const imgHeight = imageDoc.offsetWidth;
                const width = ((_a = dragDirection.current) === null || _a === void 0 ? void 0 : _a.includes(left)) ?
                    imgWidth - changeX
                    :
                        imgWidth + changeX;
                const height = ((_b = dragDirection.current) === null || _b === void 0 ? void 0 : _b.includes(top)) ?
                    imgHeight - changeY
                    :
                        imgHeight + changeY;
                if (innerBody !== null && root !== null) {
                    const innerPadding = window.getComputedStyle(innerBody).getPropertyValue('padding');
                    const padding = Number(innerPadding.slice(0, innerPadding.indexOf("px")));
                    const innerWidth = innerBody.clientWidth - padding * 2;
                    const innerHeight = innerBody.clientHeight;
                    const maxHeight = root.offsetHeight * 0.9;
                    const style = {
                        width: width,
                        height: height,
                    };
                    if (width >= innerWidth) {
                        style.width = innerWidth;
                    }
                    ;
                    if (innerHeight >= maxHeight && imgLoad !== null) {
                        const innerBodyTop = innerBody.clientTop;
                        const imgLoadTop = imgLoad.clientTop;
                        const targetHeight = maxHeight - (imgLoadTop - innerBodyTop);
                        style.height = targetHeight;
                    }
                    ;
                    if (width < 150 || height < 150) {
                        width < 150 ? style.width = 150 : style.width = width;
                        height < 150 ? style.height = 150 : style.height = height;
                    }
                    console.log("style", imgWidth, imgHeight, style);
                    setImgLoadStyle(style);
                }
                else {
                    console.log("Can't find inner");
                }
            }
            else {
                console.log("image is null");
            }
        }
        ;
    };
    const onMouseUpImgLoad = (event) => {
        if (drag.current) {
            drag.current = false;
            dragDirection.current = null;
            previousClient.current = {
                x: 0,
                y: 0
            };
        }
        ;
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "inner", onMouseMove: onMouseMoveImgLoad, onMouseUp: onMouseUpImgLoad }, { children: [(0, jsx_runtime_1.jsx)("header", { children: "Image Resizer" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: 'directions' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'firstDirection' }, { children: ["You can change the size of the picture by dragging mouse or enter the desired size.", (0, jsx_runtime_1.jsxs)("button", Object.assign({ className: 'moreDirectionBtn btn', onClick: onClickMoreDirectionBtn, onMouseOver: onMouseOverMoreDirectionBtn }, { children: [(0, jsx_runtime_1.jsx)(io5_1.IoHelpCircleOutline, {}), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'btnExplainBubble' }, { children: "Press button to show more direction" }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'moreDirection', id: 'moreDirection' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'moreDirectionCloseBtn btn', onClick: onClickMoreDirectionCloseBtn }, { children: (0, jsx_runtime_1.jsx)(io_1.IoIosCloseCircleOutline, {}) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'moreDirectionInner' }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "When you change the size using the mouse, the size of the picture changes while maintaining the ratio of the original picture." }), (0, jsx_runtime_1.jsxs)("p", { children: ["If you waant to change size by dragging mouse,", (0, jsx_runtime_1.jsx)("br", {}), "Put your mouse over the top ,bottom, left or right of the picuture."] })] }))] }))] })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ id: 'resizerByKeypress' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'sizeInput' }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "width : " }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: 'widthInput', id: "widthInput", onChange: onChangeWidthInput }), (0, jsx_runtime_1.jsx)("div", { children: "px" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'sizeInput' }, { children: [(0, jsx_runtime_1.jsx)(ai_1.AiOutlineClose, {}), (0, jsx_runtime_1.jsx)("label", { children: "height : " }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: 'heightInput', id: "heightInput", onChange: onChangeHeightInput }), (0, jsx_runtime_1.jsx)("div", { children: "px" })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: resizerByKeypressBtn, className: "resizerByKeypressBtn" }, { children: "Resizer" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "inner_body" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "loader" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ id: "loaderActualBtn", htmlFor: 'loaderInput', onMouseEnter: onMouseOverActualBtn, onMouseOut: onMouseOutActualBtn }, { children: "Upload image file" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'fileType' }, { children: "jpeg, jpg and png is possible" })), (0, jsx_runtime_1.jsx)("input", { id: "loaderInput", type: "file", accept: "image/jpeg, image/jpg, image/png", onChange: onChangeFile })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "load" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "imgLoad", style: imgLoadStyle }, { children: url !== null &&
                                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'resizerBtns ' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'left ', onMouseDown: (event) => onMouseDownResizerBtn(event, left) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'top ', onMouseDown: (event) => onMouseDownResizerBtn(event, top) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'right', onMouseDown: (event) => onMouseDownResizerBtn(event, right) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'bottom ', onMouseDown: (event) => onMouseDownResizerBtn(event, bottom) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) }))] })), (0, jsx_runtime_1.jsx)("img", { id: "image", src: url, alt: "uploadedPhoto" })] }) })) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "footer" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "copyRight" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u00A9 2022.\u00A0" }), (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: 'name' }, { children: ["BadaHertz52", (0, jsx_runtime_1.jsx)(gi_1.GiWhaleTail, {})] }))] })), (0, jsx_runtime_1.jsxs)("a", Object.assign({ href: 'https://github.com/settings/profile', "aria-details": "link to go writer(=badahertz52\r\n          )'s githug profile" }, { children: [(0, jsx_runtime_1.jsx)(ai_1.AiFillGithub, {}), "Github"] })), (0, jsx_runtime_1.jsxs)("a", Object.assign({ href: 'https://velog.io/@badahertz52', "aria-details": "link to go writer(=badahertz52\r\n          )'s blog" }, { children: [(0, jsx_runtime_1.jsx)(si_1.SiBlogger, {}), "blog"] }))] }))] })));
};
exports.default = App;
