"use strict";

window.onload = function () {

    //date data output
    let today = new Date();
    let formatDate = today.toDateString();
    let selectElement = document.getElementById('date');
    selectElement.innerHTML = formatDate;

    //todoList array creation
    var todoList = [];

    //all items from localStorage output
    if (localStorage.getItem('todo') != this.undefined) {
        todoList = JSON.parse(localStorage.getItem('todo'));
        out();
    }

    // items quantity output
    let tasksCounterElement = document.getElementById('tasks-counter');
    itemsCounterUpdate();

    // add items to the list function
    document.getElementById('js-add-button').onclick = function (){
        var inputValue = document.getElementById('js-add-input').value;
        if (inputValue != "") {
            todoList.push({
                id: Date.now(),
                text: inputValue,
                check: false
            });
            document.getElementById('js-add-input').value = "";
            document.getElementById('js-add-input').focus();
            refreshState();
        }
        else {
            alert('Input value is empty!');
        }
    };

    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
        // check item
        var id = ev.target.parentNode.getAttribute('data-id');
        if (ev.target.tagName === 'SPAN') {
            var toggleChecked = function (todo) {
                if (todo.id == id) {
                    todo.check = !todo.check;
                    ev.target.classList.toggle('checked');
                }
                return todo;            
            }
            todoList = todoList.map(toggleChecked);
            refreshState();
        }
        
        // delete item
        if (ev.target.tagName === 'I') {
            var onlyMatchingIds = function (todo) {
                return todo.id != id;
            }
            todoList = todoList.filter(onlyMatchingIds);
            refreshState();
        }
    }, false);

    // clear all list and localStorage update
    document.getElementById('js-clear-button').onclick = function (){
        localStorage.removeItem('todo');
        document.getElementById('js-todo-list').innerHTML = "";
        todoList = [];
        itemsCounterUpdate();
    };

    // new items output function
    function out() {
        var out = '';
        for (var key in todoList) {
            out += `<li data-id="${todoList[key].id}"><span ${todoList[key].check ? "class='checked'" : ""}>${todoList[key].text}</span><i class="delete fa fa-trash-o" aria-hidden="true"></i>`
        }
        document.getElementById('js-todo-list').innerHTML = out;
    };
    // items quantity update
    function itemsCounterUpdate() {
        tasksCounterElement.innerHTML = todoList.length + ' tasks';
    };
    // localStorage update
    function localStorageUpdate() {
        localStorage.setItem('todo', JSON.stringify(todoList));
    };
    // refreshState
    function refreshState() {
        localStorageUpdate();
        itemsCounterUpdate();
        out();
    };
};