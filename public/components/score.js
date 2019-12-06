function score(x, y) {
    this.gamearea = myGameArea;
    this.x = x;
    this.y = y;
    this.score = 0;

    this.renderScore = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = "black";
        ctx.font = "35px Arial";
        ctx.fillText("Score : " + this.score.toString(), this.x, this.y);
        this.score++;
    }
}