let display = document.getElementById('result');
let currentExpression = '';
let lastAnswer = null;

function appendToDisplay(value) {
    // If the last character is an operator and the new value is also an operator, replace it
    const lastChar = currentExpression.slice(-1);
    const operators = ['+', '-', '*', '/'];
    
    if (operators.includes(lastChar) && operators.includes(value)) {
        currentExpression = currentExpression.slice(0, -1) + value;
    } else {
        currentExpression += value;
    }
    display.value = currentExpression;
}

function clearDisplay() {
    currentExpression = '';
    display.value = '';
}

function calculate() {
    try {
        // Replace × with * for calculation
        const expression = currentExpression.replace(/×/g, '*');
        lastAnswer = eval(expression);
        display.value = lastAnswer;
        currentExpression = lastAnswer.toString();
    } catch (error) {
        display.value = 'Error';
        currentExpression = '';
    }
}

function verifyAnswer() {
    if (lastAnswer === null) {
        alert('Please perform a calculation first!');
        return;
    }
    
    document.getElementById('verificationQuestion').textContent = 
        `Is ${currentExpression} = ${lastAnswer} correct?`;
    document.getElementById('verificationModal').style.display = 'flex';
}

function handleVerification(isCorrect) {
    const modal = document.getElementById('verificationModal');
    
    if (!isCorrect) {
        alert('Ja re lawde chutiya samjha hai kya???');
    } else {
        alert('chal bhagg jake maths sikh pehle!');
    }
    
    modal.style.display = 'none';
}

function closeModal() {
    document.getElementById('verificationModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('verificationModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9+\-*/.\/]/.test(key)) {
        event.preventDefault();
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        currentExpression = currentExpression.slice(0, -1);
        display.value = currentExpression;
    }
});
