function stressBar(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.maxStress = 100;
    this.stressLevel = 10;

    this.renderStressBar = function () {
        ctx = myGameArea.context;
        this.drawStressBarBackground();
        this.drawStressBarForeground();
        this.drawStressBarNumber();
    }

    this.drawStressBarBackground = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.drawStressBarForeground = function () {
        ctx = myGameArea.context;
        if (this.stressLevel > 80) {
            ctx.fillStyle = "red";
        }
        else if (this.stressLevel > 40) {
            ctx.fillStyle = "yellow";
        }
        else {
            ctx.fillStyle = "green";
        }
        /*if(!this.isGameOver()){
            this.stressLevel += 1
        }*/
        ctx.fillRect(this.x, this.y, this.width * (this.stressLevel / this.maxStress), this.height);
    }

    this.drawStressBarNumber = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Stress : " + this.stressLevel.toString() + "%", this.x + this.width / 4, this.y + this.height / 1.5);
    }

    this.addStress = function (stress) {
        let addition = this.stressLevel + stress;
        if (addition <= this.maxStress && addition >= 0)
            this.stressLevel = addition;
        else {
            if (addition < 0)
                this.stressLevel = 0;
            else
                this.stressLevel = this.maxStress;
        }
    }

    this.removeStress = function (stress) {
        this.stressLevel -= stress
    }

    this.isGameOver = function () {
        return this.stressLevel >= this.maxStress;
    }

}