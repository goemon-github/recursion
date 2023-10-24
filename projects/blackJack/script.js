
class Card{
    /*
       String suit : {"H", "D", "C", "S"}から選択
       String rank : {"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"}から選択
    */


    constructor(suit, rank){
        //TODO: ここからコードを書いてみましょう
        this.suit = suit;
        this.rank = rank;

    }

    /*
        return Number: カードのランクを基準とした整数のスコアを返します。
        - 2-10はそのまま数値を返します。
        - {"J", "Q", "K"}を含む、フェースカードは10を返します。
        - Aが1なのか11なのかを判断するには手札全体の知識が必要なので、Aはとりあえず11を返すようにします。
    */

    getRankNumber(number){
        //TODO: ここからコードを書いてみましょう
        if (number == "A") {
            return 11;
        } else if (number == "J" || number == "Q" || number == "K") {
            return 10;
        } else {
            return number;
        }
    }
};

class Deck{
    /*
       String gameType : ゲームタイプの指定。{'blackjack'}から選択。
    */
    constructor(gameType){
        // このデッキが扱うゲームタイプ
        //this.gameType = gameType
        this.gameType = gameType;

        // カードの配列
        this.cards = [];

        // ゲームタイプによって、カードを初期化してください。
    }
    

    /*
       return null : このメソッドは、デッキの状態を更新します。
       カードがランダムな順番になるようにデッキをシャッフルします。
    */
    shuffle(){
        //TODO: ここからコードを書いてみましょう
        for (let i = this.cards.length - 1; i > 0; i--){
           const card = this.cards[i];
            let j = Math.floor(Math.random() * (i + 1));
            const randamCard = this.cards[j];
            [this.cards[i], this.cards[j]] = [randamCard, card];
        }
    }


    /*
       String gameType : どのゲームにリセットするか
       return null : このメソッドは、デッキの状態を更新します。
    */
    resetDeck(gameType){
        //TODO: ここからコードを書いてみましょう
        const suit = ["H", "D", "C", "S"];
        const rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

        for (let i in suit) {
            for (let j in rank) {
                this.cards.push(new Card(suit[i], rank[j]));
            }
        }
        console.log("reset: ", this.cards);
        this.shuffle();
        console.log("shuffle: ", this.cards)

    }

    /*
       return Card : ポップされたカードを返します。
       カード配列から先頭のカード要素をポップして返します。
    */
    drawOne(){
        //TODO: ここからコードを書いてみましょう
        return this.cards.shift();
    }
};

class Player{
    /*
        String name: プレイヤーの名前
        String type: プレイヤータイプ。{'ai', 'user', 'house'}から選択。
        String gameType: {'blackjack'}から選択。プレイヤーの初期化方法を決定するために使用されます。
        ?Number chips: ゲーム開始に必要なチップ。デフォルトは400。
    */
    constructor(name, type, gameType, chips = 400){
        // プレイヤーの名前
        this.name = name;

        // プレイヤーのタイプ
        this.type = type;

        // 現在のゲームタイプ
        this.gameType = gameType;

        // プレイヤーの手札
        this.hand = [];

        // プレイヤーが所持しているチップ。
        this.chips = chips;

        // 現在のラウンドでのベットしているチップ
        this.bet = 0;

        // 勝利金額。正の数にも負の数にもなります。
        this.winAmount = 0;

        // プレイヤーのゲームの状態やアクションを表します。
        // ブラックジャックの場合、最初の状態は「betting」です。
        //  bet, surrender, stand, hit, double
        // bettiong, actiong, hit
        this.gameStatus = 'betting';
    }


    /*
        ?Number userData: モデル外から渡されるパラメータ。nullになることもあります。
        return GameDecision: 状態を考慮した上で、プレイヤーが行った意思決定。
    */
    promptPlayer(userData){
        //TODO: ここからコードを書きましょう
        let gameDecision = null; 
        if (userData.type == "user") {
            if (userData.gameStatus === "betting") {
                gameDecision = new gameDecision("bet", Controller.getTotalBetValue());
                return gameDecision;
            }

        
        } else if (userData == null) {
            gameDecision = new gameDecision("bet", Controller.getTotalBetValue());

        }
        

        return gameDecision;
    }

