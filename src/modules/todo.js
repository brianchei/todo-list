/* Functionality
- create todo object with property parameters (title, description, due date, priority, notes, checklist)
- export object
*/

export default class Todo {
    constructor(priority, title, dueDate, description) {
        this.priority = priority;
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.checked = false;
    }

    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title;
    }

    setDescription(description) {
        this.description = description;
    }
    getDescription() {
        return this.description;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
    getDueDate() {
        return this.dueDate;
    }

    setPriority(priority) {
        this.priority = priority;
    }
    getPriority() {
        return this.priority;
    }

    setChecked() {
        this.checked = !this.checked;
    }
    getChecked() {
        return this.checked;
    }

    dateFormatted() {
        // Parse ISO date string and return Date object
        return new Date(this.getDueDate());
    }
}
