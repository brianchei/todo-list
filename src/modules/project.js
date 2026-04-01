/* Functionality
- create project object with properties (title)
- export project
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
        for (const todo of this.todos) {
            if (todo.getTitle() === title) {
                return todo;
            }
        }
    }

    containsTodo(task) {
        for (let todo of this.todos) {
            // Compare by title AND dueDate to avoid false duplicates
            // (same title can exist on different dates)
            if (todo.getTitle() === task.getTitle() && todo.getDueDate() === task.getDueDate()) {
                return true;
            }
        }
        return false;
    }
}