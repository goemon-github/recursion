// 上級ーソフトウェアテストー汎用テスト関数1

/*
// 順序を考慮するラムダ
let orderedArrayEquality = (a,b) =>{
    if (a.length != b.length) return false;
    for(let i = 0; i < a.length; i++){
        if(a[i] != b[i]) return false;
    }    
    return true;
};    

// 順序を考慮しないラムダ
let unorderedArrayEquality = (a,b) =>{
    if(a.length != b.length) return false;
    let aHash = {};
    let bHash = {};

    // カウントアルゴリズムを適用します。
    for(let i = 0; i < a.length; i++){
        if(aHash[a[i]] != undefined) aHash[a[i]] += 1;
        else aHash[a[i]] = 1;

        if(bHash[b[i]] != undefined) bHash[b[i]] += 1;
        else bHash[b[i]] = 1;
    }    

    for(let key in aHash){
        if(bHash[key] == undefined) return false;
        if(aHash[key] != bHash[key]) return false;
    }
    return true;
}    
*/

// 1
/*
function equalAssertion(a,b, callback = null){
    let equality = callback == null? a == b: callback(a, b);
    console.log(`Comparing ${a} and ${b}...` + (equality ? "They are equal." : "Error, they are NOT equal."));
    // 等しくない場合はクラッシュします。
    console.assert(equality);
    return true;
}

// ここから開発してください。
function reverseArr(arr){
    let middle = Math.floor(arr.length/2);
    for(let i = 0; i < middle; i++){
        [arr[i], arr[arr.length-1-i]] = [arr[arr.length-1-i], arr[i]];
    }
}

let reverseArrayEqality = (a, b) => {
    if(a.length != b.length) return false;
    for(let i = 0; i < a.length; i++){
        if(a[i] != b[a.length - 1-i]) return false;
    }

    return true;
}

let arr = ['happy', 'new', 'year', 'neko','inu'];
let copyArr = [...arr];
reverseArr(copyArr);
equalAssertion(copyArr, arr, reverseArrayEqality);
*/


// 2
/*
function equalAssertion(a,b, callback = null){
    let equality = callback == null? a == b: callback(a, b);
    console.log(`Comparing ${a} and ${b}...` + (equality ? "They are equal." : "Error, they are NOT equal."));
    // 等しくない場合はクラッシュします。
    console.assert(equality);
    return true;
}

// ここから開発してください。
function createSetList(mail){
        let arrUnique = Array.from(new Set(mail));
        return arrUnique;
}

function unorderedArrayEqality(a, b) {
    
    let aHash = {};
    let bHash = {};

    for(let i  = 0; i < a.length; i++){
        if(aHash[a[i]] != undefined) aHash[a[i]] += 1;
        else aHash[a[i]] = 1;

        if(bHash[b[i]] != undefined) bHash[b[i]] += 1;
        else aHash[b[i]] = 1;
    }

    for(let key in aHash){
        if(bHash[key] != undefined) return false;
        
    }

    return true;
};

let emailArr = ["aaa@bbb.com", "bbb@ccc.com", "ccc@ddd.com", "aaa@bbb.com", "ccc@bbb.com"];
let copyArr = [...emailArr];
let setArr = createSetList(emailArr);
equalAssertion(setArr, copyArr, unorderedArrayEqality);
*/


//　問題ー手動テスト1

/*
// まずは、問題で指定されているfibonacciのテストを作成してみましょう。
// 問題文中で指定がない場合、テスト対象の関数は修正する必要はありません。
function fibonacci(n){
    let cache = Array(n+1).fill(0);
    cache[0] = 0;
    cache[1] = 1;

    for(let i = 2; i <= n; i++){
        cache[i] = cache[i-1] + cache[i-2];
    }

    return cache[n];
}

// テストで使用する関数です。変更の必要はありません。
function unitTestCheck(predicate){
    if(predicate){
        console.log("The test passed!!");
    }
    else{
        console.log("ERROR! The test failed!!");
    }
}

// unitTests()が実行され、テストの結果がチェックされます。
function unitTests(){
    // ① 問題文にある一つ目のテストケースを記述しましょう。
    unitTestCheck(fibonacci(3) === 2);

    // ② 上記を参考に他のテストケースを作成しましょう。
    unitTestCheck(fibonacci(4) === 3);
    unitTestCheck(fibonacci(6) === 8);
    unitTestCheck(fibonacci(9) === 34);
    unitTestCheck(fibonacci(10) === 55);
    // テストケースを記述することが目的の問題や、
    // 指定したテストケースが全て合格するように関数を修正することが目的の問題もあります。

    // ④ テストボタンを押して正しく出力されているかを確認しましょう。
}
*/


