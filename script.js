const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let firstNumber = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Number or dot
        if(button.classList.contains('number') || button.classList.contains('dot')) {
            currentInput += value;
            display.value = currentInput;
            buttonAnimate(button);
        }
        // Operator
        else if(button.classList.contains('operator')) {
            if(currentInput === '') return;
            firstNumber = currentInput;
            operator = button.dataset.operator;
            currentInput = '';
            buttonAnimate(button);
        }
        // Equals
        else if(button.id === 'equals') {
            if(currentInput === '' || firstNumber === '') return;
            display.value = calculate(firstNumber, currentInput, operator);
            currentInput = display.value;
            operator = '';
            firstNumber = '';
            buttonAnimate(button);
        }
        // Clear
        else if(button.id === 'clear') {
            currentInput = '';
            firstNumber = '';
            operator = '';
            display.value = '';
            buttonAnimate(button);
        }
    });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    const keyMap = {
        'Enter': 'equals',
        'Backspace': 'clear',
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        '.': '.'
    };

    if(!isNaN(e.key) || e.key === '.') {
        currentInput += e.key;
        display.value = currentInput;
    } else if(['+', '-', '*', '/'].includes(e.key)) {
        if(currentInput === '') return;
        firstNumber = currentInput;
        operator = e.key;
        currentInput = '';
    } else if(e.key === 'Enter') {
        if(currentInput === '' || firstNumber === '') return;
        display.value = calculate(firstNumber, currentInput, operator);
        currentInput = display.value;
        operator = '';
        firstNumber = '';
    } else if(e.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }
});

// Calculation logic
function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return 'Error';
    }
}

// Button floating animation
function buttonAnimate(button) {
    button.style.transform = 'scale(1.1)';
    setTimeout(() => button.style.transform = 'scale(1)', 150);
}
