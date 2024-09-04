let basicDisplay = document.getElementById('basicDisplay');
let scientificDisplay = document.getElementById('scientificDisplay');
let chart;
const ctx = document.getElementById('graph').getContext('2d');

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = tab.id === tabId ? 'block' : 'none';
    });
}

function appendToBasicDisplay(value) {
    if (value === 'C') {
        basicDisplay.value = '';
    } else {
        basicDisplay.value += value;
    }
}

function calculateBasic() {
    try {
        const result = eval(basicDisplay.value);
        basicDisplay.value = result;
    } catch (error) {
        basicDisplay.value = 'Error';
    }
}

function appendToScientificDisplay(value) {
    if (value === 'C') {
        scientificDisplay.value = '';
    } else {
        scientificDisplay.value += value;
    }
}

function calculateScientific() {
    try {
        let expression = scientificDisplay.value;
        expression = expression.replace(/Math\.(sin|cos|tan|log|exp|sqrt|pow)\(/g, '$1(');
        expression = expression.replace(/(\d+)\(/g, '$1*(');
        const result = eval(expression);
        scientificDisplay.value = result;
    } catch (error) {
        scientificDisplay.value = 'Error';
    }
}

function plotGraph() {
    const funcInput = document.getElementById('graphFunctionInput').value;
    const expression = funcInput.replace(/x/g, 't');

    if (chart) {
        chart.destroy();
    }

    try {
        const data = [];
        for (let t = -10; t <= 10; t += 0.1) {
            const y = eval(expression);
            data.push({ x: t, y: y });
        }

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'f(x) = ' + funcInput,
                    data: data,
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    fill: true
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'x'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'f(x)'
                        }
                    }
                }
            }
        });
    } catch (error) {
        alert('Invalid function. Please enter a valid mathematical function.');
    }
}

function calculateFinancial() {
    const input = document.getElementById('financialInput').value;
    // Simple example for compound interest calculation
    const [principal, rate, times, years] = input.split(',').map(Number);
    const result = principal * Math.pow(1 + rate / times, times * years);
    document.getElementById('financialResult').innerText = `Future Value: ${result.toFixed(2)}`;
}

function calculateStats() {
    const input = document.getElementById('statsInput').value;
    const numbers = input.split(',').map(Number);
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const variance = numbers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numbers.length;
    const stddev = Math.sqrt(variance);
    document.getElementById('statsResult').innerText = `Mean: ${mean.toFixed(2)}, Std Dev: ${stddev.toFixed(2)}`;
}

// Initialize with the Basic Calculator tab visible
showTab('basic');
