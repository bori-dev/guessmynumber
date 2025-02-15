let computerNum = 0; 

let inputButton = document.getElementById("input-button")
let resetButton = document.getElementById("reset-button")
let inputValue = document.getElementById("input-value")
let resultArea = document.getElementById("result-area")
let chanceArea = document.getElementById("chance-area")
let answerArea = document.getElementById("answer-area")
let remainingChances = 3;
let gameOver = false; 
let inputList = [];

inputButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
inputValue.addEventListener("focus",  handleInputEvent)
inputValue.addEventListener("keydown", handleInputEvent) 



function play() {
  let userInput = inputValue.value;
 
  if(userInput < 1 || userInput > 100) {
    resultArea.textContent = "My number is between 1 and 100!"
    return;
  }

  if(inputList.includes(userInput))  {
    resultArea.innerHTML = "You've already guessed this number.<br> Please guess a different number." 

    return; 
  }

  
  remainingChances --; 
  chanceArea.textContent = (remainingChances === 1) ? `chance : ${remainingChances}` : `chances : ${remainingChances}`;

  
  
  if(remainingChances == 0){
    gameOver = true;
    inputButton.disabled = true;
    chanceArea.textContent = "No more Chances left, try again!"
    return; // 찬스가 남지 않으면 더 이상 게임 진행하지 않음
  }
   
  if(userInput > computerNum){
    resultArea.textContent =  `My number is smaller than ${userInput}`
  }else if(userInput < computerNum){
    resultArea.textContent = `My number is greater than ${userInput}`
  }else {
    resultArea.textContent = "Congratulations! that was my number!"
    gameOver = true;
  }

     
  inputList.push(userInput) 
  console.log(inputList) 
}



function reset() {
  inputValue.value = ''; 
    resultArea.textContent = "Guess My Number!"
    chanceArea.textContent = "chances: 3"
    answerArea.textContent =  "정답 : " + computerNum
    
    
    pickRandomNum();
    remainingChances = 3;
    inputButton.disabled = false; 
    inputList = [];
  
    
}

function handleInputEvent(event) {
  if(event.type === "focus"){
   inputValue.value = ''
  }
 
  if(event.type === "keydown" && event.key == "Enter"){
   inputButton.click();
   inputValue.value = ''
  }
 }

 function pickRandomNum() {
  computerNum = Math.floor(Math.random()*100) + 1;
  answerArea.textContent = `정답: ${computerNum}`; 
  console.log("answer", computerNum)
}


pickRandomNum();