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

//Objects


//everything related to the calculation and quotations is Insurance
function Insurance(make, year, level){
	this.make = make;
	this.year = year;
	this.level = level;
}

//calculate the price for the current quotation
Insurance.prototype.calculateQuotation = function(insurance){
	let price;
	const base = 2000;

	//get the make
	const make = insurance.make;
	switch(make){
		case '1':
			price = base*1.15;
			break;
		case'2':
			price = base*1.05;
			break;
		case '3':
			price = base*1.35;
			break;
	}

	//get a year
	const year = insurance.year;

	//get the years differencev
	const difference = this.getYearDifference(year);

	//each year the cost of the insurance is going to be 3% cheaper
	price = price - ((difference*3)*price)/100;

	//check the level of protection
	const level = insurance.level;

	price = this.calculateLevel(price, level);
	return price.toFixed(2);
	//console.log(price.toFixed(2));
}

//returns the difference between years
Insurance.prototype.getYearDifference = function(year){
	return new Date().getFullYear() - year;
}

//adds the value based on the level of protection
Insurance.prototype.calculateLevel = function(price, level){
	if (level === 'basic') {
		price = price*1.30;
	} else{
		price = price*1.50;
	}
	return price;
}

//everything related to the HTML
function HTMLUI(){}

//Display the latest 20years in the select
HTMLUI.prototype.displayYears = function(){
	//max&min years
	const max = new Date().getFullYear(),
		  min = max - 20;
	//generate the list of last 20 years
	const selectYears = document.getElementById('year');
	//print the value
	for (let i = max; i > min; i--){
		const option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		selectYears.appendChild(option);
	}
}

//prints an error
HTMLUI.prototype.displayError = function(message){
	//create a div
	const div = document.createElement('div');
	div.classList = 'error';

	//insert the message
	div.innerHTML = `
		<p>${message}</p>
	`;

	form.insertBefore(div, document.querySelector('.form-group'));

	//remove the error

	setTimeout(function(){
		document.querySelector('.error').remove();
	}, 3000);
}

//print the result into the  HTML
HTMLUI.prototype.showResults = function(price, insurance){
	//print the result
	const result = document.getElementById('result');

	//create a div with the result
	const div = document.createElement('div');

	//get Make from the object and assign a readable name
	let make = insurance.make;

	switch(make){
		case '1':
			make = 'American';
			break;
		case '2':
			make = 'Asian';
			break;
		case '3':
			make = 'European';
			break;
	}

	//insert the result
	div.innerHTML = `
		<p class="header">Summary</p>
		<p>Country: ${make}</p>
		<p>Year: ${insurance.year}</p>
		<p>Level: ${insurance.level}</p>
		<p>Total: $ ${price} </p>
	`;

	const spinner = document.querySelector('#loading img');
	spinner.style.display = 'block';

	setTimeout(function(){
		spinner.style.display = 'none';
		//insert this into the HTML
		result.appendChild(div);
	}, 2000);
}