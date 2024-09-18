const textinput = document.getElementById("text-input");
const checkbtn = document.getElementById("check-btn");
const result = document.getElementById("result");


const checkforpalindrome = (input) => {
    const originalinput = input;

    if (input == "") {
        alert("Please input a value");
        return;
    }

    let filterinput = input.replace(/[^A-Za-z0-9]/gi, "").toLowerCase();
    let resultmsg = `<span>${originalinput}</span> ${filterinput === [...filterinput].reverse().join("") ? "is" : "is not"
        } a palindrome.`

    result.style.display = "block";
    result.innerHTML = resultmsg;
}

checkbtn.addEventListener("click", () => {
    result.style.display = "none";
    checkbtn.classList.remove("active")
    return checkforpalindrome(textinput.value), textinput.value = "";
})

textinput.addEventListener("keyup", e => {
    checkbtn.classList.add("active")
    result.style.display = "none";
    if (e.key === "Enter") {
        checkforpalindrome(textinput.value);
        return checkbtn.classList.remove("active"), textinput.value = "";
    }
})
