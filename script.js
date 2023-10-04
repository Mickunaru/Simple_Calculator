class Calculator {
  constructor(previousOperandTxt, currentOperandTxt) {
    this.previousOperandTxt = previousOperandTxt;
    this.currentOperandTxt = currentOperandTxt;
    this.clear();
  }

  clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOp(op) {
    if(this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.operate();
    }
    this.operation = op;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  
  operate() {
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case '+':
        this.currentOperand = prev + curr;
        break;
      case '-':
        this.currentOperand = prev - curr;
        break;
      case 'x':
        this.currentOperand = prev * curr;
        break;
      case '÷':
        this.currentOperand = prev / curr;
        break;
      default:
        return;
    }
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandTxt.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTxt.innerText = 
      `${this.previousOperand} ${this.operation} `;
    }
    else {
      this.previousOperandTxt.innerText = this.previousOperand;
    }
  }
}

const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operation]')
const acButton = document.querySelector('[data-all-clear]')
const delButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTxt = document.querySelector('[data-previous]')
const currentOperandTxt = document.querySelector('[data-current]')

const calculator = new Calculator(previousOperandTxt, currentOperandTxt);

numButtons.forEach(button => {
  button.addEventListener('click', ()=>{
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    console.log(button.innerText)
  })
})

opButtons.forEach(button => {
  button.addEventListener('click', ()=>{
    calculator.chooseOp(button.innerText);
    calculator.updateDisplay();
  })
})

delButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
  calculator.operate();
  calculator.updateDisplay();
})

acButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})