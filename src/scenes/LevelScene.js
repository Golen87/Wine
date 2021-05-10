import Player from "./../components/Player.js";
import Judge from "./../components/Judge.js";

export default class LevelScene extends Phaser.Scene {
	constructor() {
		super({key: 'LevelScene'});
	}

	create() {
		this.cameras.main.setBackgroundColor(0xFFFFFF);

		let background = this.add.image(this.CX, this.CY, 'background');
		let table = this.add.image(this.CX, this.CY, 'table');
		table.setDepth(1);

		// let arrow = this.add.image(this.CX, this.CY, 'arrow');
		// let player_speech = this.add.image(this.CX, this.CY, 'player_speech');

		this.judge1 = new Judge(this, 220, 420);
		this.judge2 = new Judge(this, 395, 405);
		this.judge3 = new Judge(this, 570, 390);

		// this.judge1.say("What even?");
		// this.judge2.say("This is NUTS.");
		// this.judge3.think("Why am I even here?");

		this.player = new Player(this, 3/4*this.W, 5/8*this.H);
		this.player.setDepth(1);


		/* 4 alternatives */

		const altX = 800;
		const altY = 150;
		const altPos = [
			{x: 200, y: 0},
			{x: 0, y: 100},
			{x: -200, y: 0},
			{x: 0, y: -100},
		];

		this.arrows = [];
		this.texts = [];

		for (let i = 0; i < 4; i++) {
			let x = altX + altPos[i].x;
			let y = altY + altPos[i].y;
			let dx = Math.round(Math.cos(i*Math.PI/2));
			let dy = Math.round(Math.sin(i*Math.PI/2));

			let arrow = this.add.image(x, y, "arrow");
			arrow.setOrigin(0.5);
			arrow.setAngle(i * 90);
			arrow.setVisible(false);
			this.arrows.push(arrow);

			let text = this.add.text(x-35*dx, y-30*dy, "...", { font: "bold 30px Wii", color: "black" });
			text.setOrigin(0.5+0.5*dx, 0.5+0.5*dy);
			text.setVisible(false);
			text.maxWidth = 160;
			this.texts.push(text);

			// let debug = this.add.rectangle(text.x, text.y, text.maxWidth, 20, 0xFF0000, 0.5);
			// debug.setOrigin(0.5+0.5*dx, 0.5+0.5*dy);
		}

		this.alternatives = [null, null, null, null];
		this.choiceAvailable = false;
		this.rudeTiming = true;


		/* Input */

		this.setupInput();


		/* Gameplay */

		this.addEvent(1500, this.startRound);
	}


	startRound() {
		this.judge1.clear();
		this.judge2.clear();
		this.judge3.clear();
		this.player.clear();
		this.judge1.play({key: 'judge_drinking'});
		this.judge2.play({key: 'judge_drinking'});
		this.judge3.play({key: 'judge_drinking'});
		this.player.play({key: 'drinking'});

		this.addEvent(2000, this.showAlternatives);
		this.addEvent(5000, this.startJudges);
	}

	startJudges() {
		this.choiceAvailable = true;
		this.rudeTiming = true;

		let hold = 1500;
		let sep = hold + 100;
		this.events = [];
		this.events[0] = this.addEvent(0*sep, () => { this.judge1.say("Nutty."); });
		this.events[1] = this.addEvent(0*sep+hold, () => { this.judge1.clear(); });
		this.events[2] = this.addEvent(1*sep, () => { this.judge2.say("Oaky."); });
		this.events[3] = this.addEvent(1*sep+hold, () => { this.judge2.clear(); });
		this.events[4] = this.addEvent(2*sep, () => { this.judge3.say("Well-bodied."); });
		this.events[5] = this.addEvent(2*sep+hold, () => { this.judge3.clear(); this.rudeTiming = false; });

		this.events[6] = this.addEvent(10000, () => { this.failure("Hello...?"); });
	}

