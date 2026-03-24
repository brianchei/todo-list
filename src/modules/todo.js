/* Functionality
- create todo object with property parameters (title, description, due date, priority, notes, checklist)
- export object
*/

/* Pseudocode
SOLID

CLASS Task
    INITIALIZE title, description, due date, priority, notes, checklist
    FUNCTION SET title
    FUNCTION GET title
    
    FUNCTION SET description
    FUNCTION GET description

    FUNCTION SET due date
    FUNCTION GET due date

    FUNCTION SET priority
    FUNCTION GET priority

    FUNCTION SET notes
    FUNCTION GET notes

    FUNCTION SET checklist
    FUNCTION GET checklist

    FUNCTION RETURN date formatted
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

    /*
    setNotes(notes) {
        this.notes = notes;
    }
    getNotes() {
        return this.notes;
    }    
        */

    setChecked() {
        this.checked = !this.checked;
    }
    getChecked() {
        return this.checked;
    }

    dateFormatted() {
        // get/format date
        let year = this.getDueDate().slice(0, 4);
        let month = this.getDueDate().slice(5, 7) - 1;
        let day = this.getDueDate().slice(8);
        // let dateFormatted = format(new Date(year, month, day), "M/d/yy");
        let currentDate = new Date(year, month, day);
        
        return currentDate;
    }
}
