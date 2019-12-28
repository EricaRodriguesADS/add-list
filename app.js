var divMain = document.querySelector('#app');
var h1Element = document.querySelector('#app h1');
var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

// adicionando estilos ao iniciar a página
divMain.style.margin = 0;
divMain.style.background = 'yellow';
divMain.style.position= 'absolute';
divMain.style.top = '10%';
divMain.style.left = '50%';
divMain.style.marginRight = '-50%';
divMain.style.transform = 'translate(-50%, -50%)';
h1Element.style.textAlign = 'center';

const saveToStorage = () => {  
  localStorage.setItem('list_todos', JSON.stringify(todos));
}

const checkItem = () => {
  var span =  document.querySelector('span.message');
  if(span) span.style.display = todos.length === 0 ? 'block': 'none'; 
}

const renderItens= () => {
    listElement.innerHTML = '';
    
    var spanElement = document.createElement('span');
    spanElement.classList.add('message');
    var spanText = document.createTextNode('Lista vazia :)');
    spanElement.appendChild(spanText);
   
    spanElement.style.display = 'none';
    listElement.style.listStyleType = 'none';
    listElement.appendChild(spanElement);

    checkItem();

    for(todo of todos){
       var todoElement = document.createElement('li');
       var todoText = document.createTextNode(todo);

       var linkElement = document.createElement('a');
       linkElement.setAttribute('href','#');

       var pos = todos.indexOf(todo);
       linkElement.setAttribute('onclick','deleteItem('+pos+')');
       
       var linkText = document.createTextNode('Excluir');
       linkElement.style.padding = 10;
       linkElement.appendChild(linkText);

       todoElement.appendChild(todoText);
       todoElement.appendChild(linkElement);

       listElement.appendChild(todoElement);
    }
}

renderItens();

const deleteItem = (pos)=> {
  todos.splice(pos,1);
  renderItens();
  saveToStorage();
  checkItem();
}

const addItem = () => {
  var todoText = inputElement.value;

  if(todoText) {
    todos.push(todoText);
    inputElement.value = '';

    renderItens();
    saveToStorage();
  } else { alert('digite um item ;)')}
}

buttonElement.onclick = addItem;

