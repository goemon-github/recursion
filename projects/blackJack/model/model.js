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
    constructor(gameType)
    {
        // このデッキが扱うゲームタイプ
        //this.gameType = gameType
        this.gameType = gameType;

        // カードの配列
        this.cards = []

        // ゲームタイプによって、カードを初期化してください。
    }
    

    /*
       return null : このメソッドは、デッキの状態を更新します。
       カードがランダムな順番になるようにデッキをシャッフルします。
    */
    shuffle(){
        //TODO: ここからコードを書いてみましょう
        for (let i = cards.length - 1; i > 0; i--){
            cards = this.cards;
            let j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }


    /*
       String gameType : どのゲームにリセットするか
       return null : このメソッドは、デッキの状態を更新します。
    */
    resetDeck(gameType)
    {
        //TODO: ここからコードを書いてみましょう
        this.cards = [];
    }
    

    /*
       return Card : ポップされたカードを返します。
       カード配列から先頭のカード要素をポップして返します。
    */
    drawOne()
    {
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
        //this.action = action
        
        // プレイヤーが選択する数値
        //this.amount = amount
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
        //this.betDenominations = betDenominations;
        
        // テーブルのカードのデッキ
        //this.deck = new Deck(this.gameType);
        
        // プレイしているゲームに応じて、プレイヤー、gamePhases、ハウスの表現が異なるかもしれません。
        // 今回はとりあえず3人のAIプレイヤーとハウス、bettingフェーズの始まりにコミットしましょう。
        //this.players = []
        
        // プレイヤーをここで初期化してください。
        
        //this.house = new Player('house', 'house', this.gameType);
        //this.gamePhase = 'betting'

        // これは各ラウンドの結果をログに記録するための文字列の配列です。
        //this.resultsLog = []

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
        console.log("have:", userData);
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
}