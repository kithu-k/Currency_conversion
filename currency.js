const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("#btn");
const msg = document.querySelector(".msg");

const updateflag =(element) =>{
    let currencycode = element.value;
    let countrycode = countryList[currencycode];

    let src = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.setAttribute("src", src);
}

for (let select of dropdowns){
    for (let currcode in countryList){
        let option = document.createElement("option");
        option.innerText = currcode;
        option.value = currcode;
        if ( select.name === "from" && currcode === "USD") option.selected ="selected";
        else if ( select.name === "to" && currcode === "INR") option.selected ="selected";
        select.append(option);
    }
    select.addEventListener("change", (event) =>{

        updateflag(event.target);
    });
}

const converter= async (amt,from,to) =>{
    let URL = `${Base_URL}${from.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    rate = data[from.toLowerCase()][to.toLowerCase()];
    let total = rate * amt;
    msg.innerText = `${amt} ${from} = ${parseFloat(total.toFixed(2))} ${to}`;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input").value;
    if (isNaN(amount) || amount<0 || amount === "") {alert("Enter a valid number"); amount = 0;}
    fromcountry = document.querySelector(".From select").value
    tocountry = document.querySelector(".To select").value;
    converter(amount, fromcountry,tocountry);
});