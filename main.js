"use strict";

window.onload = function () {

    //date data output
    let today = new Date();
    let formatDate = today.toDateString();
    let selectElement = document.getElementById('date');
    selectElement.innerHTML = formatDate;

    var todos = [];
    var lists = [];
    var currentListId;
    // items quantity output
    let tasksCounterElement = document.getElementById('tasks-counter');
    let tasksCounterElementDeleted = document.getElementById('tasks-counter-deleted');
    let currentListName = document.getElementById('curren-list-name');

    //all items from localStorage output
    if (localStorage.getItem('todos') != this.undefined) {
        todos = JSON.parse(localStorage.getItem('todos'));
        out();
    }

    //all items from localStorage output
    if (localStorage.getItem('lists') != this.undefined) {
        lists = JSON.parse(localStorage.getItem('lists'));
        outMenuItems();
    }

    // add items to the list function
    document.getElementById('js-add-button').onclick = function (){
        var inputValue = document.getElementById('js-add-input').value;
        if (inputValue != "") {
            todos.push({
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
            lists.push({
                id: Date.now(),
                name: inputValue,
                todos: [],
            });
        }
        else {
            alert('Input value is empty!');
        }
        document.getElementById('tasks-list-add-input').value = "";
        document.getElementById('tasks-list-add-input').focus();
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
            todos = todos.map(toggleChecked);
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
            todos = todos.map(deleteItem);
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
            todos = todos.map(restoreItem);
            refreshState();
        }
    }, false);

    // clear all list and localStorage update
    document.getElementById('js-clear-button').onclick = function (){
        localStorage.removeItem('lists');
        document.getElementById('js-active-todo-list').innerHTML = "";
        todos = [];
        refreshState();
    };

    // new items output function
    function out() {
        var actveOutput = '';
        var deletedOutput = '';
        var activeTodos = todos.filter(function (todo) {
            return !todo.delete;
        });
        var deletedTodos = todos.filter(function (todo) {
            return todo.delete;
        });
        for (var key in activeTodos) {
            actveOutput += `<li data-id="${activeTodos[key].id}"><span ${activeTodos[key].check ? "class='checked'" : ""}>${activeTodos[key].text}</span><i class="action-icon fa fa-trash-o" aria-hidden="true"></i>`
        }
        for (var key in deletedTodos) {
            deletedOutput += `<li data-id="${deletedTodos[key].id}"><span ${deletedTodos[key].check ? "class='checked'" : ""}>${deletedTodos[key].text}</span><i class="action-icon fa fa-undo" aria-hidden="true"></i>`
        }
        tasksCounterElement.innerHTML = activeTodos.length + ' tasks';
        tasksCounterElementDeleted.innerHTML = deletedTodos.length + ' tasks';
        currentListName.innerHTML = currentListId;
        document.getElementById('js-active-todo-list').innerHTML = actveOutput;
        document.getElementById('js-deleted-todo-list').innerHTML = deletedOutput;
    };
    // new items output function
    function outMenuItems() {
        var actveOutput = '';
        for (var key in lists) {
            actveOutput += `<div class="menu-item" data-id="${lists[key].id}">${lists[key].name}</div>`
        }
        document.getElementById('js-munu').innerHTML = actveOutput;
        console.log('ef');
    };

    // localStorage update
    function localStorageUpdate() {
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('lists', JSON.stringify(lists));
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

    
    var menuItems = document.getElementById('js-munu');
    menuItems.addEventListener('click', function(ev) {
        var id = ev.target.getAttribute('data-id');
        if (ev.target.classList.contains('menu-item')) {
            ev.target.classList.add('current');
            currentListId = id;
        }
        refreshState();
    }, false);
};