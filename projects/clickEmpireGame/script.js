const config = {
    loginPage: document.getElementById('loginPage'),
    mainPage: document.getElementById('mainPage'),
}

const imgPass = 'img/';
class Item{
    constructor(nameJP, nameEN, type, currentAmount, maxAmount, price, perMoney, perRate, imgUrl) {
        this.nameJP = nameJP;
        this.nameEN = nameEN;
        this.type = type;
        this.currentAmount = currentAmount;
        this.maxAmount = maxAmount;
        this.price = price;
        this.perMoney = perMoney;
        this.perRate= perRate;
        this.imgUrl = imgUrl;
    };
}


class Player {
    constructor(name, age, days=0, money=0,  items) {
        this.name = name;
        this.age = age;
        this.days = days;
        this.money = money;
        this.burgarCount = 0;
        this.incomePerSec = 0;
        this.incomePerClick = 0;
        this.stock = 0;
        this.items = items;
    }
}


class View {
    static displayNone(target) {
        target.classList.remove('d-block');
        target.classList.add('d-none')
    }

    static displayBlock(target) {
        target.classList.remove('d-none');
        target.classList.add('d-block');
    }

    //表示、非表示を行う
    static switchPage(hide, show) {
        View.displayNone(hide);
        View.displayBlock(show);
    }

    // ページ全体の初期化
    static initPage() {
        config.loginPage.classList.remove('d-none');
        config.loginPage.innerHTML = '';
        config.mainPage.innerHTML = '';
    }

    // 最初のページを生成し、newボタン loginボタンのクリックを受ける
    static createStartPage() {
        let container = document.createElement('div');
        container.classList.add('vh-100', 'd-flex', 'justify-content-center', 'align-items-center', 'bg-dark');
        container.innerHTML += `
            <div class="vh-100 d-flex justify-content-center align-items-center bg-dark">
                <div class="text-center bg-white p-4 viviBorder--primary">
                    <h1 class="mb-3">Clicker Empire Game</h1>
                    <form>
                        <div class="form-row">
                            <input type="text" name="playerName" class="form-control" placeholder="player name" required>
                        </div>
                    </form> 

                    <div class="pt-3 d-flex justify-content-between">
                        <div class="col-6">
                            <button id="new-btn" type='button' class="btn btn-primary col-12">New</button>
                        </div>
                        <div class="col-6">
                            <button id="login-btn" type='button' class="btn btn-primary col-12">login</button>
                        </div>
                    </div>
                </div>
            </div>
        `;


        let newBtn = container.querySelector('#new-btn');
        let loginBtn = container.querySelector('#login-btn');
        newBtn.addEventListener('click', function () {
        const name = container.querySelector('input[name="playerName').value;
            if (!name) {
                alert('名前を入力して下さい'); 
            } else {
                let player = Game.new();
                Game.moveStartPageToMainPage(player);
            };

        });

        loginBtn.addEventListener('click', function () {
        const name = container.querySelector('input[name="playerName').value;
            if (!name) {
                alert('名前を入力して下さい');
            } else {
                Game.login(name);
            } 
        });

        return container;
    }

    // メインのページを生成する。リセットボタンとセーブボタンを受け付ける
    static createMainPage(player) {
        let container = document.createElement('div');
        container.innerHTML = `

            <div class="vh-100 d-flex justify-content-center align-items-center height__vh100 "> 
                <div id='burgarStatus' class="border--bold text-white text-center p-3 col-3">
                </div>
                <div id='mainRight' class="col-7">
                    <div id="userinfo" class="p-1">
                    </div>
                    <div id="itemsPage" class='border overflow-auto items__height mb-3'>
                    </div>
                </div>
            </div>
            `;


        container.querySelector('#burgarStatus').append(View.createBurgarPage(player));
        container.querySelector('#userinfo').append(View.createUserInfoPage(player));

        let mainRightPage = container.querySelector('#mainRight');
        mainRightPage.innerHTML += View.createReloadSaveBtn();

        container.querySelector("#itemsPage").append(View.createItemsPage(player));

        
        let resetBtn = container.querySelector('#reset');
        resetBtn.addEventListener("click", function () {
            Game.reset(player);
        });

        let saveBtn = mainRightPage.querySelectorAll('#save')[0];
        saveBtn.addEventListener('click', function () {
            Game.save(player);
        });
        
        return container;
    }

