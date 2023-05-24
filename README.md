# Documentation
<a name="br3"></a>**Introduction**

The game's title is called "Rhythm Car", a horizontal scrolling rhythm game as the music note

(obstacle) is scrolling from right to left. The game is made using Phaser js, a javascript game

library, the main programming language of the game is javascript. The game features spawn

obstacles sync with the music beat, players have to press buttons based on the music beat and

obstacle’s position. Player performance can be judged by how accurately the obstacle is

pressed and how long the player can continuously hit the obstacle correctly (combo).

The basic functions of the game are

● Song selection, players can select different songs to play.

● Difficulty selection, each song has easy and hard difficulty. Players can choose a

difficulty that fits their requirements.

● Spawn obstacles based on the song beat, BPM (Beat per minute) to acquire accurate

beats of the music.

● Score is calculated based on the player performance such as combo, accuracy and

type of obstacles the player hits.

● Accuracy can be calculated based on the hit result (PERFECT, GREAT, BAD and

MISS) weight based on the simple formula given by (osu!, n.d.).

● Result page is shown with a grade given based on the player's accuracy.


<a name="br4"></a>**Game Documentation**

***Introduction***

In the game is a horizontal scrolling rhythm game which moves the note towards the player

and the player has to press keys on the keyboard to hit the note in perfect timing to get a

perfect score. The idea is derived from one of the simplest ways of creating a rhythm game,

which is highway scrolling rhythm games (Mental Checkpoint, 2021), most of the rhythm

games are designed in this way. Highway scrolling rhythm games are scrolling notes towards

the player regardless of the direction (Mental Checkpoint, 2021).

The game is referencing one of the popular rhythms called Muse Dash made by the PeroPero

game (peropero, 2019). Muse Dash is also a horizontal scrolling rhythm game with two lanes.

***Game Mechanics***

***Beatmap***

The key to having a good rhythm game is to be able to spawn the notes sync with the music

beat, so the gameplay can fully emphasise the song correctly to the player. For example, a

music with higher BPM should expect more notes than a lower BPM music.


The simplest way to count the beat is count the beat in 4/4 format, meaning every 4 beats will

count as a bar. The rhythm game osu! Is also counting the beat in this format (osu!, n.d.), the

beat can be written in this format: 0:0 (First beat of the song). For instance, 1:2 will be the

sixth beat of the song as the left number indicates 1 bar (4 beats) and 2 indicates 2 beats.

Other than that, sometimes the note has to place it between the beat, we can achieve this by

dividing the second per beat (length of 1 beat) by a number (usually is 4) to get the accurate

beat, the number is called beat snap divisor in osu! editor (osu!, n.d.). Each song has their

own offset value, the offset will be used to wait until a certain time to start counting the beat

as it will give the best precision of the BPM counting.

In this project, the beatmap.js is responsible for calculating the beats of the song by iterating

from start to finish of the song. It will generate an array of beats with the accurate time (in

second) of every beat. The formula given below is used in the project, we can see the spawn

time of a note is calculated with the time of a beat, temp (second per beats) divided by beat

snap divisor and finally multiplied with the position. For example, dividing a beat with 4 will

give 4 sub beats, each beat can be acquired by giving the position number range from 0 - 3.

*Code to calculate spawn time of a note*

In short, to specify when to spawn a note, 4 values are needed: beat, sub-beat, beat snap

divisor and the position of a divisor.


<a name="br6"></a>The note data class (inside beatmap.js) responsible for constructing usable data for the

beatmap to spawn notes. The data contains beat, sub beat, beat snap divisor, beat snap divisor

position, type, hold snap divisor, hold multiplier, down.

**● Beat**

Main beat position, counting when a bar of beat is finish (mentioned above)

**● Sub Beat**

Beat count, counting when a seconds per beat is passed.

**● Beat Snap Divisor**

Divisor to divide further between the beat, allow note to place between a beat. 1 will

mean no division at all.

**● Beat Snap Divisor Position**

Position value to move the note between the divided beat, values can be range from 0

to (Beat Snap Divisor - 1)

**● Type**

Type of the note, in the game there are 4 types of note needed to specify in the note

data construction which is Normal, Hold, No Hit and Big Note to be able to

emphasise different parts of a music.

**● Hold Snap Divisor**

Only valid for hold note, meaning how long to hold a note with the beat using the beat

snap divisor method.

**● Hold Multiplier**

Only valid for hold note, meaning how long to hold a note with the beat using the beat

snap divisor position to get the final position of the beat.

