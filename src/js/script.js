
const term1 = {
	coeficientElement: document.getElementById('term1-coeficient'),
	variableElement: document.getElementById('term1-variable'),
	exponentElement: document.getElementById('term1-exponent'),
	getCoeficient: () => convertInputNumber(term1.coeficientElement.value),
	getVariable: () => convertInputNumber(term1.variableElement.value),
	getExponent: () => convertInputNumber(term1.exponentElement.value)
};

const term2 = {
	coeficientElement: document.getElementById('term2-coeficient'),
	variableElement: document.getElementById('term2-variable'),
	exponentElement: document.getElementById('term2-exponent'),
	getCoeficient: () => convertInputNumber(term2.coeficientElement.value),
	getVariable: () => convertInputNumber(term2.variableElement.value),
	getExponent: () => convertInputNumber(term2.exponentElement.value)
};

const binomial = {
	exponentElement: document.getElementById('binomial-exponent'),
	getExponent: () => convertInputNumber(binomial.exponentElement.value)
}

const calcButton = document.getElementById('calc-btn');
const binomialPreview = document.getElementById('binomial-preview');
const pascalResults = document.getElementById('results-wrapper');

const convertInputNumber = (inputValue='') => {
	if ( ! /-?[1-9]+/.test(inputValue) ) {
		return 1;
	}

	return parseInt(inputValue);
}

const factorizeNum = (number=1) => {
	if (number === 0) {
		return 1;
	}

	return factorizeNum(number - 1) * number;
}

const updatePreview = () => {
	const term1Sign = term1.getCoeficient() > 0 ? '' : ' - ';
	const term2Sign = term2.getCoeficient() > 0 ? ' + ' : ' - ';

	const term1Coeficient = Math.abs(term1.getCoeficient()) !== 1  ? Math.abs(term1.getCoeficient()) : '';
	const term2Coeficient = Math.abs(term2.getCoeficient()) !== 1  ? Math.abs(term2.getCoeficient()) : '';

	const term1Exponent = term1.getExponent() !== 1 ? term1.getExponent() : '';
	const term2Exponent = term2.getExponent() !== 1 ? term2.getExponent() : '';
	const binomialExponent = binomial.getExponent() !== 1 ? binomial.getExponent() : '';

	const term1Variable = term1.variableElement.value !== '' ? `(${term1.getVariable()})`  : 'x';
	const term2Variable = term2.variableElement.value !== '' ? `(${term2.getVariable()})`  : 'y';

	const binomialHTML = `
		<span>(</span>
		<span>${term1Sign}</span>
		<span>${term1Coeficient}</span>
		<span>${term1Variable}</span>
		<sup>${term1Exponent}</sup>
		<span>${term2Sign}</span>
		<span>${term2Coeficient}</span>
		<span>${term2Variable}</span>
		<sup>${term2Exponent}</sup>
		<span>)</span>
		<sup>${binomialExponent}</sup>
	`;

	binomialPreview.innerHTML = binomialHTML;
}

