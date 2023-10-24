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
    maxWithdrawPercent = 0.2;
    annualRate = 0.08;
    
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

    calculateWithdrawAmount(amount) {
        let maxWithdrawAmount = Math.floor(this.money * this.maxWithdrawPercent);
        amount = amount > maxWithdrawAmount ? maxWithdrawAmount : amount;

        return amount;
    }

    withdraw(amount) {
        this.money -= this.calculateWithdrawAmount(amount);
        return this.money;
    }

    deposit(amount) {
        this.money += amount;
        return this.money;
    }

    simulateTimePassage(days) {
        let profit = (this.money * Math.pow(1 + this.annualRate,  days / 365)) - this.money;
        this.money += profit;
        console.log(this.money, profit);
        return profit;
    }


    
}


function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
}

function initializeUserAccount() {
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

    config.bankPage.append(mainBankPage(userBankAccount));
    config.initialForm.classList.add('d-none');

}

function getUserInfo() {
    let submitBtn = document.getElementsByTagName('button')[0];
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        initializeUserAccount();
    })
}

function mainBankPage(bankAccount) {
    let infoContainer = document.createElement('div');
    infoContainer.classList.add('p-2', 'p-md-4', 'text-right');

    let nameP = document.createElement('p');
    nameP.classList.add('py-1');

    let bankIdP = nameP.cloneNode(true);
    let initialDepositP = nameP.cloneNode(true);

    nameP.innerHTML = `Name: ${bankAccount.getFullName()}`;
    bankIdP.innerHTML = `ID: ${bankAccount.accountNumber}`;
    initialDepositP = `Deposit: ${bankAccount.initialDeposit}`;

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
        sideBankSwitch();
        config.sidePage.append(withdrawPage(bankAccount));
    });
    menuContainer.querySelectorAll('#deposit')[0].addEventListener('click', function () {
        sideBankSwitch();
        //config.sidePage.append();
        config.sidePage.append(depositPage(bankAccount));
    });
    menuContainer.querySelectorAll('#comebacklater')[0].addEventListener('click', function () {
        sideBankSwitch();
        //config.sidePage.append();
        config.sidePage.append(comeBackLaterPage(bankAccount));
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
                <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="100" id="moneyWithdraw100" placeholder="0">
            </div>
        </div>
        <div class="form-group row">
            <label for="moneyWithdraw50" class="col-2 col-form-label col-form-label-sm">$50</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="50" id="moneyWithdraw50" placeholder="0">
            </div>
        </div>
        <div class="form-group row">
            <label for="moneyWithdraw20" class="col-2 col-form-label col-form-label-sm">$20</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="20" id="moneyWithdraw20" placeholder="0">
            </div>
        </div>
        <div class="form-group row">
            <label for="moneyWithdraw10" class="col-2 col-form-label col-form-label-sm">$10</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="10" id="moneyWithdraw10" placeholder="0">
            </div>
        </div>
        <div class="form-group row">
            <label for="moneyWithdraw5" class="col-2 col-form-label col-form-label-sm">$5</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="5" id="moneyWithdraw5" placeholder="0">
            </div>
        </div>
        <div class="form-group row">
            <label for="moneyWithdraw1" class="col-2 col-form-label col-form-label-sm">$1</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="1" id="moneyWithdraw1" placeholder="0">
            </div>
        </div>
        <div class="text-center money-box p-3">
            <p id="totalBillAmount">$0.00</p>
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
                <button id="withdrawGoBack" class="btn btn-outline-primary col-12 back-btn">${backString}</button>
            </div>
            <div class="col-6 pr-0">
                <button id="withdrawProcess" class="btn btn-primary col-12 next-btn">${nextString}</button>
            </div>
        </div>
    `;

    return container;
}

function sideBankSwitch() {
    displayNone(config.bankPage);
    displayBlock(config.sidePage);

    config.bankPage.innerHTML = '';
    config.sidePage.innerHTML = '';

}

function bankReturn(bankAccount) {
    displayNone(config.sidePage);
    displayBlock(config.bankPage);
    config.bankPage.append(mainBankPage(bankAccount));

}

function withdrawPage(bankAccount) {
    let title = 'Plase Enter The withdrawal Amount';
    let container = document.createElement('div');
    container.classList.add('p-5');

    let withdrawContainer = document.createElement('div');
    container.append(withdrawContainer);

    withdrawContainer.append(billInputSelector(title));
    withdrawContainer.append(backNextBtn('back', 'next'));

    let backBtn = withdrawContainer.querySelectorAll('.back-btn').item(0);
    backBtn.addEventListener('click',function () {
        bankReturn(bankAccount);
    })


    let inputArr = withdrawContainer.querySelectorAll(".bill-input");
    for (let i = 0; i < inputArr.length; i++){
        inputArr[i].addEventListener('change', function () {
            total = billSummation(inputArr, 'data-bill');
            document.getElementById("totalBillAmount").innerHTML = total.toString();
        });
    }

    let nextBtn = withdrawContainer.querySelectorAll('.next-btn').item(0);
    nextBtn.addEventListener('click', function () {
        container.innerHTML = '';
        let configDialog = document.createElement('div');
        let title ='The money you are going to take is ...';
        configDialog.append(billDialog(title, inputArr, 'data-bill'));
        container.append(configDialog);

        let total = billSummation(inputArr, 'data-bill');

        configDialog.innerHTML += `
         <div class="d-flex bg-danger py-1 py-md-2 mb-3 text-white">
             <p class="col-8 text-left rem1p5">Total to be withdrawn: </p>
             <p class="col-4 text-right rem1p5">${bankAccount.calculateWithdrawAmount(total)}</p>
         </div>
        `;

        let withdrawConfirmBtns = backNextBtn('Go Back', "Confirm");
        configDialog.append(withdrawConfirmBtns);

        let confirmBackBtn = withdrawConfirmBtns.querySelectorAll('.back-btn')[0];
        let confirmNextBtn = withdrawConfirmBtns.querySelectorAll('.next-btn')[0];

        confirmBackBtn.addEventListener('click', function () {
            container.innerHTML = '';
            container.append(withdrawContainer);
        });

        confirmNextBtn.addEventListener('click', function () {
            bankAccount.withdraw(total);
            bankReturn(bankAccount);
        });
        

    });

    return container;
}

function depositPage(bankAccount) {
    let title = 'Plase Enter The Deposit Amount';
    let container = document.createElement('div');
    container.classList.add('p-5');

    let withdrawContainer = document.createElement('div');
    container.append(withdrawContainer);

    withdrawContainer.append(billInputSelector(title));
    withdrawContainer.append(backNextBtn('back', 'next'));

    let backBtn = withdrawContainer.querySelectorAll('.back-btn').item(0);
    backBtn.addEventListener('click',function () {
        bankReturn(bankAccount);
    })


    let inputArr = withdrawContainer.querySelectorAll(".bill-input");
    for (let i = 0; i < inputArr.length; i++){
        inputArr[i].addEventListener('change', function () {
            total = billSummation(inputArr, 'data-bill');
            document.getElementById("totalBillAmount").innerHTML = total.toString();
        });
    }

    let nextBtn = withdrawContainer.querySelectorAll('.next-btn').item(0);
    nextBtn.addEventListener('click', function () {
        container.innerHTML = '';
        let configDialog = document.createElement('div');
        let title = 'The money you are going to deposit is ...';
        configDialog.append(billDialog(title, inputArr, 'data-bill'));
        container.append(configDialog);

        let total = billSummation(inputArr, 'data-bill');

        configDialog.innerHTML += `
         <div class="d-flex bg-danger py-1 py-md-2 mb-3 text-white">
             <p class="col-8 text-left rem1p5">Total to be withdrawn: </p>
             <p class="col-4 text-right rem1p5">${total}</p>
         </div>
        `;

        let depositConfirmBtns = backNextBtn('Go Back', "Confirm");
        configDialog.append(depositConfirmBtns);

        let confirmBackBtn = depositConfirmBtns.querySelectorAll('.back-btn')[0];
        let confirmNextBtn = depositConfirmBtns.querySelectorAll('.next-btn')[0];

        confirmBackBtn.addEventListener('click', function () {
            container.innerHTML = '';
            container.append(withdrawContainer);
        });

        confirmNextBtn.addEventListener('click', function () {
            bankAccount.deposit(total);
            bankReturn(bankAccount);
        });
        
    });

    return container;
}


function comeBackLaterPage(bankAccount) {
    let title = 'How many days will you be gone?';
    let container = document.createElement('div');
    container.classList.add('p-5');

    comeBackLaterContainer = document.createElement('div');
    comeBackLaterContainer.classList.add('p-5');
    container.append(comeBackLaterContainer);

    comeBackLaterContainer.innerHTML = `
        <h2 class="pb-3">${title}</h2>
        <div class="form-group">
            <input type="number" class="form-control" id="days-gone" placeholder="0">
        </div>
    `;

    comeBackLaterContainer.append(backNextBtn('back', 'Confirm'));

    let backBtn = comeBackLaterContainer.querySelectorAll('.back-btn').item(0);
    let confirmNextBtn = comeBackLaterContainer.querySelectorAll('.next-btn')[0];

    backBtn.addEventListener('click',function () {
        bankReturn(bankAccount);
    })
    
    confirmNextBtn.addEventListener('click', function () {
        console.log(comeBackLaterContainer);
        let days = comeBackLaterContainer.querySelectorAll('#days-gone')[0];
        let daysInt = parseInt(days.value);
        console.log(daysInt);
        daysInt = daysInt > 0 ? daysInt : 0;
        bankAccount.simulateTimePassage(daysInt);
        bankReturn(bankAccount);
    });

    return container;

}


function billSummation(elementNodelist, attribute) {
    let summation = 0;
    for (let i = 0; i < elementNodelist.length; i++){
        let currElement = elementNodelist[i];
        let value = parseInt(currElement.value);

        if (currElement.hasAttribute(attribute)) {
            value *= parseInt(currElement.getAttribute(attribute))
        }; 

        if (value > 0) summation += value;

    }

    return summation;
};

function billDialog(title, elementNodeList, attribute) {
    
    let container = document.createElement('div');
    let billElements = '';
    for (let i = 0; i < elementNodeList.length; i++){
        let currElement = elementNodeList[i];
        let value = parseInt(currElement.value);
        console.log('log', value);
        if (value > 0) {
            let bill = '$' + currElement.getAttribute(attribute);
            billElements = `<p class="rem1p3 calculation-box mb-1 pr-2">${value} × ${bill}</p>`;
        }

    }

    let total = billSummation(elementNodeList, attribute);
    let totalString = `<p class="rem1p3 pr-2">total: $${total}</p>`;
    container.innerHTML = `
        <h2 class="pb-1">${title}</h2>
        <div class="d-flex justify-content-center">
            <div class="text-right col-8 px-1 calculation-box">
            ${billElements}
            ${totalString}
            </div>
        </div>
    `;

    return container;
};

/*
let user1 = new BankAccount('Elisa', "Jonas", "elisa.jones@gmail.com", "checking", getRandomInteger(1, 1000) ,"30");
console.log(user1);

let user2 = new BankAccount("Jameson", "Dorsey", "jameson.dorsey@gmail.com", "saving", getRandomInteger(1,Math.pow(10,8)), "90");
console.log(user2);
*/

function main() {
    getUserInfo();
}
main();