**● Down**
As the game contains only two lanes, note data needs to be able to know which lane

should be spawn at.

***Song Management***

As the game contains multiple songs for the player to choose, each song should have their old

unique variables such as album image, music file (in mp3 format), details and map data to

construct a playale level. Songs are stored inside the song folder as the image shows below,

each song has 3 files: cover image, audio file and data json file.


The data.json file contains basic information of the song such as source (where the song come

from e.g. video game, TV show, anime), name, artist, bpm, and offset (time to start counting

bpm in seconds) as well as the note data as the image shows below.


Aside from the properties mansion above, a song also contains lane speed for both difficulty

and preview timeline (in seconds) to be able to loop certain parts of the music when the

player is selecting a song. Map data is stored in 2D array format for both difficulty labels as

hard and easy in the json file following the note data format order.

***Song Choice***

To keep everything deliverable within the deadline, the program is only able to play songs

with consistent BPM across the whole song. For example, songs with multiple BPM

changing between will not be able to correctly place the notes in the game. Hence, songs that

are chosen for the game should have consistent BPM.


<a name="br9"></a>Songs should have an interesting beat such as EDM (Electronic Dance Music) is the first

choice. For instance, a drop in the music can be interpreted as note spamming such as stream

(FullCombro, 2021) in gameplay to make the player feel the intensity of the song.

Songs used in the game:

● Bye or Not feat. Mikanzil by PSYQUI

● NINI (邇々) feat. Qayo & mii by tezuka

● Cyaegha by USAO


***Song Selection***

When the player is selecting a song to play, not only to show the song details but also play the

preview audio of the song by looping a certain part of the song (usually the hype part) to

really attract the player. When looping the song, fade in and fade out effects can be applied to

the audio to smooth the audio, the plugin is available mentioned on the Phaser documentation.

Players can also preview the album cover image, it can be polished by making it to a circle

image by using a plugin available on the Phaser documentation (Rex, n.d.) and constantly

spin to create disc spinning effect. Moreover, the image can scale up and down using tween

sync with the BPM to create stunning effects.

***Notes and Obstacles***

The obstacles in the game will be the note that coming towards the player, the player has to

press the key with correct timing and lane to beat the note in order to gain a perfect score.


<a name="br10"></a>Note that pressing with wrong timing (too early or too bad) will result in bad or miss which

breaks the combo to reduce the score gain in a level. Note that not being pressed and passing

to behind the player will also result the same.

The note is spawn when the spawn time calculated is bigger or equal to the current playing

song seek value. After spawning a note, the note will use tween to move towards the player to

have accurate time and speed to be able to sync with the song.

As the note will move to judgement points (up and down lane) with perfect timing, the result

can be checked by calculating the distance between judgement points and note position.

Failing to press the note in acceptable timing or miss the note completely will result in losing

HP (health point) and combo break.

Sprites for Hold, End and Big Note are created by ansimuz on itch.io (ansimuz, 2021),

Normal Note is found on PngAAA (PngAAA, n.d.) and No Hit Note is found on ClipartMax

(ClipartMax, n.d.). The note sprite is highlighted with blue and pink colour to represent up

and down lanes to make it easier for the player to read the notes.

The game has different type of note to interpreted a song correctly and precisely:

**● Normal**
<a name="br11"></a>A normal note, players have to just simply press it with correct timing to eliminate the

obstacle.

**● Hold**

Players have to press the note in correct timing to be able to start holding the note

until the end note touches the judgement point.

**● End Note**

Note that link with a hold note (parent note) to construct a hold note. It is an auto

generated note when the beatmap system spawn a hold note, so it does not need to be

specified in note data.

**● No Hit**

Note that the player does not need to press the key in the correct timing to eliminate it,

the player simply just moves the car in the correct lane and touches the note to gain

score. Miss the note will not break the combo. The note is usually used to emphasise

the soft part in a song. Moreover, this note will heal the player if the player

successfully touches it.


<a name="br12"></a>**● Big Note**

Similar to normal notes, but big notes will have different and bigger sprites and harder

audio when they get hit. The note is usually used to emphasise the hard part in a song

such as big drop and drum.

*Note uses velocity and gravity to archive hit feedback to the player*

Normal and Big Note when hit will add velocity and gravity combined with tween to make it

feel like it got hit and fly away off the screen to make the game more polished and complete.


<a name="br13"></a>***Player***

The player sprite is a free asset created by ansimuz on itch.io (ansimuz, 2022) including

parallax backgrounds. The player can move the car up and down by pressing D or F keys for