const calculateBaseBinomial = (exponentExpression=1) => {
	const resultBinomial = document.createElement('div');
	const resultTitle = document.createElement('h3');
	let resultsHTMLList = "";

	resultBinomial.id = "results-binomial";
	resultBinomial.className = "results";

	resultTitle.innerText = "(Binomio) ^ " + exponentExpression;
	
	for (let i = 0; i <= exponentExpression; i++) {
		let resultHTML = `<p class="expression">`;
		
		const combinatoric = `
			<span class="expression--vertical">
				<span>${exponentExpression}</span>
				<span>${i}</span>
			</span>
		`;

		const term1Sign = term1.getCoeficient() > 0 ? '' : '-';
		const term2Sign = term2.getCoeficient() > 0 ? '' : '-';
		let combinatoricSign = '+';

		if ((term1Sign !== '' || term2Sign !== '') && (term1Sign !== term2Sign)) {
			combinatoricSign = i % 2 === 0 ? '+' : '-';
		}

		const term1Coeficient = Math.abs(term1.getCoeficient()) !== 1  ? Math.abs(term1.getCoeficient()) : '';
		const term2Coeficient = Math.abs(term2.getCoeficient()) !== 1  ? Math.abs(term2.getCoeficient()) : '';

		const term1Exponent = term1.getExponent() !== 1 ? term1.getExponent() : '';
		const term2Exponent = term2.getExponent() !== 1 ? term2.getExponent() : '';

		const term1OuterExponent = exponentExpression - i;
		const term2OuterExponent = i;

		const term1Variable = term1.variableElement.value !== '' ? `(${term1.getVariable()})`  : 'x';
		const term2Variable = term2.variableElement.value !== '' ? `(${term2.getVariable()})`  : 'y';

		if (i > 0 || combinatoricSign === '-' ) {
			resultHTML += `<span>${combinatoricSign}</span>`;
		}

		resultHTML += `
			<span>(</span>
			${combinatoric}
			<span>)</span>
		`;

		if (term1OuterExponent > 0) {
			resultHTML += `
				<span>(</span>
				<span>${term1Sign}</span>
				<span>${term1Coeficient}</span>
				<span>${term1Variable}</span>
				<sup>${term1Exponent}</sup>
				<span>)</span>
				<sup>${term1OuterExponent !== 1 ? term1OuterExponent : ''}</sup>
			`;
		}

		if (term2OuterExponent > 0) {
			resultHTML += `
				<span>(</span>
				<span>${term2Sign}</span>
				<span>${term2Coeficient}</span>
				<span>${term2Variable}</span>
				<sup>${term2Exponent}</sup>
				<span>)</span>
				<sup>${term2OuterExponent !== 1 ? term2OuterExponent : ''}</sup>
			`;
		}

		resultHTML += `</p>`;
		resultsHTMLList += resultHTML;
	}

	resultBinomial.innerHTML = resultsHTMLList;

	pascalResults.appendChild(resultTitle);
	pascalResults.appendChild(resultBinomial);
}

const calculateCombinatoricBinomial = (exponentExpression) => {
	const resultBinomial = document.createElement('div');
	const resultSeparator = document.createElement('hr');

	let resultsHTMLList = "";

	resultBinomial.id = "results-binomial";
	resultBinomial.className = "results";

	for (let i = 0; i <= exponentExpression; i++) {
		let resultHTML = `<p class="expression">`;
		
		const combinatoric = factorizeNum(exponentExpression) / ( factorizeNum(i) * factorizeNum( (exponentExpression - i) ) );

		const term1Sign = term1.getCoeficient() > 0 ? '' : '-';
		const term2Sign = term2.getCoeficient() > 0 ? '' : '-';
		let combinatoricSign = '+';

		if ((term1Sign !== '' || term2Sign !== '') && (term1Sign !== term2Sign)) {
			combinatoricSign = i % 2 === 0 ? '+' : '-';
		}

		const term1Coeficient = Math.abs(term1.getCoeficient()) != 1  ? Math.abs(term1.getCoeficient()) : '';
		const term2Coeficient = Math.abs(term2.getCoeficient()) != 1  ? Math.abs(term2.getCoeficient()) : '';

		const term1Exponent = term1.getExponent() != 1 ? term1.getExponent() : '';
		const term2Exponent = term2.getExponent() != 1 ? term2.getExponent() : '';

		const term1OuterExponent = exponentExpression - i;
		const term2OuterExponent = i;

		const term1Variable = term1.variableElement.value !== '' ? `(${term1.getVariable()})`  : 'x';
		const term2Variable = term2.variableElement.value !== '' ? `(${term2.getVariable()})`  : 'y';

		if (i > 0 || combinatoricSign == '-' ) {
			resultHTML += `<span>${combinatoricSign}</span>`;
		}

		resultHTML += `
			<span>(</span>
			${combinatoric}
			<span>)</span>
		`;

		if (term1OuterExponent > 0) {
			resultHTML += `
				<span>(</span>
				<span>${term1Sign}</span>
				<span>${term1Coeficient}</span>
				<span>${term1Variable}</span>
				<sup>${term1Exponent}</sup>
				<span>)</span>
				<sup>${term1OuterExponent !== 1 ? term1OuterExponent : ''}</sup>
			`;
		}

		if (term2OuterExponent > 0) {
			resultHTML += `
				<span>(</span>
				<span>${term2Sign}</span>
				<span>${term2Coeficient}</span>
				<span>${term2Variable}</span>
				<sup>${term2Exponent}</sup>
				<span>)</span>
				<sup>${term2OuterExponent !== 1 ? term2OuterExponent : ''}</sup>
			`;
		}

		resultHTML += `</p>`;
		resultsHTMLList += resultHTML;
	}

	resultBinomial.innerHTML = resultsHTMLList;

	pascalResults.appendChild(resultSeparator);
	pascalResults.appendChild(resultBinomial);
}

