const inputSlide=document.querySelector("[data-lengthSlider]");
const displayLength=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-Copy]");
const copyMsg=document.querySelector("[data-CopyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allcheckBtn=document.querySelectorAll("input[type=checkbox]");

let password ="";
let passwordLength=8;
let checkcount=0;

const symbol='`~!@#$%^&*()_+-=|\}]{[/.,":?><*';

handleSlider();

function handleSlider(){
    inputSlide.value=passwordLength;
    displayLength.innerText = passwordLength;    
}

function setIndicator(col){
    indicator.style.backgroundcolor=col;
}


function getRndinteger(min, max){
    return Math.floor(Math.random()*(max-min))+min
}

function genRndnumber(){
   return getRndinteger(0,9);
   
}

function genLowercase(){
    return String.fromCharCode(getRndinteger(97,123));
}

function genUppercase(){
    return String.fromCharCode(getRndinteger(65,90));
}
function gensymbols(){
    let no=getRndinteger(0,symbol.length)
    return symbol.charAt(no);
}

function calStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;

    if(hasUpper && hasLower && (hasSym || hasNum) && passwordLength >= 8 ){
        setIndicator("#0f0");
    }
    else if(
        ( hasLower||hasUpper ) &&
        (hasNum || hasSym)&&
        passwordLength>=6
    ){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch{
        copyMsg.innerText="failed"
    }
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
    }

    copyBtn.addEventListener("click", ()=>{
        if(passwordDisplay.value){
            copyContent();
        }
    } );

    inputSlide.addEventListener("input" , (slide)=>{
        passwordLength=slide.target.value;
        handleSlider();
    })

    function shufflepassword(array){
        for(i=array.length-1;i>0;i--){
            const j = Math.floor(Math.random()*(i+1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        let str="";
        array.forEach((el)=>(str += el));
        return str;
    }



function checkboxChange(){
    checkbox=0;
    allcheckBtn.forEach((checkbox)=>{
        if(checkbox.checked){
            checkbox++;
        }
    });

    if(checkbox>passwordLength){
        passwordlength=checkbox;
        handleSlider();
    }
}

allcheckBtn.forEach((checkbox) => {
    checkbox.addEventListener("change",checkboxChange())
})


generateBtn.addEventListener("click",()=>{  


    if(passwordLength == 0){
        return;
    }
    if(passwordLength < checkcount){
        passwordLength=checkcount;
        handleSlider();
    }

    let funArr = [];
    if(uppercaseCheck.checked){
        funArr.push(genUppercase);
    }
    if(lowercaseCheck.checked){
        funArr.push(genLowercase);
    }
    if(symbolsCheck.checked){
        funArr.push(gensymbols);
    }
    if(numbersCheck.checked){
        funArr.push(genRndnumber);
    }

    for(let i=0;i<funArr.length;i++){
        password += funArr[i]();
    }

    for (let i=0;i<passwordLength-funArr.length; i++){
        let ranindex=getRndinteger(0,funArr.length);
        password+=funArr[ranindex]();
    }


    password=shufflepassword(Array.from(password));
    
    passwordDisplay.value=password;
    calStrength();

});







