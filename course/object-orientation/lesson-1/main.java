// 普遍文字列
public class Main {

    public static void main(String[] args){
        MutableString str1 = new MutableString();
        str1.append('H');
        str1.append('e');
        str1.append('l');
        str1.append('l');
        str1.append('o');

        MutableString str2 = str1.subString(1, 4);

        MutableString str3 = new MutableString();
        str3.concat(str1);
        str3.concat(" World!");

       MutableString str4 = new MutableString();
        str4.concat("Java");
        str4.concat(str1);

        System.out.println("str1: " + str1.getString());
        System.out.println("str2: " + str2.getString());
        System.out.println("str3: " + str3.getString());
        System.out.println("str4: " + str4.getString());
    }
}

public class MutableString {
    private char[] chars;
    private int length;

    public MutableString() {
        chars = new char[0];
        length = 0;
    }

    public String getString(){
        return new String(chars);
    }

    public void append(char c) {
        char[] newChars = new char[length + 1];
        for (int i = 0; i < length; i++) {
            newChars[i] = chars[i];
        }
        newChars[length] =  c;
        chars = newChars;
        length++;
    }

    public MutableString subString(int start) {
        MutableString newString = new MutableString();
        for (int i = start; i < length; i++) {
            newString.append(chars[i]);
        }

        return newString;
    }
    
    public MutableString subString(int startIndex, int endIndex) {
        MutableString newString = new MutableString();
        for (int i = startIndex; i < endIndex; i++) {
            newString.append(chars[i]);
        }

        return newString;
    }

    public void concat(char[] cArr) {
        int newLength = length + cArr.length;
        char[] newChars = new char[newLength];
        for (int i = 0; i < length; i++) {
            newChars[i] = chars[i];
        }

        for (int i = 0; i < cArr.length; i++) {
            newChars[length + i] = cArr[i];
        }

        chars = newChars;
        length = newLength;
    }

    public void concat(String stirngInput) {
        char[] tempChars = new char[stirngInput.length()];
        for (int i = 0; i < stirngInput.length(); i++) {
            tempChars[i] = stirngInput.charAt(i);
        }

        this.concat(tempChars);
    }
    
    public void concat(MutableString stirngInput) {
        this.concat(stirngInput.chars);
    }

    public int length() {
        return this.length;
    }
}

//  抽象化 カプセル化
/*
class Main{
    public static void main(String[] args){
        RGB24 color1 = new RGB24(0, 153, 255);
        RGB24 color2 = new RGB24("ff99cc");//rgb(255, 153, 204)
        RGB24 color3 = new RGB24("100110011111111100110011");//rgb(153, 255, 51)
        RGB24 grey = new RGB24("7b7b7b");//rgb(123, 123, 123)

        System.out.println(color1);
        System.out.println(color2);
        System.out.println(color3);
        System.out.println(grey);
    }
}

class RGB24{
    private String rgbHex;

    public RGB24(int red, int green, int blue){
        this.rgbHex = convertToHex(red, green, blue);
    }

    public RGB24(String inputString){
        int l = inputString.length();

        if(l == 6) this.setColorsByHex(inputString);
        else if(l == 24) this.setColorsByBin(inputString);
        else this.setAsBlack();
    }
    

    public void setColorsByHex(String hex){
        if(hex.length() != 6) this.setAsBlack();
        else{
            this.rgbHex = hex;
        }
    }

    public void setColorsByBin(String bin){
        if(bin.length() != 24) this.setAsBlack();
        else{
            this.rgbHex = convertToBin(bin);
        }
    }

    public void setAsBlack(){
        this.rgbHex = convertToHex(0, 0, 0);
    }

    public String getHex(){
        if (this.rgbHex.length() != 6) {
            return "";
        } else {
            return this.rgbHex;
        }

    } 

    public String getBits(){
        return Integer.toBinaryString(Integer.parseInt(this.getHex(), 16));
    }

    public String getColorShade(){
        if(this.rgbHex.charAt(0 )== this.rgbHex.charAt(2) && this.rgbHex.charAt(2) == this.rgbHex.charAt(4)) return "greyscale";
        else{
            int maxIndex = getMaxIndex(this.rgbHex);
            String[] stringTable = new String[]{"red","green","blue"};
            return stringTable[maxIndex];
        }
    }

    public String toString(){
        int red = Integer.parseInt(this.rgbHex.substring(0, 2), 16);
        int green = Integer.parseInt(this.rgbHex.substring(2, 4), 16);
        int blue = Integer.parseInt(this.rgbHex.substring(4, 6), 16);

        return "The color is rgb(" + red + "," + green + "," + blue + "). Hex: " + this.getHex() + ", binary: " + this.getBits() ;
    }

    private String convertToHex(int red, int green, int blue) {
        return String.format("%02x%02x%02x", red, green, blue);
    }

    private String convertToBin(String bin) {
      int red = Integer.parseInt(bin.substring(0,8), 2);
      int green = Integer.parseInt(bin.substring(8,16), 2);
      int blue = Integer.parseInt(bin.substring(16), 2);
        return convertToHex(red, green, blue);
    }

    private int getMaxIndex(String hex) {
        int[] values = {Integer.parseInt(hex.substring(0, 2), 16),
                Integer.parseInt(hex.substring(2, 4), 16),
                Integer.parseInt(hex.substring(4, 6), 16)};
        int maxIndex = 0;
        for (int i = 1; i < values.length; i++) {
            if (values[i] >= values[maxIndex]) {
                maxIndex = i;
            }
        }
        return maxIndex;
    }


}
*/


