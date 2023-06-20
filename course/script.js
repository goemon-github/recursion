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

//　問題ー手動テスト3