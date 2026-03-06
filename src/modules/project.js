/* Functionality
- create project object with properties (title)
- export project
*/

/* Pseudocode
CLASS Project
    INITIALIZE title, todos

    SET name
    GET name

    SET todos
    GET todos

    ADD todo
    DELETE todo

    GET todo

    CONTAINS todo
*/

export default class Project {
    constructor(title, image, todos = []) {
        this.title = title;
        this.image = image;
        this.todos = todos;
    }

    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title;
    }

    setTodos(todos) {
        this.todos = todos;
    }
    getTodos() {
        return this.todos;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }
    deleteTodo(title) {
        let newTodos = this.todos.filter((todo) => todo.getTitle() !== title);
        this.todos = newTodos;
    }

    getTodo(title) {
        /*
        this.todos.forEach((todo) => {
            if (todo.title === title) {
                return todo;
            }
        });
        */
        for (const todo of this.todos) {
            if (todo.title === title) {
                return todo;
            }
        }
    }

    containsTodo(title) {
        for (const todo in this.todos) {
            if (todo.title === title) {
                return true;
            }
        }
        return false;
    }
}