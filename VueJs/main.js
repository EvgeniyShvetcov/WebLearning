/*Vue.component(
    'todo-item', {
    template: '<li>Это todo</li>'
    })
Vue.component(
    'todo-item1', {
        props : ['todo'],
        template: '<li>{{todo.text}}</li>'
    }
)

let app = new Vue({
    el: "app",
    data:{
        message: "Hello Vue.js"
    }
})

let app1 = new Vue({
    el: '#componentexample',
    data: {
        todos : [
            {id : 0, text : "Овощи"},
            {id : 1, text : "Сыр"},
            {id : 2, text : "Что там ещё люди едят?"}
        ]
    }
})*/

'use strict'

let app3 = new Vue({
    el : "#getExample",
    data : {
        firstName : ''
    },
    methods: {
        requestPersonalData : function(){
            fetch('http://localhost:5000/home/index', {method : 'get'}).then(function(response){
                alert(response.headers.get('Content-Type'));
                alert(response.status);

                return response.json();
            }).then(function(value){
                let obj = JSON.parse(value);
                app3.firstName = obj.personalData[0].firstName;
            }).catch(alert);
        }
    }
})

