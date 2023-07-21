public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}

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
        */

    }
}

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
    public Battery(String manufacturer, String model, double voltage, double ampHours, double weightKg, double wMm, double hMm, double dMm){
        this.manufacturer = manufacturer;
        this.model = model;
        this.voltage = voltage;
        this.ampHours = ampHours;
        this.weightKg = weightKg;
        this.dimensionMm = new double[]{wMm, hMm, dMm};
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

   public boolean isEquals(Battery battery){
        if(this.manufacturer.equals(battery.manufacturer) &&
            this.model.equals(battery.model) &&
            this.voltage == battery.voltage &&
            this.ampHours == battery.ampHours &&
            this.weightKg == battery.weightKg &&
            this.dimensionMm[0] == battery.dimensionMm[0] &&
            this.dimensionMm[1] == battery.dimensionMm[1] &&
            this.dimensionMm[2] == battery.dimensionMm[2] ) {
            return true;

            } else {
                return false;
            }
   }

    public boolean isBigger(Battery battery) {
       return this.getPowerCapacity() < battery.getPowerCapacity();
   }

   public boolean isBiggerOrEqual(Battery battery){
        return isEquals(battery) || isBigger(battery);
   }

   public boolean isSmaller(Battery battery){
        return !isBigger(battery);
   }

   public boolean isSmallerOrEqual(Battery battery){
        return !isBigger(battery) || isEquals(battery);
   }


}



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
