const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const checkValidNumber = (num) => {
  if(num == ""){
    alert("Please provide a phone number");
    return;
  }

  const countryCode = "^(1\\s?)?";
  const areaCode = "(\\([0-9]{3}\\)|[0-9]{3})";
  const spaceDashes = "[\\s\\-]?";
  const phoneNumber = "[0-9]{3}[\\s\\-]?[0-9]{4}$";
  const phoneRegex = new RegExp(`${countryCode}${areaCode}${spaceDashes}${phoneNumber}`);

  const pTag = document.createElement("p");
  pTag.className = "results-text";
  phoneRegex.test(num) ? (pTag.style.color = '#00471b'): (pTag.style.color = '#DC3545');
  pTag.appendChild(document.createTextNode(`${phoneRegex.test(num) ? 'Valid' : 'Invalid'} US number: ${num}`));
  resultsDiv.appendChild(pTag);
}

checkBtn.addEventListener("click", ()=>{
  checkValidNumber(userInput.value);
  return userInput.value = "", checkBtn.classList.remove("active"), clearBtn.classList.remove("active");
})

userInput.addEventListener("keyup", (e)=>{
  if (userInput.value) {
    if (e.key === 'Enter') {
      checkValidNumber(userInput.value);
      return checkBtn.classList.remove("active"), clearBtn.classList.remove("active"), userInput.value = "";
    }
    return checkBtn.classList.add("active"), clearBtn.classList.add("active");
  }
  checkBtn.classList.remove("active"), clearBtn.classList.remove("active")
})

clearBtn.addEventListener("click", ()=>{
  return resultsDiv.textContent = "";
})