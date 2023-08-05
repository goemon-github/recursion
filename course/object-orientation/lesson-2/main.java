import java.util.Date;
import java.text.SimpleDateFormat;
// Prompt: Farm Simulation
class Main{
    public static void main(String[] args){
        Cow cow = new Cow("cow", 100, 100);
        Horse horse = new Horse("horse", 1000);
        Chicken chicken = new Chicken("chicken", 100, 100);
        Farm farm = new Farm(2, 2, 2, cow.getMilk(), chicken.getEgg(), cow, horse, chicken);
        Person person1 = new Person("jon", 1500, farm);

        System.out.println(person1.printStatus());
        
    }
}

class BMI{
    private double heightM;
    private double weightKg;

    public BMI(double heightM, double weightKg){
        this.heightM = heightM;
        this.weightKg = weightKg;
    }

    public double getWeightKg(){
        return this.weightKg;
    }

    public double getValue(){
        return this.weightKg/(this.heightM*this.heightM);
    }

    public String toString(){
        return this.heightM + " meters, " + this.weightKg + "kg, BMI:" + this.getValue();
    }
}

class Animal{
    protected String species;
    protected BMI bmi;
    protected double lifeSpanDays;
    protected String biologicalSex;
    protected Date spawnTime;
    protected Date deathTime;
    protected int hungerPercent = 100;
    protected int sleepPercent = 100;

    public Animal(String species, double heightM, double weightKg, double lifeSpanDays, String biologicalSex){
        this.species = species;
        this.bmi = new BMI(heightM, weightKg);
        this.lifeSpanDays = lifeSpanDays;
        this.biologicalSex = biologicalSex;
        this.spawnTime = new java.util.Date();
    }

    public void eat(){
        if(!this.isAlive()) return;
        this.hungerPercent = 0;
    }

    public void setAsHungry(){
        if(!this.isAlive()) return;
        this.hungerPercent = 100;
    }

    public boolean isHungry(){
        return this.hungerPercent >= 70;
    }

    public void sleep(){
        if(!this.isAlive()) return;
        this.sleepPercent = 0;
    }

    public void setAsSleepy(){
        if(!this.isAlive()) return;
        this.sleepPercent = 100;
    }

    public boolean isSleepy(){
        return this.sleepPercent >= 70;
    }

    public void die(){
        this.sleepPercent = 0;
        this.hungerPercent = 0;
        this.deathTime = new java.util.Date();
    }

    public boolean isAlive(){
        return this.deathTime == null;
    }

    public void move(){
        if(!this.isAlive()) return;
        System.out.println("This animal just moved...");
    }

    public String toString(){
        return this.species + this.bmi + " lives " + this.lifeSpanDays + " days/" + "gender:" + this.biologicalSex + "." + this.status();
    }

    public String status(){
        return this.species + " status:" + " Hunger - " + this.hungerPercent + "%, " + "sleepiness:"+this.sleepPercent + "%" + ", Alive - " + this.isAlive() + ". First created at " + this.dateCreated();
    }

    public String dateCreated(){
        return new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(this.spawnTime);
    }
}

class Mammal extends Animal {
    private double furLengthCm;
    private String furType;
    private int toothCounter;
    private double bodyTemperatureC;
    private double avgBodyTemperatureC;
    private boolean mammaryGland = false;
    private boolean sweatGland = true;
    private boolean isPregnant = false;

    public Mammal(String species, double heightM, double weightKg, double lifeSpanDays, String biologicalSex,
            double furLengthCm, String furType, double avgBodyTemperatureC) {
        super(species, heightM, weightKg, lifeSpanDays, biologicalSex);
        this.furLengthCm = furLengthCm;
        this.furType = furType;
        this.mammaryGland = (biologicalSex == "female");
        this.avgBodyTemperatureC = avgBodyTemperatureC;
        this.bodyTemperatureC = this.avgBodyTemperatureC;
    }

    public void sweat() {
        if (!this.isAlive())
            return;
        if (this.sweatGland)
            System.out.print("Sweating....");
        this.bodyTemperatureC -= 0.3;
        System.out.print("Body temperature is now " + this.bodyTemperatureC + "C");
        System.out.println();
    }

    public void produceMilk() {
        if (!this.isAlive())
            return;
        if (this.isPregnant() && this.mammaryGland)
            System.out.println("Producing milk...");
        else
            System.out.println("Cannot produce milk");
        System.out.println();
    }

    public void mate(Mammal mammal) {
        if (!this.isAlive())
            return;
        if (this.species != mammal.species)
            return;
        if (this.biologicalSex == "female" && mammal.biologicalSex == "male")
            this.fertalize();
        else if (this.biologicalSex == "male" && mammal.biologicalSex == "female")
            mammal.fertalize();
    }

    public void fertalize() {
        if (!this.isAlive())
            return;
        this.isPregnant = true;
    }

    public boolean isPregnant() {
        if (!this.isAlive())
            return false;
        return this.isPregnant;
    }

    public void bite() {
        if (!this.isAlive())
            return;
        System.out.println(this.species + " bites with their single lower jaws which has"
                + (this.toothCounter == 0 ? " not" : "") + " replaced its teeth: " + (this.toothCounter > 0));
        System.out.println();
    }

    public void replaceTeeth() {
        if (!this.isAlive())
            return;
        if (this.toothCounter == 0)
            this.toothCounter++;
    }

    public void increaseBodyHeat(double celcius) {
        this.bodyTemperatureC += celcius;
    }

    public void decreaseBodyHeat(double celcius) {
        this.bodyTemperatureC -= celcius;
    }

    public void adjustBodyHeat() {
        this.bodyTemperatureC = this.avgBodyTemperatureC;
    }

    public void move() {
        if (!this.isAlive())
            return;
        System.out.println("This mammal is moving.....");
        System.out.println();
    }

    public String toString() {
        return super.toString() + this.mammalInformation();
    }

    public String mammalInformation() {
        return "This is a mammal with the following - " + "fur:" + this.furType + "/teethReplaced:"
                + (this.toothCounter > 0) + "/Pregnant:" + this.isPregnant() + "/Body Temperature:"
                + this.bodyTemperatureC;
    }

    public void eat() {
        super.eat();
        this.bite();
        System.out.println("this" + this.species + " is eating with its single lower jaw");
    }

    public String getSpecies(){
        return this.species;
    }
}

class Farm {
    private int cowCount;
    private int horseCount;
    private int chickenCount;
    private int totalMilk;
    private int totalEgg;

    private Cow cow;
    private Horse horse;
    private Chicken chicken;


    public Farm(int cowCount, int horseCount, int chickenCount, int milk, int egg, Cow cow, Horse horse, Chicken chicken) {
        this.cowCount = 0;
        this.horseCount = 0;
        this.chickenCount = 0;
        this.totalMilk = cowCount * milk;
        this.totalEgg = chickenCount * egg;
        this.cow = cow;
        this.horse = horse;
        this.chicken = chicken;
    }

    public void animalAdd(String animal, int count){
        if(!animal.equals("cow") && !animal.equals("horse") && !animal.equals("chicken")){
            System.out.println("name error");
            return;
        }
        switch (animal) {
            case "cow":
                this.cowCount += count;
                break;
            case "horse":
                this.horseCount += count;
                break;
            case "chicken":
                this.chickenCount += count;
                break;
        }
    }

    public String animalDelete(String animal, int count) {
        if(!animal.equals("cow") && !animal.equals("horse") && !animal.equals("chicken")){
            return "name error";
        }

        switch (animal) {
            case "cow":
            if (this.cowCount < count) {
                return "count over";
            } else {
                this.cowCount -= count;
            }
                break;
            case "horse":
            if (this.horseCount < count) {
                return "count over";
            } else {
                this.horseCount -= count;
            }
                break;
            case "chicken":
            if (this.chickenCount < count) {
                return "count over";
            } else {
                this.chickenCount -= count;
            }
                break;
        }

        return "delete complete";
    }

    public Object[] getAnimalData(String animal){
        switch (animal) {
            case "cow":
                return  new Object[] { this.cow, this.cowCount, this.totalMilk };
            case "horse":
                return  new Object[] {this.horse, this.horseCount};
            case "chicken":
                return  new Object[] { this.chicken, this.chickenCount, this.totalEgg };
            default:
            return null;
        }
    }

    public void setAnimalData(Cow cow) {
        this.cow = cow;
    }

    public void setAnimalData(Horse horse) {
        this.horse = horse;
    }

    public void setAnimalData(Chicken chicken) {
        this.chicken = chicken;
    }


    public void setCount(String animal, int count){
        switch(animal){
            case "cow":
            this.cowCount = count;
            break;
            case "horse":
            this.horseCount = count;
            break;
            case "chicken":
            this.chickenCount = count;
            break;
        }
    }

    public void setTotalMilk(int milk) {
        this.totalMilk = milk;
    }

    public void setTotalEgg(int egg) {
        this.totalEgg = egg;
    }

