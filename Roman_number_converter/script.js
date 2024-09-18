const number = document.getElementById("number");
const convertbtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const ConvertoRoman = (num) => {
  const ref = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];
  const res = [];

  ref.forEach((arr) => {
    while (num >= arr[1]) {
      res.push(arr[0]);
      num -= arr[1];
      console.log(res)
    }
  });

  return res.join('');
}


const isValid = (str) => {
  let errText = "";

  if (!str || str.match(/[e.]/g)) {
    errText = "Please enter a valid number."
  }
  else if (str < 1) {
    errText = "Please enter a number greater than or equal to 1."
  }
  else if (str > 3999) {
    errText = "Please enter a number less than or equal to 3999."
  }
  else {
    return true
  }
  output.innerText = errText;
  return false;
}

const updateUI = () => {
  const int = parseInt(number.value)
  output.classList.remove('hidden');
  if (isValid(number.value)) {
    output.textContent = ConvertoRoman(int);
  }
}

convertbtn.addEventListener("click", () => {
  updateUI()
  return convertbtn.classList.remove("active"), number.value = "";
})

number.addEventListener("keyup", (e) => {
  if (number.value) {
    if (e.key == "Enter") {
      updateUI()
      number.value = "";
    }
    return convertbtn.classList.add("active");
  }
  convertbtn.classList.remove("active")
})