// カプセル化1,2
/*
カプセル化では、定数のメンバ変数を除いて、すべてのメンバ変数をプライベートとして保持するのが一般的な方法になります。
メンバ変数を読み込むには、アクセサメソッドと呼ばれるゲッターパブリックメソッドが使用されます。

このゲッターはメンバ変数のデータを取得して返します。
これらのメソッドは、"get" で始まり、getMyMemberVariable() のようにメンバ変数が後に続きます。

一方、メンバ変数を書き換えるには、ミューテータメソッドと呼ばれるセッターパブリックメソッドが使用されます。
このセッターは入力を受け取り、いくつかの処理を行い、それに応じてメンバ変数を更新します。
これらのメソッドは "set" で始まり、setMyMemberVariable() のようにメンバ変数が後に続きます。
*/
/*
class Main {
    public static void main(String[] args) {
        Battery7v zlD72 = new Battery7v("MT-Dell Tech", "ZL-D72", 9.9, 1.18, 38, 80, 70);
        Battery7v zlD50 = new Battery7v("MT-Dell Tech", "ZL-D50", 6.6, 0.9, 28, 50, 65);
        Battery7v zlD40 = new Battery7v("MT-Dell Tech", "ZL-D40", 5.3, 1.18, 38, 80, 70);

        System.out.println("Total batteries manufactured: " + Battery7v.manufacturedCount);

        System.out.println();
        ExternalModule.dangerousMethod("AD515221", zlD40);
        ExternalModule.otherDangerousMethod();

        System.out.println();
        System.out.println("Total batteries manufactured: " + Battery7v.manufacturedCount);
    }
}
class Battery7v{
    private String manufacturer;
    private String model;
    private static final double VOLTAGE = 7.2;
    private static final String TYPE = "Lithium-Ion";
    private static int manufacturedCount;
    private double ampHours;
    private double weightKg;
    private double[] dimensionMm;

    public Battery7v(String manufacturer, String model, double ampHours, double weightKg, double wMm, double hMm, double dMm){
        this.manufacturer = manufacturer;
        this.model = model;
        this.ampHours = ampHours;
        this.weightKg = weightKg;
        this.dimensionMm = new double[]{wMm, hMm, dMm};

        this.manufacturedCount+=1;
    }

    // ここから
    public String getManufacturer(){
        return manufacturer;
    }

    public String getMdel() {
        return model;
    }

    public static double getVoltage() {
        return VOLTAGE;
    }
    
    public static String getVoltage() {
        return TYPE;
    }

    public static int getManufacturedCount() {
        return manufacturedCount;
    }

    public double getAmpHours() {
        return getAmpHours();
    }

    public void setAmpHours(double ampHours) {
        this.ampHours = ampHours;
    }

    public double getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(double weightKg) {
        this.weightKg = weightKg;
    }

    public double getDimensionMm() {
        return dimensionMm;
    }

    public void setDimensionMm(double[] dimensionMm) {
        this.dimensionMm = dimensionMm;
    }
    ///

    public String toString(){
        return this.manufacturer + " " + this.model + " " + Battery7v.TYPE + " Battery: " + this.getPowerCapacity() + "Wh (" + Battery7v.VOLTAGE + "V/" + this.ampHours + "Ah) - " + this.dimensionMm[0] + "(W)x" + this.dimensionMm[1] + "(H)x" + this.dimensionMm[2] + "(D) " + this.getVolume() + " volume " + this.weightKg + "kg";
    }

    public double getPowerCapacity(){
        return Battery7v.VOLTAGE * this.ampHours;
    }

    public double getVolume(){
        return this.dimensionMm[0] * this.dimensionMm[1] * this.dimensionMm[2];
    }
}

class ExternalModule{
    public static void dangerousMethod(String customerId, Battery7v battery){
        System.out.println("Processing data....internals");
        System.out.println("Client " + customerId + " purchased a " + battery.toString());
        
        //battery.manufacturedCount += 4234;
    }

    public static void otherDangerousMethod(){
        //Battery7v.manufacturedCount += 10000;
    }
}
*/


