function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => element[key] = props[key]);

    if (children.length > 0) {
        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }

            element.appendChild(child);
        });
    }   

    return element;
}

function createTodoItem(title) {
    const label = createElement('label', { className: 'title' }, title);
    const listItem = createElement('li', { className: 'todo-item' },  label);
    return listItem;
}

function searchByString(value){
    if(checkbox.checked){
        array.data.forEach(val => {
            if (val.indexOf(value) >= 0){
             const todoItem = createTodoItem(val);
             outputList.appendChild(todoItem);
            }
        });    
    }else{
        array.data.forEach(val => {
            if (val.toUpperCase().indexOf(value.toUpperCase()) >= 0){
             const todoItem = createTodoItem(val);
             outputList.appendChild(todoItem); 
            }
        });
    }
}

function searchByLength(value){
    array.data.forEach(val => {
        if (val.length == value){
         const todoItem1 = createTodoItem(val);
         outputList.appendChild(todoItem1); 
        }
    });
}

function sortByString(event) {
    event.preventDefault();

    if (Input.value === '') {
        alert('Необходимо ввести условие поиска');
    }else{
        outputList.innerHTML = '';
    searchByString(Input.value);
    }
          
    Input.value = '';
}

function sortByLength(event) {
        event.preventDefault();
      
    if (Input.value === '') {
        alert('Необходимо ввести условие поиска');
    }else if (isNaN(Input.value)) {
        alert( "Необходимо ввести число" );
      }else{          
        outputList.innerHTML = '';
        searchByLength(Input.value);        
    }      
    Input.value = '';
}

function getData(){
 var testData = new XMLHttpRequest();
 var url = "https://cors-anywhere.herokuapp.com/http://www.mrsoft.by/data.json";
 testData.open("GET", url);
 testData.send();

    testData.onreadystatechange = function () { 
         if (this.readyState === 4 && this.status === 200) { 
         array = JSON.parse(this.responseText); 
         }
    } 
}

// const form = document.getElementById('todo-form');
const byString = document.getElementById('buttonString');
const byLength = document.getElementById('buttonLength');
let checkbox = document.querySelector('.checkbox');
const Input = document.getElementById('input');
const outputList = document.getElementById('output-list');
let array;

function main() {
    byString.addEventListener('click', sortByString);
    byLength.addEventListener('click', sortByLength);
    getData();
}

main();