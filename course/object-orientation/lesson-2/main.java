public class Main {
    public static void main(String[] args) {
        // Personクラスを使って人物を作成
        Person person1 = new Person("John", "Doe", 30, 1.8, 75.0);
        Person person2 = new Person("Jane", "Smith", 25, 1.65, 60.0);

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