const calculateExponentsBinomial = (exponentExpression) => {
	const resultBinomial = document.createElement('div');
	const resultSeparator = document.createElement('hr');

	let resultsHTMLList = "";

	resultBinomial.id = "results-binomial";
	resultBinomial.className = "results";

	for (let i = 0; i <= exponentExpression; i++) {
		let resultHTML = `<p class="expression">`;
		
		const combinatoric = factorizeNum(exponentExpression) / ( factorizeNum(i) * factorizeNum( (exponentExpression - i) ) );

		const term1OuterExponent = exponentExpression - i;
		const term2OuterExponent = i;

		const term1Sign = term1.getCoeficient() > 0 || term1OuterExponent % 2 == 0 ? '' : '-';
		const term2Sign = term2.getCoeficient() > 0 || term2OuterExponent % 2 == 0 ? '' : '-';
		let combinatoricSign = '+';

		if ((term1Sign !== '' || term2Sign !== '') && (term1Sign !== term2Sign)) {
			combinatoricSign = i % 2 === 0 ? '+' : '-';
		}

		const term1Coeficient = Math.abs(term1.getCoeficient()) !== 1 ? Math.abs(term1.getCoeficient()) ** term1OuterExponent : '';
		const term2Coeficient = Math.abs(term2.getCoeficient()) !== 1 ? Math.abs(term2.getCoeficient()) ** term2OuterExponent : '';

		const term1Exponent = term1.getExponent() !== 1 || term1OuterExponent !== 1 ? term1.getExponent() * term1OuterExponent : '';
		const term2Exponent = term2.getExponent() !== 1 || term2OuterExponent !== 1 ? term2.getExponent() * term2OuterExponent : '';

		const term1Variable = term1.variableElement.value !== '' ? `(${term1.getVariable()})`  : 'x';
		const term2Variable = term2.variableElement.value !== '' ? `(${term2.getVariable()})`  : 'y';

		if (i > 0 || combinatoricSign == '-' ) {
			resultHTML += `<span>${combinatoricSign}</span>`;
		}

		resultHTML += `
			<span>(</span>
			${combinatoric}
			<span>)</span>
		`;

		if (term1OuterExponent > 0) {
			resultHTML += `
				<span>${term1Sign}</span>
				<span>${term1Coeficient}</span>
				<span>${term1Variable}</span>
				<sup>${term1Exponent}</sup>
			`;
		}

		if (term2OuterExponent > 0) {
			resultHTML += `
				<span>${term2Sign}</span>
				<span>${term2Coeficient}</span>
				<span>${term2Variable}</span>
				<sup>${term2Exponent}</sup>
			`;
		}

		resultHTML += `</p>`;
		resultsHTMLList += resultHTML;
	}

	resultBinomial.innerHTML = resultsHTMLList;

	pascalResults.appendChild(resultSeparator);
	pascalResults.appendChild(resultBinomial);
}

