import { Application } from "pixi.js";

(async () => {

    const app = new Application();

    await app.init({
        // width: window.innerWidth,
        // height: window.innerHeight,
        //equivalent
        resizeTo: window,
        backgroundAlpha: 0.9,
        backgroundColor: 0x87cefa
    });

    //remove pesky extra scroll space
    app.canvas.style.position = 'absolute';

    document.body.appendChild(app.canvas);

})();