/** Beatmap setting to play the note and music correctly */
let BeatmapConfig = {
  bpm: 160,
  offset: 0,
}

/** Audio configuration */
let AudioConfig = {
  music: 0.5,
  sfx: 0.8,
}

/** Main game configuration */
let config = {
  type: Phaser.AUTO,
  backgroundColor: "#000",
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
  },
}

/** Main game reference object */
const game = new Phaser.Game(config);
