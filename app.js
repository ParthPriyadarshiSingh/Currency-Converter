const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) { //this will have two select tags
    for (currCode in countryList) { //countryList is an object with several keys and corresponding values. currCode will contain key, which is currency code.
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "AUD") { //these four lines will decide the default currencies for conversion.
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => { //for detecting in which select tag the change has occurred
        updateFlag(evt.target); //evt.target will return the new selected currency from the dropdown
    });
}

const updateExchaneRate = async () => {
    let amount = document.querySelector("input");
    let amountValue = amount.value; //it stores the value of amount before changing amount.value
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amountValue * rate;
    finalAmount = Math.round(finalAmount * 100) / 100;
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); //this prevents the automatic reload of page
    updateExchaneRate();
})

window.addEventListener("load", () => {
    updateExchaneRate();
})