    winAmount() {

    }

    /*
        return Number : 手札の合計
        合計が21を超える場合、手札の各エースについて、合計が21以下になるまで10を引きます。
    */
    getHandScore()
    {
        //TODO: ここからコードを書きましょう
    }
};

class GameDecision{
    /*
        String action: プレイヤーのアクションの選択（ブラックジャックでは、hit、stand等）
        Number amount: プレイヤーが選択する数値
        Player.promptPlayer() メソッドが常に GameDecision オブジェクトを返します

        bet, surrender, stand, hit, double
        betting, acting, hit
    */
    constructor(action, amount){
        // アクション
        this.action = action
        
        // プレイヤーが選択する数値
        this.amount = amount
    }
}


class Table {
    /*
        String gameType : {"blackjack"}から選択。
        Array betDenominations : プレイヤーが選択できるベットの単位。デフォルトは[5,20,50,100]。
        return Table : ゲームフェーズ、デッキ、プレイヤーが初期化されたテーブル
    */
    constructor(gameType, betDenominations = [5,20,50,100]){
        // ゲームタイプを表します。
        this.gameType = gameType;
        
        // プレイヤーが選択できるベットの単位。
        this.betDenominations = betDenominations;
        
        // テーブルのカードのデッキ
        this.deck = new Deck(this.gameType);
        
        // プレイしているゲームに応じて、プレイヤー、gamePhases、ハウスの表現が異なるかもしれません。
        // 今回はとりあえず3人のAIプレイヤーとハウス、bettingフェーズの始まりにコミットしましょう。
        this.players = []
        
        // プレイヤーをここで初期化してください。

        // 一旦ここでプレイヤーを作成

        // "betting", "acting", "evaluatingWinners", "gameOver"
        this.gamePhase = 'betting'

        // これは各ラウンドの結果をログに記録するための文字列の配列です。
        this.resultsLog = [];

        this.turnCounter = 0;

    }

    /*
        return null: デッキから2枚のカードを手札に加えることで、全プレイヤーの状態を更新します。
        NOTE: プレイヤーのタイプが「ハウス」の場合は、別の処理を行う必要があります。
    */
    blackjackAssignPlayerHands(){
        //TODO: ここからコードを書きましょう
    }

    /*
       return null: テーブル内のすべてのプレイヤーの状態を更新し、手札を空の配列に、ベットを0に設定します。
    */
    blackjackClearPlayerHandsAndBets(){
        //TODO: ここからコードを書きましょう
    }
    
    /*
        Player player : テーブルは、Player.promptPlayer()を使用してGameDecisionを取得し、
                                    GameDecisionとgameTypeに応じてPlayerの状態を更新します。
        return Null : このメソッドは、プレーヤの状態を更新するだけです。
        例.プレイヤーが「ヒット」し、手札が21以上の場合、gameStatusを「バスト」に設定し、チップからベットを引きます。
        bet, surrender, stand, hit, double
    */
    evaluateMove(Player){
        //TODO: ここからコードを書きましょう
        let gameDicision = Player.promptPlayer();
        if (gameDicision.action == "bet") {
            player.bet = gameDicision.amount;
            player.gamePhase = "acting";
        }
        /*
        switch (gameDicision.action) {
            case "bat":
                break;
            case "surrender":
                break;
            case "stand":
                break:
            case "hit":
                break;
            case "double":
                break;
        }
        */

    }

    /*
       return Player: 現在のプレイヤー
    */

    getTurnPlayer(){
        //TODO: ここからコードを書きましょう
        //return this.players[this.turnCounter % this.players.length];
        return this.players[2];

    }

