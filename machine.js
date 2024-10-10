// Definindo os estados e suas transições
const states = {
    q0: {
        '●': ['q0', '●', 'D'],
        'a': ['q2', 'X', 'D'],
        'b': ['q1', 'X', 'D'],
        'X': ['q0', 'X', 'D'],
        'β': ['q4', 'β', 'D']
    },
    q1: {
        'a': ['q3', 'X', 'E'],
        'b': ['q1', 'b', 'D'],
        'X': ['q1', 'X', 'D']
    },
    q2: {
        'a': ['q2', 'a', 'D'],
        'b': ['q3', 'X', 'E'],
        'X': ['q2', 'X', 'D']
    },
    q3: {
        'a': ['q3', 'a', 'E'],
        'b': ['q3', 'b', 'E'],
        'X': ['q0', 'X', 'D']
    },
    q4: {}
};

let currentState = 'q0';
let headPosition = 0;
let steps = [];
let hasFinished = false;
let tape = [];

function startMachine() {
    const input = document.getElementById('inputSentence').value.trim();
    if (!input) {
        alert("Por favor, insira uma sentença.");
        return;
    }

    tape = ['●', ...input.split(''), 'β'];
    headPosition = 0;
    currentState = 'q0';
    steps = [];
    hasFinished = false;

    document.querySelector('button[onclick="startMachine()"]').disabled = true;
    document.querySelector('button[onclick="stepMachine()"]').disabled = true;

    executeStep();
}

function executeStep() {
    if (hasFinished) return;

    const symbol = tape[headPosition];
    const transition = states[currentState][symbol];

    if (!transition) {
        handleError();
        return;
    }

    const [nextState, writeSymbol, moveDirection] = transition;

    tape[headPosition] = writeSymbol;
    currentState = nextState;

    if (moveDirection === 'D') {
        headPosition++;
    } else if (moveDirection === 'E') {
        headPosition--;
    }

    steps.push({
        step: steps.length + 1,
        state: currentState,
        tape: tape.join(''),
        headPosition: headPosition,
        error: false
    });

    updateStepsTable();

    if (currentState === 'q4') {
        document.getElementById('result').innerText = `Sentença aceita após ${steps.length} passos.`;
        resetButtons();
        hasFinished = true;
        return;
    }

    setTimeout(executeStep, 800);
}

function stepMachine() {
    if (hasFinished) return; 

    const input = document.getElementById('inputSentence').value.trim();

    
    if (steps.length === 0) {
        if (!input) {
            alert("Por favor, insira uma sentença.");
            return;
        }
        tape = ['●', ...input.split(''), 'β']; 
        headPosition = 0;
        currentState = 'q0';
        steps = [];
        hasFinished = false; 
    }

    const symbol = tape[headPosition];
    const transition = states[currentState][symbol];

    if (!transition) {
        handleError();
        return;
    }

    const [nextState, writeSymbol, moveDirection] = transition;

    tape[headPosition] = writeSymbol;
    currentState = nextState;

    
    if (moveDirection === 'D') {
        headPosition++;
    } else if (moveDirection === 'E') {
        headPosition--;
    }

    
    steps.push({
        step: steps.length + 1,
        state: currentState,
        tape: tape.join(''),
        headPosition: headPosition,
        error: false
    });

    
    updateStepsTable(); 

    
    if (currentState === 'q4') {
        document.getElementById('result').innerText = `Sentença aceita após ${steps.length} passos.`;
        resetButtons(); 
        hasFinished = true; 
        return;
    }
}

function handleError() {
    steps.push({
        step: steps.length + 1,
        state: currentState,
        tape: tape.join(''),
        headPosition: headPosition,
        error: true
    });

    updateStepsTable(true);
    document.getElementById('result').innerText = `Sentença rejeitada no estado ${currentState} após ${steps.length} passos.`;
    resetButtons();
    hasFinished = true;
}

function updateStepsTable(isError = false) {
    const tableBody = document.querySelector('#stepsTable tbody');
    const lastStep = steps[steps.length - 1];
    const row = document.createElement('tr');

    if (isError) {
        row.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    } else {
        row.style.backgroundColor = currentState === 'q4' ? 'rgba(0, 255, 0, 0.5)' : 'transparent';
    }

    const highlightedTape = tape.map((symbol, index) => {
        return index === headPosition ? `<strong style="color: blue;">${symbol}</strong>` : symbol;
    }).join('');

    row.innerHTML = `
        <td>${lastStep.step}</td>
        <td>${lastStep.state}</td>
        <td>${highlightedTape}</td>
        <td>${headPosition}</td>
    `;
    tableBody.appendChild(row);
}

function resetButtons() {
    document.querySelector('button[onclick="startMachine()"]').disabled = false;
    document.querySelector('button[onclick="stepMachine()"]').disabled = false;
}

function resetMachine() {
    tape = [];
    currentState = 'q0';
    headPosition = 0;
    steps = [];
    hasFinished = false;
    document.getElementById('inputSentence').value = '';
    document.getElementById('stepsTable').querySelector('tbody').innerHTML = '';
    document.getElementById('result').innerText = '';
    resetButtons();
}

function generateRandomSentence() {
    const length = Math.floor(Math.random() * 8) + 1;
    let sentence = '';

    for (let i = 0; i < length; i++) {
        sentence += Math.random() < 0.5 ? 'a' : 'b';
    }

    document.getElementById('inputSentence').value = sentence;
}

document.getElementById('inputSentence').addEventListener('input', function(event) {
    const validInput = event.target.value.replace(/[^ab]/g, '');
    if (event.target.value !== validInput) {
        event.target.value = validInput;
    }
});
