
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
