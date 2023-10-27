const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemsList = document.getElementById('item-list');

function addItem(e) {
	e.preventDefault();

	const newItem = itemInput.value;
	// Validate input
	if (newItem.trim() !== '') {
		// Create list item
		const li = document.createElement('li');
		li.appendChild(document.createTextNode(newItem));

		const button = createButton('remove-item btn-link text-red');

		li.appendChild(button);

		itemsList.appendChild(li);

		itemInput.value = '';
	} else {
		alert('Please add an item');
		return;
	}
}

function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;

	const icon = createIcon('fa-solid fa-xmark');

	button.appendChild(icon);
	return button;
}

function createIcon(classes) {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
}

// Event listener
itemForm.addEventListener('submit', addItem);
