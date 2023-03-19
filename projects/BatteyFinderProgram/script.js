const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

let brandSelect = document.getElementById('brand-select');
let modelSelect = document.getElementById('model-select');
let chooceSelect = document.getElementById('choose-select');
let acPowerInput = document.getElementById('wattage');

// ブランドのリストを作成
let brandArr = [];
// init時にoptionタグでラッパーしたモデルの情報をブランドごとに格納
let modelDict = {};
// 現在指定されているアクセリー電力を格納
let curretAcPower = 0;
// カメラから指定されているカメラの情報を連想配列で格納
let currentCamera = null;

/*
    描写
*/
function renderBrand(brandName){
    let option = document.createElement('option');
    option.setAttribute('value', brandName);
    option.innerHTML = brandName;

    return option;
};

function renderModel(renderHtml){
    modelSelect.append(renderHtml);
};

function renderEstimate(batteryName, estimate){
    let batteryDiv = document.createElement('div');
    batteryDiv.classList.add('bg-light', 'd-flex', 'justify-content-between', 'px-3', 'border');
    let batteryNameP = document.createElement('p');
    batteryNameP.classList.add('font-weight-bold', 'my-1');
    let estimateP = document.createElement('p');
    estimateP.classList.add('my-1');
    

    batteryNameP.innerText = batteryName;
    estimateP.innerText = `Estimate ${estimate} hours`;

    batteryDiv.append(batteryNameP, estimateP);
    chooceSelect.append(batteryDiv);
}

/*
    選択項目が変更されたら発火し変更内容を元に再描写
*/
function brandOnChanged() {
    brandSelect.addEventListener('change', (e) =>  {
        modelSelect.innerHTML = '';
        for (op of modelDict[e.target.value]) {
            renderModel(op);
            createChooseYourBattery(curretAcPower);
        };

    })
};

function modelOnChanged() {
    modelSelect.addEventListener('change', () =>  {
        createChooseYourBattery(curretAcPower);
    });
}

function acPowerOnChanged() {
    acPowerInput.addEventListener('change', (e) => {
        curretAcPower = e.target.value;
        createChooseYourBattery(curretAcPower);
    });

}

/*
    タグの生成や、生成に必要な処理を行う
*/

// modelDictに格納するために。renderModelとは分けておく
function createModelOption(modelName) {
    let option = document.createElement('option');
    option.setAttribute('value', modelName);
    option.innerHTML = modelName;

    return option;
}

// 持続時間を求め、描写する　
function createChooseYourBattery(curretAcPower) {
    index = 0; 
    // 選択項目と一致した場合、カメラの情報をcurrentCameraに入れる
    while (index < camera.length) {
        if (camera[index].brand === brandSelect.value && camera[index].model === modelSelect.value) {
            currentCamera = camera[index];
            break;
        }
        index++;
    }

    chooceSelect.innerHTML = '';
    // 持続時間を求めるために、バッテリーの配列を順に計算し、返り値があれば描写する
    for (i in battery) {
        let batteryLifeResult = batteryLife(battery[i], currentCamera, curretAcPower);
        if (batteryLifeResult) {
            renderEstimate(batteryLifeResult.batteryName, batteryLifeResult.duration);
        }
    }
}

// 電池の持続時間を計算する
function batteryLife(batt, cam, acPower) {
    const digit = 1;
    acPower = parseInt(acPower);
    cam.powerConsumptionWh = parseInt(cam.powerConsumptionWh);
    let wh = 0;
    let endVoltage = 0;
    let batteryLife = {
        'batteryName': null,
        'duration': 0 
    }
    /*
     消費電力  14.4 * 14 = 201.6
     w/hor 　14.4 * 9.9 = 142.56
     終止電圧　10 * 14 = 140  終始電力以上は使用できない
     持続時間 142.56 / (35.5 * acPower) = 4.0 (カメラの消費電力+ アクセサリーの電力)
     w/horを求めて、停止電力を求めて、持続時間を求めて、
     カメラとアクセサリーの消費電力が終止電力を超えない場合は計算結果を返す
    */

    /* 例
    "batteryName": "IOP-E140",
    "capacityAh" 容量: 9.9,
    "voltage" 電圧: 14.4,
    "maxDraw" 最大放電電流: 14,
    "endVoltage" 終止電圧: 10,


    "brand": "Cakon",
    "model": "ABC 3000M",
    "powerConsumptionWh" 消費電力: 35.5,
    */

    // whを求める
    wh = (batt.voltage * batt.capacityAh).toFixed(digit);
    // 持続時間を求める
    batteryLife.duration = (wh / (cam.powerConsumptionWh + acPower)).toFixed(digit);
    // 終止電力を求める
    endVoltage = (batt.maxDraw * batt.endVoltage).toFixed(digit);
    // カメラとアクセサリーの消費電力が終止電力を超えない場合は計算結果を返す 
    if (endVoltage > (cam.powerConsumptionWh + acPower)) {
        batteryLife.batteryName = batt.batteryName;
        return batteryLife;
    };
};



// 読み込み時にブランドの重複処理と、modelDictでブランドとモデルの紐付けを行い、描写する
function setUp() {
    brandSelect.innerHTML = '';
    let index = 1;
    for (i in camera) {
        if (!brandArr.includes(camera[i].brand)) {
            // ブランドのリストとモデル用リストを作成し、Selectに描写
            const brand = camera[i].brand;
            brandArr.push(brand);
            modelDict[brand.toString()] = [];
            let brandName = renderBrand(brand);
            brandSelect.append(brandName);
        }
    }; 

    for (i in camera) {
        // modelのOptionタグをmodalDictに入れ各ブランドと紐づいたOptionリストを作成
        let model = createModelOption(camera[i].model);
        modelDict[camera[i].brand].push(model);
        if (brandSelect.value === camera[i].brand) renderModel(model);
    }

    curretAcPower = parseInt(acPowerInput.value);
    createChooseYourBattery(curretAcPower);
}

function main(){
    setUp();
    brandOnChanged();
    modelOnChanged();
    acPowerOnChanged();
};

main();