//　問題ー手動テスト2
/*
function getStudentGPA(points){
    let output = '';
    if(points < 0) output = 'F';
    if(points >= 0 && points < 50) output = 'D';
    if(points >= 50 && points <= 70) output = 'C';
    if(points >= 70 && points <= 80) output = 'B';
    if(points > 80) output = 'A';

    return output;
}

function unitTestCheck(predicate){
    if(predicate){
        console.log("The test passed!!");
    }
    else{
        console.log("ERROR! The test failed!!");
    }
}

function unitTests(){
    // ここから書いてください
    console.assert(unitTestCheck(getStudentGPA(-1) === 'F'));
    console.assert(unitTestCheck(getStudentGPA(0) === 'D'));
    console.assert(unitTestCheck(getStudentGPA(50) === 'C'));
    console.assert(unitTestCheck(getStudentGPA(69) === 'C'));
    console.assert(unitTestCheck(getStudentGPA(80) === 'A'));    
}
*/


//　問題ー手動テスト3
/*
function assertPredicate(predicate){
    if(predicate) {
        console.log("Passed the assertion test.");
    }
    else {
        console.assert(predicate);
        throw new Error('Assertion Failed.');
    }
}
   
function applyDiscount(originalPrice, discount){
    // assertPredicate関数を使って、意図した値を返すかチェックし、修正しましょう
    let discountedPrice = originalPrice * discount < 1 && discount > 0 ? (1.0 - discount) : 1.0;

    return discountedPrice;
}

function assertionTests(){
    // テストケースを記述しましょう

    assertPredicate(applyDiscount(30, 0.5));
    assertPredicate(applyDiscount(50, 0.2)); 
    assertPredicate(applyDiscount(70, 1.0));
    assertPredicate(applyDiscount(70, 0.0));
    assertPredicate(applyDiscount(90, 2.0));
    assertPredicate(applyDiscount(30, -3.0));
    
}
*/

//　問題ー手動テスト5
// エラトステネスの篩を実装したがエラーがある可能性があるのでテストを行い、修正する
/*
function assertPredicate(predicate){
    if(predicate) {
        console.log("Passed the assertion test.");
    }
    else {
        console.assert(predicate);
        throw new Error('Assertion Failed.');
    }
}

function primesUpToNCount(n) {
    let cache = [];
    for(let i = 0; i < n; i++) cache[i] = true;
    // < を <=
    for(let i = 2; i <= Math.floor(Math.sqrt(n)); i++){
        if(!cache[i]) continue;
        let p = 2;
        while(i*p < n){
            cache[i*p] = false;
            // i から　p
            p++;
        }
    }

    let primeCount = 0;
    for(let i = 2; i < cache.length; i++){
        if(cache[i]) primeCount += 1;
    }

    return primeCount;
}

//  素数判定を行い、素数の数を数える
function primesUpToNCountBF(n) {
    let counter = 0;
    for(let i = 1; i < n; i++) {
        if(isPrime(i)) counter++;
    }
    return counter;
}

function isPrime(n) {
    if(n < 2) return false;
    for(let i = 2; i < n; i++) {
        if(n % i == 0) return false;
    }
    return true;
}

function assertionTests(){
    assertPredicate(primesUpToNCount(2) === primesUpToNCountBF(2));
    assertPredicate(primesUpToNCount(3) ===  primesUpToNCountBF(3));
    assertPredicate(primesUpToNCount(5) ===  primesUpToNCountBF(5));
    assertPredicate(primesUpToNCount(10) ===  primesUpToNCountBF(10));
    assertPredicate(primesUpToNCount(19) === primesUpToNCountBF(19));
    assertPredicate(primesUpToNCount(25) === primesUpToNCountBF(25));
    assertPredicate(primesUpToNCount(1000) === primesUpToNCountBF(1000));

}


*/

// 動的型付け言語の静的化

