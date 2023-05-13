/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/


class SongSelectScene extends Phaser.Scene {
    constructor() {
        super(SceneKey.SONG_SELECT);
    }

    create() {
        // Get the key codes
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.leftKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.rightKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.upKey1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.upKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downKey1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.downKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // Select cooldown to prevent UI bug (Make sure the tween can finish playing)
        this.cooldown = 0.30;
        this.currentCooldown = 0;

        // Load the UI audios
        this.selectAudio = this.sound.add(SFXId.SELECT);
        this.backAudio = this.sound.add(SFXId.BACK);
        this.clickAudio = this.sound.add(SFXId.CLICK);

        // Initialize selected song as the current song
        // Song image position
        this.imageX = game.config.width / 2;
        this.imageY = 270;

        // Initialize selected song
        /** State to indicate player is currently selecting the difficulty */
        this.selectingDifficulty = false;
        this.selectedDifficulty = CurrentDifficulty; // Selected difficulty to start the game
        this.selectedSong = CurrentSong; // Selected song to start the game
        this.currentIndex = this.selectedSong.index; // Current index of the song list
        this.selectedSong.createSongUI(this, this.imageX, this.imageY); // 
        this.selectedSong.preview(this);

        this.titleLabel = this.add.text(240 + 30, 35, "Song Selection", {
            fontFamily: 'Silkscreen', 
            fontSize: 52
        }).setOrigin(0.5); 
        this.songsLabel = this.add.text(35, 48 + 30, "Song: " + (this.currentIndex + 1) + " / " + SongList.length, {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0); 
        this.add.text(35, 48 + 70, "(Q) - How to play\n(ENTER) - select\n(ESC) - back", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0); 

        this.difficultyLabel = this.add.text(game.config.width / 1.8, game.config.height / 2.8, "Select Difficulty\n*Lane Speed (0 - 10)", {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0); 
        this.difficultySelectLabel = this.add.text(game.config.width / 1.8, game.config.height / 2, "> Easy\nHard", {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0); 

        this.leftSelectLabel = this.add.text(50, game.config.height / 2 - 50, "<", {
            fontFamily: 'Silkscreen', 
            fontSize: 54
        }).setOrigin(0); 
        this.rightSelectLabel = this.add.text(game.config.width - 100, game.config.height / 2 - 50, ">", {
            fontFamily: 'Silkscreen', 
            fontSize: 54
        }).setOrigin(0); 
        this.difficultyLabel.alpha = 0;
        this.difficultySelectLabel.alpha = 0;

        this.selectedSong.setTitles(this.titleLabel, this.songsLabel);

        // let xxx = new ProgressBar(this, 0, 0, game.config.width * 2, "#FF00BF");
        // xxx.setValue(0.5);
    }

    createHowToPlay() {
        
    }

    update() {
        this.selectedSong.updatePreview(this);

        if(this.currentCooldown > 0) {
            this.currentCooldown -= (game.loop.delta * 0.001);
        }

        if(!this.selectingDifficulty && this.currentCooldown <= 0) {
            //if(Phaser.Input.Keyboard.JustDown(this.leftKey) || (Phaser.Input.Keyboard.JustDown(this.leftKey2))) {
            if(this.leftKey.isDown || this.leftKey2.isDown) {
                this.currentIndex--;
                if(this.currentIndex < 0) {
                    this.currentIndex = SongList.length - 1;
                }
    
                this.updateSelectedSong(this.currentIndex, false);
                this.currentCooldown = this.cooldown;
            } else if(this.rightKey.isDown || this.rightKey2.isDown) {
                this.currentIndex++;
                if(this.currentIndex > SongList.length - 1) {
                    this.currentIndex = 0;
                }
    
                this.updateSelectedSong(this.currentIndex, true);
                this.currentCooldown = this.cooldown;
            }

            if(Phaser.Input.Keyboard.JustDown(this.enterKey)) {
                // this.selectAudio.play(Note.SFXConfig);
                // console.log("ENTER BEATMAP!");

    
                // Select Difficulty
                this.selectingDifficulty = true;
                this.selectedSong.moveImage(this, 450, this.imageY + 80);        
                // this.difficultyLabel.alpha = 1;
                // this.difficultySelectLabel.alpha = 1;
                this.updateDifficultyLabel(1);
                this.clickAudio.play(Note.SFXConfig);
                this.updateDifficulty();
            }
        }

        if(this.selectingDifficulty && this.currentCooldown <= 0) {
            if(Phaser.Input.Keyboard.JustDown(this.escapeKey)) {    
                // Select Difficulty
                this.selectingDifficulty = false;
                this.selectedSong.moveImage(this);        
                // this.difficultyLabel.alpha = 0;
                // this.difficultySelectLabel.alpha = 0;
                
                this.updateDifficultyLabel(0);
                this.backAudio.play(Note.SFXConfig);
            }

            if(Phaser.Input.Keyboard.JustDown(this.upKey1) || Phaser.Input.Keyboard.JustDown(this.upKey2) ||
            Phaser.Input.Keyboard.JustDown(this.downKey1) || Phaser.Input.Keyboard.JustDown(this.downKey2)) {
                this.selectAudio.play(Note.SFXConfig);
                if(this.selectedDifficulty === Difficulty.EASY) {
                    this.selectedDifficulty = Difficulty.HARD;
                } else {
                    this.selectedDifficulty = Difficulty.EASY;
                }
                this.updateDifficulty();
            }

            if(Phaser.Input.Keyboard.JustDown(this.enterKey)) {
                this.selectAudio.play(Note.SFXConfig);
                CurrentSong = this.selectedSong;
                CurrentDifficulty = this.selectedDifficulty;
                this.selectedSong.switchOut(this);

                // Switch to level scene
                //this.scene.start(SceneKey.DEBUG); // Test
                this.scene.start(SceneKey.LEVEL);

                // Dispose song UI properly
                for(let i = 0; i < SongList.length; i++) {
                    SongList[i].disposeSongUI();
                }
            }
        }
    }

    updateDifficultyLabel(alpha) {
        this.tweens.add({
            ease: "Linear",
            targets: this.difficultySelectLabel,
            alpha: alpha,
            duration: 150,
            repeat: 0,
            callbackScope: this,
        });      
    
        this.tweens.add({
            ease: "Linear",
            targets: this.difficultyLabel,
            alpha: alpha,
            duration: 150,
            repeat: 0,
            callbackScope: this,
        });    

        this.tweens.add({
            ease: "Linear",
            targets: this.leftSelectLabel,
            alpha: 1 - alpha,
            duration: 150,
            repeat: 0,
            callbackScope: this,
        });    

        this.tweens.add({
            ease: "Linear",
            targets: this.rightSelectLabel,
            alpha: 1 - alpha,
            duration: 150,
            repeat: 0,
            callbackScope: this,
        });    
    }

    updateDifficulty() {
        let easyLaneSpeed = " (Lane Speed: "+this.selectedSong.easyLaneSpeed+")";
        let hardLaneSpeed = " (Lane Speed: "+this.selectedSong.hardLaneSpeed+")";
        let easyString = "Easy" + easyLaneSpeed;
        let hardString = "Hard" + hardLaneSpeed;
        if(this.selectedDifficulty === Difficulty.EASY) {
            easyString = "> Easy" + easyLaneSpeed;
        } else if(this.selectedDifficulty === Difficulty.HARD) {
            hardString = "> Hard" + hardLaneSpeed;
        }

        const diffString = easyString + "\n" + hardString;
        this.difficultySelectLabel.text = diffString;
    }

    updateSelectedSong(index, isLeft) {
        this.selectAudio.play(Note.SFXConfig);
        this.selectedSong.switchOut(this, isLeft);
        this.selectedSong = SongList[index];
        this.selectedSong.createSongUI(this, this.imageX, this.imageY);
        this.selectedSong.preview(this);
        this.songsLabel.text = "Song: " + (index + 1) + " / " + SongList.length;
        this.selectedSong.setTitles(this.titleLabel, this.songsLabel);
    }
}