    /*
       Number userData: テーブルモデルの外部から渡されるデータです。 
       return null: このメソッドはテーブルの状態を更新するだけで、値を返しません。
    */
    // "betting", "acting", "evaluatingWinners", "gameOver"
    haveTurn(userData){
        //TODO: ここからコードを書きましょう
        const currentPlayer = this.getTurnPlayer;

        if (this.gamePhase == "betting") {
            if (currentPlayer.type == "user") {
                this.evaluateMove(currentPlayer);

            }

        }
    }

    /*
        return String: 新しいターンが始まる直前の全プレイヤーの状態を表す文字列。
        NOTE: このメソッドの出力は、各ラウンドの終了時にテーブルのresultsLogメンバを更新するために使用されます。
    */
    blackjackEvaluateAndGetRoundResults(){
        //TODO: ここからコードを書きましょう    
    }

    /*
        return boolean: テーブルがプレイヤー配列の最初のプレイヤーにフォーカスされている場合はtrue、そうでない場合はfalseを返します。
    */
    onFirstPlayer(){
        //TODO: ここからコードを書きましょう
    }

    /*
        return boolean : テーブルがプレイヤー配列の最後のプレイヤーにフォーカスされている場合はtrue、そうでない場合はfalseを返します。
    */
    onLastPlayer(){
        //TODO: ここからコードを書きましょう
    }
    
    /*
        return boolean: 全てのプレイヤーがセット{'broken', 'bust', 'stand', 'surrender'}のgameStatusを持っていればtrueを返し、持っていなければfalseを返します。
    */
    allPlayerActionsResolved(){
        //TODO: ここからコードを書きましょう
    }
};


class View{

    constructor() {
        this.gameDiv = document.querySelectorAll("#gameDiv")[0];
        this.images = {
            path: "img/",
            images: {
                heart: "heart.png",
                spade: "spade.png",
                clover: "clover.png",
                diamond: "diamond.png",
                question: "questionMark.png"
            }
        };
    }

    clear() {
        this.gameDiv.innerHTML = "";
    }


    renderTable() {

    };


    createLoginView() {
        const markup = `
            <!-- login form div -->
            <div>
                <p class="text-white" > welcome to card game! </p>
                <!-- name field div -->
                <div>
                    <input id="getUserName" type="text" placeholder="name">
                </div>
                <!-- game type div -->
                <div>
                    <select class="w-100" id="selectGame">
                        <option value="blackjack">blackjack </option>
                        <option value="poker">poker </option>
                    </select>
                </div>
                <!-- submit div -->
                <div>
                    <div id="startBtn" class="btn btn-success">start game </div>
                </div>
            </div>
        `;
        this.gameDiv.innerHTML = markup;
    }