    public String printStatus(){
        return "cowCount: " + this.cowCount + "\n" + "horseCount: " + this.horseCount + "\n" + "chickenCount: " + this.chickenCount + "\n" + "totalMilk: " + this.totalMilk + "\n" + "totalEgg: " + this.totalEgg + "\n" + "cow: " + this.cow + "\n" + "horse: " + this.horse + "\n" + "chicken: " + this.chicken;
    }
}

class Person extends Mammal {

    private Farm farm;
    private Barn barn;
    private double income;

    private String name;
    private double cache;

    public Person(String name, int cache, Farm farm){
        super("human", 0, 0, 0, "male", 0, "", 0);
        this.name = name;
        this.cache = cache;
        this.farm = farm;
        this.income = 0;
        this.barn = new Barn(this.farm);
    }


    public void animalAddToFarm(String animal, int count){
        this.farm.animalAdd(animal, count);
    }

    public void sellAnimal(String animal, int count){
        int income = this.barn.sellAnimal(animal, count);
        this.income += income;
    }

    public void sellMilk(int milk){
        int income = this.barn.sellMilk(milk);
        this.income += income;
    }

    public void sellEgg(int egg){
        int income = this.barn.sellEgg(egg);
        this.income += income;
    }


    public String printStatus() {
        return "name: "  + this.name + "\n" + "cache: " + this.cache +  "\n" + "income: " + this.income + "\n" + "farm: " + this.farm.printStatus();
    }
}

class Cow extends Mammal {
    private int milk;

    public Cow(String species, int weightKg, int milk){
        super(species, 0, weightKg, 5, "male", 0, "", 0);
        this.milk = milk;
    }

    public void setMilk(int milk){
        this.milk = milk;
    }

    public int getMilk() {
        return this.milk;
    }
}

class Horse extends Mammal {
    private int speed;

    public Horse(String species, int speed) {
        super(species, 0, 100, 5, "male", 0, "", 0);
        this.speed = speed;
    }
}


class Bird extends Animal {
    public Bird(String species, double heightM, double weightKg, double lifeSpanDays, String biologicalSex) {
        super(species, heightM, weightKg, lifeSpanDays, biologicalSex);
    }
}

class Parrot extends Bird {
    public Parrot() {
        super("parrot" , 0, 0, 0, "male");
    }
}

class Chicken extends Bird {
    private int egg;

    public Chicken(String species, int weightKg, int egg) {
        super(species, 0, weightKg, 5, "male");
        this.egg = egg;
    }

    public void setEgg(int egg){
        this.egg = egg;
    }
    
    public int getEgg() {
        return this.egg;
    }
}

class Barn { 
    private final int milkValue = 100;
    private final int eggValue = 100;
    private final int cowValue = 200;
    private final int horseValue = 200;
    private final int chickenValue = 100;

    private Farm farm;

    public Barn(Farm farm) {
        this.farm = farm;
    }

    public int sellMilk(int milk){
        Object[] cow =  this.farm.getAnimalData("cow");
        int currentTotalMilk = (int) cow[2];
         currentTotalMilk -= milk;
        this.farm.setTotalMilk(currentTotalMilk);
        return  milk * milkValue;
    }

    public int sellEgg(int egg){
        Object[] chicken = this.farm.getAnimalData("chicken");
        int currentTotalEgg = (int) chicken[2];
        currentTotalEgg -= egg;
        this.farm.setTotalEgg(currentTotalEgg);
        return egg * eggValue;
    }

    public int sellAnimal(String animal, int count){
        Object[] animalData = this.farm.getAnimalData(animal);
        int animalCount = (int) animalData[1];

        if(animal.equals("cow")){
            this.farm.setCount(animal, animalCount - count);
            return count * cowValue;
        }else if(animal.equals("chicken")) {
            this.farm.setCount(animal, animalCount - count);
            return count * chickenValue;
        } else if(animal.equals("horse")){
            this.farm.setCount(animal, animalCount - count);
            return count * horseValue;
        }else{
            return 0;
        }
        
    }
}

// 継承　
/*
import java.util.Date;
import java.text.SimpleDateFormat;


class Main{
    public static void main(String[] args){
        Mammal cow = new Mammal("Cattle", 1.8,454.5,730, "female", 1.4, "Cowhide", 32.4);
        System.out.println(cow);
        System.out.println();

        Mammal bull = new Mammal("Cattle", 1.8,454.5,730, "male", 1.1, "Cowhide", 30.8);
        System.out.println(bull);
        System.out.println();

        Animal bullAnimal = new Animal("Cattle", 1.8,454.5,730, "male");
        System.out.println(bullAnimal);
        System.out.println();

        bull.move();
        bullAnimal.move();

        bull.eat();
        bullAnimal.eat();

        // 他の哺乳類を作成し、Mammalのメソッドを使用してください。
        // 動物クラスを拡張して、昆虫（insect）や爬虫類（reptiles）のクラスを作成してください。
        // Mammalsクラスを拡張して、Lionクラスを作成してください。Mammalからの全ての状態と挙動は、Lionクラスに継承されることに注意してください。これにはMammalsが継承した状態と挙動も含まれます。

        Mammal dog = new Mammal("dog", 2, 15, 15, "male", 5, "dog", 30);
        System.out.println(dog);
        System.out.println();

        Insect dragonFly = new Insect("drafonFly", 10, 0.5, 2, "famale", 6);
        System.out.println(dragonFly);
        System.out.println();
    }
}

class BMI{
    private double heightM;
    private double weightKg;

    public BMI(double heightM, double weightKg){
        this.heightM = heightM;
        this.weightKg = weightKg;
    }

    public double getWeightKg(){
        return this.weightKg;
    }

    public double getValue(){
        return this.weightKg/(this.heightM*this.heightM);
    }

    public String toString(){
        return this.heightM + " meters, " + this.weightKg + "kg, BMI:" + this.getValue();
    }
}

class Animal{
    protected String species;
    protected BMI bmi;
    protected double lifeSpanDays;
    protected String biologicalSex;
    protected Date spawnTime;
    protected Date deathTime;
    protected int hungerPercent = 100;
    protected int sleepPercent = 100;

    public Animal(String species, double heightM, double weightKg, double lifeSpanDays, String biologicalSex){
        this.species = species;
        this.bmi = new BMI(heightM, weightKg);
        this.lifeSpanDays = lifeSpanDays;
        this.biologicalSex = biologicalSex;
        this.spawnTime = new java.util.Date();
    }

    public void eat(){
        if(!this.isAlive()) return;
        this.hungerPercent = 0;
    }

    public void setAsHungry(){
        if(!this.isAlive()) return;
        this.hungerPercent = 100;
    }

    public boolean isHungry(){
        return this.hungerPercent >= 70;
    }

    public void sleep(){
        if(!this.isAlive()) return;
        this.sleepPercent = 0;
    }

    public void setAsSleepy(){
        if(!this.isAlive()) return;
        this.sleepPercent = 100;
    }

    public boolean isSleepy(){
        return this.sleepPercent >= 70;
    }

    public void die(){
        this.sleepPercent = 0;
        this.hungerPercent = 0;
        this.deathTime = new java.util.Date();
    }

    public boolean isAlive(){
        return this.deathTime == null;
    }

    public void move(){
        if(!this.isAlive()) return;
        System.out.println("This animal just moved...");
    }

    public String toString(){
        return this.species + this.bmi + " lives " + this.lifeSpanDays + " days/" + "gender:" + this.biologicalSex + "." + this.status();
    }

    public String status(){
        return this.species + " status:" + " Hunger - " + this.hungerPercent + "%, " + "sleepiness:"+this.sleepPercent + "%" + ", Alive - " + this.isAlive() + ". First created at " + this.dateCreated();
    }

    public String dateCreated(){
        return new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(this.spawnTime);
    }
}

class Mammal extends Animal {
    private double furLengthCm;
    private String furType;
    private int toothCounter;
    private double bodyTemperatureC;
    private double avgBodyTemperatureC;
    private boolean mammaryGland = false;
    private boolean sweatGland = true;
    private boolean isPregnant = false;

    public Mammal(String species, double heightM, double weightKg, double lifeSpanDays, String biologicalSex,
            double furLengthCm, String furType, double avgBodyTemperatureC) {
        super(species, heightM, weightKg, lifeSpanDays, biologicalSex);
        this.furLengthCm = furLengthCm;
        this.furType = furType;
        this.mammaryGland = (biologicalSex == "female");
        this.avgBodyTemperatureC = avgBodyTemperatureC;
        this.bodyTemperatureC = this.avgBodyTemperatureC;
    }

    public void sweat() {
        if (!this.isAlive())
            return;
        if (this.sweatGland)
            System.out.print("Sweating....");
        this.bodyTemperatureC -= 0.3;
        System.out.print("Body temperature is now " + this.bodyTemperatureC + "C");
        System.out.println();
    }

    public void produceMilk() {
        if (!this.isAlive())
            return;
        if (this.isPregnant() && this.mammaryGland)
            System.out.println("Producing milk...");
        else
            System.out.println("Cannot produce milk");
        System.out.println();
    }

    public void mate(Mammal mammal) {
        if (!this.isAlive())
            return;
        if (this.species != mammal.species)
            return;
        if (this.biologicalSex == "female" && mammal.biologicalSex == "male")
            this.fertalize();
        else if (this.biologicalSex == "male" && mammal.biologicalSex == "female")
            mammal.fertalize();
    }

    public void fertalize() {
        if (!this.isAlive())
            return;
        this.isPregnant = true;
    }

    public boolean isPregnant() {
        if (!this.isAlive())
            return false;
        return this.isPregnant;
    }

    public void bite() {
        if (!this.isAlive())
            return;
        System.out.println(this.species + " bites with their single lower jaws which has"
                + (this.toothCounter == 0 ? " not" : "") + " replaced its teeth: " + (this.toothCounter > 0));
        System.out.println();
    }

    public void replaceTeeth() {
        if (!this.isAlive())
            return;
        if (this.toothCounter == 0)
            this.toothCounter++;
    }

    public void increaseBodyHeat(double celcius) {
        this.bodyTemperatureC += celcius;
    }

    public void decreaseBodyHeat(double celcius) {
        this.bodyTemperatureC -= celcius;
    }

    public void adjustBodyHeat() {
        this.bodyTemperatureC = this.avgBodyTemperatureC;
    }

    // 以下のメソッドでは、親クラスAnimalのメソッドをオーバーライド（上書き）しています。
    // オーバーライドとは、継承したメソッドの振る舞いをサブクラスで再定義することです。

    // moveメソッドのオーバーライド
    public void move() {
        if (!this.isAlive())
            return;
        System.out.println("This mammal is moving.....");
        System.out.println();
    }

    // toStringメソッドのオーバーライド
    // ここでは、super.toString()を使って親クラスのメソッドを呼び出し、その結果にMammalクラス固有の情報を追加しています。
    public String toString() {
        return super.toString() + this.mammalInformation();
    }

    public String mammalInformation() {
        return "This is a mammal with the following - " + "fur:" + this.furType + "/teethReplaced:"
                + (this.toothCounter > 0) + "/Pregnant:" + this.isPregnant() + "/Body Temperature:"
                + this.bodyTemperatureC;
    }

    // eatメソッドのオーバーライド
    // ここでも、super.eat()を使って親クラスのメソッドを呼び出し、その後にMammalクラス固有の行動を追加しています。
    public void eat() {
        super.eat();
        this.bite();
        System.out.println("this" + this.species + " is eating with its single lower jaw");
    }
}

class Insect extends Animal {
    private int legCount;

    public Insect(String species, double heightM, double weightKg, double lifeSpanDays, String biologicalSex, int legCount) {
        super(species, heightM, weightKg, lifeSpanDays, biologicalSex);
        this.legCount = legCount;
    }
}
*/


