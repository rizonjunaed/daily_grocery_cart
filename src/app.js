//Variables
const items = document.querySelector('#items-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn        = document.querySelector("#clear-cart");
let itemsList         = [];

//Listener
loadEventListeners();
//Load item from localStorage if item avaible
getitemsFromLocalStorage();

function loadEventListeners(){
  items.addEventListener('click',buyitem);
  shoppingCartContent.addEventListener('click',removeItem);
  clearCartBtn.addEventListener('click',clearCart);
}



//function

function buyitem(e){
  e.preventDefault();

   if (e.target.classList.contains("add-to-cart")){
       const item = e.target.parentElement.parentElement;
       getitemInfo(item);
   }
}

//get item Information
function getitemInfo(item){
   const itemInfo = {
     image : item.querySelector('img').src,
     title : item.querySelector('h4').textContent,
     price : item.querySelector('.price span').textContent,
     id    : item.querySelector('a').getAttribute('data-id')
   }

   addToCart(itemInfo);
   itemsList.push(itemInfo);
   additemToLocalStorage();
}

function addToCart(itemInfo){

  const row = document.createElement('tr');
  //create an image element
  image     = document.createElement('img');
  image.src = itemInfo.image;
  image.style.width = '100px';
  //append element to row (parent)
  row.appendChild(addToTd(image,1));
  row.appendChild(addToTd(itemInfo.title,0));
  row.appendChild(addToTd(itemInfo.price,0));
  //create anchor for delete button
  const anchor = document.createElement('a');
  anchor.href = '#';
  anchor.setAttribute('data-id',itemInfo.id);
  anchor.textContent = 'X';
  anchor.classList = 'remove';

  row.appendChild(addToTd(anchor,1));
  //append to Shooping case
  shoppingCartContent.appendChild(row);
}



function addToTd(info,i){
    const  td = document.createElement('td');
  if (i == 0){
    td.textContent = info
  }else{
    td.appendChild(info);
  }
  return td
}


function updateShoppingCart(){
  itemsList.forEach(function(item){
     addToCart(item);
  })
}


function removeItem(e){
  if (e.target.classList.contains('remove')){
      let id = e.target.getAttribute('data-id');
      deleteFromLocalStorage(id);
    e.target.parentElement.parentElement.remove();
  }

}



function clearCart(e){
  e.preventDefault();
  while(shoppingCartContent.firstChild){
    shoppingCartContent.removeChild(shoppingCartContent.firstChild);
  }
  itemsList = [];
  addItemToLocalStorage();

}


function addItemToLocalStorage(){
  localStorage.setItem("items",JSON.stringify(itemsList))
}

function getItemsFromLocalStorage(){
  const cs = localStorage.getItem('items');

  if (cs === null){
      itemsList = [];
  }else{
    itemsList = JSON.parse(cs);
    updateShoppingCart();
  }
}

function deleteFromLocalStorage(id){
  itemsList.forEach(function(item,i){
      if (item.id === id){
        itemsList.splice(i,1)
      }
  })
  additemToLocalStorage();
}