    createGameView() {
        let markup = `
            <!-- all cards (dealer, players) div -->
            <div class="col-12">
                <div class="pt-5">
                    <p class="m-0 text-center text-white rem3">dealer</p>

                    <!-- house card row -->
                    <div id="houescarddiv" class="d-flex justify-content-center pt-3 pb-5">

                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/spade.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0 ">7</p>
                            </div>
                        </div>

                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/diamond.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0">8</p>
                            </div>
                        </div>

                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/heart.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0">9</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="">

                    <!-- players div -->
                    <div id="playersdiv" class="d-flex justify-content-center">

                        <!-- noncurplayerdiv 1-->
                        <div id="noncurplayer1div" class="flex-column">

                            <p class="m-0 text-white text-center rem3">ai1</p>

                            <!-- playerinfodiv -->
                            <div class="text-white d-flex m-0 p-0 justify-content-between">
                                <p class="rem1 text-left">s:bust </a>
                                <p class="rem1 text-left">b:0 </a>
                                <p class="rem1 text-left">r:255 </a>
                            </div>
                            <!-- cardsdiv -->
                            <div class="d-flex justify-content-center">
                                <div class="bg-white border mx-2">
                                    <div class="text-center">
                                        <img src="/img/heart.png" alt="" width="50" height="50">
                                    </div>
                                    <div class="text-center">
                                        <p class="m-0">2</p>
                                    </div>
                                </div>
                                <div class="bg-white border mx-2">
                                    <div class="text-center">
                                        <img src="/img/clover.png" alt="" width="50" height="50">
                                    </div>
                                    <div class="text-center">
                                        <p class="m-0">10</p>
                                    </div>
                                </div>
                                <div class="bg-white border mx-2">
                                    <div class="text-center">
                                        <img src="/img/spade.png" alt="" width="50" height="50">
                                    </div>
                                    <div class="text-center">
                                        <p class="m-0">8</p>
                                    </div>
                                </div><!-- end card -->
                            </div><!-- end cards -->
                        </div><!-- end player -->

                        <!-- curplayerdiv -->
                        <div id = "curplayerdiv" class="flex-column w-50">
                            <p class="m-0 text-white text-center rem3">ai2</p>

                            <!-- playerinfodiv -->
                            <div class="text-white d-flex m-0 p-0 justify-content-center">
                                <p class="rem1 text-left">s:bust </a>
                                <p class="rem1 text-left">b:0 </a>
                                <p class="rem1 text-left">r:255 </a>
                            </div>

                            <!-- cardsdiv -->
                            <div class="d-flex justify-content-center">
                                <div class="bg-white border mx-2">
                                    <div class="text-center">
                                        <img src="/img/heart.png" alt="" width="50" height="50">
                                    </div>
                                    <div class="text-center">
                                        <p class="m-0">2</p>
                                    </div>
                                </div>
                                <div class="bg-white border mx-2">
                                    <div class="text-center">
                                        <img src="/img/clover.png" alt="" width="50" height="50">
                                    </div>
                                    <div class="text-center">
                                        <p class="m-0">10</p>
                                    </div>
                                </div>
                                <div class="bg-white border mx-2">
                                    <div class="text-center">
                                        <img src="/img/spade.png" alt="" width="50" height="50">
                                    </div>
                                    <div class="text-center">
                                        <p class="m-0">8</p>
                                    </div>
                                </div><!-- end card -->
                            </div><!-- end cards -->
                        </div><!-- end player -->

                        <!-- noncurplayer2div -->
                        <div id="noncurplayer2div" class="flex-column">

                            <p class="m-0 text-white text-center rem3">yuki</p>

                            <!-- playerinfodiv -->
                            <div class="text-white d-flex m-0 p-0 justify-content-between">
                                <p class="rem1 text-left">s:bust </a>
                                <p class="rem1 text-left">b:0 </a>
                                <p class="rem1 text-left">r:255 </a>
                            </div>

                            <!-- cardsdiv -->
                            <div class="d-flex justify-content-center">
                                <div class="bg-white border mx-2">
                                    <div class="text-center">
                                        <img src="/img/heart.png" alt="" width="50" height="50">
                                    </div>
                                    <div class="text-center">
                                        <p class="m-0">2</p>
                                    </div>
                                </div>
                                <div class="bg-white border mx-2">
                                    <div class="text-center">
                                        <img src="/img/clover.png" alt="" width="50" height="50">
                                    </div>
                                    <div class="text-center">
                                        <p class="m-0">10</p>
                                    </div>
                                </div>
                                <div class="bg-white border mx-2">
                                    <div class="text-center">
                                        <img src="/img/spade.png" alt="" width="50" height="50">
                                    </div>
                                    <div class="text-center">
                                        <p class="m-0">8</p>
                                    </div>
                                </div><!-- end card -->
                            </div><!-- end cards -->
                        </div><!-- end player -->
                    </div><!-- end players -->

                    <!-- actionsandbetsdiv -->
                    <div id="actionsandbetsdiv" class="d-flex pb-5 pt-4 justify-content-center">

                        <!-- actionsdiv -->
                        <div id ="actionsdiv" class="d-flex flex-wrap w-70">
                            <div class="py-2">
                                <a class="text-dark btn btn-light px-5 py-1">surrender</a>
                            </div>
                            <div class="py-2">
                                <a class="btn btn-success px-5 py-1">stand</a>
                            </div>
                            <div class="py-2">
                                <a class="btn btn-warning px-5 py-1">hit</a>
                            </div>
                            <div class="py-2">
                                <a class="btn btn-danger px-5 py-1">double</a>
                            </div>
                        </div> <!-- end actionsdiv -->
                    </div><!-- end actionsandbetsdiv-->
                </div>
            </div>
        </div>
        `;

        this.clear();
        this.gameDiv.innerHTML = markup;
    }

