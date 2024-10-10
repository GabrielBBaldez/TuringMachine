
# Máquina de Turing

Este é um projeto de uma Máquina de Turing implementada com Vue.js, que verifica sequências de caracteres para garantir que a quantidade de `'a'` seja igual à quantidade de `'b'`. O projeto apresenta uma interface interativa onde o usuário pode iniciar a máquina automaticamente ou passo a passo, observando as transições e o comportamento da máquina.

## Funcionalidades

- **Iniciar Máquina**: Executa a máquina de forma automática, processando a sentença inserida pelo usuário até a aceitação ou rejeição.
- **Modo Passo a Passo**: Permite a execução manual da máquina, onde cada passo é visualizado em detalhes até que a sentença seja aceita, rejeitada ou até que o usuário resete a máquina.
- **Resetar Máquina**: Limpa o estado atual da máquina, permitindo que uma nova sentença seja inserida e analisada.
- **Geração de Sentenças Aleatórias**: Gera uma sentença aleatória de `'a'` e `'b'` para facilitar os testes.

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript para construção da interface e gerenciamento de estados.
- **HTML e CSS**: Estrutura e estilização da interface.
- **JavaScript**: Implementação da lógica da Máquina de Turing e suas transições.

## Estrutura do Projeto

O projeto está estruturado da seguinte maneira:

- `index.html`: Arquivo principal que contém a estrutura HTML e inclui os scripts do Vue.js e JavaScript.
- `styles.css`: Arquivo CSS utilizado para estilizar a interface da aplicação.
- `app.js`: Arquivo JavaScript que contém toda a lógica da Máquina de Turing e a manipulação do DOM para atualização da interface.

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/maquina-turing-vue.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd maquina-turing-vue
   ```
3. Abra o arquivo `index.html` diretamente no navegador ou sirva a aplicação com um servidor local (como o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VSCode).

## Como Utilizar

1. Insira uma sequência de `'a'` e `'b'` no campo de entrada.
2. Clique em **Iniciar Máquina** para executar o processamento automático da sequência, ou clique em **Passo a Passo** para executar cada transição individualmente.
3. O resultado será exibido indicando se a sentença foi aceita ou rejeitada.
4. Use o botão **Resetar Máquina** para limpar o estado atual e inserir uma nova sequência.
5. Utilize o botão **Gerar Sentença Aleatória** para testar rapidamente diferentes sequências.

## Regras da Máquina de Turing

A máquina segue as seguintes regras para processamento:

1. **Estado Inicial (q0)**:
   - Se encontrar `'a'`, marca como `'X'` e vai para o estado `q2`.
   - Se encontrar `'b'`, marca como `'X'` e vai para o estado `q1`.
   - Se encontrar `'X'`, continua no estado `q0`.
   - Se encontrar o delimitador `'β'`, vai para o estado de aceitação `q4`.

2. **Estado `q1`**:
   - Se encontrar `'a'`, marca como `'X'` e vai para o estado `q3`.
   - Se encontrar `'b'`, continua no estado `q1`.

3. **Estado `q2`**:
   - Se encontrar `'a'`, continua no estado `q2`.
   - Se encontrar `'b'`, marca como `'X'` e vai para o estado `q3`.

4. **Estado `q3`**:
   - Se encontrar `'a'` ou `'b'`, move-se para a esquerda para continuar o processamento.

5. **Estado de Aceitação (q4)**:
   - Estado final que indica que a sentença foi aceita.