    // ハンバーガーの部分を生成する。クリックを受け付ける
    static createBurgarPage(player) {
        let container = document.createElement('div');
        container.innerHTML += `
            <div class="col py-1 mb-5 bg__primary"> 
                <h5>${player.burgarCount} Burgers</h5>
                <p>one click <strong> 100 <strong></p>
            </div>
            <div class="d-flex justify-content-center">
                <img id='burgarImage'src="img/food_hamburger.png" class="py-2 mainPage__img--left currsor--hover">
            </div>
        `;

        let burgarClick = container.querySelector('#burgarImage');
        burgarClick.addEventListener('click', function () {
            Game.clickBurgar(player);
        });


        return container;
    }

 
    // userInfo部分の生成
    static createUserInfoPage(player) {
        let container = document.createElement('div');
        container.innerHTML += `
                <div class="d-flex flex-wrap border">
                    <div class="border text-white text-center col-6">
                        <p class="mb-0 p-3" id="userName">${player.name}</p>
                    </div>
                    <div class="border text-white text-center col-6">
                        <p class="mb-0 p-3" id="userYersOld">${player.age} yers old</p>
                    </div>
                    <div class="border text-white text-center col-6">
                        <p class="mb-0 p-3" id="userDays">${player.days} days</p>
                    </div>
                    <div class="border text-white text-center col-6">
                        <p class="mb-0 p-3" id="userMoney">${player.money} yen</p>
                    </div>
                </div>
        `;

        return container;
    }


    // アイテム部分の生成 クリックされると購入画面が開く 
    static createItemsPage(player) {
        let container = document.createElement('div');
        for (let i = 0; i < player.items.length; i++) {
            container.innerHTML += `
                <div class="border d-flex align-items-center text-white p-3 selectItems">
                    <div class="col-3 ">
                        <img src="${player.items[i].imgUrl}" class="img-fluid">
                    </div>
                    <div class="col-9">
                        <div class="d-flex justify-content-between mb-3">
                            <h4 id='item-name' class="">${player.items[i].nameJP}</h4>
                            <h4 class="">${player.items[i].currentAmount}</h4>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h5 class="">${player.items[i].price} yen</h5>
                            <h5 class="">${View.createItemsIncome(player.items[i], player.items[i].type)}</h5>
                        </div>
                    </div>
                </div>
            `;
        };

        let select = container.querySelectorAll(".selectItems");

        for (let i = 0; i < select.length; i++) {
            select[i].addEventListener("click", function (){
                let itemsPage = config.mainPage.querySelector('#itemsPage');
                itemsPage.innerHTML = '';
                itemsPage.append(View.createPurchasesPage(i, player));
            });

        };

        return container;
    };

    //  アイテム画面のインカム部分の生成
    static createItemsIncome(item, type) {
        if (type === 'investment') return item.perRate + 'yen/sec';
        else if (type === 'realState') return item.perMoney + 'yen/sec';
        else return item.perMoney + 'yen/click';
    }

    // メインページのセーブとリロードボタンの生成　
    static createReloadSaveBtn() {
        const reloadSaveBtn = `
            <div class="d-flex justify-content-end">
                <div class="border currsor--hover mr-2 p-2" id="reset">
                    <i class="fas fa-undo fa-2x text-white"></i>
                </div>
                <div class="border currsor--hover p-2" id="save">
                    <i class="fas fa-save fa-2x text-white"></i>
                </div>
            </div>
        `;

        return  reloadSaveBtn;
    };

