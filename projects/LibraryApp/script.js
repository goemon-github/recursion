const settingUrl = {
    url: "https://api.recursionist.io/builder/computers?type=",
    parameters: {
        cpu: "cpu",
        gpu: "gpu",
        ram: "ram",
        hdd: "hdd",
        ssd: "ssd",
    }
}

let config = {
    cpu: {
        brand: "#cpuBrand",
        model: "#cpuModel",
    },
    gpu: {
        brand: "#gpuBrand",
        model: "#gpuModel",
    },
    ram: {
        num:"#ramMany",
        brand: "#ramBrand",
        model: "#ramModel",
    },
    storage: {
        type: "#storageType",
        size: "#storageSize",
        brand: "#storageBrand",
        model: "#storageModel",
    },
    parent: document.getElementById("target")
};

class PC{
    constructor() {
        this.cpuBrand = null;
        this.cpuModel = null;
        this.cpuBenchmark = null;
        this.gpuBrand = null;
        this.gpuModel = null;
        this.gpuBenchmark = null;
        this.ramBrand = null;
        this.ramModel = null;
        this.ramBenchmark = null;
        this.storageType = null;
        this.storageSize = null;
        this.storageBrand = null;
        this.storageModel = null;
        this.storageBenchmark = null;
    }

    addBrandData(parts, brand) {
        switch (parts) {
            case "cpu":
                this.cpuBrand = brand;
                break;
            case "gpu":
                this.gpuBrand = brand;
                break;
            case "ram":
                this.ramBrand = brand;
                break;
            case "hdd":
                this.storageBrand = brand;
                break;
            case "ssd":
                this.storageBrand = brand;
                break;
        }
    }

    addModelData(parts, model) {
        switch (parts) {
            case "cpu":
                this.cpuModel = model;
                break;
            case "gpu":
                this.gpuModel = model;
                break;
            case "ram":
                this.ramModel = model;
                break;
            case "hdd":
                this.storageModel = model;
                break;
            case "ssd":
                this.storageModel = model;
                break;
        }
    }

    addStorageData(parts, size) {
        this.storageType = parts;
        this.storageSize = size;
    }

    addBenchmarkData(parts, benchmark) {
        switch (parts) {
            case "cpu":
                this.cpuBenchmark = benchmark;
                break;
            case "gpu":
                this.gpuBenchmark = benchmark;
                break;
            case "ram":
                this.ramBenchmark = benchmark;
                break;
            case "hdd":
                this.storageBenchmark = benchmark;
                break;
            case "ssd":
                this.storageBenchmark = benchmark;
                break;
        }
    }

    getGameBenchMarkScore() {
        let cpuScore = parseInt(this.cpuBenchmark * 0.25);
        let gpuScore = parseInt(this.gpuBenchmark * 0.6);
        let ramScore = parseInt(this.ramBenchmark * 0.125);
        let storageScore = parseInt(this.storageBenchmark * 0.025);

        return cpuScore + gpuScore + ramScore + storageScore;
    }

    getWorkBenchMarkScore() {
        let cpuScore = parseInt(this.cpuBenchmark * 0.6);
        let gpuScore = parseInt(this.gpuBenchmark * 0.25);
        let ramScore = parseInt(this.ramBenchmark * 0.1);
        let storageScore = parseInt(this.storageBenchmark * 0.05);

        return cpuScore + gpuScore + ramScore + storageScore;
    }

}


class View{
    static createPCScorePage(pc, gamebenckMarkScore, workBenckMarkScore) {
        let container = document.querySelectorAll('#pcPage')[0];
        let div = document.createElement('div');
        div.classList.add("bg-primary", "py-5");
        div.innerHTML = 
        `
            <h1 class="text-white text-center font-size">Your PC</h1>
            <div class="text-white p-5"> 
                <div class="d-flex flex-column p-3 mt-2" >
                    <h2>CPU</h2>
                    <h5>Brand: ${pc.cpuBrand}</h5>
                    <h5>Model: ${pc.cpuModel}</h5>
                </div>
                <div class="d-flex flex-column p-3 mt-2" >
                    <h2>GPU</h2>
                    <h5>Brand: ${pc.gpuBrand}</h5>
                    <h5>Model: ${pc.gpuModel}</h5>
                </div>
                <div class="d-flex flex-column p-3 mt-2" >
                    <h2>RAM</h2>
                    <h5>Brand: ${pc.ramBrand}</h5>
                    <h5>Model: ${pc.ramModel}</h5>
                </div>
                <div class="d-flex flex-column p-3 mt-2" >
                    <h2>Storage</h2>
                    <h5>Disk: ${pc.storageType}</h5>
                    <h5>Storage: ${pc.storageSize}</h5>
                    <h5>Brand: ${pc.storageBrand}</h5>
                    <h5>Model: ${pc.storageModel}</h5>
                </div>
            </div>
            <div class="d-flex justify-content-around text-white">
                <h2>Gaming: ${gamebenckMarkScore}%</h2>
                <h2>Work: ${workBenckMarkScore}%</h2>
            </div>
        `;

        container.append(div);
    }

}

