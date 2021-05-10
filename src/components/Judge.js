export default class Judge extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.sprite = scene.add.sprite(0, 0, 'judge', 0);
		// this.sprite.setOrigin(0.5, 1.0);
		// this.sprite.setScale(this.size);
		// this.sprite.setTint(0x7777ff);
		this.add(this.sprite);


		let bubbleX = 80;
		let bubbleY = -150;

		this.speech = scene.add.image(bubbleX, bubbleY, 'judge_speech');
		this.speech.setVisible(false);
		this.add(this.speech);

		this.thought = scene.add.image(bubbleX, bubbleY+10, 'judge_thought');
		this.thought.setVisible(false);
		this.add(this.thought);

		this.text = scene.add.text(bubbleX, bubbleY-10, "", { font: "bold 25px Wii", color: "black" });
		this.text.setOrigin(0.5);
		this.text.setVisible(false);
		this.add(this.text);

		this.MAX_TEXT_WIDTH = 190;
		// this.debug = scene.add.rectangle(bubbleX, bubbleY-10, this.MAX_TEXT_WIDTH, 20, 0xFF0000, 0.5);
		// this.add(this.debug);

		this.setupAnimations();
	}

	update(time, delta) {
	}


	clear() {
		this.speech.setVisible(false);
		this.thought.setVisible(false);
		this.text.setVisible(false);
		this.play("judge_idle");
	}

	say(text) {
		this.thought.setVisible(false);
		this.speech.setVisible(true);
		this.text.setVisible(true);
		this.text.setScale(1);
		this.text.setText(text);
		let s = Math.min(1.0, this.MAX_TEXT_WIDTH / this.text.displayWidth);
		this.text.setScale(s);
		this.play("judge_speaking");
	}

	think(text) {
		this.speech.setVisible(false);
		this.thought.setVisible(true);
		this.text.setVisible(true);
		this.text.setScale(1);
		this.text.setText(text);
		let s = Math.min(1.0, this.MAX_TEXT_WIDTH / this.text.displayWidth);
		this.text.setScale(s);
	}


	play(key, ignoreIfPlaying=false) {
		this.sprite.play(key, ignoreIfPlaying);
	}

	setupAnimations() {
		this.scene.anims.create({
			key: 'judge_idle',
			frames: [
				{key: 'judge', frame: 0, duration: 0},
			]
		});

		this.scene.anims.create({
			key: 'judge_drinking',
			frames: [
				{key: 'judge', frame: 4, duration: 2000},
				{key: 'judge', frame: 0, duration: 0},
			]
		});

		this.scene.anims.create({
			key: 'judge_speaking',
			frames: [
				{key: 'judge', frame: 0, duration: 200},
				{key: 'judge', frame: 3, duration: 200},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'judge_disappointed',
			frames: [
				{key: 'judge', frame: 2, duration: 0},
			]
		});

		this.scene.anims.create({
			key: 'judge_happy',
			frames: [
				{key: 'judge', frame: 1, duration: 0},
			]
		});
	}
}