/*
import java.util.Date;
import java.text.SimpleDateFormat;

class Main {
    public static void main(String[] args) {
        // 新しいMammalオブジェクト、ここでは"cow"を作成します。
        Mammal cow = new Mammal("Cattle", 1.8, 454.5, 730, "female", 1.4, "Cowhide", 32.4);
        System.out.println(cow);
        System.out.println();

        // 同じく新しいMammalオブジェクト、ここでは"bull"を作成します。
        Mammal bull = new Mammal("Cattle", 1.8, 454.5, 730, "male", 1.1, "Cowhide", 30.8);
        System.out.println(bull);
        System.out.println();

        // cowオブジェクトはMammalクラスであり、親クラスであるAnimalsのeatやsleepメソッドを使用できます。
        cow.eat();
        cow.sleep();
        System.out.println(cow.status());

        // 状態を変更し、最後にdieメソッドを呼び出して、cowを"死亡"状態にします。
        cow.setAsHungry();
        cow.setAsSleepy();
        cow.die();
        System.out.println(cow.status());
        System.out.println();

        // 新しいMammalオブジェクト、ここでは"tigerF"と"tigerM"を作成します。
        Mammal tigerF = new Mammal("Tiger", 0.9, 140, 4745, "female", 1.1, "Tiger Hair", 38.5);
        System.out.println(tigerF);
        System.out.println();

        Mammal tigerM = new Mammal("Tiger", 1.1, 280, 4045, "male", 1.2, "Tiger Hair", 38.5);
        System.out.println(tigerM);
        System.out.println();

        // tigerMはMammalクラスのメソッドであるbiteとreplaceTeethを使用します。
        tigerM.bite();
        tigerM.replaceTeeth();
        tigerM.bite();

        // tigerFはMammalクラスのメソッドであるproduceMilkとmateを使用します。
        tigerF.produceMilk();
        tigerF.mate(tigerM);
        tigerF.produceMilk();

        // 他の哺乳類も同様に作成できます。
        // 練習として、それぞれの哺乳類に固有の状態を表示する新しい関数mammalInformation()を作成してみましょう。
        // 継承は非常に重要な概念なので、時間をかけて練習してください。
        System.out.println(tigerF.mammalInformation());
        System.out.println();
        System.out.println(tigerM.mammalInformation());
    }
}



// 人間や動物のBMI（Body Mass Index：肥満度を表す指数）を計算するクラスを作成します。
class BMI{
    private double heightM;
    private double weightKg;

    public BMI(double heightM, double weightKg){
        this.heightM = heightM;
        this.weightKg = weightKg;
    }

    public double getWeightKg(){
        return this.weightKg;
    }

    public double getValue(){
        return this.weightKg/(this.heightM*this.heightM);
    }

    public String toString(){
        return this.heightM + " meters, " + this.weightKg + "kg, BMI:" + this.getValue();
    }
}

// 動物クラスの実装、このクラスを継承することで具体的な動物を表現します
class Animal{
    // 動物の基本的な属性を保持するフィールド、protected修飾子は、このクラスと同じパッケージ内またはサブクラスからアクセス可能です。
    // これらがprivateの場合、Mammalは継承された状態にアクセスしているため、エラーが発生します。
    protected String species;
    protected BMI bmi;
    protected double lifeSpanDays;
    protected String biologicalSex;
    protected Date spawnTime;
    protected Date deathTime;
    protected int hungerPercent = 100;
    protected int sleepPercent = 100;

    public Animal(String species, double heightM, double weightKg, double lifeSpanDays, String biologicalSex){
        this.species = species;
        this.bmi = new BMI(heightM, weightKg);
        this.lifeSpanDays = lifeSpanDays;
        this.biologicalSex = biologicalSex;
        this.spawnTime = new java.util.Date();
    }

    public void eat(){
        if(!this.isAlive()) return;
        this.hungerPercent = 0;
    }

    public void setAsHungry(){
        if(!this.isAlive()) return;
        this.hungerPercent = 100;
    }

    public boolean isHungry(){
        return this.hungerPercent >= 70;
    }

    public void sleep(){
        if(!this.isAlive()) return;
        this.sleepPercent = 0;
    }

    public void setAsSleepy(){
        if(!this.isAlive()) return;
        this.sleepPercent = 100;
    }

    public boolean isSleepy(){
        return this.sleepPercent >= 70;
    }

    public void die(){
        this.sleepPercent = 0;
        this.hungerPercent = 0;
        this.deathTime = new java.util.Date();
    }

    public boolean isAlive(){
        return this.deathTime == null;
    }

    public String toString(){
        return this.species + this.bmi + " lives " + this.lifeSpanDays + " days/" + "gender:" + this.biologicalSex + "." + this.status();
    }

    public String status(){
        return this.species + " status:" + " Hunger - " + this.hungerPercent + "%, " + "sleepiness:"+this.sleepPercent + "%" + ", Alive - " + this.isAlive() + ". First created at " + this.dateCreated();
    }

    public String dateCreated(){
        return new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(this.spawnTime);
    }
}


// このコードは、親クラスからの継承を使用して全ての状態や動作を引き継ぐ仕組みを示しています。
// メンバ変数とメソッドの定義は全て子クラスに引き継がれます。
// ここでは具体的に、Animalsクラスを拡張する新しいMammalsクラスを作成しています。この二つのクラス間には継承関係が存在します。
// MammalクラスはAnimalクラスを継承しており、この関係はJavaでは"extends"キーワードによって表現されます。
// "Mammal extends Animal"とは、MammalがAnimalを継承することを意味します。
class Mammal extends Animal{
    // Mammal固有の状態やフィールドを定義
    private double furLengthCm;
    private String furType;
    private int toothCounter;
    private double bodyTemperatureC;
    private double avgBodyTemperatureC;
    private boolean mammaryGland = false;
    private boolean sweatGland = true;
    private boolean isPregnant = false;

    // super()は親クラスのコンストラクタを参照します。これにより、Animalクラスのメンバ変数の初期状態を適切に設定します。
    // それに加えて、Mammal特有のデータも初期化します。これらの新しいメンバ変数はここで定義されています。
    public Mammal(String species, double heightM, double weightKg, double lifeSpanDays, String biologicalSex, double furLengthCm, String furType, double avgBodyTemperatureC){

        // スーパークラスのコンストラクタを呼び出して、Animalから継承したメンバーの初期状態を設定します。
        super(species, heightM, weightKg, lifeSpanDays, biologicalSex);

        // 他のメンバ変数の設定をします。
        this.furLengthCm = furLengthCm;
        this.furType = furType;

        // 全てのメスの哺乳類は乳腺があります。
        this.mammaryGland = (biologicalSex == "female");

        this.avgBodyTemperatureC = avgBodyTemperatureC;

        // 初期体温を平均体温Cに設定します。
        this.bodyTemperatureC = this.avgBodyTemperatureC;
    }

    public String mammalInformation() {
        return "furLengthCm: " + this.furLengthCm + "\nfurType: " + this.furType + "\ntoothCounter: " + this.toothCounter
                + "\nbodyTemperatureC: " + this.bodyTemperatureC + "\navgBodyTemperatureC: " + this.avgBodyTemperatureC
                + "\nmammaryGland: " + this.mammaryGland + "\nsweatGland: " + this.sweatGland + "\nthis.isPregnant: "
                + this.isPregnant;
    }

    // MammalクラスにはAnimalクラスから継承したメソッドが全て含まれています。
    // 加えて、Mammalクラス特有のメソッドも定義できます。例えば、sweat()メソッドなどです。
    public void sweat(){
        if(!this.isAlive()) return;
        if(this.sweatGland) System.out.print("Sweating....");
        // 体温の低下
        this.bodyTemperatureC -= 0.3;
        System.out.print("Body temperature is now " + this.bodyTemperatureC + "C");
        System.out.println();
    }

    // 哺乳類の一般的な特徴も実装できます。例えば、母乳を出すためには妊娠していて、かつ乳腺が存在する必要があります。
    public void produceMilk(){
        if(!this.isAlive()) return;
        if(this.isPregnant() && this.mammaryGland) System.out.println("Producing milk...");
        else System.out.println("Cannot produce milk");
        System.out.println();
    }

    // // 哺乳類は同種の他の哺乳類と交尾します。その際に、動物が雄でパートナーが雌の場合、パートナーは受精します。
    // この動物が雌でパートナーが雄の場合、この動物は受精します。このプロセスにおいて親クラスの状態にアクセスすることに注意が必要です。
    public void mate(Mammal mammal){
        if(!this.isAlive()) return;
        if(this.species != mammal.species) return;
        if(this.biologicalSex == "female" && mammal.biologicalSex == "male") this.fertalize();
        else if(this.biologicalSex == "male" && mammal.biologicalSex == "female") mammal.fertalize();
    }

    public void fertalize(){
        if(!this.isAlive()) return;
        this.isPregnant = true;
    }

    public boolean isPregnant(){
        if(!this.isAlive()) return false;
        return this.isPregnant;
    }

    public void bite(){
        if(!this.isAlive()) return;
        System.out.println(this.species + " bites with their single lower jaws which has" +  (this.toothCounter == 0 ? " not" : "")  + " replaced its teeth: " + (this.toothCounter > 0));
        System.out.println();
    }

    // 哺乳類は一生のうちに一度しか歯を入れ替えることがないという一般的な特性を表現するreplaceTeeth()メソッドも定義しています。
    public void replaceTeeth(){
        if(!this.isAlive()) return;
        if(this.toothCounter == 0) this.toothCounter++;
    }

    // 体温の上昇
    public void increaseBodyHeat(double celcius){
        this.bodyTemperatureC+=celcius;
    }

    // 体温の低下
    public void decreaseBodyHeat(double celcius){
        this.bodyTemperatureC-=celcius;
    }

    // 動物の体温を適切な体温に設定します。
    public void adjustBodyHeat(){
        this.bodyTemperatureC = this.avgBodyTemperatureC;
    }
}
*/