    // 購入画面の生成　バックボタンと購入ボタンを受け付ける
    static createPurchasesPage(index, player) {
        let container = document.createElement('div');
        container.innerHTML = `
            <div class="p-3 text-white ">
                <div class="d-flex justify-content-between align-items-center col">
                    <div class="col-8">
                        <h4 class="">${player.items[index].nameJP}</h4>
                        <p class="mb-1">Max purchases: ${player.items[index].maxAmount === Infinity ? '無限' : player.items[index].maxAmount}</p>
                        <p class="mb-1">Price: ${player.items[index].price} yen</p>
                        <p class="mb-1">Get ${View.createItemsIncome(player.items[index], player.items[index].type)}</p>
                    </div>
                    <div class="col-4">
                        <img src="${player.items[index].imgUrl}" class="img-fluid">
                    </div>
                </div>
                <p>How many would you like to buy?</p>
                <input type="number" name="input-purcheaes"  placeholder="0" class="form-control col-12" value=0>
                <h5 id='totalPrice' class="text-right mt-2" >total: 0</h5>

                <div class="pt-3 d-flex justify-content-between">
                    <div class="col-5">
                        <button id="back-btn" type='button' class="btn btn-outline-primary col-12 bg-light">Go Back</button>
                    </div>
                    <div class="col-5">
                        <button id="purchases-btn" type='button' class="btn btn-primary col-12">Purchase</button>
                    </div>
                </div>
            </div>
        `;

        // 購入数に入力された値からトータルを更新
        let inputValue = container.querySelector('input');
        inputValue.addEventListener('input', function () {
            let totalPrice = container.querySelector('#totalPrice');
            totalPrice.innerHTML =
                `
                total: ${Game.getTotalPrice(player.items[index], parseInt(inputValue.value))} 
            `;
        });

        let backBtn = container.querySelector('#back-btn');
        backBtn.addEventListener('click', function () {
            View.updateMainPage(player);
        });

        let purchasesBtn = container.querySelector('#purchases-btn');
        purchasesBtn.addEventListener('click', function () {
            Game.purchaseItems(player, player.items[index], parseInt(inputValue.value));
            View.updateMainPage(player);
        });
        return container;
    }

    // メインページの更新
    static updateMainPage(player) {
        config.mainPage.innerHTML = '';
        config.mainPage.append(View.createMainPage(player));
    }

    // ハンバーガーの部分の更新
    static updateBurgarPage(player) {
        let burgarStatus = config.mainPage.querySelector('#burgarStatus');
        burgarStatus.innerHTML = '';
        burgarStatus.append(View.createBurgarPage(player));
    }

    // userInfo部分の更新
    static updateUserInfo(player) {
        let userInfo = config.mainPage.querySelector('#userinfo');
        userInfo.innerHTML = '';
        userInfo.append(View.createUserInfoPage(player));
    }
}

class Game {
    timer = 0;

    // ゲームスタート
    static start() {
        config.loginPage.append(View.createStartPage());
    }

    // プレイヤーの生成
    static new(name) {
        let playerName = name ? name : document.querySelector('input[name="playerName"]').value;
        let items = [
            new Item("ハンバーガー用マシン", 'flipMachine', 'ability', 0, 500, 15000, 25, 0, imgPass + "jidouhanbaiki_autosnack_hamburger.png"),
            new Item("ETF銘柄", 'etfStock', 'investment', 0, Infinity, 300000, 0, 0.1, imgPass + "kabu_chart_smartphone_man.png"),
            new Item("債権ETF", 'etfBonds', 'investment', 0, Infinity, 300000, 0, 0.07, imgPass + "money_saiken.png"),
            new Item("レモネードスタンド", 'lemonadeStand', 'realState', 0, 1000, 30000, 30, 0, imgPass + "drink_lemonade.png"),
            new Item("アイスクリームトラック", 'iceCreamTruck', 'realState', 0, 500,  100000, 120, 0, imgPass + "sweets_icecream_3dan.png"),
            new Item("ハウス", 'hause', 'realState', 0, 100, 20000000, 32000, 0, imgPass + "warabukiyane.png" ),
            new Item("タウンハウス", 'townHouse', 'realState', 0, 100,  40000000, 64000, 0, imgPass +"house_2f.png" ),
            new Item("マンション", 'mansion', 'realState', 0, 20, 250000000, 500000, 0, imgPass + "building_mansion2.png"),
            new Item("産業スペース", 'industrialSpace', 'realState', 0, 10, 1000000000, 2200000, 0, imgPass + "bg_outside_buildings.jpg"),
            new Item("高層ホテル", 'hotelSkyscraper', 'realState', 0, 5, 10000000000, 25000000, 0, imgPass + "kousou_hotel.png"),
            new Item("新幹線", 'bulletSppedSkyRailway', 'realState', 0, 1, 10000000000000, 30000000000, 0, imgPass +"norimono_character6_shinkansen.png" ),
        ];

        let player = new Player(
            playerName,
            20,
            0,
            1000000000000000,
            items,
        );

        return player;
    }

