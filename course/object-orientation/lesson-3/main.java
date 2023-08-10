
// 複数のインターフェイス2
class Main {
    public static void personInteractsWithObject(Person p, Audible noiseObject) {
        System.out.println(p + " will interact with " + noiseObject + " and cause it to make a noise");
        noiseObject.makeNoise();
        System.out.println("The noise was made at " + noiseObject.soundFrequency() + "Hz at a level of "
                + noiseObject.soundLevel() + "dB");
        System.out.println();
    }

    public static void personEatsEdible(Person p, Edible rawFood) {
        System.out
                .println(p + " will prepare and eat :" + rawFood + ". They do the following:" + rawFood.howToPrepare());
        System.out.println("The person prepared and ate the meal. " + rawFood.calories() + " calories consumed.");
        System.out.println();
    }

    public static void checkPhysicsobject(PhysicsObject obj) {
        System.out.println("workToMove: " + obj.workToMove(100));
        System.out.println();
        System.out.println("desity: " + obj.density());
        System.out.println();
        System.out.println("weight: " + obj.weight());
        System.out.println();
    }

    public static void checkLenses(Lenses obj, Edible p) {
        int[] list = obj.lightRange();
        System.out.println("ligthRange: " + list[0] + " " + list[1]);
        System.out.println();
        obj.see(p);

    }

    public static void main(String[] args) {
        Person ashley = new Person("Ashley", "William", 1.8, 110, 29);

        Person obj1 = new Person("Toshi", "Takemura", 1.7, 105, 41);
        Horse obj2 = new Horse(450);
        Cow obj3 = new Cow(1300);
        Truck obj4 = new Truck(3230.5, 100.0, 50.0, 100.1) ;
        Violin obj5 = new Violin();

        personInteractsWithObject(ashley, obj1);
        personInteractsWithObject(ashley, obj2);

        personInteractsWithObject(ashley, obj3);
        personEatsEdible(ashley, obj3);

        checkPhysicsobject(obj4);
        checkLenses(obj1, obj3);
    }
}


interface Audible{
    public abstract void makeNoise();
    public abstract double soundFrequency();
    public abstract double soundLevel();
}

interface Edible {
    public abstract String howToPrepare();

    public abstract double calories();
}

interface PhysicsObject {
    public abstract double workToMove(double m);

    public abstract double density();

    public abstract double weight();
}

interface Lenses {
    public abstract int[] lightRange();


    public abstract void see(Edible object);
}


// ここから開発してください
class Person implements Audible, Lenses{
    private String firstName;
    private String lastName;
    private double heightM;
    private double weightKg;
    private int age;

    public Person(String firstName, String lastName, double heightM, double weightKg, int age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.heightM = heightM;
        this.weightKg = weightKg;
        this.age = age;
    }

    public String getFullName(){
        return this.firstName + " " + this.lastName;
    }

    public String toString(){
        return this.getFullName() + " who is " + this.heightM + "m tall and weights " + this.weightKg + "kg.";
    }

    public void makeNoise(){
        System.out.println("Hello World!");
    }

    public double soundFrequency(){
        return this.age > 16 ? 110 : 130;
    }

    public double soundLevel(){
        return this.age > 16 ? 60 : 65;
    }

    public int[] lightRange(){
        int[] lightRangeList = new int[2];
        lightRangeList[0] = 400;
        lightRangeList[1] = 700;
        return lightRangeList;
    }


    public void see(Edible object){
        System.out.println(object.toString());
    }
}

class Horse implements Audible{
    private double weightKg;
    private double soundFrequency = 120;
    private double soundDecibels = 75;

    public Horse(double weightKg){
        this.weightKg = weightKg;
    } 

    public String toString(){
        return "This is a horse that weights: " + this.weightKg + "kg";
    }

    public void makeNoise(){
        System.out.println("Neeighh!!");
    }

    public double soundFrequency(){
        return this.soundFrequency;
    }

    public double soundLevel(){
        return this.soundDecibels;
    }

}

class Cow implements Audible, Edible{
    private double weightKg;
    private double soundFrequency = 90;
    private double soundDecibels = 70;
    
    public Cow(double weightKg){
        this.weightKg = weightKg;
    } 

    public String toString(){
        return "This is a cow that weights: " + this.weightKg + "kg";
    }

    public void makeNoise(){
        System.out.println("Moooo!!");
    }

    public double soundFrequency(){
        return this.soundFrequency;
    }

    public double soundLevel(){
        return this.soundDecibels;
    }

    public String howToPrepare(){
        return "Cut the cow with a butchering knife into even pieces, and grill each piece at 220C";
    }

    public double calories(){
        return this.weightKg * 1850;
    }
}

class Truck implements Audible, PhysicsObject {
    private double weightKg;
    // 体積
    private double valume;
    //  質量 
    private double mass;

    private double accleration;


    public Truck(double weightKg, double valume, double mass, double accleration) {
        this.weightKg = weightKg;
        this.valume = valume;
        this.mass = mass;
        this.accleration = accleration;
    }

