const itemForm = document.getElementById('item-form');
const itemlist = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

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
  checkUI();
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

// Remove list item
function removeItem(e) {
  e.preventDefault('');
  const icon = e.target;
  if(icon.classList.contains('fa-xmark')) {
    // Add a confirmation alert window 
    if(confirm('Are you sure you want to remove this item?')) {
      icon.parentElement.parentElement.remove();
    }
  }
  checkUI();
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

// Run add item on submit
itemForm.addEventListener('submit', addItem);
itemlist.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

// Check UI on page load
checkUI();