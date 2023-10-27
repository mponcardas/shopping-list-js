const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemsList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Add list items
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

		// Add li to DOM
		itemsList.appendChild(li);

		resetUI();

		itemInput.value = '';
	} else {
		alert('Please add an item');
		return;
	}
}

// Create button that contains 'x' icon
function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;

	const icon = createIcon('fa-solid fa-xmark');

	button.appendChild(icon);
	return button;
}

// Add 'x' icon
function createIcon(classes) {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
}

// Remove list items
function removeItem(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		if (confirm('Are you sure you want to delete?')) {
			e.target.parentElement.parentElement.remove();

			resetUI();
		}
	}
}

// Clear items
function clearItems() {
	while (itemsList.firstChild) {
		itemsList.removeChild(itemsList.firstChild);
	}
	resetUI();
}

// Remove Filter and Clear All button when list is empty
function resetUI() {
	const items = itemsList.querySelectorAll('li');
	console.log(items);
	if (items.length === 0) {
		clearBtn.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		itemFilter.style.display = 'block';
	}
}

// Event listener
itemForm.addEventListener('submit', addItem);
itemsList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

resetUI();
