//add instanciate the classes

const cryptoAPI = new CryptoAPI();
const ui = new UI();

// Create the variables

const form = document.getElementById('form');

//add event listener
form.addEventListener('submit', (e) => {
	e.preventDefault();

	//read currency
	const currencySelect = document.getElementById('currency').value;

	//read cryptocurrency
	const cryptoCurrencySelect = document.getElementById('cryptocurrency').value;

	//validate that the selects have something
	if (currencySelect === '' || cryptoCurrencySelect === '') {
		//display an error
		ui.printMessage('You must fill the all options', 'deep-orange darken-4 card-panel');
	} else{
		//query the rest api
		cryptoAPI.queryAPI(currencySelect, cryptoCurrencySelect)
			.then(data => {
				ui.displayResult(data.result[0], currencySelect);
			})
	}
})