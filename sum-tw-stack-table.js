(function() {
    // CSS styly pro formulář
    const style = `
        #customForm {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border: 1px solid black;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            z-index: 10000;
        }
        #customForm textarea, #customForm button {
            display: block;
            width: 100%;
            margin: 10px 0;
        }
        #closeButton {
            position: absolute;
            top: 5px;
            right: 5px;
            background: red;
            color: white;
            border: none;
            padding: 5px;
            cursor: pointer;
        }
        #result {
            margin-top: 20px;
            font-size: 20px;
            font-weight: bold;
        }
    `;

    // Vložit CSS do stránky
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);

    // Vytvoření formuláře
    const form = document.createElement('div');
    form.id = 'customForm';
    form.innerHTML = `
        <button id="closeButton">X</button>
        <textarea id="tableInput" rows="10" placeholder="Vložte tabulku zde..."></textarea>
        <button id="calculateButton">OK</button>
        <div id="result"></div>
    `;
    document.body.appendChild(form);

    // Funkce pro výpočet součtu
    function calculateCurrentStackSum(tableString) {
        const rows = tableString.split('[*]');
        rows.shift();

        const currentStacks = rows.map(row => {
            const columns = row.split('[|]');
            let currentStack = columns[3];
            currentStack = currentStack.replace('.', '');
            return parseInt(currentStack, 10);
        }).filter(value => !isNaN(value));

        const sum = currentStacks.reduce((acc, stack) => acc + stack, 0);
        const fullFarms = (sum / 20000).toFixed(1);

        return `Celkem ${sum} obyvatel, ${fullFarms} SD`;
    }

    // Přidání event listeneru na tlačítko "OK"
    document.getElementById('calculateButton').addEventListener('click', function() {
        const tableString = document.getElementById('tableInput').value;
        const result = calculateCurrentStackSum(tableString);
        document.getElementById('result').textContent = result;
    });

    // Přidání event listeneru na tlačítko "X" pro zavření formuláře
    document.getElementById('closeButton').addEventListener('click', function() {
        document.body.removeChild(form);
    });
})();
