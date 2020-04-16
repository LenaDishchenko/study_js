"use strict";

window.onload = function () {

    //date data output
    let today = new Date();
    let formatDate = today.toDateString();
    let selectElement = document.getElementById('date');
    selectElement.innerHTML = formatDate;

    var lists = [];
    var currentListId;

    // items quantity output
    let listsCounter = document.getElementById('lists-counter');
    let tasksCounterElement = document.getElementById('tasks-counter');
    let tasksCounterElementDeleted = document.getElementById('tasks-counter-deleted');
    let currentListName = document.getElementById('curren-list-name');

    //all items from localStorage output
    if (localStorage.getItem('lists') != this.undefined) {
        lists = JSON.parse(localStorage.getItem('lists'));
        if (lists.length > 0) {
            currentListId = lists[0].id;
        }
        refreshState();
    }

    // add tasks to the list function
    function todoPush() {
        var inputValue = document.getElementById('js-add-input').value;
        if (inputValue != "") {
            var currentList = lists.find(function(list) {
                return list.id == currentListId;
            });
            currentList.todos.push({
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
    document.querySelector('#js-add-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            todoPush();
        }
    });
    document.getElementById('js-add-button').onclick = function (){
        todoPush();
    };
    
    // add new list function
    function listPush() {
        var inputValue = document.getElementById('tasks-list-add-input').value;
        if (inputValue != "") {
            lists.push({
                id: Date.now(),
                current: false,
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
    document.querySelector('#tasks-list-add-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            listPush()
        }
    });
    document.getElementById('tasks-list-add-button').onclick = function (){
        listPush()
    };

    var activeList = document.getElementById('js-active-todo-list');
    activeList.addEventListener('click', function(ev) {
        // check item
        var id = ev.target.parentNode.getAttribute('data-id');
        var currentList = lists.find(function(list) {
            return list.id == currentListId;
        });
        if (ev.target.tagName === 'SPAN') {
            var toggleChecked = function (todo) {
                if (todo.id == id) {
                    todo.check = !todo.check;
                    ev.target.classList.toggle('checked');
                }
                return todo;            
            }
            currentList.todos = currentList.todos.map(toggleChecked);
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
            currentList.todos = currentList.todos.map(deleteItem);
            refreshState();
        }
    }, false);

    // restore item
    var deletedList = document.getElementById('js-deleted-todo-list');
    deletedList.addEventListener('click', function(ev) {
        var id = ev.target.parentNode.getAttribute('data-id');
        var currentList = lists.find(function(list) {
            return list.id == currentListId;
        });
        if (ev.target.classList.contains('action-icon')) {
            var restoreItem = function (todo) {
                if (todo.id == id) {
                    todo.delete = false;
                }
                return todo;            
            }
            currentList.todos = currentList.todos.map(restoreItem);
            refreshState();
        }
    }, false);
    
    // clear all and localStorage update
    document.getElementById('js-clear-button').onclick = function (){
        localStorage.removeItem('lists');
        document.getElementById('js-munu').innerHTML = "";
        document.getElementById('js-active-todo-list').innerHTML = "";
        lists = [];
        document.getElementById('js-active-todo-list').innerHTML = "no items";
        refreshState();
    };

    // clear all list and localStorage update
    document.getElementById('js-clear-current-list-button').onclick = function (){
        document.getElementById('js-active-todo-list').innerHTML = "";
        var currentList = lists.find(function(list) {
            return list.id == currentListId;
        });
        currentList.todos = [];
        refreshState();
        document.getElementById('js-active-todo-list').innerHTML = "no items";
    };
    
    // delete current list
    document.getElementById('js-delete-current-list-button').onclick = function (){
        lists = lists.filter(function (list) {
            return list.id != currentListId;
        });
        currentListId = lists[0].id;
        refreshState();
    };

    // new items output function
    function out() {
        if (currentListId) {
            var actveOutput = '';
            var currentList = lists.find(function(list) {
                return list.id == currentListId;
            });
            var activeTodos = currentList.todos.filter(function (todo) {
                return !todo.delete;
            });
            for (var todo of activeTodos) {
                actveOutput += `<li data-id="${todo.id}"><span ${todo.check ? "class='checked'" : ""}>${todo.text}</span><i class="action-icon fa fa-trash-o" aria-hidden="true"></i></li>`
            }
            var deletedOutput = '';
            var deletedTodos = currentList.todos.filter(function (todo) {
                return todo.delete;
            });
            for (var todo of deletedTodos) {
                deletedOutput += `<li data-id="${todo.id}"><span ${todo.check ? "class='checked'" : ""}>${todo.text}</span><i class="action-icon fa fa-undo" aria-hidden="true"></i>`
            }
            currentListName.innerHTML = currentList.name;
            document.getElementById('js-active-todo-list').innerHTML = actveOutput;
            document.getElementById('js-deleted-todo-list').innerHTML = deletedOutput;
            tasksCounterElement.innerHTML = activeTodos.length + ' current tasks';
            tasksCounterElementDeleted.innerHTML = deletedTodos.length + ' deleted tasks';
        }
        else {
            document.getElementById('js-active-todo-list').innerHTML = "no items";
        }
        debugger;
    };

    // new items output function
    function outMenuItems() {
        var actveMenuOutput = '';
        for (var key in lists) {
            actveMenuOutput += `<div class="menu-item" data-id="${lists[key].id}">${lists[key].name}<span>${lists[key].todos.filter(function (todo) {return !todo.delete;}).length}</span></div>`
        }
        listsCounter.innerHTML = lists.length + ' lists';
        document.getElementById('js-munu').innerHTML = actveMenuOutput;
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
    
    var menu = document.getElementById('js-munu');
    var menuItems = document.getElementById('js-munu').children;
    menu.addEventListener('click', function(ev) {
        var id = ev.target.getAttribute('data-id');
        var currentList = lists.find(function(list) {
            return list.id == id;
        });
        for (var i=0, item; item=menuItems[i]; i++) {
            item.classList.remove('current')
            console.log(item);
        }
        if (ev.target.classList.contains('menu-item')) {
            ev.target.classList.add('current');
            currentListId = id;
            for (var i=0, item; item=lists[i]; i++) {
                item.current = false;
            }
            currentList.current = true;
            debugger;
        }
        refreshState();
    }, false);

    // localStorage update
    function localStorageUpdate() {
        localStorage.setItem('lists', JSON.stringify(lists));
    };

    // refreshState
    function refreshState() {
        localStorageUpdate();
        out();
        outMenuItems();
    };
};