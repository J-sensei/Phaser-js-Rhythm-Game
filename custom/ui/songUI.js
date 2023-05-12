/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/


class SongUI extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imageKey) {
        super(scene, x, y, imageKey);

        const size = 400; // Image size
        //this.image = scene.add.rexCircleMaskImage(x, y, imageKey, null, null);
        this.image = scene.add.sprite(x, y, imageKey);
        this.imageScaleX = size / this.image.width;
        this.imageScaleY = size / this.image.height;
        this.image.setScale(this.imageScaleX, this.imageScaleY);

        // Constantly rotate the image
        const tween = scene.tweens.add({
            ease: 'Linear',
            targets: this.image, // Set to this note object
            angle: this.image.angle + 360,
            duration: 170 * 20,
            repeat: -1,
            callbackScope: this,
        });     
        scene.add.existing(this.image);
        //this.add(this.image);
    }

    create(scene) {

    }

    createPreview(scene, song, beatmap, start, end) {
        this.previewStartTimeline = start;
        this.previewEndTimeline = end;

        this.previewAudio = scene.plugins.get('rexsoundfadeplugin').fadeIn(song, 2000, AudioConfig.music, 0);
        this.previewAudio.seek = this.previewStartTimeline;
        this.previewStart = true;

        // Create beatmap to get the beat!
        this.beatmap = beatmap;
        this.beatmap.create(); // Initialize the beatmap
        this.noteBeats = this.beatmap.getPreviewBeats(this.previewStartTimeline); // Get the beats required for the image scale
    }

    update(scene) {

        // Song preiew looping
        if(this.previewAudio == null) return;
        if(this.previewAudio.isPlaying && this.previewAudio.seek >= this.previewEndTimeline && this.previewStart) {
            const seek = this.previewAudio.seek;
            this.previewAudio.stop();
            this.previewAudio = scene.plugins.get('rexsoundfadeplugin').fadeOut(this.previewAudio, 2000, false);
            this.previewAudio.seek = seek;
            this.previewStart = false;
        }

        if(!this.previewStart && !this.previewAudio.isPlaying) {
            this.previewAudio = scene.plugins.get('rexsoundfadeplugin').fadeIn(this.song, 2000, AudioConfig.music, 0);
            this.previewAudio.seek = this.previewStartTimeline;
            this.previewStart = true;
            this.noteBeats = this.beatmap.getPreviewBeats(this.previewStartTimeline);
        }

        // Change the scale with the beat
        if(this.previewAudio.isPlaying) {
            if(this.noteBeats.length > 0) {
                if(this.previewAudio.seek >= this.noteBeats[this.noteBeats.length - 1].time) {
                    const tween = scene.tweens.add({
                        ease: 'Linear',
                        targets: this.image, // Set to this note object
                        scale: this.imageScaleX * 1.1,
                        duration: 125,
                        repeat: 0,
                        onComplete: function() {
                            this.image.setScale(this.imageScaleX, this.imageScaleY);
                        },
                        callbackScope: this
                    });     
                    this.noteBeats.pop(); // Removed the beat at the end
                }
            }
        }
    }
}