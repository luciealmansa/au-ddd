function moneyBar(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.amount = Math.floor(Math.random() * 10) + 1;

    this.render = function () {
        ctx = myGameArea.context;
    }

    this.drawMoneyBarBackground = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}