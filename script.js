const currency_one = document.getElementById('first-currency');
const currency_two = document.getElementById('second-currency');
const amount_one = document.getElementById('first-amount');
const amount_two = document.getElementById('second-amount');
const rateElement = document.getElementById('rate');
const swapBtn = document.getElementById('swap');

// Fetch rates and update DOM
const convert = () => {
	const firstCurrency = currency_one.value;
	const secondCurrency = currency_two.value;

	fetch(`https://api.exchangerate-api.com/v4/latest/${firstCurrency}`)
	.then(res => res.json())
	.then((data) => {
		// console.log(data)
		const rate = data.rates[secondCurrency];

		rateElement.innerText = `1 ${firstCurrency} = ${rate} ${secondCurrency}`;

		//toFixed(2) fixes amount_two.value to 2 decimal places 
		amount_two.value = (amount_one.value * rate).toFixed(2);
	});

}

// swap functiom
const swapFunc = () => {
	const tempValue = currency_one.value;
	currency_one.value = currency_two.value;
	currency_two.value = tempValue;

	convert();
}

// Event Listeners 
currency_one.addEventListener('change', convert);
currency_two.addEventListener('change', convert);
amount_one.addEventListener('input', convert);
amount_two.addEventListener('input', convert);

swap.addEventListener('click', swapFunc);

convert()