    public String toString() {
        return "This is a truck that weights: " + this.weightKg + "kg";
    }

    public void makeNoise() {
        System.out.println("Beep Beep!!");
    }

    public double soundFrequency() {
        return 165;
    }

    public double soundLevel() {
        return 120;
    }

    public double workToMove(double m){
        // 仕事 (ジュール) = 力 (ニュートン) × 距離 (メートル)
        // 力 = 質量 × 加速度                
        double force = mass * accleration;
        double work = m * force;
        return work;
    }

    public double density(){
        return this.mass / this.valume;
    }

    public double weight(){
        return this.weightKg * density();
    }
}

class Violin implements Audible{

    private double soundFrequency = 659.3;
    private final static double SOUND_DECIBELS = 95;

    public String toString(){
        return "This is a violin that plays music: ";
    }

    public void makeNoise(){
        System.out.println("Beep Beep!!");
    }

    public double soundFrequency(){
        return this.soundFrequency;
    }

    public double soundLevel(){
        return Violin.SOUND_DECIBELS;
    }
}




// 複数のインターフェイス1
/*
// Audibleという名前のインターフェースを定義します。
// 音を出すオブジェクトが持つべきメソッドを定義します。
interface Audible{
    public abstract void makeNoise();
    public abstract double soundFrequency();
    public abstract double soundLevel();
}

// Edibleという名前のインターフェースを定義します。
// 食べられるオブジェクトが持つべきメソッドを定義します。
interface Edible{
    public abstract String howToPrepare();
    public abstract double calories();
}

// PersonクラスはAudibleインターフェースを実装します。
// そのため、makeNoise(), soundFrequency(), soundLevel()というメソッドを持つ必要があります。
class Person implements Audible{
    private String firstName;
    private String lastName;
    private double heightM;
    private double weightKg;
    private int age;

    public Person(String firstName, String lastName, double heightM, double weightKg, int age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.heightM = heightM;
        this.weightKg = weightKg;
        this.age = age;
    }

    public String getFullName(){
        return this.firstName + " " + this.lastName;
    }

    public String toString(){
        return this.getFullName() + " who is " + this.heightM + "m tall and weights " + this.weightKg + "kg.";
    }

    // Personが音を出すメソッドを定義します。
    // このメソッドはAudibleインターフェースによって要求されています。
    public void makeNoise(){
        System.out.println("Hello World!");
    }

    // Personの音の周波数を返すメソッドを定義します。
    // このメソッドはAudibleインターフェースによって要求されています。
    public double soundFrequency(){
        return this.age > 16 ? 110 : 130;
    }

    // Personの音のレベルを返すメソッドを定義します。
    // このメソッドはAudibleインターフェースによって要求されています。
    public double soundLevel(){
        return this.age > 16 ? 60 : 65;
    }
}

// HorseクラスもAudibleインターフェースを実装します。
// Personクラスと同様に、makeNoise(), soundFrequency(), soundLevel()というメソッドを持つ必要があります。
class Horse implements Audible{
    private double weightKg;
    private double soundFrequency = 120;
    private double soundDecibels = 75;

    public Horse(double weightKg){
        this.weightKg = weightKg;
    } 

    public String toString(){
        return "This is a horse that weights: " + this.weightKg + "kg";
    }

    // Horseが音を出すメソッドを定義します。
    // このメソッドはAudibleインターフェースによって要求されています。
    public void makeNoise(){
        System.out.println("Neeighh!!");
    }

    // Horseの音の周波数を返すメソッドを定義します。
    // このメソッドはAudibleインターフェースによって要求されています。
    public double soundFrequency(){
        return this.soundFrequency;
    }

    // Horseの音のレベルを返すメソッドを定義します。
    // このメソッドはAudibleインターフェースによって要求されています。
    public double soundLevel(){
        return this.soundDecibels;
    }
}

// CowクラスはAudibleとEdibleの両方のインターフェースを実装します。
// そのため、makeNoise(), soundFrequency(), soundLevel()というメソッドと、howToPrepare(), calories()というメソッドを持つ必要があります。
class Cow implements Audible, Edible{
    private double weightKg;
    private double soundFrequency = 90;
    private double soundDecibels = 70;

    public Cow(double weightKg){
        this.weightKg = weightKg;
    } 

    public String toString(){
        return "This is a cow that weights: " + this.weightKg + "kg";
    }

    // Cowが音を出すメソッドを定義します。
    // このメソッドはAudibleインターフェースによって要求されています。
    public void makeNoise(){
        System.out.println("Moooo!!");
    }

    // Cowの音の周波数を返すメソッドを定義します。
    // このメソッドはAudibleインターフェースによって要求されています。
    public double soundFrequency(){
        return this.soundFrequency;
    }

    // Cowの音のレベルを返すメソッドを定義します。
    // このメソッドはAudibleインターフェースによって要求されています。
    public double soundLevel(){
        return this.soundDecibels;
    }

    // Cowの調理方法を返すメソッドを定義します。
    // このメソッドはEdibleインターフェースによって要求されています。
    public String howToPrepare(){
        return "Cut the cow with a butchering knife into even pieces, and grill each piece at 220C";
    }

    // Cowのカロリーを返すメソッドを定義します。
    // このメソッドはEdibleインターフェースによって要求されています。
    public double calories(){
        return this.weightKg * 1850;
    }
}

// 以下もAudibleインターフェースを実装したクラスの例です。
class Truck implements Audible{
    private double weightKg;

    public Truck(double weightKg){
        this.weightKg = weightKg;
    } 

    public String toString(){
        return "This is a truck that weights: " + this.weightKg + "kg";
    }

    public void makeNoise(){
        System.out.println("Beep Beep!!");
    }

    public double soundFrequency(){
        return 165;
    }

    public double soundLevel(){
        return 120;
    }
}

class Violin implements Audible{
    private double soundFrequency = 659.3;
    private final static double SOUND_DECIBELS = 95;

    public String toString(){
        return "This is a violin that plays music: ";
    }

    public void makeNoise(){
        System.out.println("Beep Beep!!");
    }

    public double soundFrequency(){
        return this.soundFrequency;
    }

    public double soundLevel(){
        return Violin.SOUND_DECIBELS;
    }
}

// Mainクラスでは、PersonクラスのインスタンスがAudibleやEdibleのインスタンスとどのように相互作用するかを定義します。
class Main{
    // PersonがAudibleオブジェクトとやりとりする例を示します。
    public static void personInteractsWithObject(Person p, Audible noiseObject){
        System.out.println(p + " will interact with " + noiseObject + " and cause it to make a noise");
        noiseObject.makeNoise();
        System.out.println("The noise was made at " + noiseObject.soundFrequency() + "Hz at a level of " + noiseObject.soundLevel() + "dB");
        System.out.println();
    }

    // PersonがEdibleオブジェクトを食べる例を示します。
    public static void personEatsEdible(Person p, Edible rawFood){
        System.out.println(p + " will prepare and eat :" + rawFood + ". They do the following:" + rawFood.howToPrepare());
        System.out.println("The person prepared and ate the meal. " + rawFood.calories() + " calories consumed.");
        System.out.println();
    }

    public static void main(String[] args){
        Person ashley = new Person("Ashley", "William", 1.8, 110, 29);

        Person obj1 = new Person("Toshi", "Takemura", 1.7, 105, 41);
        Horse obj2 = new Horse(450);
        Cow obj3 = new Cow(1300);
        Truck obj4 = new Truck(3230.5);
        Violin obj5 = new Violin();

        // Ashleyが他のAudibleオブジェクトとやりとりします。
        personInteractsWithObject(ashley, obj1);
        personInteractsWithObject(ashley, obj2);
        personInteractsWithObject(ashley, obj3);
        // CowはAudibleインターフェースとEdibleインターフェースの両方を実装しています。
        // そのため、AshleyはCowとやりとりし、またCowを食べることも可能です。
        personEatsEdible(ashley, obj3);
    }
}
*/

