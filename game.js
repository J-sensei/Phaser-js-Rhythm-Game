/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

/** Audio configuration */
let AudioConfig = {
  music: 0.65,
  sfx: 1,
}

/** Main game configuration */
let config = {
  type: Phaser.AUTO,
  backgroundColor: "#000", // Black color
  width: 1280,
  height: 720,
  backgroundColor: 0x000000,
  scene: [Preload, Debug, SongSelectScene, Level, Result],
  pixelArt: true, // Make images sharp
  physics: {
    default: "arcade",
    arcade: {
        debug: false, // True will display collider boxes
        gravity: { y: 0 },
    },
  },
  fps: {
    target: 60, // Target fps
    forceSetTimeOut: false // VSync (Follow monitor refresh rate) set to true if value is false
  },
}

/** Main game reference object */
const game = new Phaser.Game(config);
