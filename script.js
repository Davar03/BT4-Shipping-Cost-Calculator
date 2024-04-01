const shippingCosts = {
    'germany':3500,
    'sweden': 5500,
    'uk': 6500,
    'denmark': 5000,
    'netherlands': 5000,
    'austria': 10000,
    'finland': 10000,
    'belgium': 5000,
    'switzerland': 6500,
    'france': 10000
};

const productCostPerKg = 32000;

const shippingCostsList = document.getElementById('shipping-costs-list');

// Display shipping costs per kg
for (const country in shippingCosts) {
    const shippingCostPerKg = shippingCosts[country];
    const listItem = document.createElement('li');
    listItem.textContent = `${country}: ${shippingCostPerKg.toLocaleString()} IQD/kg`;
    shippingCostsList.appendChild(listItem);
}

document.getElementById('calculate-btn').addEventListener('click', function() {
    const productWeight = parseFloat(document.getElementById('product-weight').value);
    const packagingWeight = parseFloat(document.getElementById('packaging-weight').value);
    
    if (isNaN(productWeight) || isNaN(packagingWeight) || productWeight < 0 || packagingWeight < 0) {
        alert('Please enter valid weights.');
        return;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    for (const country in shippingCosts) {
        const shippingCostPerKg = shippingCosts[country];
        const shippingCost = packagingWeight * shippingCostPerKg;
        const productCost = productWeight * productCostPerKg;
        const totalCost = shippingCost + productCost;

        const resultItem = document.createElement('div');
        resultItem.textContent = `${country}: ${totalCost.toLocaleString()} IQD`;
        resultsDiv.appendChild(resultItem);
    }

    // Show results and copy button
    document.getElementById('input-form').style.display = 'none';
    resultsDiv.style.display = 'block';
    document.getElementById('copy-all-btn').style.display = 'block';
});

document.getElementById('copy-all-btn').addEventListener('click', function() {
    const resultsText = document.getElementById('results').innerText;
    navigator.clipboard.writeText(resultsText)
    .then(() => alert('Copied all results to clipboard!'))
    .catch((error) => console.error('Failed to copy results: ', error));
});
