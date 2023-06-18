const itemForm = document.getElementById('item-form');
const itemlist = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');

function addItem(e) {
  e.preventDefault();
  // Get input text
  const newItem = itemInput.value;
  // Form validation
  if(newItem === '') {
    alert('Please add an Item');
    return;
  }
  // Create text element
  const listItemText = document.createTextNode(newItem);
  // Append new li with text and classes to ul element
  itemlist.appendChild(createListItem(listItemText, 'item'));
  // Reset input to empty
  itemInput.value = '';
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

// Run add item on submit
itemForm.addEventListener('submit', addItem);