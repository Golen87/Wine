export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({key: 'TitleScene'});
	}

	create() {
		this.cameras.main.setBackgroundColor(0x222222);

		this.scene.start("LevelScene");
	}

	update(time, delta) {
	}


	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

	fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}
}