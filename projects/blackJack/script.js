
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
        this.gameStatus = 'betting';
    }


    /*
        ?Number userData: モデル外から渡されるパラメータ。nullになることもあります。
        return GameDecision: 状態を考慮した上で、プレイヤーが行った意思決定。
    */
    promptPlayer(userData)
    {
        //TODO: ここからコードを書きましょう
        

        return GameDecision;
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
        this.house = new Player('house', 'house', this.gameType);

        // "betting", "acting", "evaluatingWinners", "gameOver"
        this.gamePhase = 'betting'

        // これは各ラウンドの結果をログに記録するための文字列の配列です。
        this.resultsLog = [];

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
        Player player : テーブルは、Player.promptPlayer()を使用してGameDecisionを取得し、GameDecisionとgameTypeに応じてPlayerの状態を更新します。
        return Null : このメソッドは、プレーヤの状態を更新するだけです。
        例.プレイヤーが「ヒット」し、手札が21以上の場合、gameStatusを「バスト」に設定し、チップからベットを引きます。
    */
    evaluateMove(Player){
        //TODO: ここからコードを書きましょう
    }

    /*
       return Player: 現在のプレイヤー
    */

    getTurnPlayer(){
        //TODO: ここからコードを書きましょう
    }

    /*
       Number userData: テーブルモデルの外部から渡されるデータです。 
       return null: このメソッドはテーブルの状態を更新するだけで、値を返しません。
    */
    haveTurn(userData){
        //TODO: ここからコードを書きましょう
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
        this.gameDiv = document.querySelector("#gameDiv");
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

    createBetPhaseView() {
        let markup = `
        <!--gamedisplay2-->
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
        this.gameDiv.innerHTML = markup;
    }

}

class Controller{

    constructor() {
        this.players = null;
        this.view = new View();
    }


    init(){
        this.view.createLoginView();
        this.gameStart();

    }

    gameStart() {
        const gameStartBtn = document.getElementById("startBtn");
        gameStartBtn.addEventListener("click", () => {
            const userName = document.getElementById("getUserName");
            const selectGame = document.getElementById("selectGame");
            this.players = this.createPlayerToHouseAndAi(userName, selectGame);
            let table = new Table();
            this.gameBetView();
            this.renderTable();
        });

    }

    gameView() {
        this.view.createGameView();
    }

    gameBetView() {
        this.view.createBetPhaseView();
    }


    renderTable(table) {

        if (table.getTurnPlayer.type == "user") {

            
        } else {
            setTimeout(function () {
                table.haveTurn();
                this.renderTable(table);
            }, 5000);
        }
    }

    createPlayerToHouseAndAi(userName = null, selectGame) {
        // playerTypeは　{al, user, house}の３つ
        if (userName === null) return alert("名前を入力して下さい");

        let players = {};
        let house = new Player("house", "house", selectGame)
        players["house"] = house;

        // aiの場合はプレイヤーはaiのみ
        if (userName == "ai") {
            for (let i = 0; i <= 3; i++){
                players["ai" + i] = new Player("ai" + i, "ai", selectGame);
            }
        } else {
        // playerとaiを作成
            for (let i = 0; i <= 2; i++){
                players["ai" + i] = new Player("ai" + i, "ai", selectGame);
            };
            let player = new Player(userNmae, "user", selectGame);
            players["player"] = player;
        }

        return players;
    }
}

function main() {
    let controller = new Controller();
    controller.init();
}
main();