/*
// staticメソッド1
//  追加
class Main{
    public static void main(String[] args){
        Deck d = new Deck();
        System.out.println(d);

        Card[] myCards = Deck.createDeck();

        System.out.println();
        System.out.println("myCards print");
        System.out.println(Deck.cardsToString(myCards));
        System.out.println();

        System.out.println("in-place myCards Shffle");
        // シャッフル
        Deck.shuffleDeckInPlace(myCards);
        System.out.println(Deck.cardsToString(myCards));
        System.out.println();


        Card[] myCards2 = Deck.createDeck();
        System.out.println("out-of-place myCards2 deep copy -> deepCards");
        System.out.println(Deck.cardsToString(myCards2));
        System.out.println();
        // out-of-place
        Card[] deepCards = Deck.shuffleDeckOutOfPlace(myCards2);
        System.out.println();
        System.out.println("deepCards");
        System.out.println(Deck.cardsToString(deepCards));
        System.out.println();




    }
}

class Card{
    public String rank;
    public String suit;
    
    public Card(String rank, String suit){
        this.rank = rank;
        this.suit = suit;
    }

    public String toString(){
        return this.rank + this.suit;
    }
}

class Deck{
    public static final String[] SUITS = {"♠","♡","♢","♣"};
    public static final String[] RANKS = {"A","2","3","4","5","6","7","8","9","10","J","Q","K"};
    public Card[] cards;

    public Deck(){
        this.cards = Deck.createDeck(); // クラスメソッドへのアクセス
    }

    public static Card[] createDeck(){
        int s = Deck.SUITS.length;
        int r = Deck.RANKS.length;
        Card[] cards = new Card[s * r];

        for(int i = 0; i < s; i++){
            for(int j = 0; j < r; j++){
                cards[i*r+j] = new Card(Deck.RANKS[j], Deck.SUITS[i]);
            }
        }

        return cards;
    }

    public void shuffleDeck(){
        int deckSize = this.cards.length;

        // 最後から始めて、ランダムにスワップを選択してから左の要素(i--)に移動します。
        for (int i = deckSize-1; i >= 0 ; i--) {
            int j = (int) Math.floor(Math.random() * (i + 1));

            Card temp = this.cards[i];

            // in-placeスワップ
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    public static void  shuffleDeckInPlace(Card[] cards){
        int deckSize = cards.length;

        // 最後から始めて、ランダムにスワップを選択してから左の要素(i--)に移動します。
        for (int i = deckSize-1; i >= 0 ; i--) {
            int j = (int) Math.floor(Math.random() * (i + 1));

            Card temp = cards[i];

            // in-placeスワップ
            cards[i] = cards[j];
            cards[j] = temp;
        }
    }

    public static Card[] shuffleDeckOutOfPlace(Card[] cards){
       Card[] cardsDeepCpy = new Card[cards.length]; 
       for(int i = 0; i < cards.length; i++){
            String rank = cards[i].rank;
            String suit = cards[i].suit;
            cardsDeepCpy[i] = new Card(rank, suit);
       }

       for (int i = cardsDeepCpy.length-1; i >= 0 ; i--) {
            int j = (int) Math.floor(Math.random() * (i + 1));

            Card temp = cardsDeepCpy[i];

            // in-placeスワップ
            cardsDeepCpy[i] = cardsDeepCpy[j];
            cardsDeepCpy[j] = temp;
        }

        return cardsDeepCpy;
    }
    

    public String toString(){
        return Deck.cardsToString(this.cards);
    }

    public static String cardsToString(Card[] inputCards){
        String s = "";

        for(int i = 0; i < inputCards.length;i++){
            s+=inputCards[i].toString();
            if(i%5 == 4) s+="";
        } 
        return s;
    }
}
*/
// staticメソッド1

