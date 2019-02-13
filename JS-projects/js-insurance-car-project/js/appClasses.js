//variables
const form = document.getElementById('request-quote');
const html = new HTMLUI();


//Event Listeners
eventListeners();

function eventListeners(){
	document.addEventListener('DOMContentLoaded', function(){
		//create the <option> for the years
		html.displayYears();
	});

	//when the form is submitted
	form.addEventListener('submit', function(e){
		e.preventDefault();

		//read the values from the form
		const make = document.getElementById('make').value;
		const year = document.getElementById('year').value;
		//read the radio buttons
		const level = document.querySelector('input[name="level"]:checked').value;
		
		//checking that all fields have content
		if(make === '' || year === '' || level === ''){
			html.displayError('You should fill all the fields!');
		} else{
			//clear the previous quotes
			const prevResult = document.querySelector('#result div');
			if(prevResult != null){
				prevResult.remove();
			}

			//make the quotation
			const insurance = new Insurance(make, year, level);
			const price = insurance.calculateQuotation(insurance);

			//print the result from HTMLUI()
			html.showResults(price, insurance);
		}
	});
}