    createBettingView(table) {
        const players = {};
        for (let i in table.players) {
            if (table.players[i].type == "user") {
                players[table.players[i].type] = table.players[i];
            } else {
                players[table.players[i].name] = table.players[i];
            }
        }


        // function: createCardDiv functin
        function createCardWrapperDiv  (funcCreateCardDiv)  {
            let cardWrapperDiv = document.createElement("div");  
            cardWrapperDiv.classList.add("d-flex", "justify-content-center");

            // カード２枚生成
            cardWrapperDiv.append(funcCreateCardDiv(), funcCreateCardDiv());
            return cardWrapperDiv;
        }

        const createCardDiv = () => {
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("bg-white", "border", "mx-2");
            let cardImageDiv = document.createElement("div");
            cardImageDiv.classList.add("text-center");
            let cardImageImg = document.createElement("img");
            cardImageImg.src = this.images.path + this.images.images.question;
            cardImageImg.alt = "";
            cardImageImg.width = "50";
            cardImageImg.height = "50";
            let cardNumberDiv = document.createElement("div");
            cardNumberDiv.classList.add("text-center");
            let cardNumberP = document.createElement("p");
            cardNumberP.classList.add("m-0");
            cardNumberP.innerHTML = "-";

            cardNumberDiv.append(cardNumberP);
            cardImageDiv.append(cardImageImg);
            cardDiv.append( cardImageDiv, cardNumberDiv);
            return cardDiv;
       }

       function createPlayerInfoDiv(currentPlayer) {
            let playerInfoDiv = document.createElement("div");  
            playerInfoDiv.classList.add("text-white", "d-flex", "m-0", "p-0", "justify-content-between");
            let phaseP = document.createElement("p");
            phaseP.value = currentPlayer.gameStatus;
            let bettingChipP = document.createElement("p");
            bettingChipP.value = currentPlayer.bet;
            let chipsP = document.createElement("p");
            chipsP.value = currentPlayer.chips;

            playerInfoDiv.append(phaseP, bettingChipP, chipsP);
            return playerInfoDiv;

        }

        let div = document.createElement("div");
        div.classList.add("col-12");
        // create PlayerCard
        let playersDiv = document.createElement("div"); 
        playersDiv.id = "playersDiv";
        playersDiv.classList.add("d-flex", "justify-content-center");

        let playerWrapperDiv = document.createElement("div");
        for (let i in players) {
            const currentPlayer = players[i];

            if (currentPlayer.type == "ai") {
                let nonCurPlayerDiv = document.createElement("div"); 
                nonCurPlayerDiv.id = "noncurplayer1div";
                nonCurPlayerDiv.classList.add("flex-column");

                // create playerName
                let playerNameP = document.createElement("p"); 
                playerNameP.classList.add("m-0", "text-white", "text-center", "rem3");
                playerNameP.innerText = currentPlayer.name;

                // create playerInfo
                let playerInfoDiv = createPlayerInfoDiv(currentPlayer);

                // create card
                let cardWrapperDiv = createCardWrapperDiv(createCardDiv);  

                nonCurPlayerDiv.append(playerNameP, playerInfoDiv, cardWrapperDiv );
                playersDiv.append(nonCurPlayerDiv);

            } else if (currentPlayer.type == "house") {
                let houseDiv = document.createElement("div");
                houseDiv.classList.add("pt-5");
                let houseNameP = document.createElement("p");
                houseNameP.classList.add("m-0", "text-center", "text-white", "rem3");
                houseNameP.innerText = currentPlayer.name;


                let cardWrapperDiv = document.createElement("div");
                cardWrapperDiv.id = "houseCardDiv";
                cardWrapperDiv.classList.add("d-flex", "justify-content-center", "pt-3", "pb-5");
                cardWrapperDiv.append(createCardDiv(), createCardDiv());

                houseDiv.append(houseNameP, cardWrapperDiv);
                div.insertAdjacentElement("afterbegin", houseDiv);

            } else {
                // playerDiv
                let curplayerdiv = document.createElement("div");
                curplayerdiv.classList.add("flex-column", "w-50");
                curplayerdiv.id = "curPlayerDiv";

                // nameP
                let playerNameP = document.createElement("p");
                playerNameP.classList.add("m-0", "text-white", "text-center", "rem3");
                playerNameP.innerText = currentPlayer.name;

                //playerInfo
                let playerInfoDiv = createPlayerInfoDiv(currentPlayer);

                // create card
                let cardWrapperDiv = createCardWrapperDiv(createCardDiv);  

                curplayerdiv.append(playerNameP, playerInfoDiv, cardWrapperDiv);
                playersDiv.append(curplayerdiv);

            }
        }




        let markup = `
            
                        <!-- actionsandbetsdiv -->
                        <div id="actionsandbetsdiv" class="d-flex pb-5 pt-4 justify-content-center">
                            <!-- betsdiv -->
                            <div id="betsdiv" class="d-flex flex-column w-50">
                                <!-- bottom half of bets including chip increments and submit  -->
                                <div class="py-2 h-60 d-flex justify-content-between">
                                    <!-- betchoicediv -->
                                    <div>
                                        <div class="input-group" >
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-danger btn-number">
                                                    -
                                                </button>
                                            </span>
                                            <input type="text" class="input-number text-center" size="2" maxlength="5" value="3">
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-success btn-number">
                                                    +
                                                </button>
                                            </span>
                                        </div><!--end input group div -->
                                        <p class="text-white text-center">5</p>
                                    </div> <!-- end betchoicediv -->
                                    <!-- betchoicediv -->
                                    <div>
                                        <div class="input-group" >
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-danger btn-number">
                                                    -
                                                </button>
                                            </span>
                                            <input type="text" class="input-number text-center" size="2" maxlength="5" value="0">
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-success btn-number">
                                                    +
                                                </button>
                                            </span>
                                        </div><!--end input group div -->
                                        <p class="text-white text-center">20</p>
                                    </div> <!-- end betchoicediv -->
                                    <!-- betchoicediv -->
                                    <div>
                                        <div class="input-group" >
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-danger btn-number">
                                                    -
                                                </button>
                                            </span>
                                            <input type="text" class="input-number text-center" size="2" maxlength="5" value="0">
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-success btn-number">
                                                    +
                                                </button>
                                            </span>
                                        </div><!--end input group div -->
                                        <p class="text-white text-center">50</p>
                                    </div> <!-- end betchoicediv -->
                                    <!-- betchoicediv -->
                                    <div>
                                        <div class="input-group" >
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-danger btn-number">
                                                    -
                                                </button>
                                            </span>
                                            <input type="text" class="input-number text-center" size="2" maxlength="5" value="0">
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-success btn-number">
                                                    +
                                                </button>
                                            </span>
                                        </div><!--end input group div -->
                                        <p class="text-white text-center">100</p>
                                    </div> <!-- end betchoicediv -->
                                </div><!-- end bestselectiondiv -->
                                <!-- betsubmitdiv -->
                                <div class="w-100 btn-success rem5 text-center bg-primary">
                                    submit your bet
                                </div><!-- end betsubmitdiv -->
                            </div><!-- end betsdiv-->
            
                        </div><!-- end actionsandbetsdiv-->
                    </div>
                </div>
            </div>
        `;

        this.clear();
        playerWrapperDiv.append(playersDiv);
        div.append(playerWrapperDiv);
        div.innerHTML += markup;
        this.gameDiv.append(div);

    }


