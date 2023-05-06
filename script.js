//COURTESY COMMENTS: Jonathan Ashby
//CMIN-220-W01
//4/4/2023

const itemInput = document.querySelector('#item')
const addItemBtn = document.querySelector("button")
const listContainer = document.querySelector('ul')
const LOCAL_STORAGE_LIST_KEY = 'groceryList'
let groceryList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []

function addItem() {
  let newItem = itemInput.value;
  if(newItem === "" || newItem === null || newItem === " ") return;
  //save to list
  groceryList.push(newItem);
  save()
  //reset input
  itemInput.value = '';
  //li constructor
  populateList()
  //.focus item input
  itemInput.focus();
}

function listConstructor(item) {
  clearElement(listContainer)
  groceryList.forEach((item, index) => {
    const itemLi = document.createElement('li');
    const itemSpan = document.createElement('span');
    const deleteBtn = document.createElement('button');
    
    //set spaninternal text to newItem
    itemSpan.innerText = item;
    //set deleteBtn internal text
    deleteBtn.innerText = "Delete";
    deleteBtn.id = index;
    
    //append span to li
    itemLi.appendChild(itemSpan);
    //append deleteBtn to li
    itemLi.appendChild(deleteBtn);
    //append li to ul
    listContainer.appendChild(itemLi);
    //add evli to delete button
    deleteBtn.addEventListener('click', e => {
      e.target.parentNode.remove();
      groceryList.splice(e.target.id,1)
      save()
      console.log(e.target.id, groceryList)
    })
  })
  
}
function populateList() {
  clearElement(listContainer)
  //get list of groceries
  groceryList.forEach((item , index) => {
    listConstructor(item)
    listContainer.lastChild.lastChild.id = index;
  })
}
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}
function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(groceryList))
}
addItemBtn.addEventListener('click', addItem)
populateList()