/*
import java.util.Date;
import java.text.SimpleDateFormat;

class BMI{
    private double heightM;
    private double weightKg;

    // コンストラクタで身長と体重をセットします。
    public BMI(double heightM, double weightKg){
        this.heightM = heightM;
        this.weightKg = weightKg;
    }

    public double getWeightKg(){
        return this.weightKg;
    }

    public double getValue(){
        return this.weightKg/(this.heightM*this.heightM);
    }

    public String toString(){
        return this.heightM + " meters, " + this.weightKg + "kg, BMI:" + this.getValue();
    }
}

class Animal{
    private String species; // 種名
    private BMI bmi; // BMIオブジェクト
    private double lifeSpanDays; // 寿命（日数）
    private String biologicalSex; // 性別
    private Date spawnTime; // 誕生時間
    private Date deathTime; // 死亡時間

    // 新しい動物の産卵はデフォルトで100%空腹になります。
    private int hungerPercent = 100; // 空腹度
    private int sleepPercent = 100; // 睡眠度
 
    // コンストラクタで動物の初期状態を定義します。種類、身長、体重、寿命、性別を引数に取ります。
    public Animal(String species, double heightM, double weightKg, double lifeSpanDays, String biologicalSex){
        this.species = species;
        // BMIクラスのインスタンスを生成します。このように別のクラスのインスタンスをフィールドとして持つことを「コンポジション」と呼びます。
        this.bmi = new BMI(heightM, weightKg);
        this.lifeSpanDays = lifeSpanDays;
        this.biologicalSex = biologicalSex;
        this.spawnTime = new java.util.Date();
    }

    // 食事をするメソッド、食事をすると空腹度が0になります。
    public void eat(){
        if(!this.isAlive()) return;
        this.hungerPercent = 0;
    }

    // 空腹状態にするメソッド、空腹度を100にします。
    public void setAsHungry(){
        if(!this.isAlive()) return;
        this.hungerPercent = 100;
    }

    // 空腹かどうかを判定するメソッド、空腹度が70以上の場合に空腹と判断します。
    public boolean isHungry(){
        return this.hungerPercent >= 70;
    }

    // 睡眠をするメソッド、睡眠を取ると睡眠度が0になります。
    public void sleep(){
        if(!this.isAlive()) return;
        this.sleepPercent = 0;
    }

    // 睡眠不足の状態にするメソッド、睡眠度を100にします。
    public void setAsSleepy(){
        if(!this.isAlive()) return;
        this.sleepPercent = 100;
    }

    // 睡眠不足かどうかを判定するメソッド、睡眠度が70以上の場合に睡眠不足と判断します。
    public boolean isSleepy(){
        return this.sleepPercent >= 70;
    }

    // 動物を死亡させるメソッド、睡眠度と空腹度を0にし、死亡時間を現在の時刻に設定します。
    public void die(){
        this.sleepPercent = 0;
        this.hungerPercent = 0;
        this.deathTime = new java.util.Date();
    }

    // 動物が生きているかどうかを判定するメソッド、死亡時間がnullの場合に生きていると判断します。
    // eat(), sleep(), setAsHungry(), setAsSleepy(), move()などのメソッド内で最初に呼び出されます。
    // isAlive()がfalseを返す（つまり、動物がすでに死んでいる）場合、これらのメソッドは何も実行せずに終了します。
    public boolean isAlive(){
        return this.deathTime == null;
    }

    // 動物が移動するメソッド、動物が死亡していない場合にメッセージを出力します。
    public void move(){
        if(!this.isAlive()) return;
        System.out.println("This animal just moved...");
    }

    // このクラスのインスタンスの情報を文字列として返すメソッド。
    public String toString(){
        return this.species + this.bmi + " lives " + this.lifeSpanDays + " days/" + "gender:" + this.biologicalSex + "." + this.status();
    }

    // 動物の状態を文字列として返すメソッド。
    public String status(){
        return this.species + " status:" + " Hunger - " + this.hungerPercent + "%, " + "sleepiness:"+this.sleepPercent + "%" + ", Alive - " + this.isAlive() + ". First created at " + this.dateCreated();
    }

    // 動物が誕生した時間を"月/日/年 時:分:秒"のフォーマットで返すメソッド
    public String dateCreated(){
        return new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(this.spawnTime);
    }
}

class Main{
    public static void main(String[] args){
        // Animal クラスのインスタンス（具体的な動物）を生成します。この場合は「牛」です。
        Animal cow = new Animal("Cow", 1.8,454.5,730, "female");
        System.out.println(cow);

        // 牛の動作をシミュレートします。ここでは食事、睡眠、そして死を経験させています。
        cow.eat();
        cow.sleep();
        System.out.println(cow.status());

        cow.setAsHungry();
        cow.setAsSleepy();
        cow.die();
        System.out.println(cow.status());

        // さらに他の動物を作成して、Animalクラスの振る舞いを確かめてみましょう。
    }
}
*/


// 依存関係2
// 依存性注入

