function displayNone(target) {
    target.classList.remove('d-block');
    target.classList.add('d-none');
}

function displayBlock(target) {
    target.classList.remove('d-none');
    target.classList.add('d-block');
}

const config = {
    initialForm:  document.getElementById('initial-form'),
    bankPage: document.getElementById('bankPage'),
    sidePage: document.getElementById('sidePage'),
}

class BankAccount{
    constructor(firstName, lastName, email, type, accountNumber, money) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.type = type;
        this.accountNumber = accountNumber;
        this.money = money;
        this.initialDeposit = money;
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }

    
}

function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
}

function initializeUserAccount() {
    event.preventDefault();
     form = document.getElementById('bank-form');
    let userBankAccount = new BankAccount(
        form.querySelectorAll(`input[name="userFirstName"]`).item(0).value,
        form.querySelectorAll(`input[name="userLastName"]`).item(0).value,
        form.querySelectorAll(`input[name="userEmail"]`)[0].value,
        form.querySelectorAll(`input[name="userAccountType"]:checked`).item(0).value,
        getRandomInteger(1, Math.pow(10, 8)),
        parseInt(form.querySelectorAll(`input[name="userFirstDeposit"]`).item(0).value)
    );
    console.log(userBankAccount);

/* 2pageの表示 */
    config.initialForm.classList.add('d-none');
    config.bankPage.append(mainBankPage(userBankAccount));

}

function mainBankPage(bankAccount) {
    let infoContainer = document.createElement('div');
    infoContainer.classList.add('p-2', 'p-md-4', 'text-right');

    let nameP = document.createElement('p');
    nameP.classList.add('py-1');

    let bankIdP = nameP.cloneNode(true);
    let initialDepositP = nameP.cloneNode(true);

    nameP.innerHTML = bankAccount.getFullName();
    bankIdP.innerHTML = bankAccount.accountNumber;
    initialDepositP = bankAccount.initialDeposit;

    infoContainer.append(nameP, bankIdP, initialDepositP);


    let balanceContainer = document.createElement('div');
    balanceContainer.classList.add('d-flex', 'bg-danger', 'py-1', 'py-md-2');

    balanceContainer.innerHTML = `
        <p class='col-8 text-left rem1p5'>Available Blance</p>
        <p class="col-4 text-right rem1p5">$${bankAccount.money}</p>
    `;

    let menuContainer = document.createElement('div');
    menuContainer.classList.add('d-flex', 'justify-content-center', 'flex-wrap', 'text-center', 'py-3');
    menuContainer.innerHTML = `
        <div  class='col-lg-4 col-12 py-1 py-md-3'>
            <div id='withdraw' class='bg-secondary hover p-3'>
                <h5>QITHDRAWAL</h5>
                <div class='fas fa-wallet fa-3x'></div>
            </div>
        </div>
        <div  class='col-lg-4 col-12 py-1 py-md-3'>
            <div id='deposit' class='bg-secondary hover p-3'>
                <h5>DEPOSIT</h5>
                <div class='fas fa-coins fa-3x'></div>
            </div>
        </div>
        <div  class='col-lg-4 col-12 py-1 py-md-3'>
            <div id='comebacklater' class='bg-secondary hover p-3'>
                <h5>COME BACK LATER</h5>
                <div class='fas fa-home fa-3x'></div>
            </div>
        </div>
    `;

    menuContainer.querySelectorAll('#withdraw')[0].addEventListener('click', function () {
        alert('withdraw');
        withdrawController();
    });
    menuContainer.querySelectorAll('#deposit')[0].addEventListener('click', function () {
        alert('deposit');
    });
    menuContainer.querySelectorAll('#comebacklater')[0].addEventListener('click', function () {
        alert('comeBackLater');
    });

    let container = document.createElement('div');
    container.append(infoContainer, balanceContainer, menuContainer);
    return container;
}

function billInputSelector(title) {
    let container = document.createElement('div');
    container.innerHTML = 
    `
        <h2 class="pb-3">${title}</h2>
        <div class="form-group row">
            <label for="moneyWithdraw100" class="col-2 col-form-label col-form-label-sm">$100</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="100" id="moneyWithdraw100" placeholder="5">
            </div>
        </div>
        <div class="form-group row">
            <label for="moneyWithdraw50" class="col-2 col-form-label col-form-label-sm">$50</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="50" id="moneyWithdraw50" placeholder="1">
            </div>
        </div>
        <div class="form-group row">
            <label for="moneyWithdraw20" class="col-2 col-form-label col-form-label-sm">$20</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="20" id="moneyWithdraw20" placeholder="2">
            </div>
        </div>
        <div class="form-group row">
            <label for="moneyWithdraw10" class="col-2 col-form-label col-form-label-sm">$10</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="10" id="moneyWithdraw10" placeholder="3">
            </div>
        </div>
        <div class="form-group row">
            <label for="moneyWithdraw5" class="col-2 col-form-label col-form-label-sm">$5</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="5" id="moneyWithdraw5" placeholder="1">
            </div>
        </div>
        <div class="form-group row">
            <label for="moneyWithdraw1" class="col-2 col-form-label col-form-label-sm">$1</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="1" id="moneyWithdraw1" placeholder="4">
            </div>
        </div>
        <div class="text-center money-box p-3">
            <p id="withdrawTotal">$0.00</p>
        </div>
    `;

    return container;
}

function backNextBtn(backString, nextString) {
    let container = document.createElement('div');
    container.classList.add('d-flex', 'justify-content-center');
    container.innerHTML =
        `
        <div class="d-flex justify-content-between">
            <div class="col-6 pl-0">
                <button id="withdrawGoBack" class="btn btn-outline-primary col-12">${backString}</button>
            </div>
            <div class="col-6 pr-0">
                <button id="withdrawProcess" class="btn btn-primary col-12">${nextString}</button>
            </div>
        </div>
    `;

    return container;
}

function withdrawController() {
    displayNone(config.bankPage);
    displayBlock(config.sidePage);

    config.bankPage.innerHTML = '';
    config.sidePage.innerHTML = '';
    config.sidePage.append(withdrawPage());
}

function withdrawPage() {
    let title = 'Plase Enter The withdrawal Amount';
    let container = document.createElement('div');
    container.classList.add('p-5');

    let withdraowContainer = document.createElement('div');
    container.append(withdraowContainer);

    withdraowContainer.append(billInputSelector(title));
    withdraowContainer.append(backNextBtn('back', 'next'));

    return container;
}




/*
let user1 = new BankAccount('Elisa', "Jonas", "elisa.jones@gmail.com", "checking", getRandomInteger(1, 1000) ,"30");
console.log(user1);

let user2 = new BankAccount("Jameson", "Dorsey", "jameson.dorsey@gmail.com", "saving", getRandomInteger(1,Math.pow(10,8)), "90");
console.log(user2);
*/
console.log(withdrawPage());