const calculateCoeficentsBinomial = (exponentExpression) => {
	const resultBinomial = document.createElement('div');
	const resultSeparator = document.createElement('hr');

	let resultsHTMLList = "";

	resultBinomial.id = "results-binomial";
	resultBinomial.className = "results";

	for (let i = 0; i <= exponentExpression; i++) {
		let resultHTML = `<p class="expression">`;
		
		const combinatoric = factorizeNum(exponentExpression) / ( factorizeNum(i) * factorizeNum( (exponentExpression - i) ) );

		const term1OuterExponent = exponentExpression - i;
		const term2OuterExponent = i;

		const term1Sign = term1.getCoeficient() > 0 || term1OuterExponent % 2 == 0 ? '' : '-';
		const term2Sign = term2.getCoeficient() > 0 || term2OuterExponent % 2 == 0 ? '' : '-';
		let combinatoricSign = '+';

		if ((term1Sign !== '' || term2Sign !== '') && (term1Sign !== term2Sign)) {
			combinatoricSign = i % 2 === 0 ? '+' : '-';
		}

		const term1Exponent = term1.getExponent() !== 1 || term1OuterExponent !== 1 ? term1.getExponent() * term1OuterExponent : '';
		const term2Exponent = term2.getExponent() !== 1 || term2OuterExponent !== 1 ? term2.getExponent() * term2OuterExponent : '';

		const termCoeficient = Math.abs((term1.getCoeficient() ** term1OuterExponent) * (term2.getCoeficient() ** term2OuterExponent) * combinatoric);

		const term1Variable = term1.variableElement.value !== '' ? `(${term1.getVariable()})`  : 'x';
		const term2Variable = term2.variableElement.value !== '' ? `(${term2.getVariable()})`  : 'y';

		if (i > 0 || combinatoricSign == '-' ) {
			resultHTML += `<span>${combinatoricSign}</span>`;
		}

		resultHTML += `
			<span>${termCoeficient}</span>
		`;

		if (term1OuterExponent > 0) {
			resultHTML += `
				<span>${term1Variable}</span>
				<sup>${term1Exponent}</sup>
			`;
		}

		if (term2OuterExponent > 0) {
			resultHTML += `
				<span>${term2Variable}</span>
				<sup>${term2Exponent}</sup>
			`;
		}

		resultsHTMLList += resultHTML;
	}

	resultBinomial.innerHTML = resultsHTMLList;

	pascalResults.appendChild(resultSeparator);
	pascalResults.appendChild(resultBinomial);
}

const calculateVariablesBinomial = (exponentExpression) => {
	if (term1.variableElement.value === '' && term2.variableElement.value === '') {
		return;
	}

	const resultBinomial = document.createElement('div');
	const resultSeparator = document.createElement('hr');

	let resultsHTMLList = "";

	resultBinomial.id = "results-binomial";
	resultBinomial.className = "results";

	for (let i = 0; i <= exponentExpression; i++) {
		let resultHTML = `<p class="expression">`;
		
		const combinatoric = factorizeNum(exponentExpression) / ( factorizeNum(i) * factorizeNum( (exponentExpression - i) ) );

		const term1OuterExponent = exponentExpression - i;
		const term2OuterExponent = i;

		const term1Sign = term1.getCoeficient() > 0 || term1OuterExponent % 2 == 0 ? '' : '-';
		const term2Sign = term2.getCoeficient() > 0 || term2OuterExponent % 2 == 0 ? '' : '-';
		let combinatoricSign = '+';

		if ((term1Sign !== '' || term2Sign !== '') && (term1Sign !== term2Sign)) {
			combinatoricSign = i % 2 === 0 ? '+' : '-';
		}

		const term1Exponent = term1.getExponent() !== 1 || term1OuterExponent !== 1 ? term1.getExponent() * term1OuterExponent : '';
		const term2Exponent = term2.getExponent() !== 1 || term2OuterExponent !== 1 ? term2.getExponent() * term2OuterExponent : '';

		let termCoeficient = Math.abs((term1.getCoeficient() ** term1OuterExponent) * (term2.getCoeficient() ** term2OuterExponent) * combinatoric);

		const term1Variable = term1.variableElement.value !== '' ? term1.getVariable()  : 'x';
		const term2Variable = term2.variableElement.value !== '' ? term2.getVariable()  : 'y';

		if (term1Variable !== 'x') {
			termCoeficient *= term1Variable ** term1Exponent;
		}

		if (term2Variable !== 'y') {
			termCoeficient *= term2Variable ** term2Exponent;
		}

		if (i > 0 || combinatoricSign == '-' ) {
			resultHTML += `<span>${combinatoricSign}</span>`;
		}

		resultHTML += `
			<span>${termCoeficient}</span>
		`;

		if (term1OuterExponent > 0 && term1Variable === 'x') {
			resultHTML += `
				<span>${term1Variable}</span>
				<sup>${term1Exponent}</sup>
			`;
		}

		if (term2OuterExponent > 0 && term2Variable === 'y') {
			resultHTML += `
				<span>${term2Variable}</span>
				<sup>${term2Exponent}</sup>
			`;
		}

		resultsHTMLList += resultHTML;
	}

	resultBinomial.innerHTML = resultsHTMLList;

	pascalResults.appendChild(resultSeparator);
	pascalResults.appendChild(resultBinomial);
}

