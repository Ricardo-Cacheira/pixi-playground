import {
    Application,
    Ticker,
    Graphics,
    Text,
    TextStyle,
    Sprite,
    Assets,
    Container
} from "pixi.js";

import { initDevtools } from "@pixi/devtools";

(async () => {

    const app = new Application();
    const ticker = new Ticker();
    ticker.autoStart = true;

    await app.init({
        resizeTo: window,
        // backgroundAlpha: 0.9,
        //backgroundColor: 0x87cefa
    });

    initDevtools({ app })

    //remove pesky extra scroll space
    app.canvas.style.position = 'absolute';

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
            position: { x: app.canvas.width / 2, y: app.canvas.height / 2 },
            scale: 0.2,
            rotation: Math.PI / 4,
            skew: { x: 0.5, y: 0 }
        });
        app.stage.addChild(sprite);
        /*
                app.stage.interactive = true;
                app.stage.on('pointermove', follow);
        
                function follow(e) {
                    let pos = e.data.global
                    sprite.position.set(pos.x, pos.y)
                }
        */
    }
/*
    {// Snow
        const snowContainer = new Container();
        app.stage.addChild(snowContainer);
        let snow = [];
        for (let index = 0; index < 200; index++) {
            const circle = new Graphics().circle(
                Math.random() * app.screen.width,
                5 - (Math.random() * app.screen.height),
                5
            )
            .fill({
                color: 0xffffff
            });
            snow.push(circle);
            snowContainer.addChild(circle);
        }

        ticker.add((ticker) => {
            snow.forEach(flake => {
                flake.y += 5 * ticker.deltaTime;
                if(flake.y > app.screen.height + 500)
                {
                    flake.y = 5 - (Math.random() * app.screen.height)
                    flake.x = Math.random() * app.screen.width
                }
            });
        });
    }
*/
    {
        const warriorsContainer = new Container();
        app.stage.addChild(warriorsContainer);

        const girlTexture = await Assets.load('/images/girl_warrior.png');
        const girlSprite = new Sprite(girlTexture);
        girlSprite.scale.set(0.3,0.3);
        girlSprite.anchor.set(0.5,0.5);
        warriorsContainer.addChild(girlSprite);
        const boyTexture = await Assets.load('/images/boy_warrior.png');
        const boySprite = new Sprite(boyTexture);
        boySprite.scale.set(0.3,0.3);
        boySprite.anchor.set(0.5,0.5);
        warriorsContainer.addChild(boySprite);

        girlSprite.position.set(400,500)
        boySprite.position.set(100,500)

        warriorsContainer.position.set(0,100);

        const x = boySprite.getGlobalPosition().x;
        const y = boySprite.getGlobalPosition().y;
        console.log(`local x: ${boySprite.x}, local y: ${boySprite.y}`)
        console.log(`x: ${x}, y: ${y}`)
    }



    document.body.appendChild(app.canvas);

})();