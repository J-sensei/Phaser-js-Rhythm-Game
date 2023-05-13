/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

/**
 * Parallax background
 */
class Background {
    /**
     * Initialize backgrounds
     * @param {Scene} scene 
     * @param {BackgroundData} backgroundDatas Array of background data
     */
    constructor(scene, backgroundDatas) {
        this.scene = scene;
        /** TileSprite - Background Tile Sprite Array */
        this.backgroundArray = []; // Initialize background data array
        /** BackgroundData - Background Data Array */
        this.backgroundDataArray = backgroundDatas;
        /** Speed multiplier - 0 will stop moving */
        this.speedMultiplier = 1;

        // Initialize backgrounds
        for(let i = 0; i < backgroundDatas.length; i++) {
            this.initializeBackground(scene, backgroundDatas[i]);
        }

        /** Pausing scrolling the backgrounds */
        this.pause = false; // Default the scroll will start when the object is create
    }    

    /** Add a new background data to the parallax background*/
    add(backgroundData) {
        this.backgroundArray.push(backgroundData);
        // Initialize array
        this.initializeBackground(this.scene, backgroundData);
    }

    setSpeed(v) {
        if(v == null) {
            this.speedMultiplier = 1;
        } else {
            this.speedMultiplier = v;
        }
    }

    start() { this.pause = false; }
    stop() { this.pause = true; }

    update() {
        if(this.pause) return; // Do not scroll the background if game is pausing
        const deltaTime = (game.loop.delta * 0.001);
        
        /* Background Array should have same size with Background Data Array */
        for(let i = 0; i < this.backgroundArray.length; i++) {
            if(this.backgroundDataArray[i].type == BackgroundType.TILE_SPRITE) {
                this.backgroundArray[i].tilePositionX += (this.backgroundDataArray[i].speed * this.speedMultiplier) * deltaTime;
            } else if(this.backgroundDataArray[i].type == BackgroundType.OBJECT) {
                this.backgroundArray[i].x -= (this.backgroundDataArray[i].speed * this.speedMultiplier) * deltaTime;

                // Reset background position
                if(this.backgroundArray[i].x < -this.backgroundDataArray[i].width) {
                    this.backgroundArray[i].x = game.config.width + this.backgroundDataArray[i].width;
                }
            }
        }
    }

    /**
     * Initialize a background into the scene
     * @param {Scene} scene Current scene reference
     * @param {Background Data} backgroundData Background data that wish to add into the scene
     */
    initializeBackground(scene, backgroundData) {
        // Set variables
        let x = backgroundData.x;
        let y = backgroundData.y;
        let width = backgroundData.width;
        let height = backgroundData.height;
        let key = backgroundData.key;
        let scale = backgroundData.scale;
        let depth = backgroundData.depth;

        let tileSprite = scene.add.tileSprite(x, y, width, height, key).setScale(scale);
        tileSprite.depth = depth; // Depth setting
        this.backgroundArray.push(tileSprite); // Push to array
        scene.add.existing(tileSprite); // Add to current scene to render
    }
}

/** Parallax Background Type */
const BackgroundType = {
    TILE_SPRITE: "TileSprite",
    OBJECT: "Object"
}

/** Class contain parallax background information */
class BackgroundData {
    /**
     * Data neccessary to render parralax background scroll
     * @param {BackgroundType} type TILE_SPRITE or OBJECT depends on the render type
     * @param {string} key Sprite resources key
     * @param {number} x X position
     * @param {number} y Y position 
     * @param {number} width Width of the sprite
     * @param {number} height Height of the sprite
     * @param {number} scale Scale of the sprite
     * @param {number} speed Scrolling speed
     * @param {number} depth Depth of the render, decide which object should be on top of each other
     */
    constructor(type, key, x, y, width, height, scale, speed, depth) {
        this.type = type,
        this.key = key;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.speed = speed;
        this.depth = depth;
    }
}