class Model{

    
}

class Controller{
    static start() {
        let pc = new PC();
        Controller.getAllData(pc);
        Controller.watchForAddPC(pc);
    }

    static watchForAddPC(pc) {
        let btn = document.getElementById("addPC");
        btn.addEventListener("click", function () {
            Controller.clickCreatePCPage(pc);
        })
    }

    static getAllData(pc) {
        const cpuBrand = document.querySelectorAll(config.cpu.brand)[0];
        const cpuModel = document.querySelectorAll(config.cpu.model)[0];
        const gpuBrand = document.querySelectorAll(config.gpu.brand)[0];
        const gpuModel = document.querySelectorAll(config.gpu.model)[0];
        const ramBrand = document.querySelectorAll(config.ram.brand)[0];
        const ramModel = document.querySelectorAll(config.ram.model)[0];

        const storageBrand = document.querySelectorAll(config.storage.brand)[0];
        const storageModel = document.querySelectorAll(config.storage.model)[0];


       Controller.getBrandData(settingUrl.parameters.cpu, cpuBrand, cpuModel, pc);
       Controller.getBrandData(settingUrl.parameters.gpu, gpuBrand, gpuModel, pc);
       Controller.getRamData(settingUrl.parameters.ram, ramBrand, ramModel, pc);
       Controller.getStorageData(storageBrand, storageModel, pc);
       
    }

    /* get */

    // 入力に対応したbrand情報を取得し、選択欄に情報を追加する
    static getBrandData(parts, brandOp, modelOp, pc) {
        fetch(settingUrl.url + parts).then(responce => responce.json())
            .then(data => {
                brandOp.innerHTML = `<option>-</option>`;
                let brandData =  Controller.getBrand(data);
                let modelData = Controller.getModel(data);
                let benchMarkData = Controller.getBenchMark(data);

                Controller.createAddOption(brandData, brandOp);

                //brandの選択が終わったら、モデルの処理を走らせる
                let brandEvent = () => Controller.getModelData(parts, brandOp, modelOp, modelData, benchMarkData, pc);
                brandOp.addEventListener("change", brandEvent);
                    
            });

    }

    // 適切なモデルのデータを取得し、オプションに追加
    static getModelData(parts, brandOp, modelOp, modelData, benchMarkData, pc) {
        const brand = brandOp.value;
        pc.addBrandData(parts, brand);
        modelOp.innerHTML = `<option>-</option>`;
        if (parts == "hdd" || parts == "ssd") {
            const storageSize = document.querySelectorAll(config.storage.size)[0];
            let filterModelData = Controller.filterStorageModel(storageSize.value, modelData[brandOp.value]);
            pc.addStorageData(parts, storageSize.value);
            Controller.createAddOption(filterModelData, modelOp);
        }else if (parts == "ram") {
            const ramNum = document.querySelectorAll(config.ram.num)[0];
            const ramSelectNumber = ramNum.value;
            const filterModelData = Controller.filterRamModelData(ramSelectNumber, brandOp.value, modelData);
            Controller.createAddOption(filterModelData, modelOp);

        } else {
            let filterModelData = Controller.filterToModel(brand, modelData);
            Controller.createAddOption(filterModelData, modelOp);

        }

        modelOp.addEventListener("change", function () {
            let selectModel = modelOp.value;
            let benckMark = benchMarkData[selectModel];
            pc.addModelData(parts, selectModel);
            pc.addBenchmarkData(parts, benckMark);
        });
    }


    // ブランドデータの重複を解消して取得
    static getBrand(data) {
        let brandData = {};
        for(let i in data) {
            let currentData = data[i];
            if (brandData[currentData.Brand] == undefined) brandData[currentData.Brand] = currentData.Brand;
        }
        return brandData;
    }

