"use strict";

window.onload = function () {

    //date data output
    let today = new Date();
    let formatDate = today.toDateString();
    let selectElement = document.getElementById('date');
    selectElement.innerHTML = formatDate;

    //todoList array creation
    var todoList = [];
    var todoLists = [];

    // items quantity output
    let tasksCounterElement = document.getElementById('tasks-counter');
    let tasksCounterElementDeleted = document.getElementById('tasks-counter-deleted');

    //all items from localStorage output
    if (localStorage.getItem('todos') != this.undefined) {
        todoList = JSON.parse(localStorage.getItem('todos'));
        out();
    }

    //all items from localStorage output
    if (localStorage.getItem('lists') != this.undefined) {
        todoLists = JSON.parse(localStorage.getItem('lists'));
        outMenuItems();
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
    
    // add new list function
    document.getElementById('tasks-list-add-button').onclick = function (){
        var inputValue = document.getElementById('tasks-list-add-input').value;
        if (inputValue != "") {
            todoLists.push({
                id: Date.now(),
                name: inputValue,
                list: todoList,
            });
        }
        else {
            alert('Input value is empty!');
        }
        document.getElementById('js-add-input').value = "";
        document.getElementById('js-add-input').focus();
        refreshState();
    };

    var activeList = document.getElementById('js-active-todo-list');
    activeList.addEventListener('click', function(ev) {
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
            var deleteItem = function (todo) {
                if (todo.id == id) {
                    todo.delete = true;
                }
                return todo;            
            }
            todoList = todoList.map(deleteItem);
            refreshState();
        }
    }, false);

    var deletedList = document.getElementById('js-deleted-todo-list');
    deletedList.addEventListener('click', function(ev) {
        // restore item
        var id = ev.target.parentNode.getAttribute('data-id');
        if (ev.target.classList.contains('action-icon')) {
            var restoreItem = function (todo) {
                if (todo.id == id) {
                    todo.delete = false;
                }
                return todo;            
            }
            todoList = todoList.map(restoreItem);
            refreshState();
        }
    }, false);

    // clear all list and localStorage update
    document.getElementById('js-clear-button').onclick = function (){
        localStorage.removeItem('lists');
        document.getElementById('js-active-todo-list').innerHTML = "";
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
        tasksCounterElementDeleted.innerHTML = deletedTodoList.length + ' tasks';
        document.getElementById('js-active-todo-list').innerHTML = actveOutput;
        document.getElementById('js-deleted-todo-list').innerHTML = deletedOutput;
    };
    // new items output function
    function outMenuItems() {
        var actveOutput = '';
        for (var key in todoLists) {
            actveOutput += `<div data-id="${todoLists[key].id}"><span>${todoLists[key].name}</span></div>`
        }
        document.getElementById('js-munu').innerHTML = actveOutput;
        console.log('ef');
    };

    // localStorage update
    function localStorageUpdate() {
        localStorage.setItem('todos', JSON.stringify(todoList));
        localStorage.setItem('lists', JSON.stringify(todoLists));
    };

    // refreshState
    function refreshState() {
        localStorageUpdate();
        out();
        outMenuItems();
    };

    // menu
    document.getElementById('tasks-list-deleted-button').onclick = function (){
        document.getElementById('js-deleted-todo-list').classList.remove('hidden');
        document.getElementById('js-active-todo-list').classList.add('hidden');
    };
    document.getElementById('tasks-list-button').onclick = function (){
        document.getElementById('js-active-todo-list').classList.remove('hidden');
        document.getElementById('js-deleted-todo-list').classList.add('hidden');
    };

};