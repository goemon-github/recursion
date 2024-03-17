const net = require('net');
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})


const client = new net.Socket();
const port = 12345;
const host = '127.0.0.1';

client.connect(port, host, async function() {
    const request = await createRequest();
    console.log('Connected');
    console.log(request)
    client.write(request);
})

client.on('data', function(data) {
    data_obj = JSON.parse(data)
    console.log('Received: ' )
    console.log(data_obj)
    
    client.destroy()
})

client.on('close', function() {
    console.log('Connenction closed')
}) 


function inputMethod(){
    const selectList = ['floor', 'nroot', 'reverse', 'anagram', 'sort'];
    console.log('methodを次から決めて入力してください\n [floor, nroot, reverse, anagram, sort]')

    return new Promise(resolve => {
        readLine.question('入力してください -->', input => {

            if(selectList.includes(input)){
                resolve(input)
            }else{
                console.log('入力が正しくありません');
                resolve(inputMethod())
            }

        })    

    })
}

function inputParams(method){
    let questionText = '';
        switch (method){
            case 'floor':
                questionText = '数字を入力してください(複数不可) -->: ';
                break
            case 'nroot':
                questionText = '乗数nとxを入力してください(スペースを開けて入力) -->: ';
                break
            case 'reverse':
                questionText = '文字列を１つ入力してください --> : ';
                break
            case 'anagram':
            case 'sort':
                questionText = '文字列を２つ入力してください(次の文字はスペースを開けて入力 --> : ';
                break
        }

    return new Promise(resolve => {
        readLine.question(questionText, input => {
                if(method === 'sort'){
                    const inputArr = input.split(' ');
                    resolve(inputArr);
                }else{
                    resolve(input);
                }
        })    

    })
}

async function createRequest(){
    requestTemplate = {
        "method": '',
        "params": '',
        "params_type": '',
        "id": '',
    }
    //console.log('methodを[floor, nroot, reverse, validanagran, sort] から選んでください')
    const method = await inputMethod();
    const params =  await inputParams(method);
    readLine.close();
    requestTemplate['method'] = String(method);
    requestTemplate['params'] = params;
    requestTemplate['params_type'] = typeof(params);
    requestTemplate['id'] = 100;

    template_json = JSON.stringify(requestTemplate);
    return template_json
}