/*
import java.util.ArrayList;
class Player{
    private String username;
    private int health;
    private int attack;
    private int defense;
    private double height = 1.8;
    private int gold;

    public Player(String username, int health, int attack, int defense, int gold){
        this.username = username;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.height = height;
        this.gold = gold;
    }

    public String getName(){
        return this.username;
    }

    public double getHeight(){
        return this.height;
    }

    public void attack(Monster monster){
        System.out.println(this.username + " ATTACKS " + monster.getName());
        if(monster.getHeight() >= this.height *3 || this.attack <= monster.getDefense()) return;

        monster.attacked(this.attack - monster.getDefense());
    }

    public String toString(){
        return "Player " + this.username + " - HP:" + this.health +"/Atk:" + this.attack + "/Def:" + this.defense + "/Gold:" + this.gold + "/height:" + this.height + " meters";
    }
}

class Monster{
    private String monster;
    private int health;
    private int attack;
    private int defense;
    private double height = 300;

    public Monster(String monster, int health, int attack, int defense){
        this.health = health;
        this.monster = monster;
        this.attack = attack;
        this.defense = defense;
    }
    
    public String getName(){
        return this.monster;
    }

    public double getHeight(){
        return this.height;
    }

    public int getAttack(){
        return this.attack;
    }

    public int getDefense(){
        return this.defense;
    }

    public void attacked(int hp){
        this.health -= hp;
        if(this.health < 0) this.health = 0;
    }

    public String toString(){
        return this.monster + " - HP:" + this.health +"/Atk:" + this.attack + "/Def:" + this.defense + "/height:" + this.height + " meters";
    }
}

class Coordinate{
    public int x;
    public int y;
    public int z;

    public Coordinate(int x, int y, int z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public String toString(){
        return "{x:"+this.x+",y:"+this.y+",z:"+this.z+"}";
    }
}

class Field{
    private static final int MAX_X = 100000;
    private static final int MAX_Y = 40000;
    private static final int MAX_Z = 1000;

    private ArrayList<Player> creatures;
    private ArrayList<Coordinate> creatureCoordinates; 

    public Field(){
        this.creatures = new ArrayList<Player>();
        this.creatureCoordinates = new ArrayList<Coordinate>();
    }

    // randomlyAddWithDependencyメソッドは新しいプレイヤーをフィールドに追加します。
    // このメソッドの依存関係はPlayerクラスにあり、任意のプレイヤーを引数として受け取ります。
    // 依存関係を引数を通じて明示的に示すことで、他の種類の生物に切り替えるときに柔軟性が得られます。
    // 現状ではこのメソッドはPlayerオブジェクトのみを受け取りますが、このメソッドをオーバーロードしたり、あるいはPlayerとMonsterが共通のインターフェースを実装するような設計にした場合、このメソッドはMonsterオブジェクトも受け取ることが可能となります。
    public void randomlyAddWithDependency(Player creature){
        Coordinate c = new Coordinate(this.internalRanAlgorithm(1, Field.MAX_X), this.internalRanAlgorithm(1, Field.MAX_Y),this.internalRanAlgorithm(1, Field.MAX_Z));

        this.creatures.add(creature);
        this.creatureCoordinates.add(c);
    }

    private int internalRanAlgorithm(int min, int max){
        return (int) (Math.random() * (max - min) + min);
    }

    public String toString(){
        StringBuffer s = new StringBuffer(""); 
        for(int i = 0; i < this.creatures.size(); i++){
            s.append(this.creatures.get(i) + " with coordinates: " + this.creatureCoordinates.get(i) + "\n");      
        }
        return s.toString();
    }
}

class Main{
    public static void main(String[] args){
        Player p1 = new Player("Batrunner", 2000, 200, 60, 1000);
        Monster gorilla = new Monster("Gorilla", 4000, 40, 100);
        Monster vampire = new Monster("Vampire", 6000, 160, 20);

        Field world = new Field();

        // プレイヤーp1をフィールドに追加します。
        // この時点で、フィールドの依存関係はPlayerクラスにあります。
        world.randomlyAddWithDependency(p1);

        // 他のプレイヤーもフィールドに追加します。
        Player p2 = new Player("JokerMan", 2000, 300, 50, 1300);
        Player p3 = new Player("RichMonopolyLeader", 200, 20, 60, 1000000);

        world.randomlyAddWithDependency(p2);
        world.randomlyAddWithDependency(p3);

        System.out.println(world);
    }
}
*/


/*
import java.util.ArrayList;

// プレイヤークラス、ユーザー情報とアクションを管理します
class Player{
    private String username;
    private int health;
    private int attack;
    private int defense;
    private double height = 1.8;
    private int gold;

    public Player(String username, int health, int attack, int defense, int gold){
        this.username = username;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.height = height;
        this.gold = gold;
    }

    public String getName(){
        return this.username;
    }

    public double getHeight(){
        return this.height;
    }

    public void attack(Monster monster){
        System.out.println(this.username + " ATTACKS " + monster.getName());
        if(monster.getHeight() >= this.height *3 || this.attack <= monster.getDefense()) return;

        monster.attacked(this.attack - monster.getDefense());
    }

    public String toString(){
        return "Player " + this.username + " - HP:" + this.health +"/Atk:" + this.attack + "/Def:" + this.defense + "/Gold:" + this.gold + "/height:" + this.height + " meters";
    }
}

// モンスタークラス、各種モンスター情報とアクションを管理します
class Monster{
    private String monster;
    private int health;
    private int attack;
    private int defense;
    private double height = 300;

    public Monster(String monster, int health, int attack, int defense){
        this.health = health;
        this.monster = monster;
        this.attack = attack;
        this.defense = defense;
    }
    
    public String getName(){
        return this.monster;
    }

    public double getHeight(){
        return this.height;
    }

    public int getAttack(){
        return this.attack;
    }

    public int getDefense(){
        return this.defense;
    }

    public void attacked(int hp){
        this.health -= hp;
        if(this.health < 0) this.health = 0;
    }

    public String toString(){
        return this.monster + " - HP:" + this.health +"/Atk:" + this.attack + "/Def:" + this.defense + "/height:" + this.height + " meters";
    }
}

// 座標クラス、生物の座標を管理します
class Coordinate{
    public int x;
    public int y;
    public int z;

    public Coordinate(int x, int y, int z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public String toString(){
        return "{x:"+this.x+",y:"+this.y+",z:"+this.z+"}";
    }
}

// フィールドクラス、モンスターの位置情報などを管理します
class Field{
    private static final int MAX_X = 100000;
    private static final int MAX_Y = 40000;
    private static final int MAX_Z = 1000;

    // creaturesはフィールド上に存在するモンスターのリストです。
    private ArrayList<Monster> creatures;

    // creatureCoordinatesはそれぞれのモンスターの座標を保持するリストです。
    // これはcreaturesリストの各モンスターに対応しています。つまり、creaturesリストのn番目のモンスターの座標は
    // creatureCoordinatesリストのn番目の座標となります。このようにリストのインデックスを使用して、モンスターとその座標を関連付けしています。
    private ArrayList<Coordinate> creatureCoordinates; 

    public Field(){
        this.creatures = new ArrayList<Monster>();
        this.creatureCoordinates = new ArrayList<Coordinate>();
    }

    // フィールドにランダムな位置にモンスターを追加します。
    // このメソッドではモンスターのパラメータを直接受け取り、その内部で新しいモンスターオブジェクトを作成します。
    // この場合、他のクラスからはこのメソッドがどのようにモンスターオブジェクトを作成しているか、
    // また、このメソッドがMonsterクラスにどのように依存しているかがわかりません。
    public void randomlyAdd(String monster, int health, int attack, int defense){
        Monster newMonster = new Monster(monster, health, attack, defense);
        // ランダムな座標
        Coordinate c = new Coordinate(this.internalRanAlgorithm(1, Field.MAX_X), this.internalRanAlgorithm(1, Field.MAX_Y),this.internalRanAlgorithm(1, Field.MAX_Z));

        this.creatures.add(newMonster);
        this.creatureCoordinates.add(c);
    }

    // フィールドにランダムな位置にモンスターを追加します。
    // このメソッドではモンスターオブジェクト自体を直接受け取ります。
    // これによりこのメソッドがMonsterクラスに依存していることが明示的になります。
    // そしてこの依存性は外部（このメソッドを呼び出すクラスやメソッド）にも明らかとなります。
    public void randomlyAddWithDependency(Monster creature){
        Coordinate c = new Coordinate(this.internalRanAlgorithm(1, Field.MAX_X), this.internalRanAlgorithm(1, Field.MAX_Y),this.internalRanAlgorithm(1, Field.MAX_Z));

        this.creatures.add(creature);
        this.creatureCoordinates.add(c);
    }

    private int internalRanAlgorithm(int min, int max){
        return (int) (Math.random() * (max - min) + min);
    }

    public String toString(){
        //String bufferは、文字列のための不変のデータ構造です。これを使って時間計算量を補うことにします。
        StringBuffer s = new StringBuffer(""); 
        for(int i = 0; i < this.creatures.size(); i++){
            s.append(this.creatures.get(i) + " with coordinates: " + this.creatureCoordinates.get(i) + "\n");      
        }
        return s.toString();
    }
}

class Main{
    public static void main(String[] args){
        Player p1 = new Player("Batrunner", 2000, 200, 60, 1000);
        Monster gorilla = new Monster("Gorilla", 4000, 40, 100);
        Monster vampire = new Monster("Vampire", 6000, 160, 20);

        Field world = new Field();

        // このメソッドではモンスターの名前とパラメータを引数として渡すことでモンスターを追加します。
        // この場合、内部でどのようにモンスターが作成されているか、このメソッドがどのクラスに依存しているかはわかりません。
        world.randomlyAdd("Dragon", 30000, 400, 400);

        // このメソッドではモンスターオブジェクトを直接引数として渡すことでモンスターを追加します。
        // この場合、このメソッドがMonsterクラスに依存していることが明示的にわかります。
        // また、モンスターオブジェクトが既に作成されているため、このメソッド内部でどのようにモンスターが作成されるかを
        // 考慮する必要がありません。これが依存性注入の一例です。
        world.randomlyAddWithDependency(gorilla);
        world.randomlyAddWithDependency(vampire);

        System.out.println(world);
    }
}
*/

