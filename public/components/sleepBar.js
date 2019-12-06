function sleepBar(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.maxSleep = 100;
    this.sleepLevel = 100;

    this.renderSleepBar = function () {
        ctx = myGameArea.context;
        this.drawSleepBarBackground();
        this.drawSleepBarForeground();
        this.drawSleepBarNumber();
    }

    this.drawSleepBarBackground = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.drawSleepBarForeground = function () {
        ctx = myGameArea.context;
        if (this.sleepLevel > 70) {
            ctx.fillStyle = "green";
        }
        else if (this.sleepLevel > 30) {
            ctx.fillStyle = "yellow";
        }
        else {
            ctx.fillStyle = "red";
        }
        ctx.fillRect(this.x, this.y, this.width * (this.sleepLevel / this.maxSleep), this.height);
    }

    this.drawSleepBarNumber = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Sleep : " + this.sleepLevel.toString() + " %", this.x + this.width / 4, this.y + this.height / 1.5);
    }

    this.addSleep = function (sleep) {
        let addition = this.sleepLevel + sleep;
        if (addition <= this.maxSleep && addition >= 0)
            this.sleepLevel = addition;
        else {
            if (addition < 0)
                this.sleepLevel = 0;
            else
                this.sleepLevel = this.maxSleep;
        }
    }

    this.removeSleep = function (sleep) {
        this.sleepLevel -= sleep
    }

    this.isGameOver = function () {
        return this.sleepLevel <= 0;
    }

}