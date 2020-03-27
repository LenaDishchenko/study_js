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
        var d = document.getElementById('js-add-input').value;
        if (d != "") {
            var temp = {};
            temp.id = Date.now();
            temp.todo = d;
            temp.check = false;
            todoList.push(temp);
            out();
            localStorageUpdate();
            itemsCounterUpdate();
            document.getElementById('js-add-input').value = "";
            document.getElementById('js-add-input').focus();
        }
        else {
            alert('Input value is empty!');
        }
    };

    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
        console.log('test');
        // check item
        if (ev.target.tagName === 'SPAN') {
            var id = ev.target.getAttribute('data-id');
            var onlyMatchingIds = function (todo) {
                // if (todo.id == id) {
                //     return true;
                // }
                // else {
                //     return false;
                // }
                return todo.id == id;
            }
            var toggleChecked = function (todo) {
                todo.check = !todo.check;
                ev.target.classList.toggle('checked');
                localStorageUpdate();
                return todo;
            }
            todoList = todoList.filter(onlyMatchingIds).map(toggleChecked);
            // todoList = todoList.filter(function (todo) {
            //     return todo.id == id;
            // }).map(function (todo) {
            //     todo.check = !todo.check;
            //     ev.target.classList.toggle('checked');
            //     localStorageUpdate();
            //     return todo;
            // })
            // for (var key in todoList) {
            //     if (todoList[key].id == id) {
                //         todoList[key].check = !todoList[key].check;
                //         ev.target.classList.toggle('checked');
                //         // if (todoList[key].check == true) {
                    //         //     todoList[key].check = false;
                    //         //     // ev.target.classList.remove('checked');
            //         // }
            //         // else {
                //         //     todoList[key].check = true;
                //         //     // ev.target.classList.add('checked');
                //         // }
                //         localStorageUpdate();
                //     }
                // }
                // debugger;
            }
        // delete item
        
        if (ev.target.tagName === 'I') {
            var id = ev.target.parentNode.getAttribute('data-id');
            var onlyMatchingIds = function (todo) {
                return todo.id == id;
            }
            for (var key in todoList) {
                if (todoList[key].id == id) {
                    console.log('test-del');
                    todoList.splice(key, 1);
                    localStorageUpdate();
                    out();
                    debugger;
                }
            }
        }
        // if (ev.target.tagName === 'I') {
            //     ev.target.parentNode.classList.add("hidden");
        // }
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
            if (todoList[key].check == true) {
                out += '<li data-id="' + todoList[key].id + '"><span class="checked" data-id="' + todoList[key].id + '">' + todoList[key].todo + '</span><i class="delete fa fa-trash-o" aria-hidden="true"></i>';
            }
            else {
                out += '<li data-id="' + todoList[key].id + '"><span data-id="' + todoList[key].id + '">' + todoList[key].todo + '</span><i class="delete fa fa-trash-o" aria-hidden="true"></i>';
            }
        }
        document.getElementById('js-todo-list').innerHTML = out;
    };
    // items quantity update
    function itemsCounterUpdate() {
        tasksCounterElement.innerHTML = todoList.length + ' tasks';
    };
    // // localStorage update
    function localStorageUpdate() {
        localStorage.setItem('todo', JSON.stringify(todoList));
    };
};