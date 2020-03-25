"use strict";

window.onload = function () {

    let today = new Date();
    let formatDate = today.toDateString();
    let selectElement = document.getElementById('date');
    selectElement.innerHTML = formatDate;
    
    var todoList = [];
    if (localStorage.getItem('todo') != this.undefined) {
        todoList = JSON.parse(localStorage.getItem('todo'));
        out();
    }
    document.getElementById('js-add-button').onclick = function (){
        var d = document.getElementById('js-add-input').value;
        var temp = {};
        temp.id = Date.now();
        temp.todo = d;
        temp.check = false;
        // var i = todoList.length;
        todoList.push(temp);
        out();
        localStorage.setItem('todo', JSON.stringify(todoList));
    };

    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
        console.log('test');
        // check item
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
            localStorage.setItem('todo', JSON.stringify(todoList));
            var date = this.getAttribute('data-id');
            var div1 = document.getElementsByTagName("LI");
            var align = div1.getAttribute("data-id");
            alert(align);
            for (var key in todoList) {
                if (todoList[key].id == date) {
                    todoList[key].check = true;
                    console.log('ura');
                }
            }
        }
        // delete item
        if (ev.target.tagName === 'SPAN') {
            console.log('test3');
            ev.target.parentNode.classList.add("hidden");
        }
    }, false);

    // clear all list
    document.getElementById('js-clear-button').onclick = function (){
        localStorage.removeItem('todo');
        document.getElementById('js-todo-list').innerHTML = "";
        todoList = [];
    };
    function out() {
        var out = '';
        for (var key in todoList) {
            if (todoList[key].check == true) {
                out += '<li class="checked" data-id="' + todoList[key].id + '">' + todoList[key].todo + '<span class="close">×</span></li>';
            }
            else {
                out += '<li data-id="' + todoList[key].id + '">' + todoList[key].todo + '<span class="close">×</span></li>';
            }
        }
        document.getElementById('js-todo-list').innerHTML = out;
    };
};