/*
新しいデッキを構築する createDeck() 関数は、
オブジェクトの状態を使うことはなく、単にカードの配列を生成し、それを戻り値として返すという機能しか持ちません。
したがって、この関数を静的にしておくと、オブジェクトを作成せずに使用でき、
クラススコープに囲まれた通常の関数と同じように扱うことができます。
class Main{
    public static void main(String[] args){
        Deck d = new Deck();
        System.out.println(d);

        Card[] myCards = Deck.createDeck();

        System.out.println();
        System.out.println(Deck.cardsToString(myCards));
        System.out.println();

        d.shuffleDeck();
        System.out.println(d);
    }
}

class Card{
    public String rank;
    public String suit;
    
    public Card(String rank, String suit){
        this.rank = rank;
        this.suit = suit;
    }

    public String toString(){
        return this.rank + this.suit;
    }
}

class Deck{
    public static final String[] SUITS = {"♠","♡","♢","♣"};
    public static final String[] RANKS = {"A","2","3","4","5","6","7","8","9","10","J","Q","K"};
    public Card[] cards;

    public Deck(){
        this.cards = Deck.createDeck(); // クラスメソッドへのアクセス
    }

    public static Card[] createDeck(){
        int s = Deck.SUITS.length;
        int r = Deck.RANKS.length;
        Card[] cards = new Card[s * r];

        for(int i = 0; i < s; i++){
            for(int j = 0; j < r; j++){
                cards[i*r+j] = new Card(Deck.RANKS[j], Deck.SUITS[i]);
            }
        }

        return cards;
    }

    // フィッシャーズアルゴリズムを使ってシャッフル
    public void shuffleDeck(){
        int deckSize = this.cards.length;

        // 最後から始めて、ランダムにスワップを選択してから左の要素(i--)に移動します。
        for (int i = deckSize-1; i >= 0 ; i--) {
            int j = (int) Math.floor(Math.random() * (i + 1));

            Card temp = this.cards[i];

            // in-placeスワップ
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    public String toString(){
        return Deck.cardsToString(this.cards);
    }

    public static String cardsToString(Card[] inputCards){
        String s = "";

        for(int i = 0; i < inputCards.length;i++){
            s+=inputCards[i].toString();
            if(i%5 == 4) s+="";
        } 
        return s;
    }
}

*/
// クラス変数1


