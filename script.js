class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement; 
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined; 
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return; 
        this.currentOperand = this.currentOperand.toString() + number.toString(); 
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return; 
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation; 
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''; 
    }

    compute() {
        let computation; 
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return; 
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷': 
                computation = prev / current
                break
            default: 
                return
        }
        this.currentOperand = computation; 
        this.operation = undefined; 
        this.previousOperand = ''; 
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString(); 
        const integerDidgits = parseFloat(stringNumber.split('.')[0]);
        const decimalDidgits = stringNumber.split('.')[1];
        let integerDisplay; 
        if(isNaN(integerDidgits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDidgits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDidgits != null) {
            return `${integerDisplay}.${decimalDidgits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = ''; 
        }
    }
}


const numberButtons = document.querySelectorAll('#number');
const operationButtons = document.querySelectorAll('#operation');
const equalsButton = document.querySelector('#equals');
const deleteButton = document.querySelector('#delete');
const allClearButton = document.querySelector('#allClear');
const previousOperandElement = document.querySelector('#previousOperand');
const currentOperandElement = document.querySelector('#currentOperand');

const calculator = new Calculator(previousOperandElement, currentOperandElement); 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute(); 
    calculator.updateDisplay(); 
})

allClearButton.addEventListener('click', button => {
    calculator.clear(); 
    calculator.updateDisplay(); 
})

deleteButton.addEventListener('click', button => {
    calculator.delete(); 
    calculator.updateDisplay(); 
})