// 依存関係1
// 変更後
/*
class Player{
    private String username;
    private int health;
    private int attack;
    private int defense;
    // プレイヤーの身長はメートル単位です。
    private double height = 1.8;
    private int gold;

    public Player(String username, int health, int attack, int defense, int gold){
        this.username = username;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.height = height;
        this.gold = gold;
    }

    public double getHeight(){
        return this.height;
    }

    public void attack(Monster monster){
        System.out.println(this.username + " ATTACKS " + monster.getName());

        // 依存関係がある箇所：モンスターの身長がプレーヤーの3倍以上の場合、またはモンスターの防御力がプレーヤーの攻撃力以下の場合、攻撃は無効になります。
        // モンスターの身長がセンチメートルに変わったため、この条件は常に真となり、攻撃が常に無効になります。
        if(monster.getHeight() >= this.height *3 || this.attack <= monster.getDefense()) return;

        monster.attacked(this.attack - monster.getDefense());
    }

    public String toString(){
        return "Player " + this.username + " - HP:" + this.health +"/Atk:" + this.attack + "/Def:" + this.defense + "/Gold:" + this.gold + "/height:" + this.height + " meters";
    }
}

class Monster{
    private String monster;
    private int health;
    private int attack;
    private int defense;

    // 変更された箇所：モンスターの身長はデフォルトで300センチメートルになりました。プレーヤーがメートルで身長を計算していたため、ここでの変更が依存関係に問題を引き起こします。
    private double height = 300;

    public Monster(String monster, int health, int attack, int defense){
        this.health = health;
        this.monster = monster;
        this.attack = attack;
        this.defense = defense;
    }
    
    public String getName(){
        return this.monster;
    }

    public double getHeight(){
        return this.height;
    }

    public int getAttack(){
        return this.attack;
    }

    public int getDefense(){
        return this.defense;
    }

    public void attacked(int hp){
        this.health -= hp;
        if(this.health < 0) this.health = 0;
    }

    public String toString(){
        return this.monster + " - HP:" + this.health +"/Atk:" + this.attack + "/Def:" + this.defense + "/height:" + this.height + " centimeters"; // heightはセンチメートルです。
    }
}

class Main{
    public static void main(String[] args){
        Player p1 = new Player("Batrunner", 2000, 200, 60, 1000);
        Monster gorilla = new Monster("Gorilla", 4000, 40, 100);
        Monster vampire = new Monster("Vampire", 6000, 160, 20);

        System.out.println(p1);
        System.out.println(gorilla);
        System.out.println(vampire);

        p1.attack(gorilla); 
        // ゴリラの体力が変わらないはずです。なぜなら、プレイヤーの攻撃ロジックが依存しているモンスターの身長の単位が変わったからです。
        System.out.println(gorilla);
    }
}
*/

// 変更前-依存
// PlayerクラスはMonsterクラスに依存しています。この依存関係は主にattackメソッドに現れます。
/*
class Player{
    private String username;
    private int health;
    private int attack;
    private int defense;

    // プレイヤーの高さを1.8メートルで初期化
    private double height = 1.8;
    private int gold;

    // コンストラクタはPlayerオブジェクトを初期化します。
    public Player(String username, int health, int attack, int defense, int gold){
        this.username = username;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.height = height;
        this.gold = gold;
    }

    // getHeightメソッドはプレイヤーの高さを返します。
    public double getHeight(){
        return this.height;
    }

    // attackメソッドはMonsterクラスに依存しています。このメソッドはMonsterオブジェクトを引数に取り、そのMonsterオブジェクトに対する攻撃をシミュレートします。
    public void attack(Monster monster){
        System.out.println(this.username + " ATTACKS " + monster.getName());
        
        // Monsterの高さがPlayerの高さの3倍以上またはMonsterの防御力がPlayerの攻撃力以下の場合、攻撃は無効となります。
        if(monster.getHeight() >= this.height *3 || this.attack <= monster.getDefense()) return;

        // それ以外の場合、Playerの攻撃力からMonsterの防御力を引いた数値がMonsterのHPから引かれます。
        monster.attacked(this.attack - monster.getDefense());
    }

    // toStringメソッドはPlayerオブジェクトの現状を文字列で表現します。
    public String toString(){
        return "Player " + this.username + " - HP:" + this.health +"/Atk:" + this.attack + "/Def:" + this.defense + "/Gold:" + this.gold + "/height:" + this.height + " meters";
    }
}

// Monsterクラスは依存関係を持っていません。
class Monster{
    private String monster;
    private int health;
    private int attack;
    private int defense;
    // モンスターの高さをデフォルトで3メートルで初期化
    private double height = 3;

    // コンストラクタはMonsterオブジェクトを初期化します。
    public Monster(String monster, int health, int attack, int defense){
        this.health = health;
        this.monster = monster;
        this.attack = attack;
        this.defense = defense;
    }
    
    // getNameメソッドはモンスターの名前を返します。
    public String getName(){
        return this.monster;
    }

    // getHeightメソッドはモンスターの高さを返します。
    public double getHeight(){
        return this.height;
    }

    // getAttackメソッドはモンスターの攻撃力を返します。
    public int getAttack(){
        return this.attack;
    }

    // getDefenseメソッドはモンスターの防御力を返します。
    public int getDefense(){
        return this.defense;
    }

    // attackedメソッドは、他のオブジェクトから攻撃を受けた時のモンスターの反応をシミュレートします。
    public void attacked(int hp){
        this.health -= hp;
        if(this.health < 0) this.health = 0;
    }

    // toStringメソッドはMonsterオブジェクトの現状を文字列で表現します。
    public String toString(){
        return this.monster + " - HP:" + this.health +"/Atk:" + this.attack + "/Def:" + this.defense + "/height:" + this.height + " meters";
    }
}

// Mainクラスのmainメソッドでは、PlayerとMonsterオブジェクトを作成し、シミュレーションを実行します。
class Main{
    public static void main(String[] args){
        Player p1 = new Player("Batrunner", 2000, 200, 60, 1000);
        Monster gorilla = new Monster("Gorilla", 4000, 40, 100);
        Monster vampire = new Monster("Vampire", 6000, 160, 20);

        System.out.println(p1);
        System.out.println(gorilla);
        System.out.println(vampire);

        p1.attack(gorilla);
        System.out.println(gorilla);
    }
}
*/

// 集約とコンポジション2
// コンポジション
/*
class Wallet{
    private int bill1;
    private int bill5;
    private int bill10;
    private int bill20;
    private int bill50;
    private int bill100;

    public Wallet(){}

    public int getTotalMoney(){
        return (1*bill1) + (5*bill5) + (10*bill10) + (20*bill20) + (50*bill50) + (100*bill100);
    }

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

class Name{
    private String firstName;
    private String lastName;

    public Name(String firstName, String lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String toString(){
        return this.firstName + " " + this.lastName;
    }
}

class BMI{
    private double heightM;
    private double weightKg;

    public BMI(double heightM, double weightKg){
        this.heightM = heightM;
        this.weightKg = weightKg;
    }

    // BMIの値を計算して返すメソッド
    public double getValue(){
        return this.weightKg/(this.heightM*this.heightM);
    }

    public String toString(){
        return this.heightM + " meters, " + this.weightKg + "kg, BMI:" + this.getValue();
    }
}

// PersonはNameとBMIから構成されます。
class Person{
    // Nameオブジェクトを参照。コンポジションの一部
    private Name name;
    private int age;
    // BMIオブジェクトを参照。コンポジションの一部。
    private BMI bmi;
    private Wallet wallet;
    private Address address;

    // Personクラスのコンストラクタ。ここでNameとBMIの新しいインスタンスが作られ、コンポジションが形成されます。
    public Person(String firstName, String lastName, int age, double heightM, double weightKg, Address address){
        this.name = new Name(firstName, lastName);
        this.age = age;
        this.bmi = new BMI(heightM, weightKg);
        this.wallet = new Wallet();
        this.address = address;
    }

    public int getCash(){
        if(this.wallet == null) return 0;
        return this.wallet.getTotalMoney();
    }

    public int receiveBill(int bill, int amount){
        return this.wallet.insertBill(bill, amount);
    }

    public Wallet dropWallet(){
        Wallet w = this.wallet;
        this.wallet = null;
        return w;
    }

    public void addWallet(Wallet wallet){
        if(this.wallet == null) this.wallet = wallet;
    }

    public void printState(){
        System.out.println("Name - " + this.name);
        System.out.println("age - " + this.age);
        System.out.println("height and weight - " + this.bmi);
        System.out.println("Current Money - " + this.getCash());
        System.out.println("Address - " + this.address);
        System.out.println();
    }
}

class Address{
    private String address;
    private String city;
    private String country;

    public Address(String address, String city, String country){
        this.address = address;
        this.city = city;
        this.country = country;
    }

    public String toString(){
        return this.address + " ," + this.city + " " + this.country;
    }
}

class Main{
    public static void main(String[] args){
        Address house = new Address("Baker street 9 120", "Seatle", "United States");
        Person ryu = new Person("Ryu","Poolhopper", 40, 1.8, 90, house);
        Person tom = new Person("Tom","Poolhopper", 55, 1.75, 85, house);
        Person martha = new Person("Martha","Poolhopper", 55, 1.7, 105, house);

        ryu.printState();
        tom.printState();
        martha.printState();

        // これらのPersonオブジェクトが削除されると、BMIやNameオブジェクトも一緒に削除されることになります。
        tom = null;
        martha = null;

        // marthaやtomのBMIや名前にアクセスする方法はもうありません。tomとmarthaはコンポジションオブジェクトと一緒にガーベジコレクタされました。
    }
}
*/