const calculateResultBinomial = (exponentExpression) => {
	if (term1.variableElement.value === '' || term2.variableElement.value === '') {
		return;
	}

	const resultBinomial = document.createElement('div');
	const resultSeparator = document.createElement('hr');

	let result = 0;

	resultBinomial.id = "results-binomial";
	resultBinomial.className = "results";

	for (let i = 0; i <= exponentExpression; i++) {
		const combinatoric = factorizeNum(exponentExpression) / ( factorizeNum(i) * factorizeNum( (exponentExpression - i) ) );
		let combinatoricMultiplier = 1;

		const term1OuterExponent = exponentExpression - i;
		const term2OuterExponent = i;

		const term1Exponent = term1.getExponent() !== 1 || term1OuterExponent !== 1 ? term1.getExponent() * term1OuterExponent : '';
		const term2Exponent = term2.getExponent() !== 1 || term2OuterExponent !== 1 ? term2.getExponent() * term2OuterExponent : '';

		const term1Sign = term1.getCoeficient() > 0 || term1OuterExponent % 2 == 0 ? '' : '-';
		const term2Sign = term2.getCoeficient() > 0 || term2OuterExponent % 2 == 0 ? '' : '-';

		if ((term1Sign !== '' || term2Sign !== '') && (term1Sign !== term2Sign)) {
			combinatoricSign = i % 2 === 0 ? '+' : '-';
		}

		let termCoeficient = Math.abs((term1.getCoeficient() ** term1OuterExponent) * (term2.getCoeficient() ** term2OuterExponent) * combinatoric);

		const term1Variable = term1.variableElement.value !== '' ? term1.getVariable()  : 'x';
		const term2Variable = term2.variableElement.value !== '' ? term2.getVariable()  : 'y';

		if (term1Variable !== 'x') {
			termCoeficient *= term1Variable ** term1Exponent;
		}

		if (term2Variable !== 'y') {
			termCoeficient *= term2Variable ** term2Exponent;
		}

		if ((term1Sign !== '' || term2Sign !== '') && (term1Sign !== term2Sign)) {
			combinatoricMultiplier = i % 2 === 0 ? 1 : -1;
		}

		result += termCoeficient * combinatoricMultiplier;
		console.log(termCoeficient * combinatoricMultiplier, result)
	}

	resultBinomial.innerHTML = `<p class="expression"><span>${result}</span></p>`;

	pascalResults.appendChild(resultSeparator);
	pascalResults.appendChild(resultBinomial);
}

const calculateValues = () => {
	const exponentExpression = binomial.getExponent();

	while (pascalResults.hasChildNodes()) {
		pascalResults.removeChild(pascalResults.firstChild);
	}

	calculateBaseBinomial(exponentExpression);
	calculateCombinatoricBinomial(exponentExpression);
	calculateExponentsBinomial(exponentExpression);
	calculateCoeficentsBinomial(exponentExpression);
	calculateVariablesBinomial(exponentExpression);
	calculateResultBinomial(exponentExpression);
}

const main = () => {
	term1.coeficientElement.onchange = updatePreview;
	term1.variableElement.onchange = updatePreview;
	term1.exponentElement.onchange = updatePreview;
	term2.coeficientElement.onchange = updatePreview;
	term2.variableElement.onchange = updatePreview;
	term2.exponentElement.onchange = updatePreview;
	binomial.exponentElement.onchange = updatePreview;
	calcButton.onclick = calculateValues;
}

window.onload = () => {
	main();
}