    redrawSubmitBetBtn(totalBet) {
        let submitBetBtn = document.getElementById("betsdiv").lastElementChild;
        let text = submitBetBtn.innerText.split(" ").slice(0, 3);
        text = text.join(" ") + " " + totalBet;
        
        submitBetBtn.innerText = text;
    }

}

class Controller{

    constructor() {
        this.players = null;
        this.view = new View();
    }


    init(){
        //this.view.createLoginView();
        this.gameStart();

    }

    gameStart() {
        const gameStartBtn = document.getElementById("startBtn");
        /*
        gameStartBtn.addEventListener("click", () => {
            //const userName = document.getElementById("getUserName").value;
            const userName = "aa";
            const selectGame = document.getElementById("selectGame");
            let table = new Table(selectGame, userName);
            let house = new Player('house', 'house', this.gameType);
            let player = null;
            if (userName != "ai") {
                player = new Player(userName , "user", this.gameType);
            } else {
                player = new Player("ai2", "ai", this.gameType);
            }
            let ai1 = new Player("ai1", "ai", this.gemeType);
            let ai2 = new Player("ai3", "ai", this.gemeType);
            table.players.push(house);
            table.players.push(ai1);
            table.players.push(player);
            table.players.push(ai2);
            this.renderTable(table);
        });
        */
       // test
            const userName = "aa";
            const selectGame = document.getElementById("selectGame");
            let table = new Table(selectGame, userName);
            let house = new Player('house', 'house', this.gameType);
            let player = null;
            if (userName != "ai") {
                player = new Player(userName , "user", this.gameType);
            } else {
                player = new Player("ai2", "ai", this.gameType);
            }
            let ai1 = new Player("ai1", "ai", this.gemeType);
            let ai2 = new Player("ai3", "ai", this.gemeType);
            table.players.push(house);
            table.players.push(ai1);
            table.players.push(player);
            table.players.push(ai2);
            this.renderTable(table);
            this.getBettingChips(this.view);
    }