// インターフェイス1-2
/*
class Main {
    public static void checkMethod(Fly object) {
        System.out.println("Check Start-----------");
        System.out.println("Check fly -----------");
        object.fly();
        System.out.println("Check flyHeight -----------");
        System.out.println("flyHeight: " + object.flyHeight()); 
        
        System.out.println("Check flySpeed -----------");
        System.out.println("flySpeed: " + object.flySpeed()); 
        System.out.println("Check method -----------");
        System.out.println("method: " + object.toString()); 

        System.out.println("Check end-----------");
    }

    public static void main(String[] args) {
        AirPlane honda = new AirPlane("Honda");
       checkMethod(honda); 
    }
}

interface Fly {
    public abstract void fly();

    public abstract double flyHeight();

    public abstract double flySpeed();
}

class AirPlane implements Fly {
    private String maker;
    private double flyHeight;
    private double flySpeed;

    public AirPlane(String maker) {
        this.maker = maker;
        this.flyHeight = 100;
        this.flySpeed = 300;
    };

    public String toString(){
        return "Maker: " + this.maker;
    }


    //public void fly(String startPoint, String destination) {
    //    System.out.println("start: " + startPoint + " --> end: " + destination);
    //}
    public void fly() {
        System.out.println(this.maker + ": Let's Fly");
    }

    public double flyHeight() {
        return this.flyHeight;
    }

    public double flySpeed() {
        return this.flySpeed;
    }
}
*/

/*
//インターフェースは振る舞いだけを指定し、状態を指定することはできません。
//インターフェースによって指定された振る舞いは抽象メソッドです。
これらはインターフェースを実装するクラスが定義して実装しなければならない関数名として扱います。
インターフェースは抽象メソッドだけから構成されます。
//インターフェースには抽象メソッドのみが許可されているため、
抽象クラスとは大きく異なります。抽象クラスでは、状態を指定したり、一部のメソッドを実装したり、
一部のメソッドを抽象化したりすることができます。
//クラスが実装できるインターフェースの数に制限はありません。
つまり、Car は Audible, Drivable, Vehicle, Product などのインターフェースを実装することができます。
*/

