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
    q4: {} // Estado de aceitação, sem transições
};

// Variáveis globais para o funcionamento da máquina
let tape = [];
let currentState = 'q0';
let headPosition = 0;
let steps = [];
let hasFinished = false; // Variável para controlar se a máquina já terminou

// Inicia a máquina
function startMachine() {
    const input = document.getElementById('inputSentence').value.trim();
    if (!input) {
        alert("Por favor, insira uma sentença.");
        return;
    }

    // Inicializa a fita
    tape = ['●', ...input.split(''), 'β']; // Adicionando os delimitadores no início e no fim
    headPosition = 0;
    currentState = 'q0';
    steps = [];
    hasFinished = false; // Reseta o controle de término

    // Desabilita os botões
    document.querySelector('button[onclick="startMachine()"]').disabled = true;
    document.querySelector('button[onclick="stepMachine()"]').disabled = true;

    // Executa a máquina automaticamente
    executeStep();
}

// Executa um passo da máquina
function executeStep() {
    if (hasFinished) return; // Se já terminou, não faz nada

    const symbol = tape[headPosition];
    const transition = states[currentState][symbol];

    // Se não há transição, a sentença é rejeitada
    if (!transition) {
        steps.push({
            step: steps.length + 1,
            state: currentState,
            tape: tape.join(''),
            headPosition: headPosition,
            error: true
        });

        updateStepsTable(true); // Passo rejeitado
        document.getElementById('result').innerText = `Sentença rejeitada no estado ${currentState} após ${steps.length} passos.`;
        resetButtons(); // Reseta os botões
        hasFinished = true; // Marca como terminado
        return;
    }

    // Desestrutura a transição
    const [nextState, writeSymbol, moveDirection] = transition;

    // Atualiza a fita e o estado
    tape[headPosition] = writeSymbol;
    currentState = nextState;

    // Move a cabeça de leitura
    if (moveDirection === 'D') {
        headPosition++;
    } else if (moveDirection === 'E') {
        headPosition--;
    }

    // Salva o passo
    steps.push({
        step: steps.length + 1,
        state: currentState,
        tape: tape.join(''),
        headPosition: headPosition,
        error: false
    });

    // Atualiza a interface
    updateStepsTable(); // Passo aceito

    // Se chegar ao estado final
    if (currentState === 'q4') {
        document.getElementById('result').innerText = `Sentença aceita após ${steps.length} passos.`;
        resetButtons(); // Reseta os botões
        hasFinished = true; // Marca como terminado
        return;
    }

    // Continua executando o próximo passo
    setTimeout(executeStep, 800);
}

// Executa a máquina um passo de cada vez
function stepMachine() {
    if (hasFinished) return; // Se já terminou, não faz nada

    const input = document.getElementById('inputSentence').value.trim();

    // Se a fita não foi inicializada, inicializa com a sentença inserida
    if (steps.length === 0) {
        if (!input) {
            alert("Por favor, insira uma sentença.");
            return;
        }
        tape = ['●', ...input.split(''), 'β']; // Inicializa a fita
        headPosition = 0;
        currentState = 'q0';
        steps = [];
        hasFinished = false; // Reseta o controle de término
    }

    const symbol = tape[headPosition];
    const transition = states[currentState][symbol];

    // Se não há transição, a sentença é rejeitada
    if (!transition) {
        steps.push({
            step: steps.length + 1,
            state: currentState,
            tape: tape.join(''),
            headPosition: headPosition,
            error: true
        });

        updateStepsTable(true); // Passo rejeitado
        document.getElementById('result').innerText = `Sentença rejeitada no estado ${currentState} após ${steps.length} passos.`;
        resetButtons(); // Reseta os botões
        hasFinished = true; // Marca como terminado
        return;
    }

    // Desestrutura a transição
    const [nextState, writeSymbol, moveDirection] = transition;

    // Atualiza a fita e o estado
    tape[headPosition] = writeSymbol;
    currentState = nextState;

    // Move a cabeça de leitura
    if (moveDirection === 'D') {
        headPosition++;
    } else if (moveDirection === 'E') {
        headPosition--;
    }

    // Salva o passo
    steps.push({
        step: steps.length + 1,
        state: currentState,
        tape: tape.join(''),
        headPosition: headPosition,
        error: false
    });

    // Atualiza a interface
    updateStepsTable(); // Passo aceito

    // Se chegar ao estado final
    if (currentState === 'q4') {
        document.getElementById('result').innerText = `Sentença aceita após ${steps.length} passos.`;
        resetButtons(); // Reseta os botões
        hasFinished = true; // Marca como terminado
        return;
    }
}

// Reseta a máquina para um novo ciclo
function resetMachine() {
    tape = [];
    currentState = 'q0';
    headPosition = 0;
    steps = [];
    hasFinished = false; // Reseta o controle de término
    document.getElementById('inputSentence').value = '';
    document.getElementById('stepsTable').querySelector('tbody').innerHTML = '';
    document.getElementById('result').innerText = '';
    resetButtons(); // Reseta os botões
}

// Função para reabilitar os botões
function resetButtons() {
    document.querySelector('button[onclick="startMachine()"]').disabled = false;
    document.querySelector('button[onclick="stepMachine()"]').disabled = false;
}

// Atualiza a tabela de passos
function updateStepsTable(isError = false) {
    const tableBody = document.querySelector('#stepsTable tbody');
    const lastStep = steps[steps.length - 1];
    const row = document.createElement('tr');

    // Define a cor da linha com base no resultado
    if (isError) {
        row.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; // Vermelho para erro
    } else {
        row.style.backgroundColor = currentState === 'q4' ? 'rgba(0, 255, 0, 0.5)' : 'transparent'; // Verde se aceito, transparente se não
    }

    row.innerHTML = `
        <td>${lastStep.step}</td>
        <td>${lastStep.state}</td>
        <td>${lastStep.tape}</td>
        <td>${lastStep.headPosition}</td>
    `;
    tableBody.appendChild(row);
}

// Função para gerar uma sentença aleatória com 'a' e 'b'
function generateRandomSentence() {
    const length = Math.floor(Math.random() * 8) + 1; // Gera um comprimento entre 1 e 8
    let sentence = '';

    for (let i = 0; i < length; i++) {
        sentence += Math.random() < 0.5 ? 'a' : 'b'; // Adiciona 'a' ou 'b' aleatoriamente
    }

    document.getElementById('inputSentence').value = sentence; // Coloca a sentença gerada no input
}

document.getElementById('inputSentence').addEventListener('input', function(event) {
    const validInput = event.target.value.replace(/[^ab]/g, ''); // Remove tudo que não é 'a' ou 'b'
    if (event.target.value !== validInput) {
        event.target.value = validInput; // Atualiza o valor do input se houver caracteres inválidos
    }
});
