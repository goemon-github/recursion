
class Main{
    public static void main(String[] args){
        RGB24 color1 = new RGB24(0, 145, 255);
        RGB24 color2 = new RGB24(255, 153, 204);
        RGB24 color3 = new RGB24(153, 255, 51);

        System.out.println(color1.getHex() + " <-> " + color1.getBits() + ". Color: " + color1.getColorShade());
        System.out.println(color2.getHex() + " <-> " + color2.getBits() + ". Color: " + color2.getColorShade());
        System.out.println(color3.getHex() + " <-> " + color3.getBits() + ". Color: " + color3.getColorShade());

        RGB24 gray = new RGB24(123, 123, 123);
        System.out.println(gray.getHex() + " <-> " + gray.getBits() + ". Color " + gray.getColorShade());
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
        if(this.red == this.green && this.green == this.blue) return "grayscale";
        String greatestString = "red";
        int greatest = this.red;

        if(greatest <= this.green){
            greatestString = "green";
            greatest = this.green;
        }

        if(greatest <= this.blue){
            greatestString = "blue";
            greatest = this.blue;
        }

        return greatestString;
    }
    
}