// インターフェースは、Interfaceキーワードを使用して定義されます。
/*
interface Audible{
    // インターフェース内には、実装クラスでオーバーライドされるべき抽象メソッドが含まれます。
    // Audibleを実装したクラスは必ずmakeNoise()とsoundFrequency()とsoundLevel()を持つべきです。

    // オブジェクトが生成する音を示すメソッド
    public abstract void makeNoise();

    // オブジェクトが生成する音の平均周波数を返すメソッド
    public abstract double soundFrequency();

    // オブジェクトが生成する音のレベル(デシベル)を返すメソッド
    public abstract double soundLevel();
}

// Person, Horse, Cow, Truck, ViolinはそれぞれAudibleインターフェースを実装します。
// クラスは、インターフェースを実装するためにimplementsキーワードを使用します。

// 例えば、PersonクラスではmakeNoise、soundFrequency、soundLevelメソッドが実装されています。
class Person implements Audible{
    private String firstName;
    private String lastName;
    private double heightM;
    private double weightKg;
    private int age;

    public Person(String firstName, String lastName, double heightM, double weightKg, int age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.heightM = heightM;
        this.weightKg = weightKg;
        this.age = age;
    }

    public String getFullName(){
        return this.firstName + " " + this.lastName;
    }

    public String toString(){
        return this.getFullName() + " who is " + this.heightM + "m tall and weights " + this.weightKg + "kg.";
    }

    // 人が音を立てるときの動作を定義
    public void makeNoise(){
        System.out.println("Hello World!");
    }

    // 人が出す音の周波数を定義。16歳以上とそれ以下で周波数が異なると想定
    public double soundFrequency(){
        return this.age > 16 ? 110 : 130;
    }

    // 人が出す音のレベルを定義。16歳以上とそれ以下でレベルが異なると想定
    public double soundLevel(){
        return this.age > 16 ? 60 : 65;
    }
}

// Horse, Cow, Truck, Violinクラスも同様にAudibleインターフェースを実装しています。
// 各クラスに適したmakeNoise、soundFrequency、soundLevelメソッドが定義されています。
class Horse implements Audible{
    private double weightKg;
    private double soundFrequency = 120;
    private double soundDecibels = 75;

    public Horse(double weightKg){
        this.weightKg = weightKg;
    }

    public String toString(){
        return "This is a horse that weights: " + this.weightKg + "kg";
    }

    public void makeNoise(){
        System.out.println("Neeighh!!");
    }

    public double soundFrequency(){
        return this.soundFrequency;
    }

    public double soundLevel(){
        return this.soundDecibels;
    }
}

class Cow implements Audible{
    private double weightKg;
    private double soundFrequency = 90;
    private double soundDecibels = 70;

    public Cow(double weightKg){
        this.weightKg = weightKg;
    }

    public String toString(){
        return "This is a cow that weights: " + this.weightKg + "kg";
    }

    public void makeNoise(){
        System.out.println("Moooo!!");
    }

    public double soundFrequency(){
        return this.soundFrequency;
    }

    public double soundLevel(){
        return this.soundDecibels;
    }
}

class Truck implements Audible{
    private double weightKg;

    public Truck(double weightKg){
        this.weightKg = weightKg;
    }

    public String toString(){
        return "This is a truck that weights: " + this.weightKg + "kg";
    }

    public void makeNoise(){
        System.out.println("Beep Beep!!");
    }

    public double soundFrequency(){
        return 165;
    }

    public double soundLevel(){
        return 120;
    }
}

class Violin implements Audible{
    private double soundFrequency = 659.3;
    private final static double SOUND_DECIBELS = 95;

    public String toString(){
        return "This is a violin that plays music: ";
    }

    public void makeNoise(){
        System.out.println("Beep Beep!!");
    }

    public double soundFrequency(){
        return this.soundFrequency;
    }

    public double soundLevel(){
        return Violin.SOUND_DECIBELS;
    }
}

class Main{
    // Audibleインターフェースを使用してポリモーフィズムを実現します。
    // この関数は、Audibleを実装している任意のクラスを取り扱えます。
    public static void personInteractsWithObject(Person p, Audible noiseObject){
        System.out.println(p + " will interact with " + noiseObject + " and cause it to make a noise");
        noiseObject.makeNoise();
        System.out.println("The noise was made at " + noiseObject.soundFrequency() + "Hz at a level of " + noiseObject.soundLevel() + "dB");
        System.out.println();
    }

    public static void main(String[] args){
        // オブジェクトの作成
        Person ashley = new Person("Ashley", "William", 1.8, 110, 29);

        // インターフェースを型として使用することで、ポリモーフィズムを利用できます。
        // Audible型として宣言したオブジェクトはAudibleインターフェースで定義されたメソッドのみ使用できます。
        Audible obj1 = new Person("Toshi", "Takemura", 1.7, 105, 41);
        Audible obj2 = new Horse(450);
        Cow obj3 = new Cow(1300);
        Audible obj4 = new Truck(3230.5);
        Violin obj5 = new Violin();

        // 以下では、ashleyがそれぞれのAudibleオブジェクトと対話します。
        personInteractsWithObject(ashley, obj1);
        personInteractsWithObject(ashley, obj2);
        personInteractsWithObject(ashley, obj3);
        personInteractsWithObject(ashley, obj4);
        personInteractsWithObject(ashley, obj5);

        // 特定のメソッド（ここではgetFullName）を呼び出すためには、そのインスタンス（ここではobj1）が適切なクラス（ここではPerson）のインスタンスであることを確認する必要があります。
        if(obj1 instanceof Person) System.out.println("Specific task..." + ((Person) obj1).getFullName());
    }
}
*/