/*
//言語のスコープルールが許す場合、メソッド内からメンバ変数にアクセスするときに、「this」キーワードの使用を選択したり、省略したりすることができます。
//「this」キーワードを使用するとコードが長くなり、冗長性が増すというデメリットがある一方で、「this」キーワードを使用することで、
//メンバ変数のアクセスが保証され、開発者はそのメンバ変数が活用されていることを理解しやすくなります。
// オブジェクトとスコープ2
class Wallet{
    public int bill1;
    public int bill5;
    public int bill10;
    public int bill20;
    public int bill50;
    public int bill100;

    public Wallet(){}

    public int getTotalMoney(){
        return (1*bill1) + (5*bill5) + (10*bill10) + (20*bill20) + (50*bill50) + (100*bill100);
    }

    // 札の額面（bill）と枚数（amount）を引数にとるメソッドです。
    // billに応じて対応するメンバ変数を増やし、挿入した総額（bill*amount）を返します。
    // billが1,5,10,20,50,100以外の場合は何もせずに0を返します。
    public int insertBill(int bill, int amount){
        switch(bill){
            case(1):
                bill1 += amount;
                break;
            case(5):
                bill5 += amount;
                break;
            case(10):
                bill10 += amount;
                break;
            case(20):
                bill20 += amount;
                break;
            case(50):
                bill50 += amount;
                break;
            case(100):
                bill100 += amount;
                break;
            default:
                return 0;
        }
        
        return bill*amount;
    }
}

class Person{
    public String firstName;
    public String lastName;
    public int age;
    public double heightM;
    public double weightKg;
    public Wallet wallet;

    // firstName, lastName, age, heightM, weightKgの値を引数にとるコンストラクタです。
    // walletには新しいWalletオブジェクトを割り当てます。
    public Person(String firstName, String lastName, int x, double y, double z){
        this.firstName = firstName;
        this.lastName = lastName;
        age = x; // ageの状態がxへアップデートされます。
        heightM = y;
        weightKg = z;
        wallet = new Wallet();
    }

    public int getCash(){
        if(this.wallet == null){
            System.out.println("NO WALLET");
            return 0;
        }
        return this.wallet.getTotalMoney();
    }

    // Personオブジェクトの状態を出力するメソッドです。
    // 注意点として、weightKgについてはローカル変数が新たに定義されており、これが優先的に参照されます。
    // しかしheightMの出力ではthis.weightKgとしてクラスのメンバ変数を明示的に参照しているため、そちらの値が出力されます。
    public void printState(){
        // thisキーワードは必須ではありません。同じ名前のローカル変数（メソッド内で宣言された変数）が存在しない限り、インスタンス変数は直接参照できます。
        System.out.println("firstname - " + firstName);
        System.out.println("lastname - " + lastName); 
        System.out.println("age - " + age);
        double weightKg = 495; // weightKg ローカル変数が優先度が高いです。
        System.out.println("height - " + heightM + ", joking it is: " + this.weightKg);
        System.out.println("weight - " + weightKg);
        System.out.println("Current Money - " + getCash());
        System.out.println();
    }
}

class Main{
    public static void main(String[] args){
        // 引数付きのコンストラクタを用いてPersonオブジェクトを作成します。
        Person p = new Person("Ryu","Poolhopper", 40, 180, 140); 
        p.printState();

        // 札の額面と枚数を指定して財布に入金します。
        p.wallet.insertBill(5,3);
        p.wallet.insertBill(100,2);

        // 状態を再度出力します。ここでの出力では先程挿入した札が反映された状態になっています。
        p.printState();
    }
}

// オブジェクトとスコープ1
// メインクラス
class Main{
    // メインメソッド
    public static void main(String[] args){
        // Personオブジェクトを新しく作成し、名前を"Ryu"とします。
        Person p = new Person("Ryu"); 
        // Ryuの情報を出力
        System.out.println("firstname - " + p.firstName);
        System.out.println("lastname - " + p.lastName); // lastNameは初期値がnull（未設定）
        System.out.println("age - " + p.age); // ageも初期値が0（未設定）
        System.out.println("height - " + p.heightM); // heightMも初期値が0.0（未設定）
        System.out.println("weight - " + p.weightKg); // weightKgも初期値が0.0（未設定）
        System.out.println("Current Money - " + p.getCash()); // 所持金を表示（財布を持っていない場合は0）

        // Ryuの情報を更新
        p.lastName = "Poolhopper"; // 姓を"Poolhopper"に設定
        p.age = 40; // 年齢を40に設定
        p.heightM = 180; // 身長を180メートルに設定
        p.weightKg = 140; // 体重を140キログラムに設定

        // 更新後のRyuの情報を出力
        System.out.println();
        System.out.println("firstname - " + p.firstName);
        System.out.println("lastname - " + p.lastName);
        System.out.println("age - " + p.age);
        System.out.println("height - " + p.heightM);
        System.out.println("weight - " + p.weightKg);
    }
}
// 財布を表現するクラス
class Wallet{
    // 以下の変数はそれぞれの紙幣の枚数を表します。
    public int bill1; // 1ドル札
    public int bill5; // 5ドル札
    public int bill10; // 10ドル札
    public int bill20; // 20ドル札
    public int bill50; // 50ドル札
    public int bill100; // 100ドル札
    
    // コンストラクタ（新たにWalletオブジェクトを生成する際に呼び出されるメソッド）
    public Wallet(){}

    // 財布内の全額を計算するメソッド
    public int getTotalMoney(){
        // 各紙幣の価値と枚数を掛け合わせて合計します。
        return (1*this.bill1) + (5*this.bill5) + (10*this.bill10) + (20*this.bill20) + (50*this.bill50) + (100*this.bill100);
    }
}

// 人を表現するクラス
class Person{
    public String firstName; // 名前
    public String lastName; // 姓
    public int age; // 年齢
    public double heightM; // 身長（メートル）
    public double weightKg; // 体重（キログラム）
    public Wallet wallet; // 財布（Walletオブジェクト）

    // コンストラクタ（新たにPersonオブジェクトを生成する際に呼び出されるメソッド）
    // 引数には名前が入ります。
    public Person(String firstName){
        this.firstName = firstName;
    }

    // 所持金を取得するメソッド
    public int getCash(){
        // walletがnull（財布を持っていない）の場合はメッセージを表示し、0を返す
        if(this.wallet == null){
            System.out.println("NO WALLET");
            return 0;
        }
        // walletがnullでない（財布を持っている）場合は、財布内の全額を取得
        return this.wallet.getTotalMoney();
    }
}



/*
// メンバ変数とメモリ2
class Main {
    public static void main(String[] srgs) {

         Battery mc96 = new Battery("VTec", "MC96", 14.4, 6.6, 0.55, 72, 97, 51.5);
         Battery mc96Second = mc96;
         Battery mc96Third = new Battery("VTec", "MC96", 14.4, 6.6, 0.55, 72, 97, 51.5);
         Battery mdLs95 = new Battery("Atomic Units", "MD-LS95", 14.4, 6.6, 0.55, 72, 97, 51.5);

         // isEquals test
        System.out.println("------------is Equals---------");
        System.out.println(mc96.isEquals(mc96Second));
        System.out.println(mc96.isEquals(mc96Third));
        System.out.println(mc96.isEquals(mdLs95));
        System.out.println("-------end Equals-------------");

         // isBigger test
        System.out.println("-------Bigger-------------");
        System.out.println(mc96.isBigger(mc96Second));
        System.out.println(mc96.isBigger(mc96Third));
        System.out.println(mc96.isBigger(mdLs95));
        System.out.println("-------end Bigger-------------");

         // mc96.isBiggerOrEqual test
        System.out.println("-------BiggerOrEqual-------------");
        System.out.println(mc96.isBiggerOrEqual(mc96Second));
        System.out.println(mc96.isBiggerOrEqual(mc96Third));
        System.out.println(mc96.isBiggerOrEqual(mdLs95));
        System.out.println("-------end BiggerOrEqual-------------");

         // mc96.isSmaller test
        System.out.println("-------Smaller-------------");
        System.out.println(mc96.isSmaller(mc96Second));
        System.out.println(mc96.isSmaller(mc96Third));
        System.out.println(mc96.isSmaller(mdLs95));
        System.out.println("-------end Smaller-------------");

         // mc96.isSmallerOrEqual test
        System.out.println("-------SmallerOrEqual-------------");
        System.out.println(mc96.isSmallerOrEqual(mc96Second));
        System.out.println(mc96.isSmallerOrEqual(mc96Third));
        System.out.println(mc96.isSmallerOrEqual(mdLs95));
        System.out.println("-------end SmallerOrEqual-------------");

        /*
         // "VTec"メーカーの"MC96"モデルという新しいバッテリーオブジェクト(mc96)を作成します
         Battery mc96 = new Battery("VTec", "MC96", 14.4, 6.6, 0.55, 72, 97, 51.5);

         // mc96の参照をmc96Secondにコピーします。これは「シャローコピー」を意味します。つまり、mc96Secondはmc96と同じオブジェクトを指しています
         Battery mc96Second = mc96;

         // mc96と同じ値を持つ新しいバッテリーオブジェクト(mc96Third)を作成します。これは「ディープコピー」を意味します。つまり、mc96Thirdはmc96と同じ属性を持つ新しいオブジェクトです
         Battery mc96Third = new Battery("VTec", "MC96", 14.4, 6.6, 0.55, 72, 97, 51.5);

         // "Atomic Units"メーカーの"MD-LS95"モデルという新しいバッテリーオブジェクト(mdLs95)を作成します
         Battery mdLs95 = new Battery("Atomic Units", "MD-LS95", 14.4, 6.6, 0.55, 72, 97, 51.5);

         // mc96, mc96Second, mc96Third, mdLs95の各オブジェクトの情報を出力します
         System.out.println(mc96);
         System.out.println();
         System.out.println(mc96Second);
         System.out.println();
         System.out.println(mc96Third);
         System.out.println();
         System.out.println(mdLs95);

         System.out.println();

         // mc96がmc96自身と等しいか（つまり、同じオブジェクトを参照しているか）をチェックします。結果はTrueになります
         System.out.println(mc96 == mc96); //True

         // mc96がmc96Secondと等しいか（つまり、同じオブジェクトを参照しているか）をチェックします。mc96Secondはmc96のシャローコピーなので、結果はTrueになります
         System.out.println(mc96 == mc96Second); //True

         // mc96がmc96Thirdと等しいか（つまり、同じオブジェクトを参照しているか）をチェックします。mc96Thirdはmc96のディープコピー（別のオブジェクト）なので、結果はFalseになります
         System.out.println(mc96 == mc96Third); //False

         // mc96がmdLs95と等しいか（つまり、同じオブジェクトを参照しているか）をチェックします。mdLs95は完全に別のオブジェクトなので、結果はFalseになります
         System.out.println(mc96 == mdLs95); //False
         */

