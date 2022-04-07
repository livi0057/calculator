class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    /**
     * Clears all in the display.
     */
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    /**
     * Deletes the last number in the current operand.
     */
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    /**
     * Concatenates the clicked number to the current operand.
     * 
     * @param {Number} number The number to concat with the current operand.
     * @returns The concatenated number.
     */
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    /**
     * Sets the current type of operation. Checks that the user has an operand that is
     * currently entered and that there is a previously entered operand. If the exists 
     * an current and previous operand the result can be computed from the two operands.
     * 
     * Sets the previous operand to the current operand, as well as clears the display 
     * of the current operand.
     * 
     * @param {String} operation The operation of the button clicked.
     * @returns If there is no current operand entered.
     */
    chooseOperation(operation) {
        if(this.currentOperand === '') {
            return;
        }
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    /**
     * Computes the result of the previous and current operand. 
     * 
     * Sets the current operand to the computed value. Clears the operation value and
     * the previous operand. 
     * 
     * @returns If the previous och current operand is not a number, or if the
     * operation type is incorrect. 
     */
    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previous) || isNaN(current)) {
            return;
        }
        switch(this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case 'x':
                computation = previous * current;
                break;
            case '÷':
                computation = previous / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    /**
     * Helper function to display the current operand in a good format. 
     * 
     * @param {Number} number 
     * @returns 
     */
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('sv', { maximumFractionDigits: 0 });
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    /**
     * Updates the displayed operands.
     */
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add an event listener to every number button
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

// Add an event listener to every operation button
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

// Add an event listener to the equals button
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

// Add an event listener to the AC-button
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

// Add an event listener to the delete button
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});