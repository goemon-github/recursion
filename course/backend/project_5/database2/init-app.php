<?php

spl_autoload_extensions(".php");
spl_autoload_register();

use Helpers\Settings;
use Database\MySQLWrapper;



// getoptはCLIで渡された指定された引数のオプションです。値のペアの配列を返します。
// 値が渡されない場合 (例：--myArg=123、値は123) は、値はfalseになります。issetを使用してそれが存在するかどうかをチェックします。
// short_optionsは、短いオプションの文字の配列を表す文字列を取り入れます。例えばabcは -a -b -c のオプションをチェックします。ロングオプションはオプションの完全な名前です。

$opts = getopt('', ['migrate']);
if(isset($opts['migrate'])){
    print('Database miigration enabled.');
    // includeはPHPファイルをインクルードして実行します
    include('Database/setup.php');
    print('Database migration ended.');
}

$mysqli = new MySQLWrapper();


// https://www.php.net/manual/en/mysqli.get-charset.php
$charset = $mysqli->get_charset();

if($charset === null) throw new Exception('Charset could be read');

// データベースの文字セット、照合順序、統計情報について取得します。
printf(
    "%s's charset: %s.%s",
    Settings::env('DATABASE_NAME'),
    $charset->charset,
    PHP_EOL
);

printf(
    "collation: %s.%s",
    $charset->collation,
    PHP_EOL
);

// 接続を閉じるには、closeメソッドを使用します。
$mysqli->close();
