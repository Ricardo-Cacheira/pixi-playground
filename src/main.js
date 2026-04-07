import {
    Application,
    Graphics,
    Text,
    TextStyle,
    Sprite,
    Assets,
} from "pixi.js";

import { initDevtools } from "@pixi/devtools";

(async () => {

    const app = new Application();

    await app.init({
        // width: window.innerWidth,
        // height: window.innerHeight,
        //equivalent
        resizeTo: window,
        // backgroundAlpha: 0.9,
        backgroundColor: 0x87cefa
    });

    initDevtools({ app })

    //remove pesky extra scroll space
    app.canvas.style.position = 'absolute';

    const eventSystem = app.renderer.events;
    const pointer = eventSystem.pointer;

    { //Shapes

        const rectangle = new Graphics()
            .rect(200, 200, 150, 100)
            .fill({
                color: 0x00ff00,
                alpha: 1,
            })
            .stroke({
                width: 8,
                color: 0X000000
            });

        app.stage.addChild(rectangle);

        rectangle.pivot.set(75, 50);
        rectangle.eventMode = 'static';
        rectangle.cursor = 'pointer';
        rectangle.on('pointerdown', moveRect);

        function moveRect() {
            rectangle.x += 5;
            rectangle.y -= 5;
        }

        const star = new Graphics()
            .star(1000, 250, 12, 80, 40)
            .fill({ color: 0xffea00 })

        app.stage.addChild(star);

    }

    { //Text
        const style = new TextStyle({
            fill: 0xffffff,
            fontSize: 72,
            fontFamily: 'Comis Sans'
        });

        const text = new Text({
            text: 'Hello world',
            style,
        });

        app.stage.addChild(text);
    }

    { //Sprites
        const texture = await Assets.load('/images/logo.svg');

        const sprite = new Sprite({
            texture,
            anchor: 0.5, // center anchor point
            position: {x: app.canvas.width/2, y: app.canvas.height/2 },
            scale: 0.2,
            rotation: Math.PI / 4,
            skew: { x: 0.5, y: 0 }
        });
        app.stage.addChild(sprite);

        app.stage.interactive = true;
        app.stage.on('pointermove', follow);

        function follow(e) {
            let pos = e.data.global
            sprite.position.set(pos.x, pos.y)
        }
    }

    document.body.appendChild(app.canvas);

})();