const itemForm = document.getElementById('item-form');
const itemlist = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Show items in the UI
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item => addItemToDOM(item));
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();
  // Get input text
  const newItem = itemInput.value;
  // Form validation
  if(newItem === '') {
    alert('Please add an Item');
    return;
  }
  // Add list item to DOM
  addItemToDOM(newItem)
  // Add list item to local storage
  addItemToStorage(newItem);
  checkUI();
  // Reset input to empty
  itemInput.value = '';
}

function addItemToDOM(item) {
  // Create text element
  const listItemText = document.createTextNode(item);
  // Append new li with text and classes to ul element
  itemlist.appendChild(createListItem(listItemText, 'item'));
}

// Create list Item takes text node as arg
function createListItem(text, classes) {
  // Create list item
  const listItem = document.createElement('li');
  // Add classes
  listItem.className = classes;
  // Append text node
  listItem.appendChild(text);
  // Append Delete button add your classes
  listItem.appendChild(createDeleteButton('remove-item btn-link text-red'));
  // Return for later use
  return listItem;
}

// Create delete button
function createDeleteButton(classes) {
  // Create button element
  const deleteBtn = document.createElement('button');
  // Add classes
  deleteBtn.className = classes;
  // Append icon element add your classes
  deleteBtn.appendChild(createIcon('fa-solid fa-xmark'));
  // Return for later use
  return deleteBtn;
}

// Create icon for delete button
function createIcon(classes) {
  // Create i element
  const icon = document.createElement('i');
  // Add classes
  icon.className = classes;
  // Return for later use
  return icon;
}

// Moved from line 32 and rewritten
function addItemToStorage(item) {
  // Init Variable (This will end up being an empty array or an array of stringified objects)
  let itemsFromStorage = getItemsFromStorage();
  // Push new item to array
  itemsFromStorage.push(item);
  // Converting the new item to JSON string and setting them back to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Load items to DOM from storage
function getItemsFromStorage() {
  // Init Variable (This will end up being an empty array or an array of stringified objects)
  let itemsFromStorage;
  // Check if items exists in local storage
  if(localStorage.getItem('items') === null) {
    // If no initialize array
    itemsFromStorage = [];
  } else {
    // If items exist get them from storage and parse the string into an array for use
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

// On click item
function onClickItem(e) {
  if(e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  }
}

// Remove list item
function removeItem(item) {
  if(confirm('Are you sure you want to delete this item?')) {
    // Remove item from DOM
    item.remove();
    // Remove item from Storage
    removeItemFromStorage(item.textContent);
    // Check UI
    checkUI();
  }
}

// This worked but probably not quite right Test adding two of the same item and you'll see (This was my version btw)
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.splice(itemsFromStorage.indexOf(item), 1)
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Clear entire list
function clearItems() {
  if(confirm('Are you sure you want to clear the list?')) {
    // While true run function
    while(itemlist.firstChild) {
      itemlist.removeChild(itemlist.firstChild);
      // Check UI after every deleted item
      checkUI();
    }
  }
}

// Brad's Filter Items you can see my version in previous versions of this file on github
function filterItems(e) {
  const items = itemlist.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if(itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  })
}

// Update UI
function checkUI() {
  const items = itemlist.querySelectorAll('li');
  if(items.length === 0) {
    filter.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    filter.style.display = 'block';
    clearBtn.style.display = 'block';
  }
}

// Initalize App (This can be done to hide the events from the global scope (preference))
// Any functions I want running on page load can go in here
function init() {
  // Run add item on submit
  itemForm.addEventListener('submit', onAddItemSubmit);
  // Remove item on click
  itemlist.addEventListener('click', onClickItem);
  // Clear all items
  clearBtn.addEventListener('click', clearItems);
  // Filter items
  itemFilter.addEventListener('input', filterItems);
  // Show items in UI
  document.addEventListener('DOMContentLoaded', displayItems);
  // Check UI on page load (Hide or show filter input and clear btn)
  checkUI();
}

// Start App
init();