//////////////////////////////
// 抽象構造体-list
/*
class Main{
    public static void main(String[] args){

    }
}

abstract class AbstractListInteger {
    private int[] initialList;

    // AbstractListIntegerを整数リストで開始することも、空のリストで開始することもできます。
    public AbstractListInteger() {
        this.initialList = new int[0];
    }

    public AbstractListInteger(int[] arr) {
        this.initialList = arr;
    }

    public int[] getOriginalList() {
        return initialList;
    }

    // AbstractListIntegerが実装しなければならない抽象メソッド
    public abstract int get(int position); // 特定位置の要素を取得します。

    public abstract void add(int element); // リストの最後に追加します。

    public abstract void add(int[] elements); // リストの最後の要素に追加します。

    public abstract int pop();// リストの最後から削除します。削除した要素を返します。

    public abstract void addAt(int position, int element);// 指定された位置に要素を追加します。

    public abstract void addAt(int position, int[] elements);// 指定された位置に複数の要素を追加します。

    public abstract int removeAt(int position);// 指定した位置にある要素を削除します。削除した要素を返します。

    public abstract void removeAllAt(int start);// 指定された位置から始まるすべての要素を削除します。

    public abstract void removeAllAt(int start, int end);// startからendまでの全ての要素を削除します。

    public abstract AbstractListInteger subList(int start); // AbstractListIntegerの部分リストを、指定された位置から最後まで返します。

    public abstract AbstractListInteger subList(int start, int end); // startからendまでのAbstractListIntegerの部分リストを返します。
}


class IntegerArrayList extends AbstractListInteger {
    private int[] list;
    private int size;

    public IntegerArrayList() {
        super();
        list = new int[10];
        size = 0;
    }

    public IntegerArrayList(int[] arr) {
        super(arr);
        list = new int[arr.length];
        size = arr.length;
        for (int i = 0; i < arr.length; i++) {
            list[i] = arr[i];
        }
    }

    private void resizeArray() {
        int mewSize = Math.max(size * 10, 10);
        int[] mewList = Array.copyOf(list, newSize);
        list = newList;
    }

    public  int get(int position){
        return list[position];
    }

    public  void add(int element){
        if (size == list.length) {
            resizeArray();
        }
        list[size] = element;
        size++;
    }

    public  void add(int[] elements){
        if (size + elements.length > list.length) {
            resizeArray();
        }
        for (let i = 0; i < elements.length; i++) {
            list[size + i] = elements[i];
        }

        size += elements.length; 
    }

    public  int pop(){
        int temp = list[size];
        list[size] = null;
        size--;
        return temp;
    }

    public  void addAt(int position, int element){
        if (size == list.length) {
            resizeArray();
        }

        int[] newList = new int[list.length];
        for (int i = 0; i < position; i++) {
            newList[i] = list[i];
        }

        newList[position] = element;

        for (int i = position; i > list.length; i++) {
            newlist[i + 1] = list[i];
        }
        list = newList;
        size++;
    }

    public  void addAt(int position, int[] elements){

        if (size + elements.length > list.length) {
            resizeArray();
        }

        for (int i = size - 1; i > position; i--) {
            list[i + elements.length] = list[i];
        }
        for (int i = 0; i < elements.length; i++) {
            newList[position + i] = elements[i];
        }
        size += elements.lenegth;
    }

    // 0 1 2 3 4 5
    // p2 -> 6 7 8
    // 0 1 6 7 8 2 3 4 5

    public  int removeAt(int position){
        int removeElement = list[position];
        for (int i = position; i < size - 1; i++) {
            list[i] = list[i + 1];
       }
        list[size - 1] = 0;
        size--;

        return removeElement;
    }

    public  void removeAllAt(int start){
        removeAllAt(start, size - 1);
    }

    public  void removeAllAt(int start, int end){
        int elementsRemove = end - start + 1;

        // 要素を削除してシフト
        for (int i = start; i < size - elementsToRemove; i++) {
            list[i] = list[i + elementsToRemove];
        }

        for (int i = size - elementsToRemove; i < size; i++) {
            list[i] = 0;
        }

        size -= elementsToRemove;
    }

    public  AbstractListInteger subList(int start){
        return subList(start, size - 1);
    }

    public  AbstractListInteger subList(int start, int end){
        int[] sublistArray = new int[end - start + 1];

        for (int i = 0; i < sublistArray.lengtth; i++) {
            sublistArray[i] = list[start + i];
        }

        return new IntegerArrayList(sublistArray);
    }

}


class IntegerLinkedList extends AbstractListInteger {
    private Node head;
    private int size; 

    public IntegerLinkedList() {
        super();
        this.head = null;
        this.size = 0;
    }


    public IntegerArrayList(int[] arr){
        super(arr);
        this.head = null;
        this.size = 0;
        for(int num : arr){
            add(num);
        }
    }


    private static class Node { 
        int data;
        Node next;

        public Node(int data) {
            this.data = data;
            this.next = null;
        }
    }


    public  int get(int position){
        Node current = head;
        for (int i = 0; i < positon; i++) {
            current = current.next;
        }
        return current.data;
    }

    public  void add(int element){
        Node newNode = new Node(element);
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.enxt != null) {
                current = current.next;
            }

            current.next = newNode;
        }
        size++;
    }

    public  void add(int[] elements){
        for (int element : elements) {
            add(element);
        }
    }

    public int pop() {
        int removeData = head.data;
        head = head.next;
        size--;
        return removeData;
    }

    public  void addAt(int position, int element){
        if (positon == 0) {
            Node newNode = new Node(element);
            newNode.next = head;
            head = newNode;
        } else {
            Node current = head;
            for (int i = 0; i < position - 1; i++) {
                current = current.next;
            }
            Node newNode = new Node(element);
            newNode.next = current.next;
            current.next = newNode;
        };

        size++;
    }

    public  void addAt(int position, int[] elements){
        for (int element : elements) {
            addAt(position, element);
            position++;
        }
    }

    public  int removeAt(int position){
        if (position == 0) {
            int removeData = head.data;
            head = head.next;
            size--;
            return removeData;
        } else {
            Node current = head;
            for (int i = 0; i < position - 1; i++) {
                current = current.next;
            }
            int removeData = current.next.data;
            currrent.next = current.next.next;
            size--;
            return removeData;
        }
    }

    public  void removeAllAt(int start){
        removeAllAt(start, size - 1);
    }

    public  void removeAllAt(int start, int end){
        if (start == 0) {
            for (int i = 0; i <= end; i++) {
                head = head.next;
            }
        } else {
            Node currnet = head;
            for(int i = 0; i < start - 1; i++){
                current = current.next;
            }
            Node temp = current.next;
            for(int i = 0; i <= end - start; i++){
                temp = temp.next;
            }
            current.next = temp;
        }
        size -= (end - start + 1);
    }

    public  AbstractListInteger subList(int start){
        
    }

    public  AbstractListInteger subList(int start, int end){
        int[] subListArray = new int[end - start + 1];
        Node current = head;
        for (int i = 0; i < start; i++) {
            current = current.next;
        }

        for (int i = 0; i <= end - start; i++) {
            subListArray[i] = current.data;
            current = current.next;
        }
        return new IntegerArrayList(subListArray);
    }
}
////////////////////////////



// 抽象構造体-mumreic  

// Numericは数値を表現する抽象クラスです。
// getIntegerとgetDoubleという抽象メソッドを持ち、それぞれ数値を整数と浮動小数点数に変換する方法を定義するようサブクラスに要求しています。
/*
class Main{

    public static void numericPrinter(Numeric num){
        // 各型への変換結果を出力します。
        System.out.println(num);
        System.out.println("Byte: " + num.getByte());
        System.out.println("Short: " + num.getShort());
        System.out.println("Long: " + num.getLong());
        System.out.println("Char: " + num.getChar());
        System.out.println("Double: " + num.getDouble());
        System.out.println();
    }

    public static void main(String[] args){
        Numeric num1 = new IntegerNumeric(73);
        // 大きなビットの整数をバイト(8ビット)に変換しようとすると、変換が失われる可能性があります。
        Numeric num2 = new IntegerNumeric(23555461);
        Numeric num3 = new CharNumeric(61);

        numericPrinter(num1);
        numericPrinter(num2);
        numericPrinter(num3);
    }
}

abstract class Numeric{
    // 以下のメソッド群はNumericの整数表現を取得し、それを各型に変換する役割を果たします。
    public byte getByte(){
        // byte型(8ビット)への変換
        return (byte) this.getInteger();
    }

    public short getShort(){
        // short型(16ビット)への変換
        return (short) this.getInteger();
    }

    public long getLong(){
        // long型(64ビット)への変換
        return (long) this.getInteger();
    }

    public char getChar(){
        // char型(16ビット)への変換
        return (char) this.getInteger();
    }

    // Numericクラスのサブクラスでは、データを整数として表現する方法を定義する必要があります。
    public abstract int getInteger();

    // Numericクラスのサブクラスでは、データをdouble型として表現する方法を定義する必要があります。
    public abstract double getDouble();

    public String toString(){
        // Numericオブジェクトを文字列に変換します。
        return this.getClass().getSimpleName() + " of int value: " + this.getInteger();
    }
}

// IntegerNumericは内部で整数（int型）を保持し、その値をgetIntegerメソッドで返すとともに、getDoubleメソッドではその値をdouble型にキャストして返します。
class IntegerNumeric extends Numeric{
    // IntegerNumericでは、実際のデータはint型で保持されます。
    private int value;

    // コンストラクタでは、int型の引数を受け取ります。
    public IntegerNumeric(int value){
        this.value = value;
    }

    // 整数表現としては、そのままの値を返します。
    public int getInteger(){
        return this.value;
    }

    // double型表現としては、整数値をdouble型にキャストします。
    public double getDouble(){
        return this.value + 0.0;
    }
}

// CharNumericは内部で文字（char型）を保持し、その文字を整数として解釈（ASCIIコード等に基づいた整数値）したものをgetIntegerメソッドで返します。
// また、getDoubleメソッドではその整数値をdouble型にキャストして返します。
class CharNumeric extends Numeric{
    // CharNumericでは、実際のデータはchar型で保持されます。
    private char c;

    // コンストラクタでは、char型またはint型の引数を受け取ります。
    public CharNumeric(char c){
        this.c = c;
    }

    public CharNumeric(int c){
        this.c = (char) c;
    }

    // 整数表現としては、charをintにキャストした値を返します。
    public int getInteger(){
        return this.c;
    }

    // double型表現としては、整数表現をdouble型にキャストします。
    public double getDouble(){
        return this.getInteger() + 0.0;
    }
}

class Hexadecimal extends Numeric {
    private String hexValue;

    public Hexadecimal(Stirng value) {
        this.hexValue = value;
    }

    public int hexToInt(String value){
        return Integer.ParseInt(value, 16);
    }

    public int getInteger() {
        return hexToInt(this.hexValue);
    }

    public double getDouble() {
        return hexToInt(this.hexValue) + 0.0;
    }
}

class Octadecimal extends Numeric { 
    private String OctaValue;

    public Hexadecimal(Stirng value) {
        this.OctaValue = value;
    }

    public int octToInt(String value){
        return Integer.ParseInt(value, 8);
    }

    public int getInteger() {
        return octToInt(this.OctaValue);
    }

    public double getDouble() {
        return octToInt(this.octaValue) + 0.0;
    }
}

class BigDecimalNumeric extends Numeric { 
    private String bigDecimalValue;

    public Hexadecimal(Stirng value) {
        this.bigDecimalValue = value;
    }

    public int decimalToInt(String value){
        return Integer.ParseInt(value);
    }

    public sumValue(BigDecimalNumeric bdnValue){
        return getInteger() + bdnValue.getInteger();
    }

    public int getInteger() {
        return decimelToInt(this.OctaValue);
    }

    public double getDouble() {
        return decimalToInt(this.octaValue) + 0.0;
    }
}
*/ 

