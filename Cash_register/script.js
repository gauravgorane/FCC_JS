let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const changeDueScreen = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('total-price');
const cashDrawerScreen = document.getElementById('cash-drawer');

// Change Due Ui Screen
const formatResults = (status, change) => {
  changeDueScreen.innerHTML = `<p>Status: ${status}</p>`;
  change.map(money => (changeDueScreen.innerHTML += `<p>${money[0]}: $${money[1]}</p>`));
  return;
}

// Main function for all operation
const checkCashRegister = () => {

  if (Number(cash.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if (Number(cash.value) === price) {
    changeDueScreen.innerHTML = '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  let changeDue = parseFloat((Number(cash.value) - price).toFixed(2)); //Making correct till 2 digit
  let reversedCid = [...cid].reverse(); 
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: 'OPEN', change: [] };
  let totalCid = parseFloat(cid.map(total => total[1]).reduce((prev, curr) => prev + curr).toFixed(2)); //Making correct till 2 digit

  if (changeDue > totalCid) {
    return (changeDueScreen.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  }

  // If cash in drawer = Enter cash from customer then status: closed
  if (totalCid === changeDue) {
    result.status = 'CLOSED';
  }

  // Main logic of substraction
  for (let i = 0; i < reversedCid.length; i++) {
    // changeDue is greater than denomination of that no. (eg. 12 > 100 && 12 > 0)
    if (changeDue >= denominations[i] && changeDue > 0) {
      let count = 0;
      let total = reversedCid[i][1]; //eg. reversedCid[0][1] = 100
      // eg. 100 > 0 && 12 >= 100 which is NO
      while (total > 0 && changeDue >= denominations[i]) {
        // re-assigned value to revered Cash in drawer
        total -= denominations[i];
        // changeDue is changed
        changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
        count++;
      }
      if (count > 0) {
        // if count > 0 then only this will wroks and store in change: []
        result.change.push([reversedCid[i][0], parseFloat((count * denominations[i]).toFixed(2))]);
      }
    }
  }
  if (changeDue > 0) {
    // if cash is greater than price but CID is less then only this will trigger otherwise no deduction happens
    return (changeDueScreen.innerHTML = '<p>2 Status: INSUFFICIENT_FUNDS</p>');
  }

  // Show the change: [] array 
  formatResults(result.status, result.change);
  // show the CID Ui with operation done 
  UpdateCidUi(result.change);
}

const UpdateCidUi = (change) => {
  // Denomination for CID
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };

  // If change is passed
  if (change) {
    // Get change in cash in drawer if "change" is passed and make change in CID 
    change.forEach(changeArr => {
      const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]); // find if change element and cid match
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2)); // if match then subtract change:[] from cid 
    });
  }

  // If change is NOT passed OR continue with passed value
  cash.value = '';
  priceScreen.innerText = price;
  cashDrawerScreen.innerHTML = `<h3>Cash in Drawer:</h3> ${cid.map(money => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`).join(' ')}`
}

// Check Input value is null or not
const handlePurchase = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
};

// Click Event
purchaseBtn.addEventListener('click', handlePurchase);

// KeyDown Event
cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    handlePurchase();
  }
});

UpdateCidUi();