/* menber-1
// 新しいバッテリーオブジェクトを作成します。
Battery mc96 = new Battery("VTec", "MC96", 14.4, 6.6, 0.55, 72, 97, 51.5);
Battery mc60 = new Battery("VTec", "MC60", 14.4, 4.2, 0.35, 52, 77, 40.5);
Battery mdPL140 = new Battery("BowserPower", "MD-PL140", 14.4, 9.9, 1.18, 89, 119, 85);
Battery zlD72 = new Battery("MT-Dell Tech", "ZL-D72", 7.2, 9.9, 1.18, 38, 80, 70);

// オブジェクト参照を出力し、その文字列のバージョンを表示します。
// デフォルトでは、toString()が定義されていない場合、Javaはオブジェクト参照を出力します。今回私たちはすでに定義しているので、Javaのすべてのオブジェクトが持っているhashCode()メソッドを使います。これは、オブジェクトの参照を整数として返し、それを16進数に変換します。
System.out.println("Instance Reference: " + Integer.toHexString(mc96.hashCode()));
System.out.println(mc96);

System.out.println();
// メンバ変数(アンペア時)を出力します。
System.out.println(mc96.ampHours + " are its amps");

System.out.println();
System.out.println(mc60);
System.out.println();
System.out.println(mdPL140);
System.out.println();
System.out.println(zlD72);

}}
*/

