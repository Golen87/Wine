import Phaser from 'phaser';
import PreloadScene from "./scenes/PreloadScene.js";
import TitleScene from "./scenes/TitleScene.js";
import LevelScene from "./scenes/LevelScene.js";
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin.js';

const config = {
	type: Phaser.AUTO,
	parent: 'Wine',
	width: 1280,
	height: 720,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		parent: "game",
		width: 1280,
		height: 720
	},
	scene: [
		PreloadScene,
		TitleScene,
		LevelScene
	],
	plugins: {
		global: [
			{
				key: 'rexRoundRectanglePlugin',
				plugin: RoundRectanglePlugin,
				start: true
			}
		]
	}
};

const game = new Phaser.Game(config);