//集約
/*
class Wallet{
    private int bill1;
    private int bill5;
    private int bill10;
    private int bill20;
    private int bill50;
    private int bill100;

    public Wallet(){}

    public int getTotalMoney(){
        return (1*bill1) + (5*bill5) + (10*bill10) + (20*bill20) + (50*bill50) + (100*bill100);
    }

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
    private String firstName;
    private String lastName;
    private int age;
    private double heightM;
    private double weightKg;
    private Wallet wallet;

    // ここでAddress型のフィールドが追加されました。一つのPersonと一つのAddressが関連付けられ、これが集約を示します。
    private Address address;

    // 住所(address)もPersonと集約されています。
    public Person(String firstName, String lastName, int age, double heightM, double weightKg, Address address){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.heightM = heightM;
        this.weightKg = weightKg;
        this.wallet = new Wallet();
        this.address = address;
    }

    public int getCash(){
        if(this.wallet == null) return 0;
        return this.wallet.getTotalMoney();
    }

    public int receiveBill(int bill, int amount){
        return this.wallet.insertBill(bill, amount);
    }

    public Wallet dropWallet(){
        Wallet w = this.wallet;
        this.wallet = null;
        return w;
    }

    public void addWallet(Wallet wallet){
        if(this.wallet == null) this.wallet = wallet;
    }

    public void printState(){
        System.out.println("firstname - " + this.firstName);
        System.out.println("lastname - " + this.lastName);
        System.out.println("age - " + this.age);
        System.out.println("height - " + this.heightM);
        System.out.println("weight - " + this.weightKg);
        System.out.println("Current Money - " + this.getCash());
        System.out.println("Address - " + this.address);
        System.out.println();
    }
}

class Address{
    private String address;
    private String city;
    private String country;

    public Address(String address, String city, String country){
        this.address = address;
        this.city = city;
        this.country = country;
    }

    public String toString(){
        return this.address + " ," + this.city + " " + this.country;
    }
}

class Main{
    public static void main(String[] args){

        // 一つの住所に複数のPersonが関連付けられています。これはAddressとPerson間の集約を示します。
        Address house = new Address("Baker street 9 120", "Seatle", "United States");
        Person ryu = new Person("Ryu","Poolhopper", 40, 1.80, 140, house);
        Person tom = new Person("Tom","Poolhopper", 55, 1.40, 125, house);
        Person martha = new Person("Martha","Poolhopper", 55, 1.70, 105, house);

        ryu.printState();
        tom.printState();
        martha.printState();

        tom = null;
        martha = null;

        // tomとmarthaのオブジェクトが削除されても、その住所（house）は存在し続けます。これはAddressとPerson間の集約を示します。
        System.out.println(house);
    }
}

// 集約とコンポジション１
/*
class Wallet{
    private int bill1;
    private int bill5;
    private int bill10;
    private int bill20;
    private int bill50;
    private int bill100;

    public Wallet(){}

    public int getTotalMoney(){
        return (1*bill1) + (5*bill5) + (10*bill10) + (20*bill20) + (50*bill50) + (100*bill100);
    }

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
    private String firstName;
    private String lastName;
    private int age;
    private double heightM;
    private double weightKg;

    // PersonクラスはWalletクラスを持ちます。これは集約関係を示しています
    private Wallet wallet;

    public Person(String firstName, String lastName, int age, double heightM, double weightKg){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.heightM = heightM;
        this.weightKg = weightKg;

        // Personオブジェクトが作成されるときに、新たなWalletオブジェクトも作成されます。
        // しかし、Personオブジェクトが削除された場合、Walletオブジェクトは残ることができます。これが集約を表します。
        this.wallet = new Wallet();
    }

    public int getCash(){
        if(this.wallet == null) return 0;
        return this.wallet.getTotalMoney();
    }

    public int receiveBill(int bill, int amount){
        return this.wallet.insertBill(bill, amount);
    }

    // Walletをnullに設定し、落としたwalletを返します。
    // この操作により、PersonオブジェクトからWalletオブジェクトが切り離されますが、Walletオブジェクト自体は依然として存在します。
    // PersonとWalletの間の集約関係を示しています。
    public Wallet dropWallet(){
        Wallet w = this.wallet;
        this.wallet = null;
        return w;
    }

    // Walletを追加するメソッド。
    // PersonとWalletの間の集約関係を示しています。
    public void addWallet(Wallet wallet){
        if(this.wallet == null) this.wallet = wallet;
    }

    public void printState(){
        System.out.println("firstname - " + this.firstName);
        System.out.println("lastname - " + this.lastName);
        System.out.println("age - " + this.age);
        System.out.println("height - " + this.heightM);
        System.out.println("weight - " + this.weightKg);
        System.out.println("Current Money - " + this.getCash());
        System.out.println();
    }
}

class Main{
    public static void main(String[] args){

        // 全てのPersonはWalletを持つ可能性があります。
        Person ryu = new Person("Ryu","Poolhopper", 40, 180, 1.40);
        ryu.printState();

        // ryuへの支払い
        ryu.receiveBill(20,5);
        ryu.receiveBill(100,50);
        System.out.println("Ryu money: " + ryu.getCash());

        // ryuのWalletを落とします。ryuのWalletをnullに設定し、元のWalletを返します。
        // この時点で、ryuオブジェクトとryuWalletオブジェクトの関連性が切断されますが、ryuWalletオブジェクトは存在し続けます。
        Wallet ryuWallet = ryu.dropWallet();
        System.out.println("Ryu money: " + ryu.getCash());

        // 新しいPersonを作成します。ryuは死亡します。
        System.out.println();
        System.out.println("Killing ryu and creating a new person.");
        ryu = null;
        Person tom = new Person("Tom","Poolhopper", 55, 1.70, 155);

        tom.printState();
        System.out.println("Persons and wallets have an aggregation relationship. A wallet may continue to live without a person.");
        
        tom.dropWallet();

        // 新しいPersonオブジェクトtomを作成し、落とされたryuのWalletをtomに追加します。
        // これにより、ryuWalletオブジェクトは新たにtomオブジェクトと関連付けられます。
        // これもまた、PersonとWalletの間の集約関係を示しています。
        tom.addWallet(ryuWallet);
        System.out.println("Tom money: " + tom.getCash());
    }
}
*/

// 他重度２
/*
import java.util.ArrayList;

// 従業員は1人につき、1-2社に勤務にします。
class Employee {
    // mainJobとsecondJobは従業員が勤務する会社を表します。
    // 従業員は最大で2つの会社で働くことができます（多重度は1-2）
    private Company mainJob;
    private Company secondJob;
    
    public Employee(Company mainJob, Company secondJob) {
        this.mainJob = mainJob;
        this.secondJob = secondJob;
    }
}

class Company {
    // 企業は、できるだけ多くの従業員の雇用が可能です。
    // したがって、employeesは従業員のリストを保持するための動的配列です（多重度は*）
    private ArrayList<Employee> employees;
    
    // 会社は1-10名の役員で運営されています。
    // boardMembersは、会社の役員を表します。役員の数は最大10名です（多重度は1-10）
    private BoardMember[] boardMembers = new BoardMember[10];

    // 会社は親会社に属すことも、そうでないこともあります。
    // parentCompanyは親会社を表します。親会社がない場合はnullです（多重度は0-1）
    private Company parentCompany;

    // 会社は多くの子会社を所有することがあります。
    // subsidiariesは子会社のリストを保持するための動的配列です（多重度は*）
    private ArrayList<Company> subsidiaries;
    
    public void addEmployee(Employee employee) {
        this.employees.add(employee);
    }

    public void setBoardMember(BoardMember boardMember, int position) {
        this.boardMembers[position] = boardMember;
    }

    public void setParentCompany(Company company) {
        this.parentCompany = company;
    }

    public void addSubsidiary(Company company) {
        this.subsidiaries.add(company);
    }
}

// 役員は1-5社の会社を管理します。
class BoardMember {
    // companiesManagingは、役員が管理している会社の配列です。
    // 役員は最大で5つの会社を管理できます（多重度は1-5）
    private Company[] companiesManaging = new Company[5];
    
    public void setCompany(Company company, int position) {
        this.companiesManaging[position] = company;
    }
}

class Main{
    public static void main(String[] args){
        Company company1 = new Company();
        Company company2 = new Company();

        // 社員は2つの会社で働いている
        Employee employee = new Employee(company1, company2);

        company1.addEmployee(employee);
        company2.addEmployee(employee);

        // 会社1に役員がいる
        BoardMember boardMember = new BoardMember();
        company1.setBoardMember(boardMember, 0);

        // 役員は会社2も管理している
        boardMember.setCompany(company2, 0);

        // 会社1は親会社で、会社2は子会社
        company1.addSubsidiary(company2);
        company2.setParentCompany(company1);
    }
}


 */

