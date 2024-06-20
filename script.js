const BASE_URL = "https://v6.exchangerate-api.com/v6/f358b5a26716b0f04bc18f25/pair/USD/INR"

let dropdowns = document.querySelectorAll(".section select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".inner1 select");
const toCurr = document.querySelector(".inner2 select");
const message = document.querySelector(".message");
const msg1 = document.querySelector(".m1");
const msg2 = document.querySelector(".m2");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("click", (evt) =>{
       updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`; 
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
}

button.addEventListener("click", async (evt) =>{
     evt.preventDefault();
     let amount = document.querySelector(".input input");
     let amtVal = amount.value;
     if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
     }
    
     const URL = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurr.value.toLowerCase()}&to_currency=${toCurr.value.toLowerCase()}&apikey=KZANZVAZH10B0Y4M.json`;
     let result = await fetch(URL);
     let data = await result.json();
     let rate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
     let finalrate = Math.round(rate * 100) / 100;

     let finalamount = amtVal * finalrate;

     message.classList.remove("hide");
     msg1.innerText = `${amtVal} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;  
     msg2.innerText = `1 ${fromCurr.value} = ${finalrate} ${toCurr.value}`;  
     message.style.backgroundColor = "rgb(230, 221, 237)" ; 
});


/* 
Alpha Vantage api used.
*/
