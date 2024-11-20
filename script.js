const inputSlide=document.querySelector("[data-lengthSlider]");
const displayLength=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-Copy]");
const copyMsg=document.querySelector("[data-CopyMsg]");
const upppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allcheckBtn=document.querySelectorAll("input[type=checkbox]");

let password ="";
let passwordLength=15;
let checkcount=1;

handleSlider();

function handleSlider(){
    inputSlide.value=passwordLength;
    displayLength.innerText = passwordLength;
}