/*
class Battery {
    // メンバ変数を定義します。
    // 各バッテリーの製造業者名、モデル名、電圧(V), 電流(Ah), 重量(kg), 寸法(mm)を保持します。
    public String manufacturer;
    public String model;
    public double voltage;
    public double ampHours;
    public double weightKg;
    public double[] dimensionMm;

    // Batteryクラスのコンストラクタを定義します。このコンストラクタは各メンバ変数の初期値を設定します。
    public Battery(String manufacturer, String model, double voltage, double ampHours, double weightKg, double wMm,
            double hMm, double dMm) {
        this.manufacturer = manufacturer;
        this.model = model;
        this.voltage = voltage;
        this.ampHours = ampHours;
        this.weightKg = weightKg;
        this.dimensionMm = new double[] { wMm, hMm, dMm };
    }

    // toStringメソッドをオーバーライドします。このメソッドはオブジェクトを文字列形式で表現します。
    public String toString() {
        // このオブジェクトの参照を取得します。
        // hashCode()メソッドはオブジェクトに対する整数値を返します。この整数値は、オブジェクトがメモリ内に格納されている場所に基づいています。
        String referenceHash = Integer.toHexString(this.hashCode());

        return this.manufacturer + " " + this.model + ": " + this.getPowerCapacity() + "Wh (" + this.voltage + "V/"
                + this.ampHours + "Ah) - " + this.dimensionMm[0] + "(W)x" + this.dimensionMm[1] + "(H)x"
                + this.dimensionMm[2] + "(D) " + this.weightKg + "kg ... INstance Reference:" + referenceHash;
    }

    public double getPowerCapacity() {
        return this.voltage * this.ampHours;
    }

    public boolean isEquals(Battery battery) {
        if (this.manufacturer.equals(battery.manufacturer) && this.model.equals(battery.model)
                && this.voltage == battery.voltage && this.ampHours == battery.ampHours
                && this.weightKg == battery.weightKg && this.dimensionMm[0] == battery.dimensionMm[0]
                && this.dimensionMm[1] == battery.dimensionMm[1] && this.dimensionMm[2] == battery.dimensionMm[2]) {
            return true;

        } else {
            return false;
        }
    }

    public boolean isBigger(Battery battery) {
        return this.getPowerCapacity() < battery.getPowerCapacity();
    }

    public boolean isBiggerOrEqual(Battery battery) {
        return isEquals(battery) || isBigger(battery);
    }

    public boolean isSmaller(Battery battery) {
        return !isBigger(battery);
    }

   public boolean isSmallerOrEqual(Battery battery){
        return !isBigger(battery) || isEquals(battery);
   }

}

*/

