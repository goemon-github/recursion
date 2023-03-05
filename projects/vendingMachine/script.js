

function render(){
    let leftSideDiv = document.createElement('div');
    leftSideDiv.classList.add('col-6', 'p-3', 'bg-secondary', 'd-flex', 'justify-content-center', 'align-items-center');

    let rightSideDiv = document.createElement('div');
    rightSideDiv.classList.add('col-5', 'bg-success', 'd-flex', 'align-items-center');

    let silidersDiv = document.createElement('div');
    silidersDiv.classList.add('col-12');

    let silideMain = document.createElement('div');
    silideMain.classList.add('col-12');

    let silideExtra = document.createElement('div');
    silideExtra.classList.add('col-12');

    let rightSideContainer = document.createElement('div');
    let statusDiv = document.createElement('div');
    statusDiv.classList.add('col-12', 'pl-4', 'mt-3');

    let namePtag = document.createElement('p');
    let pricePtag = document.createElement('p');

    let numbersDiv = document.createElement('div');
    numbersDiv.classList.add('col-12', 'd-flex', 'flex-wrap');


    let mainDiv = document.getElementById('main');
    for (let i = 0; i < 11; i++) {
        let btnDiv = document.createElement('div');
        btnDiv.classList.add('col-3', 'my-3');

        let btn = document.createElement('button');
        btn.classList.add('btn', 'btn-light', 'col-12');

        btn.type = 'button';
        btn.innerHTML = i;

        btnDiv.append(btn);
        numbersDiv.append(btnDiv);
    }


    silidersDiv.append(silideMain, silideExtra);
    leftSideDiv.append(silidersDiv);

    namePtag.innerHTML = 'Name : ';
    pricePtag.innerHTML ='price : '
    statusDiv.append(namePtag, pricePtag);
    rightSideContainer.append(statusDiv, numbersDiv);
    rightSideDiv.append(rightSideContainer);
    mainDiv.append(leftSideDiv, rightSideDiv);
}


let picture = [

];


function main() {
    render();
}

main();