/*

class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class Queue{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    peekFront(){
        if(this.head == null) return null;
        return this.head.data;
    }

    enqueue(data){
        if(this.head == null){
            this.head = new Node(data);
        }
        else if(this.tail == null){
            this.tail = new Node(data);
            this.head.next = this.tail;
        }
        else{
            this.tail.next = new Node(data);
            this.tail = this.tail.next;
        }
    }

    dequeue(){
        if(this.head == null) return null;
        let temp = this.head;

        if(this.head.next == null){
            this.head = null;
            this.tail = null;
        }
        else this.head = this.head.next;

        return temp.data;
    }
}

class TaskQueue{
    constructor(){
        this.queue = new Queue();
    }

    push(callback){
        this.queue.enqueue(callback);
    };

    taskExists(){
        return this.queue.peekFront() !== null;
    }

    //run メソッドは、2 つの文字列を配列を入力として受け取り、Queue 内のラムダ関数を実行します。
    //配列の要素の数が不正確であったり、空であったりすると、エラーが投げられます。
    //このメソッドは Queue の最初の要素をデキューし、arr の 1 番目と 2 番目の要素を引数として渡して実行します。
    //エラーが発生した場合は、エラーを捕捉してログに記録し、空文字列を返します。

   run(arr){
    try{
        if(arr.length !== 2) throw new Error('arr.length not 2');
        let callback = this.queue.dequeue();
        return callback(arr[0], arr[1]);
        //return this.queue.dequeue()(arr[0], arr[1]);
        
    }catch(err){
        console.log(err);
        return '';
    }
    
}
    //insert メソッドは、
    //ラムダ関数を入力として受け取り、Queue への追加するために使用されます。
    //まず入力が 2 つの文字列を入力として受け取り、文字列を返すラムダ関数かどうかチェックします。
    //入力が関数でない場合は、「Callback is not a function」というメッセージとともにエラーがスローされます。
    //次に、このメソッドは、2 つのサンプル文字列 "str1" と "str2" を渡して、入力された関数をテストします。
    //もし、関数が文字列を返さなければ、アサーションエラーを投げます。
    //最後に、このメソッドは
    //stringBifunctionForceDecorator() 関数を使って、
    //入力のラムダ関数を装飾し、入力として文字列のみを受け取ることを強制します。
    //そして、装飾されたラムダ関数を Queue に挿入します。

    insert(lamda){
        try {
            if (typeof (lamda) !== "function") throw new Error('Callback is not a function');
            
            let str1 = 'test1';
            let str2 = 'test2';
            console.assert(typeof lamda(str1, str2) == 'string');
        } catch (err) {
            console.log(err);
        }

        this.queue.enqueue(stringBifunctionForceDecorator(lamda));
    }
}

//stringBifunctionForceDecorator は、
//引数としてコールバックを受け取ります。
//この関数は、2 つの文字列を引数として受け取る新しい関数を返します。
//この新しい関数は、入力が文字列であるかどうかをチェックし、
//文字列でない場合はエラーを投げます。
//入力が文字列であれば、入力を引数とするコールバック関数の結果を返します。

function stringBifunctionForceDecorator(callback){
return function(str1, str2){
        if(typeof str1 !== "string" && typeof str2 !== "string") throw new Error(`WrongDataTypeArray, Not a string!`); 
        return callback(str1, str2);
    }

}

let scheduler = new TaskQueue();

// 前回
scheduler.insert(function(str1, str2){ return str1 + str2 });
scheduler.insert(function(str1, str2){ return str1.toUpperCase() + str2});
scheduler.insert(function(str1, str2){ return str1[0] + "." + str2[0] });

scheduler.push(()=>console.log("Running the first function!!!"));
scheduler.push(()=>console.log("Running the second function~~~"));
scheduler.push(()=>console.log("Running the third function>>>"));
scheduler.push(()=>console.log("Running the fourth function<<<"));

while(scheduler.taskExists()) scheduler.run();

// 今回
scheduler.insert(function(str1, str2){ return str1 + str2 });
scheduler.insert(function(str1, str2){ return str1.toUpperCase() + str2});
scheduler.insert(function(str1, str2){ return str1[0] + "." + str2[0] });
// scheduler.insert("not a function"); // エラー ラムダでない
// scheduler.insert(function(str1, str2){return str1.length + str2.length}); // エラー 文字列を返さないラムダ


// run()に引数を渡します。
console.log(scheduler.run(["hello", "world"])); // 成功する例
console.log(scheduler.run(["hello", "world"])); // 成功する例
console.log(scheduler.run(["hello", "world"])); // 成功する例
// console.log(scheduler.run(["nice", "world", "hi"]));//　エラー'InaccurateArguments'
// console.log(scheduler.run([])); // エラー'EmptyArray'
// console.log(scheduler.run([3, "world"]));//　エラー'WrongDataTypeArray'

*/