// class 1-3
/*
class Main{
    public static void main(String[] args){
        RGB24 color1 = new RGB24(0, 153, 255);
        RGB24 color2 = new RGB24("ff99cc");
        RGB24 color3 = new RGB24("100110011111111100110011");
        RGB24 gray = new RGB24("7b7b7b");

        System.out.println(color1);
        System.out.println(color2);
        System.out.println(color3);
        System.out.println(gray);

        System.out.println();
        System.out.println("Changing the state of colors");
        System.out.println();

        // 状態の変更
        gray.setAsBlack();
        System.out.println(gray);
        color1.setColorsByHex("2EB656");
        System.out.println(color1);
    }

}


// RGB24という名前のクラスを作ります。クラスはオブジェクトの設計図のようなものです。

class RGB24{
    // red, green, blueという名前の公開された（public）変数を宣言します。これらは、RGBの色を表します。
    public int red;
    public int green;
    public int blue;

    // Javaでは、コンストラクタはクラス名と同じ名前のメソッドです。
    // オブジェクトは、thisキーワードで自分自身を参照することができます。thisキーワードは、
    // 現在のインスタンスのオブジェクトです。メソッドの内部でアクセスすることができます。
    public RGB24(int red, int green, int blue){
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    // 関数のオーバーロードを使用しています。
    // 具体的には、16進数で6文字（例："FF00FF"）または、2進数で24文字（例："111111110000000011111111"）で色を指定できます。
    // 文字列の長さが6または24でなければ、色は黒になります。
    public RGB24(String inputString){
        int l = inputString.length();
         // 長さが6なら16進数と解釈
        if(l == 6) this.setColorsByHex(inputString);
        // 長さが24なら2進数と解釈
        else if(l == 24) this.setColorsByBin(inputString);
        // 長さが6でも24でもなければ黒にする
        else this.setAsBlack();
    }

    // このメソッドは、16進数の色を設定します。
    // 例えば、"FF00FF"を入力とすると、赤255、緑0、青255となります。
    // ただし、文字列の長さが6でなければ、色は黒になります。
    public void setColorsByHex(String hex){
        // 長さが6でなければ黒にする
        if(hex.length() != 6) this.setAsBlack();
        else{
            // 最初の2文字を赤と解釈
            this.red = Integer.parseInt(hex.substring(0, 2), 16);
            // 次の2文字を緑と解釈
            this.green = Integer.parseInt(hex.substring(2, 4), 16);
            // 最後の2文字を青と解釈
            this.blue = Integer.parseInt(hex.substring(4, 6), 16);
        }
    }

    // このメソッドは、2進数の色を設定します。
    // 例えば、"111111110000000011111111"を入力とすると、赤255、緑0、青255となります。
    // ただし、文字列の長さが24でなければ、色は黒になります。
    public void setColorsByBin(String bin){
        if(bin.length() != 24) this.setAsBlack();
        else{
            // 最初の8文字を赤と解釈
            this.red = Integer.parseInt(bin.substring(0,8), 2);
            // 次の8文字を緑と解釈
            this.green = Integer.parseInt(bin.substring(8,16), 2);
            // 最後の8文字を青と解釈
            this.blue = Integer.parseInt(bin.substring(16), 2);
        }
    }


    // このメソッドは、色を黒（赤0、緑0、青0）に設定します。
    public void setAsBlack(){
        this.red = 0;
        this.green = 0;
        this.blue = 0;
    }


    // getHexメソッドは、red, green, blueの値を16進数に変換し、それらを連結した文字列を返します。
    public String getHex(){
        String hex = Integer.toHexString(this.red);
        hex += Integer.toHexString(this.green);
        hex += Integer.toHexString(this.blue);

        return hex;
    }

   // getBitsメソッドは、getHexメソッドで得られた16進数の値を2進数に変換し、その文字列を返します。
    public String getBits(){
        return Integer.toBinaryString(Integer.parseInt(this.getHex(), 16));
    }

    // getColorShadeメソッドは、RGBの値を比較し、最も大きな値を持つ色（またはグレースケール）を決定し、
    // その色の名前を文字列として返します。
    public String getColorShade(){
        // 全ての色が同じなら"grayscale"
        if(this.red == this.green && this.green == this.blue) return "grayscale";
        // 色の名前を保存する配列
        String[] stringTable = new String[]{"red", "green", "blue"};
        // 色の値を保存する配列
        int[] values = {this.red, this.green, this.blue};

        // 最大値の初期値を赤の値にする
        int max = values[0];
        // 最大値があるインデックスの初期値を0（赤）にする
        int maxIndex = 0;

        for(int i = 1; i < values.length; i++){
           // 現在の最大値よりも大きければ、その値が新しい最大値になる
            if(max <= values[i]){
                max = values[i];
                // そして、そのインデックスを保存する
                maxIndex = i;
            }
        }

        return stringTable[maxIndex];
    }

    public String toString(){
        return "The color is rgb(" + this.red + "," + this.green + "," + this.blue + "). Hex: " + this.getHex() + ", binary: " + this.getBits();
    }
}
*/
