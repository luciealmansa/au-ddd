function player(color, x, y) {
    this.gamearea = myGameArea;

    this.img = new Image();
    this.img.src = "/public/images/stickman0.png";
    this.counter = 5;
    this.spriteNumber = 0;

    this.width = this.img.width;
    this.height = this.img.height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.canWidth = myGameArea.canvas.width;
    this.canHeight = myGameArea.canvas.height;
    this.speed = 5;


    this.update = function () {
        this.newPos()
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x, this.y);
        this.counter--;
        
        if(this.counter < 0){ 
           this.img.src = "/public/images/stickman" + this.spriteNumber + ".png";
            if(this.spriteNumber == 0){
                this.spriteNumber = 1
            }
            else{
                this.spriteNumber = 0
            }
            this.counter = 5;
        }
        
    }

    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.setPlayerInCanvas();
    }

    this.setPlayerInCanvas = function () {
        if (this.x > this.canWidth) {
            this.x = 0;
        }
        else if (this.x + this.width < 0) {
            this.x = this.canWidth;
        }
        if (this.y > this.canHeight) {
            this.y = 0;
        }
        else if (this.y + this.width < 0) {
            this.y = this.canHeight;
        }
    }

    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

}
