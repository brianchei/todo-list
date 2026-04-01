// import classes
import Todo from './todo.js';
import Project from './project.js';
import List from './list.js';
import Storage from './storage.js';

import DOMRenderer from './domRenderer.js';
import ModalManager from './modalManager.js';
import EventManager from './eventManager.js';

import { isToday, isThisWeek, isThisMonth, isBefore } from "date-fns";
import { SYSTEM_PROJECTS } from './constants.js';

export default class UI {
    constructor() {
        this.storage = new Storage();
        const savedData = this.storage.load();

        if (savedData && savedData.list) {
            this.list = savedData.list;
        } else {
            this.list = new List('current', []);
        }

        this.renderer = new DOMRenderer();
        this.renderer.initPage(this.list);

        this.modalManager = new ModalManager();
        this.eventManager = new EventManager(this);
        this.eventManager.init();

        if (!savedData) {
            this.createPlaceholders();
        }

        this.addPendingTasks();

        // Initial render: default to inbox
        let inbox = document.querySelector('#' + SYSTEM_PROJECTS.INBOX);
        if (inbox) {
            inbox.classList.add('bolded');
            this.displayPage(SYSTEM_PROJECTS.INBOX);
        }
    }

    createPlaceholders() {
        let todo = new Todo('G', 'PAY BILLS', '2026-03-19', '');
        let todoExpanded = new Todo('G', 'PAY BILLS EXPANDED', '2026-03-19', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

        let project = this.list.getProject(SYSTEM_PROJECTS.INBOX);
        if (project) {
            project.addTodo(todo);
            project.addTodo(todoExpanded);
        }
    }

    // --- Account Logic ---
    handleAccountSubmit(username, password) {
        this.storage.save(this.list, { username });
    }

    // --- Page Logic ---
    displayPage(projectId) {
        let project = this.list.getProject(projectId);
        if (project) {
            this.renderer.displayPage(project);
        }
    }

    // --- Project Logic ---
    handleAddProject(title, image) {
        if (!this.list.containsProject(title)) {
            let toAdd = new Project(title, image, []);
            this.list.addProject(toAdd);
            this.renderer.renderNewProject(title, image);
            this.storage.save(this.list);
        } else {
            alert('Project already exists!');
        }
    }

    handleEditProject(oldTitle, newTitle) {
        if (this.list.containsProject(oldTitle)) {
            this.list.getProject(oldTitle).setTitle(newTitle);
            this.renderer.renderProjectEdit(oldTitle, newTitle);
            this.storage.save(this.list);
        }
    }

    handleDeleteProject(projectDiv) {
        let title = projectDiv.id;
        let wasCurrentProject = projectDiv.classList.contains('bolded');

        this.list.deleteProject(title);
        this.renderer.removeProject(projectDiv);

        if (wasCurrentProject) {
            document.querySelectorAll('.sidebar li div').forEach(div => div.classList.remove('bolded'));
            let inbox = document.querySelector('#' + SYSTEM_PROJECTS.INBOX);
            if (inbox) {
                inbox.classList.add('bolded');
                this.displayPage(SYSTEM_PROJECTS.INBOX);
            }
        }
        this.storage.save(this.list);
    }

    // --- Task Logic ---
    handleAddTask(priority, title, date, description) {
        let task = new Todo(priority, title, date, description);
        
        let currentProjectDiv = document.querySelector('.bolded');
        let project = this.list.getProject(currentProjectDiv ? currentProjectDiv.id : SYSTEM_PROJECTS.INBOX);

        if (!project.containsTodo(task)) {
            project.addTodo(task);
        }

        this.updatePendingTasks(task);
        this.renderer.appendTask(task);
        this.displayPage(currentProjectDiv ? currentProjectDiv.id : SYSTEM_PROJECTS.INBOX);
        this.storage.save(this.list);
    }

    handleTaskPriorityChange(taskTitle, clickTarget) {
        let currentProjectDiv = document.querySelector('.bolded');
        let project = this.list.getProject(currentProjectDiv ? currentProjectDiv.id : SYSTEM_PROJECTS.INBOX);
        let task = project.getTodo(taskTitle);

        if (task) {
            let priority = task.getPriority();
            let newPriority = priority === 'G' ? 'Y' : (priority === 'Y' ? 'R' : 'G');
            task.setPriority(newPriority);
            this.renderer.updateTaskPriority(clickTarget, newPriority);
            this.storage.save(this.list);
        }
    }

    handleTaskTitleChange(oldTitle, newTitle, clickTarget) {
        let currentProjectDiv = document.querySelector('.bolded');
        let project = this.list.getProject(currentProjectDiv ? currentProjectDiv.id : SYSTEM_PROJECTS.INBOX);
        let task = project.getTodo(oldTitle);

        if (task) {
            task.setTitle(newTitle);
            this.renderer.updateTaskTitle(clickTarget, newTitle);
            this.storage.save(this.list);
        }
    }

    handleTaskDateChange(taskTitle, newDate, clickTarget) {
        let currentProjectDiv = document.querySelector('.bolded');
        let project = this.list.getProject(currentProjectDiv ? currentProjectDiv.id : SYSTEM_PROJECTS.INBOX);
        let task = project.getTodo(taskTitle);

        if (task) {
            task.setDueDate(newDate);
            this.renderer.updateTaskDate(clickTarget, newDate);
            this.storage.save(this.list);
        }
    }

    handleDeleteTask(taskTitle, taskElement) {
        this.removeTaskFromAllProjects(taskTitle);
        this.renderer.removeTask(taskElement);
        this.storage.save(this.list);
    }

    handleTaskCheck(taskTitle, checkboxElement) {
        let currentProjectDiv = document.querySelector('.bolded');
        let project = this.list.getProject(currentProjectDiv ? currentProjectDiv.id : SYSTEM_PROJECTS.INBOX);
        let task = project.getTodo(taskTitle);

        if (task) {
            task.setChecked();
            this.renderer.toggleCheckbox(checkboxElement, task.getChecked());
            this.storage.save(this.list);
        }
    }

    removeTaskFromAllProjects(taskTitle) {
        const projectNames = [SYSTEM_PROJECTS.INBOX, SYSTEM_PROJECTS.TODAY, SYSTEM_PROJECTS.WEEK, SYSTEM_PROJECTS.MONTH, SYSTEM_PROJECTS.ALL];
        this.list.getProjects().forEach(project => {
            project.deleteTodo(taskTitle);
        });
        projectNames.forEach(name => {
            const project = this.list.getProject(name);
            if (project) {
                project.deleteTodo(taskTitle);
            }
        });
    }

    // --- Time/Date Logic ---
    addPendingTasks() {
        let allProjects = this.list.getProjects();
        let allTodos = [];
        const systemProjects = [SYSTEM_PROJECTS.INBOX, SYSTEM_PROJECTS.TODAY, SYSTEM_PROJECTS.WEEK, SYSTEM_PROJECTS.MONTH, SYSTEM_PROJECTS.ALL];
        
        for (let project of allProjects) {
            if (!systemProjects.includes(project.getTitle())) {
                allTodos.push(...project.getTodos());
            }
        }

        this.sortTasksAsc(allTodos);
        let allProject = this.list.getProject(SYSTEM_PROJECTS.ALL);
        if (allProject) allProject.setTodos(allTodos);

        for (let todo of allTodos) {
            this.updatePendingTasks(todo);
        }
    }

    updatePendingTasks(todo) {
        let inboxProject = this.list.getProject(SYSTEM_PROJECTS.INBOX);
        let todayProject = this.list.getProject(SYSTEM_PROJECTS.TODAY);
        let weekProject = this.list.getProject(SYSTEM_PROJECTS.WEEK);
        let monthProject = this.list.getProject(SYSTEM_PROJECTS.MONTH);
        let allProject = this.list.getProject(SYSTEM_PROJECTS.ALL);

        let currentDate = new Date(todo.getDueDate());

        if (allProject && !allProject.containsTodo(todo)) {
            allProject.addTodo(todo);
        }

        if (inboxProject && (isToday(currentDate) || isBefore(currentDate, new Date())) && !inboxProject.containsTodo(todo)) {
            inboxProject.addTodo(todo);
            this.sortTasksAsc(inboxProject.getTodos());
        }

        if (todayProject && isToday(currentDate) && !todayProject.containsTodo(todo)) {
            todayProject.addTodo(todo);
            this.sortTasksAsc(todayProject.getTodos());
        }

        if (weekProject && isThisWeek(currentDate) && !weekProject.containsTodo(todo)) {
            weekProject.addTodo(todo);
            this.sortTasksAsc(weekProject.getTodos());
        }

        if (monthProject && isThisMonth(currentDate) && !monthProject.containsTodo(todo)) {
            monthProject.addTodo(todo);
            this.sortTasksAsc(monthProject.getTodos());
        }

        let currentProjectDiv = document.querySelector('.bolded');
        if (currentProjectDiv) {
            const currentProjectId = currentProjectDiv.id;
            if ([SYSTEM_PROJECTS.INBOX, SYSTEM_PROJECTS.TODAY, SYSTEM_PROJECTS.WEEK, SYSTEM_PROJECTS.MONTH, SYSTEM_PROJECTS.ALL].includes(currentProjectId)) {
                this.displayPage(currentProjectId);
            }
        }
    }

    sortTasksAsc(todos) {
        todos.sort((a, b) => a.dateFormatted() - b.dateFormatted());
    }
}