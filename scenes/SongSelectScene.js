class SongSelectScene extends Phaser.Scene {
    constructor() {
        super("SongSelectScene");
    }

    create() {
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.leftKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.rightKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.selectAudio = this.sound.add(SFXId.SELECT);

        // Initialize selected song as the current song
        this.currentIndex = 0;
        this.selectedSong = CurrentSong;
        this.selectedSong.createImage(this, game.config.width / 2, 270);
        this.selectedSong.preview(this);

        this.titleLabel = this.add.text(240 + 30, 35, "Song Selection", {
            fontFamily: 'Silkscreen', 
            fontSize: 52
        }).setOrigin(0.5); 
        this.songsLabel = this.add.text(35, 48 + 30, "Song: " + (this.currentIndex + 1) + " / " + SongList.length, {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0); 

        this.selectedSong.setTitles(this.titleLabel, this.songsLabel);
    }

    update() {
        this.selectedSong.updatePreview(this);

        if(Phaser.Input.Keyboard.JustDown(this.leftKey) || (Phaser.Input.Keyboard.JustDown(this.leftKey2))) {
            console.log("LEFTTT");
            this.currentIndex--;
            if(this.currentIndex < 0) {
                this.currentIndex = SongList.length - 1;
            }

            this.updateSelectedSong(this.currentIndex);

        } else if(Phaser.Input.Keyboard.JustDown(this.rightKey) || (Phaser.Input.Keyboard.JustDown(this.rightKey2))) {
            this.currentIndex++;
            if(this.currentIndex > SongList.length - 1) {
                this.currentIndex = 0;
            }

            this.updateSelectedSong(this.currentIndex);
        }

        if(Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.selectAudio.play();
            console.log("ENTER BEATMAP!");
            this.selectedSong.switchOut();
            this.scene.start("Debug"); // Test
        }
    }

    updateSelectedSong(index) {
        this.selectAudio.play();
        this.selectedSong.switchOut();
        this.selectedSong = SongList[index];
        this.selectedSong.createImage(this, game.config.width / 2, 270);
        this.selectedSong.preview(this);
        this.songsLabel.text = "Song: " + (index + 1) + " / " + SongList.length;
        this.selectedSong.setTitles(this.titleLabel, this.songsLabel);
    }
}