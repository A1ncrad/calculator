const calculator = document.querySelector(".calculator")
const display = document.querySelector(".calculator__display");

const CHARS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", "%"];

let expression = "";


calculator.addEventListener("click", handleClick);
display.addEventListener("keypress", (e) => {
	
	if (e.code === "Enter") {
		getResult();
		return;
	} else if (e.code === "Backspace") {
		deleteChar();
		return;
	}

	expression += e.key;

});


function handleClick(e) {
	if ( !e.target.closest("button") ) return;
	
	const button = e.target.closest("button");

	if (button.dataset.action) {
		window[button.dataset.action]();
		return;
	}

	

	if (button.dataset.operator) {
		expression += button.dataset.operator;
		display.value += button.dataset.operator;
	} else {
		expression += button.textContent;
		display.value += button.textContent;
	}
}

function clearDisplay() {
	display.value = "";
	expression = "";
}

function deleteChar() {
	display.value = display.value.slice(0, -1);
	expression = expression.slice(0, -1) ?? "";
}	

function getResult() {
	let result;

	try {
		result = eval(expression) || "ERROR";
	} catch {
		result = "ERROR";
	}

	display.value = String(result);
	expression = (result === "ERROR") ? "" : String(result);
}