import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Calculator() {
  const [display, setDisplay] = React.useState('0');
  const [waitingForSecondOperand, setWaitingForSecondOperand] = React.useState(false);
  const [operator, setOperator] = React.useState(null);
  const [firstOperand, setFirstOperand] = React.useState(null);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit.toString());
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit.toString() : display + digit);
    }
  };

  const inputDecimal = (dot) => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!display.includes(dot)) {
      setDisplay(display + dot);
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
    }
    return secondOperand;
  };

  const resetCalculator = () => {
    setDisplay('0');
    setWaitingForSecondOperand(false);
    setOperator(null);
    setFirstOperand(null);
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-keys">
        <button className="operator" onClick={() => resetCalculator()}>
          AC
        </button>
        <button className="operator" onClick={() => handleOperator('/')}>
          ÷
        </button>
        <button className="operator" onClick={() => handleOperator('*')}>
          ×
        </button>
        <button className="operator" onClick={() => handleOperator('-')}>
          −
        </button>
        <button className="digit" onClick={() => inputDigit(7)}>
          7
        </button>
        <button className="digit" onClick={() => inputDigit(8)}>
          8
        </button>
        <button className="digit" onClick={() => inputDigit(9)}>
          9
        </button>
        <button className="operator" onClick={() => handleOperator('+')}>
          +
        </button>
        <button className="digit" onClick={() => inputDigit(4)}>
          4
        </button>
        <button className="digit" onClick={() => inputDigit(5)}>
          5
        </button>
        <button className="digit" onClick={() => inputDigit(6)}>
          6
        </button>
        <button className="digit" onClick={() => inputDigit(1)}>
          1
        </button>
        <button className="digit" onClick={() => inputDigit(2)}>
          2
        </button>
        <button className="digit" onClick={() => inputDigit(3)}>
          3
        </button>
        <button className="digit zero" onClick={() => inputDigit(0)}>
          0
        </button>
        <button className="operator" onClick={() => inputDecimal('.')}>
          .
        </button>
        <button className="operator" onClick={() => handleOperator('=')}>=
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