/*
// 関連３
public class Main {
    public static void main(String[] args) {
        // Personクラスを使って人物を作成
        Person person1 = new Person("John", "Doe", 30, 1.8, 75.0);
        Person person2 = new Person("Jane", "Smith", 25, 1.65, 60.0)

        // Walletクラスを使って財布を作成
        Wallet wallet1 = new Wallet();
        Wallet wallet2 = new Wallet();

        // お金を財布に追加
        wallet1.insertBill(100, 5);
        wallet1.insertBill(50, 10);
        wallet2.insertBill(20, 8);
        wallet2.insertBill(5, 15);

        // 人物に財布を追加
        person1.addWallet(wallet1);
        person2.addWallet(wallet2);

        // 人物の情報を表示
        System.out.println("---- person state print ----");
        person1.printState();
        printBills(person1.wallet.getCurrentBills());
        person2.printState();
        printBills(person2.wallet.getCurrentBills());

        // お金を受け取る
        int amount1 = 250;
        person1.wallet.setCurrencyType("highestFirst");
        int[] receivedBills1 = person1.getPaid(amount1);
        System.out.println("Received money by Person 1:");
        printBills(receivedBills1);
        printBills(person1.wallet.getCurrentBills());

        int amount2 = 100;
        person1.wallet.setCurrencyType("dollers");
        int[] receivedBills2 = person2.getPaid(amount2);
        System.out.println("Received money by Person 2:");
        printBills(receivedBills2);
        printBills(person2.wallet.getCurrentBills());

        // 財布の中身を確認
        System.out.println("Wallet 1 total money: " + wallet1.getTotalMoney());
        System.out.println("Wallet 2 total money: " + wallet2.getTotalMoney());


        // 新しい財布を追加
        System.out.println("new wallet person1:");
        Wallet newWallet = new Wallet();
        newWallet.insertBill(10, 5);
        person1.addWallet(newWallet);
        person1.printState(); // 新しい財布を持った状態を表示


        // 現在の所持金を表示
        person1.printState();

        // お金を使う
        System.out.println();
        System.out.println("spend Money person1:");
        int amountToSpend = 270; // 270円使う
        int[] spentBills = person1.spendMoney(amountToSpend);
        System.out.println("Spent bills:");
        for (int i = 0; i < spentBills.length; i++) {
            if (spentBills[i] > 0) {
                System.out.println(spentBills[i] + "枚 × " + (i + 1) + "円");
            }
        }

        // 使用後の所持金を表示
        person1.printState();
        printBills(person1.wallet.getCurrentBills());

        // 財布を取り出す
        System.out.println();
        System.out.println("dorop wallet person1:");
        Wallet droppedWallet = person1.dropWallet();
        System.out.println("Dropped wallet total money: " + droppedWallet.getTotalMoney());
        person1.printState(); // 財布がない状態を表示


        
    }

    // お金の枚数を表示するユーティリティメソッド
    private static void printBills(int[] bills) {
        System.out.println("100s: " + bills[5]);
        System.out.println("50s: " + bills[4]);
        System.out.println("20s: " + bills[3]);
        System.out.println("10s: " + bills[2]);
        System.out.println("5s: " + bills[1]);
        System.out.println("1s: " + bills[0]);
        System.out.println();
    }
}

class Wallet{
    private int bill1;
    private int bill5;
    private int bill10;
    private int bill20;
    private int bill50;
    private int bill100;
    private String currencyType;

    private static final String HIGHEST_FIRST = "highestFirst";
    private static final String DOLLERS =  "dollars";
    private static final String TWENTIES = "twenties";

    public Wallet() {
        this.currencyType = HIGHEST_FIRST;
        this.bill1 = 0;
        this.bill5 = 0;
        this.bill10 = 0;
        this.bill20 = 0;
        this.bill50 = 0;
        this.bill100 = 0;

    }

    public void setCurrencyType(String type) {
        this.currencyType = type;
    }

    public String getCurrencyType(){
        return this.currencyType;
    } 

    public int getTotalMoney(){
        return (1*this.bill1) + (5*this.bill5) + (10*this.bill10) + (20*this.bill20) + (50*this.bill50) + (100*this.bill100);
    }

    public int insertBill(int bill, int amount){
        switch(bill){
            case(1):
                this.bill1 += amount;
                break;
            case(5):
                this.bill5 += amount;
                break;
            case(10):
                this.bill10 += amount;
                break;
            case(20):
                this.bill20 += amount;
                break;
            case(50):
                this.bill50 += amount;
                break;
            case(100):
                this.bill100 += amount;
                break;
            default:
                return 0;
        }

        return bill*amount;
    }

    public int[] getCurrentBills(){
        int[] currentBills = new int[6];
        currentBills[0] = this.bill1;
        currentBills[1] = this.bill5;
        currentBills[2] = this.bill10;
        currentBills[3] = this.bill20;
        currentBills[4] = this.bill50;
        currentBills[5] = this.bill100;
        return currentBills;
    }
}

class Person{
    public String firstName;
    public String lastName;
    public int age;
    public double heightM;
    public double weightKg;
    public Wallet wallet;

    public Person(String firstName, String lastName, int age, double heightM, double weightKg){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.heightM = heightM;
        this.weightKg = weightKg;
        this.wallet = new Wallet();
    }

    public int[] getPaid(int amount){
        int[] bills = new int[6]; 
        if(this.wallet == null){
            return bills;
        }
        String currencyType = this.wallet.getCurrencyType();

        switch(currencyType){
            case "highestFirst":
                while(amount >= 100){
                    amount -= 100;
                    bills[5]++;
                }
                while(amount >= 50){
                    amount -= 50;
                    bills[4]++;
                }
                while(amount >= 20){
                    amount -= 20;
                    bills[3]++;
                }
                while(amount >= 10){
                    amount -= 10;
                    bills[2]++;
                }
                while(amount >= 5){
                    amount -= 5;
                    bills[1]++;
                }
                while(amount >= 1){
                    amount -= 1;
                    bills[0]++;
                }
                break;

            case "dollars":
                bills[0] += amount;
                break;

            case "twenties":
                while(amount >= 20){
                    amount -= 20;
                    bills[3]++;
                }
                while(amount >= 10){
                    amount -= 10;
                    bills[2]++;
                }
                while(amount >= 5){
                    amount -= 5;
                    bills[1]++;
                }
                while(amount >= 1){
                    amount -= 1;
                    bills[0]++;
                }
                break;
            
        }
        return bills;
    }

    public int[] spendMoney(int amount){
        int[] bills = new int[6];
        if(this.wallet == null){
            return bills;
        }

        int totalMoney = this.wallet.getTotalMoney();
        if(amount > totalMoney){
            return bills;
        }

        String currencyType = this.wallet.getCurrencyType();
        switch(currencyType){
            case "highestFirst":
                if(amount >= 100){
                    bills[5] = amount / 100;
                    amount = amount % 100;
                }
                if(amount >= 50){
                    bills[4] = amount / 50;
                    amount = amount % 50;
                }
                if(amount >= 20){
                    bills[3] = amount / 20;
                    amount = amount % 20;
                }
                if(amount >= 10){
                    bills[2] = amount / 10;
                    amount = amount % 10;
                }
                if(amount >= 5){
                    bills[1] = amount / 5;
                    amount = amount % 5;
                }
                if(amount >= 1){
                    bills[0] = amount / 1;
                    amount = amount % 1;
                }
                break;
            case "dollars":
                bills[0] = amount / 1;
                break;
            case "twenties":
                if(amount >= 20){
                    bills[3] = amount / 20;
                    amount = amount % 20;
                }
                if(amount >= 10){
                    bills[2] = amount / 10;
                    amount = amount % 10;
                }
                if(amount >= 5){
                    bills[1] = amount / 5;
                    amount = amount % 5;
                }
                if(amount >= 1){
                    bills[1] = amount / 1;
                    amount = amount % 1;
                }
                break;
        }
        return bills;
    }    

    public int getCash(){
        if(this.wallet == null) return 0;
        return this.wallet.getTotalMoney();
    }

    public void addWallet(Wallet wallet){
        this.wallet = wallet;
    }

    public Wallet dropWallet(){
        Wallet oldWallet = this.wallet;
        this.wallet = null;
        return oldWallet;
    }

    public void printState(){
        System.out.println("firstname - " + this.firstName);
        System.out.println("lastname - " + this.lastName);
        System.out.println("age - " + this.age);
        System.out.println("height - " + this.heightM);
        System.out.println("weight - " + this.weightKg);
        System.out.println("Current Money - " + this.getCash());
        System.out.println();
    }

}

 */