up, J or K keys for down. Moreover, the player can press and hold the keys to hold a note.

With these simple 4 keys, some interesting patterns can be created such as stream and burst

which require the player to spam both keys to be able to hit those notes; holding a key and

beat note at the same time.


The player will take damage if the note collides with the player car, the collider is shown

below by setting the debug mode of physics engine to true in Phaser.

The car collider shown above will follow the car go up and down, if a note (except no hit) is

failed to hit by the player and collides with the car collider, HP will be subtracted by the note

damage as each note will deal different damages.

*Player HP UI place above the screen*

<a name="br15"></a>***Judgement colliders***

The game needs judgement colliders to be able to judge the note hit by the player. The result

can be calculated by the distance in x-axis between the judgement collider and note. Distance

values can be set for 4 different hit results (Perfect, Great, Bad and Miss).



The judgement collider is longer as it needs to detect the note in a certain range to be able to

correctly judge the note if the player hits too early or too late. Note will enter the activated

state and ready to be pressed. In some cases, multiple notes will enter the collider, only the

first note entering the collider will register a hit to prevent multiple notes hit at once resulting

poor note hit detection and feedback to the player.


Miss collider is used to detect if the note is completely missed by judgement colliders and car

colliders. When a note collides with a miss collider, it will register a miss to the player.


***Song Difficulty***

Each song contains two difficulties: easy and hard. In easy map, the player can play the song

without the required do stream or burst (spamming the same lane with two keys), which is

easier and acceptable to any newcomer to the game. In a hard map, the player is generally

required to burst and stream constantly which made the map harder and required good

consistency and stamina to have good performance.

Besides, songs with higher BPM should be hardware than lower BPM songs as more notes

need to be pressed in the same amount of time.


***Scoring System***

The scoring system is made by referencing osu! ScoreV1, to create a simplified version of it

(osu!, n.d.). The osu! The ScoreV1 system will multiply with multiple multipliers as osu! is a


<a name="br17"></a>much larger game with a long history, it takes the consideration of difficulty and mod (make

the game easier or harder). The simplified version in this project will only consider the

combo and accuracy, as the accuracy is also taken into consideration which makes the player

have to really hit the note with perfect timing to maximise the score.


The accuracy calculation is essentially just total of note weight (100% for perfect hit, 0% for

miss) divided by total number of notes hit, osu! calculated the accuracy from each hit object

by its value and divided by the maximum possible amount (osu!, n.d.). Same formula is

applied in this project by summing the accuracy weight (range from 0 - 1) and dividing by the

total notes hit to get the current accuracy when the player is playing. No hit note will not

contribute any accuracy as the player will not hit the note.


<a name="br18"></a>*Implemented accuracy formula code*

The score and accuracy weight is define as below to be able to calculate in different note hit

result. Moreover, a grade (SSS, SS, S, A, B, C and D) will be shown based on the player's accuracy.

<a name="br19"></a>***Audio feedback***

When a player successfully hits a note, an audio will be played for that particular note to give

the feedback to the player. Hence, the player can instantly know a note is hit successfully. In

contrast, a combo break audio will be played if the player misses a note when holding a

certain number of combo.

Audio is from both game Muse Dash developed by PeroPero Game (peropero, 2019) and

osu! (osu!, n.d.). Other sound effects can be found on (pixabay, n.d.).

***Gameplay***

The core gameplay is to make the player press the buttons with the beat, reward the player

with a higher score if the note is hit with perfect timing. Player is able to replay the songs

again in order to again get the best score possible. Multiple difficulty is implemented to suit

different levels of player skills. Players can use easy difficulty maps as training and get used

to the game mechanics and rules before trying the hard map. The map design should have

good flow to keep the player busy with no bigger gap and rest between each major beat.

***Winning & Losing condition***

***Winning***

Player is winning when they successfully pass a song.

***Losing***

Player is losing when the HP drops to 0 and fails a song.


<a name="br20"></a>**User Manual**

<a name="br21"></a>***Controls***

***UI controls***

**Select left** - A or Left arrow key

**Select right** - D or Right arrow key

**Select up** - W or Up arrow key

**Select down** - S or Down arrow key

**Confirm select** - Enter key

**Back** - Escape key

***Gameplay controls***

**Hit Note** - D and F keys for up lane; J and K keys for down lane

**Pause / Unpause** - Escape key

**Select up in menu** - W or Up arrow key

**Select down in menu** - S or Down arrow key

**Confirm select** - Enter key