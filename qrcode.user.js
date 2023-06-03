// ==UserScript==
// @name         QrCodeGen
// @namespace    https://github.com/AutumnSun1996/tm-scripts/
// @version      0.1
// @description  Show Link As QrCode with simple `Ctrl+Click`
// @author       AutumnSun1996
// @require      https://unpkg.com/qrcodejs@1.0.0/qrcode.min.js
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=autumn21.top
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    var div = document.createElement('div');
    div.id = 'qrcode-container';
    div.style = 'display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; border: solid 1px; padding: 1em; background: white';
    div.innerText = '点击图片关闭\n可修改文本后按Tab更新二维码\n\n';
    var img = document.createElement('div');
    img.title = '单击关闭'
    div.appendChild(img);
    var input = document.createElement('textarea');
    input.style = 'width: 100%; margin-top: 1em'
    div.appendChild(input);

    document.body.appendChild(div);
    var qrcode = new QRCode(img);

    img.addEventListener('click', function(){
        div.style.display = 'none';
    });
    input.addEventListener('change', function(){
        qrcode.makeCode(input.value);
    });
    document.addEventListener('contextmenu', function (evt) {
        console.log('evt', evt.ctrlKey, evt.target.tagName, evt)
        if (!evt.ctrlKey) {
            return
        }
        evt.preventDefault();
        var text;
        if(evt.target.tagName === 'A') {
            text = evt.target.href;
        } else {
            text = this.location.href;
        }
        qrcode.makeCode(text);
        input.value = text;
        div.style.display = 'block';
    }, true);
})();
