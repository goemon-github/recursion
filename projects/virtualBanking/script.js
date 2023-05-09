const config = {
    initialForm:  document.getElementById('initial-form'),
    bankPage: document.getElementById('bankPage'),
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



/*
let user1 = new BankAccount('Elisa', "Jonas", "elisa.jones@gmail.com", "checking", getRandomInteger(1, 1000) ,"30");
console.log(user1);

let user2 = new BankAccount("Jameson", "Dorsey", "jameson.dorsey@gmail.com", "saving", getRandomInteger(1,Math.pow(10,8)), "90");
console.log(user2);
*/