    // モデルデータを重複を解消して取得　
    static getModel(data) {
        let modelData = {};
        for (let i in data) {
            let currentData = data[i];
            if (modelData[currentData.Brand] == undefined) {
                modelData[currentData.Brand] = [currentData.Model];
            } else {
                modelData[currentData.Brand].push(currentData.Model);
            }
        };
        return modelData;
    }

    static getBenchMark(data) {
        let benchMarkData = {};
        for (let i in data) {
            const currentData = data[i];
            if (benchMarkData[currentData.Model] == undefined) benchMarkData[currentData.Model] = currentData.Benchmark;
        }
        return benchMarkData;
    }

    /* storage */

    // ストレージのタイプの変更を監視し、ブランドのオプション表示まで行う
    static getStorageData(brandOp,modelOp, pc) {
        const storageType = document.querySelectorAll(config.storage.type)[0];
        const storageSize = document.querySelectorAll(config.storage.size)[0];

        storageType.addEventListener("change", function () {
            let type = storageType.value;
            Controller.getStorageSizeData(type, storageSize);
            Controller.getBrandData(type, brandOp, modelOp, pc);
        });
    }

    // ストレージのデータをフェッチし容量順に一覧をオプションで表示
    static getStorageSizeData(type, target) {
        fetch(settingUrl.url + type).then(responce => responce.json()).then(data => {
            let storageSize = Controller.getStorageModel(data);
            let sortList = Controller.sortStorage(storageSize);
            Controller.createAddOption(sortList, target);
        });
    }

    // ストレージを容量順にソートする
    static sortStorage(data) {
        let modelList = Object.keys(data);
        let tbSizeList = [];
        let gbSizeList = [];

        modelList.forEach(model => {
            if (model.includes("TB")) {
                tbSizeList.push(parseFloat(model.replace("TB", "")));
            } else {
                gbSizeList.push(parseFloat(model.replace("GB", "")));
            }; 
        });

        let sortedTb = tbSizeList.sort((a, b) => b - a).map(x => x.toString() + "TB");
        let sortedGb = gbSizeList.sort((a, b) => b - a).map(x => x.toString() + "GB");
        return sortedTb.concat(sortedGb);
    }

    // ストレージをモデル名から容量別に仕分ける
    static getStorageModel(data) {
        let modelData = {};
        for (let i in data) {
            let currentData =  Controller.getStorageSizeString(data[i].Model);
            if (modelData[currentData] == undefined) modelData[currentData] = currentData;
        }
        return modelData;
    }

    // ストレージのGB,TBの箇所のみ取得
    static getStorageSizeString(storageModel) {
        let storageSizeString = storageModel.split(' ').filter(word => word.includes("GB") || word.includes("TB")).join('');
        return storageSizeString;
    }



    /* ram */

    // ramの本数を監視
    static getRamData(parts, brandOp, modelOp, pc) {
        const ramNum = document.querySelectorAll(config.ram.num)[0];
        ramNum.addEventListener("change", function () {
            Controller.getBrandData(parts, brandOp, modelOp, pc);
        });
    }


    /* create */ 

    // 追加するオプションを作成
    static createAddOption(data, targetElement) {
        for (let i in data) {
            let option = document.createElement("option");
            option.value = data[i];
            option.innerText = data[i];
            targetElement.append(option);
        }
    }

    static clickCreatePCPage(pc) {
        let checkList = [pc.cpuModel, pc.gpuModel, pc.ramModel, pc.storageModel];
        for (let i in checkList) {
            if (checkList[i] == null) return alert("全ての項目を埋めて下さい");
        }
        let gameBenckMarkScore = pc.getGameBenchMarkScore();
        let workBenchMarkScore = pc.getWorkBenchMarkScore();

        View.createPCScorePage(pc, gameBenckMarkScore, workBenchMarkScore);
    }

    /* filter */

    // モデルデータをブランドで取得
    static filterToModel(brand, data) {
        if (data[brand]) {
            return data[brand];
        }
    }

    // ストレージのモデルを選択されている容量に合わせてフィルターし返す
    static filterStorageModel(size, modelData) {
        let filterModelDeta = {};
        for (let i in modelData) {
            const currentData = modelData[i];
            if (currentData.includes(size) &&  filterModelDeta[currentData] == undefined) {
                filterModelDeta[currentData] = currentData;
            }
        }
        return filterModelDeta;
    }

    // ramデータの本数に対応して取得
    static filterRamModelData(ramSelectNumber, brandName, data) {
        const listData = data[brandName];
        let filterData = listData.filter(word => word.includes(ramSelectNumber + 'x'));
        return filterData;
    }


}

function main() {
    Controller.start();

}

main();