export default class PreloadScene extends Phaser.Scene {
	constructor() {
		super({key: 'PreloadScene'});
	}

	preload() {
		this.cameras.main.setBackgroundColor(0x111111);

		this.loading = this.add.text(this.CX, this.CY, "Loading...", { font: "20px Courier" });
		this.loading.setOrigin(0.5);

		this.load.on('progress', this.onLoadProgress, this);


		/* Images */

		this.load.image('background', 'assets/images/background.png');
		this.load.image('table', 'assets/images/table.png');
		this.load.image('arrow', 'assets/images/arrow.png');
		this.load.image('judge_speech', 'assets/images/judge_speech.png');
		this.load.image('judge_thought', 'assets/images/judge_thought.png');
		this.load.image('player_speech', 'assets/images/player_speech.png');
		this.load.spritesheet('judge', 'assets/images/judge.png', { frameWidth: 117, frameHeight: 176 });
		this.load.spritesheet('robot', 'assets/images/robot.png', { frameWidth: 220, frameHeight: 381 });


		/* Audio */

		// this.load.audio('shoot_1', 'assets/audio/shoot_1.wav');


		/* Plug-ins */

		//this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);    
	}

	onLoadProgress(progress) {
		this.loading.setText(`Loading... ${Math.round(progress * 100)}%`);
	}

	create() {
		this.scene.start("TitleScene");
	}


	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

	fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}
}