    // スタートページからメインページへの切り替え
    static moveStartPageToMainPage(player) {
        View.switchPage(config.loginPage, config.mainPage);
        config.mainPage.append(View.createMainPage(player));
        Game.timerCount(player);
    }

    // ログイン処理
    static login(name) {
        let localPlayerData = JSON.parse(localStorage.getItem(name));
        if (localPlayerData.name != name) alert('名前が一致しません');
        Game.moveStartPageToMainPage(localPlayerData);

    }

    // プレイヤーのデータを保存
    static save(player) {
        localStorage.setItem(player.name, JSON.stringify(player));
        alert(`セーブしました。`);
        View.initPage();
        Game.stoptimer();
        Game.start();
    }

    // リセットボタン押された時の表示と処理
    static reset(player) {
        confirm('ページをリセットします');
        Game.resetData(player);
    }

    // プレイヤーのデータをリセット
    static resetData(player) {
        let name = player.name;
        let playerNew = Game.new(name);
        Game.stoptimer();
        View.updateMainPage(playerNew);
        Game.timerCount(playerNew);
    }

    // タイムカウント daysと時間経過で加算される部分の処理
    static timerCount(player) {
        Game.timer = setInterval(function () {
            player.days++;
            player.money += player.incomePerSec;
            if (player.days % 365 === 0) {
                player.age++;
                View.updateUserInfo(player);
            } else {
                View.updateUserInfo(player);
            }
        }, 1000);
    }

    // タイムカウント停止
    static stoptimer(){
        clearInterval(Game.timer);
    }

    // ハンバーガーがクリックされたら加算し、クリック数の表示を更新
    static clickBurgar(player) {
        player.burgarCount++;
        player.money += 100 + player.incomePerClick;
        View.updateBurgarPage(player);
        View.updateUserInfo(player);
    }

    // 購入時の処理
    static purchaseItems(player, item, inputValue) {
        const itemTotalPrice = Game.getTotalPrice(item, inputValue);
        if (inputValue <= 0) {
            alert('購入して下さい');
        }else if ((player.money - itemTotalPrice) < 0) {
            alert('所持金が足りません');
        } else if (item.currentAmount + inputValue > item.maxAmount && item.type != 'investment') { 
            alert('所持数が限度です');
        }else {
            // 所持金からアイテム分を引く
            player.money -= Game.getTotalPrice(item, inputValue);
            // アイテムの所持数を更新する
            item.currentAmount += inputValue;
            if (item.nameEN === 'etfStock') {
                // 資産の合計を更新する
                player.stock += Game.getTotalPrice(item, inputValue);
                // ETFの値段を更新する
                item.price += Game.calcETFStockPrice(item, inputValue);
                // インカムの値を更新
                Game.updatePlayerIncome(player, item, inputValue);
            } else if (item.nameEN === 'etfBonds') {
                player.stock += Game.getTotalPrice(item, inputValue);
                Game.updatePlayerIncome(player, item, inputValue);
            } else {
                Game.updatePlayerIncome(player, item, inputValue);
            }
        }
    }

    // トータル金額の計算
    static getTotalPrice(item, value) {
        let total = 0;
        if (item.nameEN === 'etfStock') {
            // 　利率を含めた合計を加算(資産の更新)
            for (let i = 0; i < value; i++){
                total += parseInt(item.price * Math.pow(1 + item.perRate, i));
            }
            return total;
        }
        if(value > 0)  total += item.price * value;
        return total;
    }

    // ETFStockの値段
    static calcETFStockPrice(item, value) {
        return parseInt(item.price * Math.pow((1 * item.perRate), value));
    }

    // インカムの値の更新
    static updatePlayerIncome(player, item, inputValue) {
        if (item.type === 'ability') {
            player.incomePerClick += item.perMoney * inputValue;
        }else if (item.type === 'investment') {
            player.incomePerSec += player.stock * item.perRate;
        } else if (item.type === 'realState') {
            player.incomePerSec += item.perMoney * inputValue;
        } 
    }
}


function main() {
    Game.start();
}

main();
