const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemsList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
	const itemsFromStorage = getItemsFromStorage();

	itemsFromStorage.forEach((item) => addItemToDOM(item));

	resetUI();
}

// Add list items
function onAdItemSubmit(e) {
	e.preventDefault();

	const newItem = itemInput.value;
	// Validate input
	if (newItem.trim() == '') {
		alert('Please add an item');
		return;
	}

	// Create item DOM element
	addItemToDOM(newItem);

	// Add item to local storage
	addItemToStorage(newItem);

	resetUI();
	itemInput.value = '';
}

function addItemToDOM(item) {
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(item));

	const button = createButton('remove-item btn-link text-red');

	li.appendChild(button);

	// Add li to DOM
	itemsList.appendChild(li);
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

function addItemToStorage(item) {
	const itemsFromStorage = getItemsFromStorage();

	// Add new item to to array.
	itemsFromStorage.push(item);

	// Convert to JSON string and set to local storage
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
	let itemsFromStorage;

	if (localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	}

	return itemsFromStorage;
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

function filterItems(e) {
	const items = itemsList.querySelectorAll('li');
	const filterText = e.target.value.toLowerCase();

	items.forEach((item) => {
		const itemName = item.firstChild.textContent.toLowerCase();

		if (itemName.includes(filterText)) {
			item.style.display = '';
		} else {
			item.style.display = 'none';
		}
	});
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

// Initialize app

function init() {
	// Event listener
	itemForm.addEventListener('submit', onAdItemSubmit);
	itemsList.addEventListener('click', removeItem);
	clearBtn.addEventListener('click', clearItems);
	itemFilter.addEventListener('input', filterItems);
	document.addEventListener('DOMContentLoaded', displayItems);

	resetUI();
}

init();