// 抽象クラス１-2
/*
クラス間の継承関係は、枝分かれした木構造を形成します。
木の根となるのは、大抵の場合、汎用的な抽象クラス（abstract class）となります。
この抽象クラスから派生する具象サブクラスは、基本的な機能を拡張し、特化した形を持つことになります。
これにより、根ノードから葉ノードに向かうほど具体性が増し、逆に葉ノードから根ノードに向かうほど抽象性が高まる構造が出来上がります。


抽象クラスとは、一部または全てのメソッドが未実装のクラスのことを指し、具象クラスと対比させる形で理解するとより明確です。
具象クラス（concrete class）はその名の通り、具体的な実装を持つクラスで、全てのメソッドが具体的な振る舞いを定義しています。
例えば、Animals という抽象クラスがあるとします。このクラスは move() や die() というメソッドを定義していますが、
具体的な動作の内容は、それを継承する具象クラスにより定義されます。

Rule 1
抽象クラスは、Java のようなプログラミング言語における特別なタイプのクラスです。
この不完全なメソッドは抽象メソッドと呼ばれ、クラスの中で abstract キーワードが使用される必要があります。


Rule 2
抽象クラスから直接オブジェクトを作成することはできません。
抽象クラスのメソッドを使うには、抽象クラスを継承した別のクラスを作る必要があります。
この新しいクラスはしばしば具象クラスと呼ばれます。具象クラスには、抽象クラスの抽象メソッドに足りないコードを含める必要があります。


Rule 3
抽象クラスでは、状態を定義しデフォルト値を割り当てることができます。
さらに、状態を初期化するコンストラクタも定義できます。このコンストラクタは、サブクラスから呼び出されることが一般的です。
サブクラスがこれらの状態にアクセスできるように、状態を protected として設定することを推奨します。


Rule 4
特定の言語では、抽象メソッドを持たない抽象クラスを定義することが許可されていることがあります。
これによって、他のプログラマに、このクラスは親クラスであることを示すことができます。
言い換えれば、サブクラス化することを強制する抽象メソッドがなくても、抽象クラスとして宣言されているという事実は、
使用する前にサブクラス化されるべきであるというシグナルです。


こうすることで、コード内の特定のクラスが常に基底クラスとして使用され、
オブジェクトを直接作成するために使用されないようにすることができます。
これは良いコーディング設計の一部であり、コードの構造と構成を維持するのに役立ちます。


Rule 5
抽象クラスを継承した具象クラスで、すべての抽象メソッドのコードを実装しなかった場合、
そのクラスも抽象クラスとなり、オブジェクトを直接作成するために使用することはできません。


Rule 6
具象クラスを継承したサブクラスを作成し、その内部で抽象メソッドを定義するか、
親クラスのメソッドを抽象メソッドとして上書きすることで、サブクラスを抽象クラスにすることができます。
*/
/*
import java.text.SimpleDateFormat;
import java.util.Date;

// abstractキーワードを用いて抽象クラスを宣言します。
abstract class Shape2D{
    protected double scale = 1;
    protected String borderColor = "black";
    protected String backgroundColor = "white";
    protected Date createdTime;

    // コンストラクタ：オブジェクト生成時に現在時刻を記録します。
    public Shape2D(){
        this.createdTime = new java.util.Date();;
    }

    // ゲッターとセッター：オブジェクトのプロパティ（状態）を取得、変更します。
    public double getScale(){
        return this.scale;
    }

    public void setScale(double scale){
        this.scale = scale;
    }

    public String getBorderColor(){
        return this.borderColor;
    }

    public void setBorderColor(String color){
        this.borderColor = color;
    }

    public String getBackgroundColor(){
        return this.backgroundColor;
    }

    public void setBackgroundColor(String color){
        this.backgroundColor = color;
    }

    // オブジェクトの作成日時を取得します。
    public String getDateCreated(){
        return new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(this.createdTime);
    }

    // 抽象メソッド：サブクラスで実装を行う必要があります。
    public abstract String getDescription();
    public abstract double getArea();
    public abstract double getPerimeter();

    // toStringメソッド：オブジェクトの説明と作成日時を文字列として返します。
    public String toString(){
        return this.getDescription() + " created at " + this.getDateCreated();
    }
}

// サブクラス：Square、Rectangle、Circle。抽象クラスShape2Dから継承します。
class Square extends Shape2D{
    protected double l;

    public Square(double l){
        super();
        this.l = l;
    }

    // Shape2Dから継承した抽象メソッドを具体的に実装します。
    public String getDescription(){
        return "This is a square! It contains the length of one side, and all sides are equal.";
    }

    public double getArea(){
        return this.l*this.l;
    }

    public double getPerimeter(){
        return this.l*4;
    }
}

class Rectangle extends Shape2D{
    protected double l;
    protected double h;

    public Rectangle(double l, double h){
        super();
        this.l = l;
        this.h = h;
    }

    // Shape2Dから継承した抽象メソッドを具体的に実装します。
    public String getDescription(){
        return "This is a rectangle! It contains the length and height of a rectangle.";
    }

    public double getArea(){
        return this.l*this.h;
    }

    public double getPerimeter(){
        return 2 * (this.h + this.l);
    }
}

class Circle extends Shape2D{
    protected double r;

    public Circle(double r){
        super();
        this.r = r;
    }

    // Shape2Dから継承した抽象メソッドを具体的に実装します。
    public String getDescription(){
        return "This is a circle! It contains the radius length of the circle.";
    }

    public double getArea(){
        return Math.PI * (this.r*this.r);
    }

    public double getPerimeter(){
        return this.getCircumference();
    }

    // 円周の長さを計算します。
    public double getCircumference(){
        return 2 * Math.PI * this.r;
    }
}

// Pentagonクラスの実装はまだありません。
class Pentagon{};

class Main{
    // shapeの情報を出力するメソッド
    public static void shapePrinter(Shape2D obj){
        System.out.println(obj);
        System.out.println("More data: area- " + obj.getArea() + ", perimeter- " + obj.getPerimeter());
        System.out.println();
    }

    public static void main(String[] args){
        // Shape2Dのオブジェクトを作成します。しかし、Shape2Dは抽象クラスであるため、直接インスタンス化することはできません。
        // 代わりに、Shape2Dを継承した具体的なクラスのオブジェクトを作成し、それらをShape2D型の変数に代入します。
        // これにより、ポリモーフィズム（一つの型に対して複数の形を持たせる特性）が適用されます。
        Shape2D obj1 = new Square(4);
        Shape2D obj2 = new Rectangle(3,5);
        Shape2D obj3 = new Circle(9);

        // 各シェイプの情報を出力します。
        shapePrinter(obj1);
        shapePrinter(obj2);
        shapePrinter(obj3);
    }
}
*/