    renderTable(table) {

        let currentPlayer = table.getTurnPlayer();
        if (currentPlayer.type == "user") {

            if (table.gamePhase == "betting") {
                this.view.createBettingView(table);
                table.haveTurn();

                this.clickSubmitBet();
            } else if (table.gamePhase == "acting") {

            }

            
        } else {
            setTimeout(function ()  {
                table.haveTurn();
                this.renderTable(table);
            }, 5000);
        }
    }

    getBettingChips(view) {
        let betInputGroup = document.querySelectorAll(".input-group");
        betInputGroup.forEach((betInput) => {
            let btnNegative = betInput.querySelector(".btn-danger");
            let btnPositive = betInput.querySelector(".btn-success");
            let inputElement = betInput.querySelector(".input-number");

            let value = inputElement.value;

            btnPositive.addEventListener('click', function () {
                value++;
                inputElement.value = value;
                view.redrawSubmitBetBtn(Controller.getTotalBetValue());
            });

            btnNegative.addEventListener("click", function () {
                if (value > 0) {
                    value--;
                    inputElement.value = value;
                    view.redrawSubmitBetBtn(Controller.getTotalBetValue());
                }
            })
        });
    }

    clickSubmitBet() {
        const submitBetbtn = document.getElementById("betsdiv").lastElementChild;
        submitBetbtn.addEventListener("click", function () {
            const totalBet = Controller.getTotalBetValue();
            console.log("bet submit");
            return totalBet;
        });

    }

    static getTotalBetValue() {
        const inputGourp = document.querySelectorAll(".input-group");
        let value = 0;
        inputGourp.forEach((el) => {
            let betValue = el.nextElementSibling.innerText; 
            let count = parseInt(el.querySelector(".input-number").value);
            switch (betValue) {
                case "5":
                    value += 5 * count;
                    break;
                case "20":
                    value += 20 * count;
                    break;
                case "50":
                    value += 50 * count;
                    break;

                case "100":
                    value += 100 * count;
                    break;
            };

        });
        return value;
    }
    

}

function main() {
    let controller = new Controller();
    controller.init();
}
main();