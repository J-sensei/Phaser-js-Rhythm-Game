/** Beatmap setting to play the note and music correctly */
let beatmapConfig = {
  bpm: 160,
}

let audioConfig = {
  music: 0.6,
  sfx: 0.7,
}

/** Main game configuration */
let config = {
  width: 1280,
  height: 720,
  backgroundColor: 0x000000,
  scene: [Preload, Debug],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
        debug: true,
        gravity: { y: 0 }
    }
  }
}

/** Main game reference object */
const game = new Phaser.Game(config);
