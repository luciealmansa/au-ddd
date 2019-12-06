function moneyBar(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.maxMoney = 300;
    this.moneyLevel = 150;

    this.renderMoneyBar = function () {
        ctx = myGameArea.context;
        this.drawMoneyBarBackground();
        this.drawMoneyBarForeground();
        this.drawMoneyBarNumber();
    }

    this.drawMoneyBarBackground = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.drawMoneyBarForeground = function () {
        ctx = myGameArea.context;
        if (this.moneyLevel > 70) {
            ctx.fillStyle = "green";
        }
        else if (this.moneyLevel > 30) {
            ctx.fillStyle = "yellow";
        }
        else {
            ctx.fillStyle = "red";
        }
        ctx.fillRect(this.x, this.y, this.width * (this.moneyLevel / this.maxMoney), this.height);
    }

    this.drawMoneyBarNumber = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Money : " + this.moneyLevel.toString() + "€", this.x + this.width / 4, this.y + this.height / 1.5);
    }

    this.addMoney = function (money) {
        let addition = this.moneyLevel + money;
        if (addition <= this.maxMoney && addition >= 0)
            this.moneyLevel = addition;
        else {
            if (addition < 0)
                this.moneyLevel = 0;
            else
                this.moneyLevel = this.maxMoney;
        }
    }

    this.removeMoney = function (money) {
        this.moneyLevel -= money
    }

    this.isGameOver = function () {
        return this.moneyLevel <= 0;
    }

}