	showAlternatives() {
		let phrases = [
			{text: "Astringent", success: false, reason: "It's not that bad."},
			{text: "Opulent", success: true},
			{text: "Lecker", success: false, reason: "English please?"},
			{text: "Emollient", success: false, reason: "You're describing skin."},
		];
		for (let i = 0; i < 4; i++) {
			this.arrows[i].setVisible(true);
			this.texts[i].setVisible(true);
			this.texts[i].setScale(1.0);
			this.texts[i].setText(phrases[i].text);
			this.texts[i].setScale(Math.min(1.0, this.texts[i].maxWidth / this.texts[i].displayWidth));
			this.alternatives[i] = phrases[i];
		}
	}

	clearAlternatives() {
		for (let i = 0; i < 4; i++) {
			this.arrows[i].setVisible(false);
			this.texts[i].setVisible(false);
		}
		this.choiceAvailable = false;
	}

	onSelect(index) {
		if (this.choiceAvailable) {
			this.clearAlternatives();
			for (var i = this.events.length - 1; i >= 0; i--) {
				this.events[i].remove();
			}
			this.addEvent(500, () => {
				this.judge1.clear();
				this.judge2.clear();
				this.judge3.clear();
			});
			this.player.say(this.alternatives[index].text + ".");

			let success = this.alternatives[index].success;

			this.addEvent(2000, () => { this.player.clear(); });
			if (this.rudeTiming) {
				this.addEvent(3000, () => { this.failure("How rude."); });
			}
			else if (!success) {
				this.addEvent(3000, () => { this.failure(this.alternatives[index].reason); });
			}
			else {
				this.addEvent(3000, this.success);
			}
		}
	}

	failure(message) {
		this.clearAlternatives();
		this.judge1.play({key: 'judge_disappointed'});
		this.judge2.play({key: 'judge_disappointed'});
		this.judge3.play({key: 'judge_disappointed'});

		this.addEvent(750, () => {
			this.player.play({key: 'shocked'});
			this.judge1.think(message);
		});

		this.addEvent(4000, this.startRound);
	}

	success() {
		this.judge1.play({key: 'judge_happy'});
		this.judge2.play({key: 'judge_happy'});
		this.judge3.play({key: 'judge_happy'});
		this.addEvent(1000, () => { this.player.play({key: 'confident'}); });

		this.addEvent(3000, this.startRound);
	}


	update(time, delta) {
		this.player.update(time, delta);

		// this.judge1.say("?".repeat(Math.round(10+10*Math.sin(time/200))));
		// this.player.say("M".repeat(Math.round(10+10*Math.cos(time/200))));
	}


	setupInput() {
		// if (!this._listeners) {
			// this._listeners = true;
		// }

		// this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
			// .on('down', this.onTapDown, this)
			// .on('up', this.onTapUp, this);
		// this.input.on('pointerdown', this.onTapDown, this);
		// this.input.on('pointerup', this.onTapUp, this);

		this.keys = this.input.keyboard.addKeys({
			up: 'up',
			down: 'down',
			left: 'left',
			right: 'right',
			W: 'W',
			S: 'S',
			A: 'A',
			D: 'D'
		});

		this.keys.right.on('down', () => {this.onSelect(0);});
		this.keys.down.on('down', () => {this.onSelect(1);});
		this.keys.left.on('down', () => {this.onSelect(2);});
		this.keys.up.on('down', () => {this.onSelect(3);});
	}

	// get leftDown() {
		// return (this.keys.left.isDown || this.keys.A.isDown);
	// }

	// get rightDown() {
		// return (this.keys.right.isDown || this.keys.D.isDown);
	// }

	// onTapDown(event) {
	// }

	// onTapUp(event) {
	// }


	addEvent(delay, callback, callbackScope=this) {
		return this.time.addEvent({delay, callback, callbackScope});
	}


	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

	fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}
}