let displayValue = '';

function appendNumber(number) {
  
  if (number === '.' && displayValue.slice(-1) === '.') return;

  displayValue += number;
  updateDisplay();
}

function appendOperator(operator) {
  
  if (displayValue && !'+-×÷'.includes(displayValue.slice(-1))) {
    displayValue += operator;
  } else if (operator === '-' && displayValue.slice(-1) !== '-') {
    
    displayValue += operator;
  }
  updateDisplay();
}

function clearDisplay() {
  displayValue = '';
  updateDisplay();
}

function deleteLast() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
   
    const expression = displayValue
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');

    
    const result = Function(`'use strict'; return (${expression})`)();
    displayValue = result.toString();
  } catch (error) {
    displayValue = 'Error';
  }
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('display').innerText = displayValue || '0';
}


document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('clear')) {
      clearDisplay();
    } else if (button.classList.contains('delete')) {
      deleteLast();
    } else if (button.classList.contains('equals')) {
      calculate();
    } else if (['+', '−', '×', '÷'].includes(button.innerText)) {
      appendOperator(button.innerText);
    } else {
      appendNumber(button.innerText);
    }
  });
});
