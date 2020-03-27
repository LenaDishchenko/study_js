"use strict";

window.onload = function () {

    //date data output
    let today = new Date();
    let formatDate = today.toDateString();
    let selectElement = document.getElementById('date');
    selectElement.innerHTML = formatDate;

    //todoList array creation
    var todoList = [];

    // items quantity output
    let tasksCounterElement = document.getElementById('tasks-counter');

    //all items from localStorage output
    if (localStorage.getItem('todo') != this.undefined) {
        todoList = JSON.parse(localStorage.getItem('todo'));
        out();
    }

    // add items to the list function
    document.getElementById('js-add-button').onclick = function (){
        var inputValue = document.getElementById('js-add-input').value;
        if (inputValue != "") {
            todoList.push({
                id: Date.now(),
                text: inputValue,
                check: false,
                delete: false
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
        if (ev.target.classList.contains('action-icon')) {
            var onlyMatchingIds = function (todo) {
                return todo.id != id;
            }
            var toggleDeleted = function (todo) {
                if (todo.id == id) {
                    todo.delete = true;
                }
                return todo;            
            }
            todoList = todoList.map(toggleDeleted);
            refreshState();
            debugger;
        }
    }, false);

    // clear all list and localStorage update
    document.getElementById('js-clear-button').onclick = function (){
        localStorage.removeItem('todo');
        document.getElementById('js-todo-list').innerHTML = "";
        todoList = [];
        refreshState();
    };

    // new items output function
    function out() {
        var actveOutput = '';
        var deletedOutput = '';
        var activeTodoList = todoList.filter(function (todo) {
            return !todo.delete;
        });
        var deletedTodoList = todoList.filter(function (todo) {
            return todo.delete;
        });
        for (var key in activeTodoList) {
            actveOutput += `<li data-id="${activeTodoList[key].id}"><span ${activeTodoList[key].check ? "class='checked'" : ""}>${activeTodoList[key].text}</span><i class="action-icon fa fa-trash-o" aria-hidden="true"></i>`
        }
        for (var key in deletedTodoList) {
            deletedOutput += `<li data-id="${deletedTodoList[key].id}"><span ${deletedTodoList[key].check ? "class='checked'" : ""}>${deletedTodoList[key].text}</span><i class="action-icon fa fa-undo" aria-hidden="true"></i>`
        }
        tasksCounterElement.innerHTML = activeTodoList.length + ' tasks';
        document.getElementById('js-active-todo-list').innerHTML = actveOutput;
        document.getElementById('js-deleted-todo-list').innerHTML = deletedOutput;
    };

    // localStorage update
    function localStorageUpdate() {
        localStorage.setItem('todo', JSON.stringify(todoList));
    };

    // refreshState
    function refreshState() {
        localStorageUpdate();
        out();
    };
};