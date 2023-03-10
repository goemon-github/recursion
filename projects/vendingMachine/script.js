let status = {
    image: '',
    name: '',
    price: '',
}

const pictureItems = [
    {
        image: 'cat-1.jpg',
        name: 'cat-1',
        price: 100
    },
    {
        image: 'cat-2.jpg',
        name: 'cat-2',
        price: 200
    },
    {
        image: 'cat-3.jpg',
        name: 'cat-3',
        price: 300
    },
    {
        image: 'cat-4.jpg',
        name: 'cat-4',
        price: 400
    },
    {
        image: 'cat-5.jpg',
        name: 'cat-5',
        price: 500
    },
    {
        image: 'cat-6.jpg',
        name: 'cat-6',
        price: 600
    },
    {
        image: 'cat-7.jpg',
        name: 'cat-7',
        price: 700
    },
    {
        image: 'cat-8.jpg',
        name: 'cat-8',
        price: 800
    },
    {
        image: 'cat-9.jpg',
        name: 'cat-9',
        price: 900
    },
    {
        image: 'cat-10.jpg',
        name: 'cat-10',
        price: 1000
    }
];

let items = {};


let imageUrl = './recursion_project-image_cat/';


function createItem() {
    for (let i = 0; i < pictureUrl.length; i++){
    }
}

function createImage(data) {
    for (let i = 0; i < pictureItems.length; i++){
        let image = document.createElement('img');
        image.classList.add('col-12', 'rounded', 'slide--animation', 'slide_fadein', 'slide-item');
        image.src = imageUrl + pictureItems[i].image;
        data.append(image);
    }
}


////////// 

let mainDiv = document.getElementById('main');

let listData = document.createElement('div');
listData.classList.add('d-none');
listData.setAttribute('id', 'data');
createImage(listData);

let leftSideDiv = document.createElement('div');
leftSideDiv.classList.add('col-6', 'p-3', 'bg-secondary', 'd-flex', 'justify-content-center', 'align-items-center');
leftSideDiv.setAttribute('id', 'leftBox');

let rightSideDiv = document.createElement('div');
rightSideDiv.classList.add('col-5', 'bg-success', 'd-flex', 'align-items-center');
rightSideDiv.setAttribute('id', 'rightBox');

let slidersDiv = document.createElement('div');
slidersDiv.classList.add('col-12', 'sliders');

let slideMain = document.createElement('div');
slideMain.classList.add('col-12', 'slide-main');


let slideExtra = document.createElement('div');
slideExtra.classList.add('col-12', 'slide-extra', 'd-none');

let rightSideContainer = document.createElement('div');
let statusDiv = document.createElement('div');
statusDiv.classList.add('col-12', 'pl-4', 'mt-3');

let namePtag = document.createElement('p');
let pricePtag = document.createElement('p');

let numbersDiv = document.createElement('div');
numbersDiv.classList.add('col-12', 'd-flex', 'flex-wrap');


for (let i = 1; i < 10; i++) {
    let btnDiv = document.createElement('div');
    btnDiv.classList.add('col-3', 'my-3');

    let btn = document.createElement('button');
    btn.classList.add('btn', 'btn-light', 'col-12');

    btn.type = 'button';
    btn.innerHTML = i;

    btnDiv.append(btn);
    numbersDiv.append(btnDiv);
}


slidersDiv.append(slideMain, slideExtra);
leftSideDiv.append(slidersDiv);

namePtag.innerHTML = 'Name : ';
pricePtag.innerHTML ='price : '
statusDiv.append(namePtag, pricePtag);
rightSideContainer.append(statusDiv, numbersDiv);
rightSideDiv.append(rightSideContainer);
mainDiv.append(listData, leftSideDiv, rightSideDiv);

const sliderItems = document.querySelectorAll('.slide-item');
///////////

///////////////
// function
//////////////

function slideAnimation() {

}

function initSlide() {
    let firstImage = sliderItems.item(0);
    slideMain.append(firstImage);
    slideMain.dataset.index = 0;
}

function slideJump(steps) {
    // 現在のインデックスを取得
    let index = parseInt(slideMain.getAttribute('data-index'));
    console.log('first', index);

    // 現在の要素
    let currentElement = sliderItems[index];
    
    let nextElement = sliderItems[steps];
    const name = pictureItems[steps].name;
    const price = pictureItems[steps].price;


    slideMain.setAttribute('data-index', steps.toString());

    // animation
    animateMain(currentElement, nextElement, name, price);
}

function animateMain(currentElement, nextElement, name, price) {
    if (currentElement == nextElement) {
        slideExtra.innerHTML = '';
        slideExtra.append(nextElement);

        slideMain.innerHTML = '';
        slideMain.append(currentElement);

    } else {
        slideMain.innerHTML = '';
        slideMain.append(nextElement);

        slideExtra.innerHTML = '';
        slideExtra.append(currentElement);
    }
    namePtag.innerHTML = 'Name: ' + name;
    pricePtag.innerHTML = 'price: ' + price;

}


let btns = document.querySelectorAll('.btn');
function main() {
    for (let i = 0; i < btns.length; i++){
        btns[i].addEventListener('click', function () {
            let num = parseInt(btns[i].innerText);
            slideJump(num - 1);
        })
    }
}
initSlide();
main();