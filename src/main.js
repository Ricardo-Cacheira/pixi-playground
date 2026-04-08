import {
    Application,
    Ticker,
    Graphics,
    Text,
    TextStyle,
    Sprite,
    Assets,
    Container,
    Spritesheet,
    AnimatedSprite
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

        Assets.addBundle('warriors', {
            girl_warrior: '/images/girl_warrior.png',
            boy_warrior: '/images/boy_warrior.png'
        });
        const warriorAssets = await Assets.loadBundle('warriors');

        const girlSprite = new Sprite(warriorAssets.girl_warrior);
        girlSprite.scale.set(0.3,0.3);
        girlSprite.anchor.set(0.5,0.5);
        warriorsContainer.addChild(girlSprite);
        const boySprite = new Sprite(warriorAssets.boy_warrior);
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

    {
        // Create object to store sprite sheet data
        const atlasData = {
            frames: {
                talk1: {
                    frame: { x: 0, y: 0, w: 350, h: 350 },
                    sourceSize: { w: 350, h: 350 },
                    spriteSourceSize: { x: 0, y: 0, w: 350, h: 350 }
                },
                talk2: {
                    frame: { x: 350, y: 0, w: 350, h: 350 },
                    sourceSize: { w: 350, h: 350 },
                    spriteSourceSize: { x: 0, y: 0, w: 350, h: 350 }
                },
                talk3: {
                    frame: { x: 700, y: 0, w: 350, h: 350 },
                    sourceSize: { w: 350, h: 350 },
                    spriteSourceSize: { x: 0, y: 0, w: 350, h: 350 }
                },
                talk4: {
                    frame: { x: 1050, y: 0, w: 350, h: 350 },
                    sourceSize: { w: 350, h: 350 },
                    spriteSourceSize: { x: 0, y: 0, w: 350, h: 350 }
                },
                talk5: {
                    frame: { x: 1400, y: 0, w: 350, h: 350 },
                    sourceSize: { w: 350, h: 350 },
                    spriteSourceSize: { x: 0, y: 0, w: 350, h: 350 }
                },
                walk1: {
                    frame: { x: 0, y: 350, w: 350, h: 350 },
                    sourceSize: { w: 350, h: 350 },
                    spriteSourceSize: { x: 0, y: 0, w: 350, h: 350 }
                },
                walk2: {
                    frame: { x: 350, y: 350, w: 350, h: 350 },
                    sourceSize: { w: 350, h: 350 },
                    spriteSourceSize: { x: 0, y: 0, w: 350, h: 350 }
                },
                walk3: {
                    frame: { x: 700, y: 350, w: 350, h: 350 },
                    sourceSize: { w: 350, h: 350 },
                    spriteSourceSize: { x: 0, y: 0, w: 350, h: 350 }
                },
                walk4: {
                    frame: { x: 1050, y: 350, w: 350, h: 350 },
                    sourceSize: { w: 350, h: 350 },
                    spriteSourceSize: { x: 0, y: 0, w: 350, h: 350 }
                }
            },
            meta: {
                image: '/images/frog.png',
                size: { w: 1750, h: 700 }
            },
            animations: {
                // Array of frames by name
                talk: ['talk1', 'talk2', 'talk3', 'talk4', 'talk5'],
                walk: ['walk1', 'walk2', 'walk3', 'walk4']
            }
        }

        const texture = await Assets.load(atlasData.meta.image);
        const spritesheet = new Spritesheet(texture, atlasData);
        await spritesheet.parse();

        const animatedSprite =  new AnimatedSprite(spritesheet.animations.walk);
        app.stage.addChild(animatedSprite);
        animatedSprite.position.set(300, 50);
        animatedSprite.play();
        animatedSprite.animationSpeed = 0.13;
    }

    document.body.appendChild(app.canvas);

})();