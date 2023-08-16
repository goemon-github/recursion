
// HTMLファイルのToDoリストを参考にしてください。
const config = {
    parentId: "target",
    url:"https://api.recursionist.io/random-words",
}

const fetchURL = fetch(config.url);
const jsonResponce = fetchURL.then(responce => responce.json());
jsonResponce.then(data => console.log(data));

////// arrow
const fetchPromiseRanInt = fetch('https://api.recursionist.io/random-integer');

const jsonResponse = fetchPromiseRanInt.then(function(response){
    return response.json();
});

jsonResponse.then(function(data){
    console.log(data);
});

// これをメソッドチェーンとアロー関数を使って書き直します。
let serverData = fetch('https://api.recursionist.io/random-integer').then(response=>response.json()).then(function(data){
    console.log(data);
});

// もしくは以下のように書くことができます。
// let serverData = fetch('https://api.recursionist.io/random-integer').then(response=>response.json()).then(data=>console.log(data));




////// Promise
// APIからランダムな整数を取得するためのPromiseオブジェクトを作成します
const fetchPromiseRanInt = fetch('https://api.recursionist.io/random-integer');

// fetchが成功した場合、then関数が実行されます
// コールバック関数にはresponseオブジェクトが渡されます
// JavaScriptでは、関数を直接引数として渡すことができます。この場合、thenメソッドに渡された無名関数は、
// fetchPromiseRanIntの非同期操作が成功した場合に実行されるコールバック関数として機能します。
// 無名関数は、関数名を持たない関数です（詳しくは上級のラムダ関数で学習します）
const jsonResponse = fetchPromiseRanInt.then(function(response){
    // サーバからのレスポンスをJSONに変換するためのjsonメソッドを呼び出します
    // jsonメソッドもPromiseオブジェクトを返します
    return response.json();
});

console.log(jsonResponse);

// Promiseオブジェクトに自動的に渡されるデータ（解析されたJSONデータ）を処理するため、
// then関数が使用できます
// このコールバック関数の引数dataは、解析されたJSONデータを表します
jsonResponse.then(function(data){
    console.log(data);
});



/////// JSON
// name, job, age, gender
// Steve, lawyer, 30, male
// Jack, tennis player, 26, male
// Lisa, UX designer, 23, female
// この3人のデータをJSONとして表し、for-in構文を使って全員の情報をコンソールに表示しましょう。

const jsonString = `
    [
        {
            "Steve": {
            "job": "awyer",
            "age": 30,
            "gender": "male"
            }
        },
        {
            "Jack": {
            "job": "tennis player",
            "age": 26,
            "gender": "male"
            }
        },
        {
            "Lisa": {
            "job": "UX designer",
            "age": 23,
            "gender": "femle"
            }
        }
]
`;

const jsonString = `
    [{
        "name": "Steve",
        "job": "awyer",
        "age": 30,
        "gender": "male"
    },
    {
        "name": "Jack",
        "job": "tennis player",
        "age": 26,
        "gender": "male"
    },
    {
        "name": "Lisa",
        "job": "UX designer",
        "age": 23,
        "gender": "femle"
    }]
`;

const persons = JSON.parse(jsonString);
for (let person of persons) {
    for(let key in person){
        console.log(`${key}: ${person[key]}`);
    }
    console.log("-----")
}



// JSONのドキュメンテーションを読みましょう。
// https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/JSON
/*
const jsonString = `
    [{
        "model": "Tesla X",
        "brand": "Tesla",
        "price": "$100k",
        "year": 2018
    },
    {
        "model": "Civic",
        "brand": "Honda",
        "price": "$30k",
        "year": 2016
    },
    {
        "model": "Cayenne",
        "brand": "Porsche",
        "price": "$80k",
        "year": 2020
    }]
`;

const cars = JSON.parse(jsonString);

// for-of構文を使って、配列の全要素のJSONデータにアクセスを行うことができます。
// ドキュメンテーションを読むことをおすすめします。
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of
for (let car of cars) {
    console.log(car);
    console.log(car.model);
    console.log(car.brand);
    console.log(car.price);
    console.log(car.year);
}


// JSONはkeyとvalueによって構成されます。
const jsonString = `
    {
        "model": "Tesla X",
        "brand": "Tesla",
        "price": "$100k",
        "year": 2018
    }
`;

// JSON.parse()メソッドは文字列をJSONとして解析し、文字列によって記述されているJavaScriptの値やオブジェクトを構築します。
const car = JSON.parse(jsonString);

// carという変数とアクセス演算子を用いて、JSONのデータにアクセス
console.log(car.model);
console.log(car.year);
*/