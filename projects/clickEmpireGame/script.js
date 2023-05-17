const config = {
    loginPage: document.getElementById('loginPage'),
    newBtn : document.getElementById('new-btn'),
    loginBtn : document.getElementById('login-btn'),
    mainPage: document.getElementById('mainPage'),
    itemsPage: document.getElementById('itemsPage'),
    purcharePage: document.getElementById('purchasePage'),
}

class Player {
    constructor(name, yersOld, days=0, money=0) {
        this.name = name;
        this.yersOld = yersOld;
        this.days = days;
        this.money = money;
    }
}

class Game {
    constructor(player=null) {
        this.player = player;
    }

    new() {
        this.player = new Player(
            document.querySelector('input[name="playerName"]').value,
            20,
            0,
            10000,
        );
        return this.player;
    }

    load(playerName) {
        const json = JSON.stringify({name: playerName});
        console.log(json);
    
    }

    login() {

    }
    

    reset() {

    }

    start() {
        console.log(this.player);
    }
}

class EmpireGame extends Game {
    constructor(player) {
        super(player);
    }

}

class View {
   
    displayNone(target) {
        target.classList.remove('d-block');
        target.classList.add('d-none')
    }

    displayBlock(target) {
        target.classList.remove('d-none');
        target.classList.add('d-block');
    }

    start() {
        this.displayNone(config.loginPage);
        this.displayBlock(config.mainPage);
    }

}


function gameStart() {

    const player = new Player(
        document.querySelector('input[name="playerName"]').value,
    );
    console.log(player);
    let empireGame = new EmpireGame(player);
    let viewContllor = new View();

    config.newBtn.addEventListener('click', function () {
        empireGame.new();
        viewContllor.start();
    })

    config.loginBtn.addEventListener('click', function () {
        empireGame.load();
    })    
}


function main() {
    gameStart();
}

main();