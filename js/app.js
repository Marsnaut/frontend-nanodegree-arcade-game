var Enemy = function(x, y) {
	this.x = x
	this.y = y
	this.sprite = 'images/enemy-bug.png';
	this.height = 65;
	this.width = 95;
};

Enemy.prototype.update = function(dt) {
		if (this.x > ctx.canvas.width + this.width) {
			this.x  = 200 * Math.floor(Math.random() * 4) + 1;
		} else {
			this.x += 150 * dt;
		}

		// collision handling
		if ( player.x >= this.x - 30
			&& player.x <= this.x + 30
			&& player.y >= this.y - 30
			&& player.y <= this.y + 30) {
				player.x = 202;
				player.y = 388;
		}
};


Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function(x, y, sprite) {
	this.x = x
	this.y = y
	this.sprite = sprite;
	this.height = 65;
	this.width = 95;
}

const characterSprite = 'images/char-boy.png';
const player = new Player(202, 400, characterSprite);

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
	if (player.y < 56) {
		reset();
		alert('You win')
	}
};

Player.prototype.handleInput = function(dir) {

	const horizontalBound = 101;

	switch (dir) {
		case 'left':
			(this.x - horizontalBound >= 0) ? this.x  -= 100 : null;
			break;
		case 'right':
			(this.x + 2 * horizontalBound < ctx.canvas.width) ? this.x += 100 : null;
			break;
		case 'up':
			(this.y * 6 > horizontalBound) ? this.y -= 83 : null;
			break;
		case 'down':
			(this.y < 387) ? this.y += 83 : null;
			break;
		default:
			console.log(`There is an error in the 'handleInput' prototype.`)
	}
}

document.addEventListener('keyup', function(e) {
	var allowedKeys = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});


function reset() {
	allEnemies = enemyPosition.map((y, index) => {
		return new Enemy ((-200* (index + 1)), y);
	})
	player.x = 202;
	player.y = 388;
}

const enemyPosition = [55, 140, 230]; 

let allEnemies = enemyPosition.map((y, index) => {
	return new Enemy ((-200* (index + 1)), y);
}); 