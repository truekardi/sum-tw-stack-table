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
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            min-width: 600px;
        }
        #customForm textarea {
            width: 100%;
            margin: 10px 0;
            resize: both;
        }
        #customForm button {
            width: auto;
            padding: 10px;
            font-size: 16px;
        }
        button#calculateButton {
            width: 150px;
            padding: 10px;
            cursor: pointer;
            align-self: flex-start;
            text-align: center;
            margin: 10px 0;
        }
        button#closeButton {
            width: 38px;
            height: 37px;
            background: red;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            align-self: flex-end;
            text-align: center;
            font-size: 16px;
        }
        #results {
            margin-top: 20px;
            font-size: 14px;
        }
        .result {
            text-align: left;
            margin-bottom: 5px;
        }
        .total {
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
        <div id="results"></div>
    `;
    document.body.appendChild(form);

    // Funkce pro výpočet součtu
    function calculateCurrentStackSum(tableString) {
        const rows = tableString.split('[*]');
        rows.shift();

        const players = {};
        let totalSum = 0;

        rows.forEach(row => {
            const columns = row.split('[|]');
            let playerName = columns[1].trim();
            let currentStack = columns[3].replace('.', '');

            let stackValue = parseInt(currentStack, 10);
            if (!isNaN(stackValue)) {
                totalSum += stackValue;
                if (!players[playerName]) {
                    players[playerName] = 0;
                }
                players[playerName] += stackValue;
            }
        });

        const nicknames = Object.keys(players).join(';') + ';';
        const playersSums = Object.entries(players)
            .map(([player, sum]) => ({ player, sum }))
            .sort((a, b) => b.sum - a.sum)
            .map(entry => `${entry.player}: ${entry.sum} Obyvatel`);
        const fullFarms = (totalSum / 20000).toFixed(1);

        return {
            nicknames: nicknames,
            playersSums: playersSums,
            total: `Celkem ${totalSum} obyvatel, ${fullFarms} SD`
        };
    }

    // Přidání event listeneru na tlačítko "OK"
    document.getElementById('calculateButton').addEventListener('click', function() {
        const tableString = document.getElementById('tableInput').value;
        const result = calculateCurrentStackSum(tableString);
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        // Vytvoření divů pro výsledky
        const nicknamesDiv = document.createElement('div');
        nicknamesDiv.className = 'result';
        nicknamesDiv.textContent = result.nicknames;
        resultsDiv.appendChild(nicknamesDiv);

        result.playersSums.forEach(playerSum => {
            const playerSumDiv = document.createElement('div');
            playerSumDiv.className = 'result';
            playerSumDiv.textContent = playerSum;
            resultsDiv.appendChild(playerSumDiv);
        });

        const totalDiv = document.createElement('div');
        totalDiv.className = 'result total';
        totalDiv.textContent = result.total;
        resultsDiv.appendChild(totalDiv);
    });

    // Přidání event listeneru na tlačítko "X" pro zavření formuláře
    document.getElementById('closeButton').addEventListener('click', function() {
        document.body.removeChild(form);
    });
})();
