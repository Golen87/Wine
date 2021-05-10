export default class Player extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.sprite = scene.add.sprite(0, 0, 'robot', 0);
		// this.sprite.setOrigin(0.5, 1.0);
		// this.sprite.setScale(this.size);
		// this.sprite.setTint(0x7777ff);
		this.add(this.sprite);

		let bubbleX = -220;
		let bubbleY = -280;

		this.speech = scene.add.image(bubbleX, bubbleY, 'player_speech');
		this.speech.setVisible(false);
		this.add(this.speech);

		this.text = scene.add.text(bubbleX, bubbleY-8, "", { font: "bold 35px Wii", color: "black" });
		this.text.setOrigin(0.5);
		this.text.setVisible(false);
		this.add(this.text);
		this.text.setText("fuck deviantart");

		this.MAX_TEXT_WIDTH = 355;
		// this.debug = scene.add.rectangle(bubbleX, bubbleY-8, this.MAX_TEXT_WIDTH, 20, 0xFF0000, 0.5);
		// this.add(this.debug);

		this.setupAnimations();
	}

	update(time, delta) {
	}


	clear() {
		this.speech.setVisible(false);
		this.text.setVisible(false);
		this.play("idle");
	}

	say(text) {
		this.speech.setVisible(true);
		this.text.setVisible(true);
		this.text.setScale(1);
		this.text.setText(text);
		let s = Math.min(1.0, this.MAX_TEXT_WIDTH / this.text.displayWidth);
		this.text.setScale(s);
		this.play("speaking");
	}


	play(key, ignoreIfPlaying=false) {
		this.sprite.play(key, ignoreIfPlaying);
	}

	setupAnimations() {
		this.scene.anims.create({
			key: 'idle',
			frames: [
				// {key: 'robot', frame: 3, duration: 0},
				{key: 'robot', frame: 0, duration: 0},
			]
		});

		this.scene.anims.create({
			key: 'drinking',
			frames: [
				{key: 'robot', frame: 5, duration: 2000},
				{key: 'robot', frame: 3, duration: 2000},
				{key: 'robot', frame: 0, duration: 0},
			]
		});

		this.scene.anims.create({
			key: 'speaking',
			frames: [
				{key: 'robot', frame: 0, duration: 200},
				{key: 'robot', frame: 1, duration: 200},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'shocked',
			frames: [
				{key: 'robot', frame: 4, duration: 1500},
				{key: 'robot', frame: 2, duration: 0},
			]
		});

		this.scene.anims.create({
			key: 'confident',
			frames: [
				{key: 'robot', frame: 3, duration: 0},
			]
		});
	}
}