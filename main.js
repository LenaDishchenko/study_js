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
    tasksCounterElement.innerHTML = todoList.length + ' tasks';

    // add items to the list function
    document.getElementById('js-add-button').onclick = function (){
        var d = document.getElementById('js-add-input').value;
        var temp = {};
        temp.id = Date.now();
        temp.todo = d;
        temp.check = false;
        todoList.push(temp);
        out();
        // update localStorage
        localStorage.setItem('todo', JSON.stringify(todoList));
        // update items quantity
        tasksCounterElement.innerHTML = todoList.length + ' tasks';
    };

    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
        console.log('test');
        // check item
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
            localStorage.setItem('todo', JSON.stringify(todoList));
            var id = ev.target.getAttribute('data-id');
            for (var key in todoList) {
                if (todoList[key].id == id) {
                    console.log('test11111');
                    todoList[key].check = true;
                    // update localStorage
                    localStorage.setItem('todo', JSON.stringify(todoList));
                }
            }
            debugger;
        }
        // delete item
        if (ev.target.tagName === 'I') {
            console.log('test3');
            ev.target.parentNode.classList.add("hidden");
        }
    }, false);

    // clear all list and localStorage update
    document.getElementById('js-clear-button').onclick = function (){
        localStorage.removeItem('todo');
        document.getElementById('js-todo-list').innerHTML = "";
        todoList = [];
        // update items quantity
        tasksCounterElement.innerHTML = todoList.length + ' tasks';
    };

    // new items output function
    function out() {
        var out = '';
        for (var key in todoList) {
            if (todoList[key].check == true) {
                out += '<li class="checked" data-id="' + todoList[key].id + '">' + todoList[key].todo + '<i class="close fa fa-trash-o" aria-hidden="true"></i>';
            }
            else {
                out += '<li data-id="' + todoList[key].id + '">' + todoList[key].todo + '<i class="delete fa fa-trash-o" aria-hidden="true"></i>';
            }
        }
        document.getElementById('js-todo-list').innerHTML = out;
    };
};