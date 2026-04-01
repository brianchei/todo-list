import bannerPath from '../images/henrique-ferreira-QjOiTg459jI-unsplash.jpg'
import menuIconPath from '../images/menu_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import accountIconPath from '../images/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import inboxIconPath from '../images/inbox_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import todayIconPath from '../images/calendar_view_day_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import weekIconPath from '../images/calendar_view_week_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import monthIconPath from '../images/calendar_view_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import allIconPath from '../images/overview_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import schoolIconPath from '../images/school_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import workIconPath from '../images/work_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import hobbiesIconPath from '../images/sports_basketball_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import faithIconPath from '../images/church_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import dropdownIconPath from '../images/arrow_drop_down_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import dropUpIconPath from '../images/arrow_drop_up_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import deleteIconPath from '../images/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import checkIconPath from '../images/check_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';

import Project from './project.js';
import { format } from "date-fns";
import { SYSTEM_PROJECTS } from './constants.js';

export default class DOMRenderer {
    constructor() {
        this.dom = {
            page: null,
            content: null,
            sidebar: null,
            main: null,
            taskContainer: null,
            taskList: null,
            projectsList: null,
            currentProjectsList: null,
            menuBtn: null,
            accountBtn: null,
            addProjectBtn: null,
            addTaskBtn: null
        };
    }

    initPage(list) {
        this.dom.page = document.createElement('div');
        this.dom.page.classList.add('page');
        document.body.append(this.dom.page);

        this.dom.content = document.createElement('div');
        this.dom.content.classList.add('content');

        this.dom.page.append(this.createHeader());
        this.dom.content.append(this.createSidebar(list), this.createMain());
        this.dom.page.append(this.dom.content);

        // Cache persistent references
        this.dom.sidebar = document.querySelector('.sidebar');
        this.dom.main = document.querySelector('.main');
        this.dom.taskContainer = document.querySelector('.task-container');
        this.dom.taskList = document.querySelector('.task-list');
        this.dom.projectsList = document.querySelector('.projects');
        this.dom.currentProjectsList = document.querySelector('.current');
        this.dom.menuBtn = document.querySelector('.menu');
        this.dom.accountBtn = document.querySelector('.account');
        this.dom.addProjectBtn = document.querySelector('.add-project > button');
        this.dom.addTaskBtn = document.querySelector('.add-task > button');
    }

    createHeader() {
        let header = document.createElement('header');

        let banner = document.createElement('img');
        banner.classList.add('banner');
        banner.src = bannerPath;
        banner.alt = 'banner';

        let menu = document.createElement('button');
        menu.classList.add('menu');
        let menuIcon = document.createElement('img');
        menuIcon.src = menuIconPath;
        menuIcon.alt = 'menu';
        menuIcon.width = '32';
        menu.appendChild(menuIcon);

        let heading = document.createElement('h1');
        heading.classList.add('title');
        heading.textContent = 'LORD WILLING';

        let account = document.createElement('button');
        account.classList.add('account');
        let accountIcon = document.createElement('img');
        accountIcon.src = accountIconPath;
        accountIcon.alt = 'account';
        accountIcon.width = '48';
        account.appendChild(accountIcon);

        header.append(banner, menu, heading, account);
        return header;
    }

    createSidebar(list) {
        let sidebar = document.createElement('div');
        sidebar.classList.add('sidebar');

        // current projects
        let current = document.createElement('ul');
        current.classList.add('current');

        let currentProjects = [SYSTEM_PROJECTS.INBOX, SYSTEM_PROJECTS.TODAY, SYSTEM_PROJECTS.WEEK, SYSTEM_PROJECTS.MONTH];
        let currentImagePaths = [inboxIconPath, todayIconPath, weekIconPath, monthIconPath];

        for (let projectName of currentProjects) {            
            let toAdd = new Project(projectName, currentImagePaths[currentProjects.indexOf(projectName)], []);
            if (!list.containsProject(projectName)) list.addProject(toAdd);

            let li = document.createElement('li');
            let div = document.createElement('div');
            div.id = projectName;

            let img = document.createElement('img');
            img.src = currentImagePaths[currentProjects.indexOf(projectName)];
            img.width = '32';

            let link = document.createElement('a');
            link.textContent = projectName.toUpperCase();
            link.href = '#';

            div.append(img, link);
            li.append(div);
            current.append(li);
        }

        let addProject = document.createElement('div');
        addProject.classList.add('add-project');
        addProject.textContent = 'PROJECTS';
        let addProjectButton = document.createElement('button');
        addProjectButton.textContent = '+';
        addProject.append(addProjectButton);

        // default projects
        let defaults = document.createElement('ul');
        defaults.classList.add('projects');

        let defaultProjects = [SYSTEM_PROJECTS.ALL, 'school', 'work', 'hobbies', 'faith'];
        let defaultImagePaths = [allIconPath, schoolIconPath, workIconPath, hobbiesIconPath, faithIconPath];

        for (let projectName of defaultProjects) {
            let toAdd = new Project(projectName, defaultImagePaths[defaultProjects.indexOf(projectName)], []);
            if (!list.containsProject(projectName)) list.addProject(toAdd);

            let li = document.createElement('li');
            let div = document.createElement('div');
            div.id = projectName;

            let img = document.createElement('img');
            img.src = defaultImagePaths[defaultProjects.indexOf(projectName)];
            img.width = '32';

            let link = document.createElement('a');
            link.textContent = projectName.toUpperCase();
            link.href = '#';

            div.append(img, link);
            li.append(div);
            defaults.append(li);       
        }

        sidebar.append(current, addProject, defaults);
        return sidebar;
    }

    createMain() {
        let main = document.createElement('div');
        main.classList.add('main');

        let taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        let heading = document.createElement('h2');
        heading.classList.add('tasks');
        heading.textContent = 'TASKS';

        let addTask = document.createElement('div');
        addTask.classList.add('add-task');

        let addTaskButton = document.createElement('button');
        addTaskButton.textContent = '+';
        let addTaskText = document.createElement('p');
        addTaskText.textContent = 'ADD TASK';
        addTask.append(addTaskButton, addTaskText);

        let taskList = document.createElement('ul');
        taskList.classList.add('task-list');

        taskContainer.append(heading, addTask, taskList);

        let bibleVerse = document.createElement('div');
        bibleVerse.classList.add('bible-verse');
        let verse = document.createElement('p');
        verse.classList.add('verse');
        verse.textContent = 'Come now, you who say, “Today or tomorrow we will go into such and such a town and spend a year there and trade and make a profit”— yet you do not know what tomorrow will bring. What is your life? For you are a mist that appears for a little time and then vanishes. Instead you ought to say, “If the Lord wills, we will live and do this or that.';
        let location = document.createElement('p');
        location.classList.add('location');
        location.textContent = 'James 4:13-15';

        bibleVerse.append(verse, location);
        main.append(taskContainer, bibleVerse);

        return main;
    }

    createTask(setPriority, setTitle, setDate, setDescription, isChecked = false) {
        let task = document.createElement('li');
        task.classList.add('task');

        let taskLeft = document.createElement('div');
        taskLeft.classList.add('left');

        let priority = document.createElement('div');
        priority.classList.add('priority');
        priority.textContent = setPriority;
        priority.classList.add(setPriority);

        let title = document.createElement('p');
        title.classList.add('title');
        title.textContent = setTitle;

        let dropdownButton = document.createElement('button');
        dropdownButton.classList.add('dropdown');
        let dropdownIcon = document.createElement('img');
        dropdownIcon.src = dropdownIconPath;
        dropdownIcon.alt = 'drop-down';
        dropdownButton.append(dropdownIcon);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        let deleteIcon = document.createElement('img');
        deleteIcon.src = deleteIconPath;
        deleteIcon.alt = 'delete';
        deleteButton.append(deleteIcon);

        taskLeft.append(priority, title, dropdownButton, deleteButton);

        let taskRight = document.createElement('div');
        taskRight.classList.add('right');

        let date = document.createElement('p');
        date.classList.add('date');
        let dateFormatted = format(new Date(setDate), "M/d/yy");
        date.textContent = dateFormatted;

        let checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');
        if (isChecked) {
            let check = document.createElement('img');
            check.src = checkIconPath;
            check.alt = 'check';
            checkbox.append(check);
        }

        taskRight.append(date, checkbox);

        if (setDescription) {
            let description = document.createElement('p');
            description.classList.add('description');
            description.textContent = setDescription;
            description.classList.add('hidden');
            task.append(description);
        }

        task.append(taskLeft, taskRight);
        return task;
    }

    displayPage(projectData) {
        // clear tasks
        while (this.dom.taskList.firstChild) {
            this.dom.taskList.removeChild(this.dom.taskList.firstChild);
        }

        // load project tasks
        let tasks = projectData.getTodos();

        for (let task of tasks) {
            let toAdd = this.createTask(task.getPriority(), task.getTitle(), task.getDueDate(), task.getDescription(), task.getChecked());
            this.dom.taskList.append(toAdd);
        }

        // update current project
        let bolded = document.querySelector('.bolded');
        if (bolded) bolded.classList.remove('bolded');

        let currentProjectElement = document.querySelector('#' + projectData.getTitle());
        if (currentProjectElement) {
            currentProjectElement.classList.add('bolded');
        }
    }

    renderNewProject(title, image) {
        let li = document.createElement('li');
        let projectContainer = document.createElement('div');
        projectContainer.id = title;
        let img = document.createElement('img');
        img.src = image;
        img.alt = title;
        img.width = '32';
        let link = document.createElement('a');
        link.textContent = title.toUpperCase();
        link.href = '#';

        projectContainer.append(img, link);
        li.append(projectContainer);
        this.dom.projectsList.append(li);
    }

    removeProject(projectElement) {
        projectElement.parentElement.remove();
    }

    renderProjectEdit(oldTitle, newTitle, image) {
        let project = document.querySelector('#' + oldTitle);
        if (!project) return;
        
        project.id = newTitle;

        let img = project.querySelector('img');
        if (image) img.src = image;
        img.alt = newTitle;
        let link = project.querySelector('a');
        link.textContent = newTitle.toUpperCase();
    }
    
    appendTask(task) {
        let toAdd = this.createTask(task.getPriority(), task.getTitle(), task.getDueDate(), task.getDescription(), task.getChecked());
        this.dom.taskList.appendChild(toAdd);
    }

    removeTask(taskElement) {
        taskElement.remove();
    }

    showSidebar() {
        this.dom.content.style.gridTemplateColumns = '2fr 8fr';
        this.dom.sidebar.classList.remove('hidden');
    }

    hideSidebar() {
        this.dom.content.style.gridTemplateColumns = '1fr';
        this.dom.sidebar.classList.add('hidden');
    }

    showDescription(task) {
        task.classList.remove('task');
        task.classList.add('task-expanded');
        let dropdown = task.querySelector('.dropdown img');
        if (dropdown) dropdown.src = dropUpIconPath;
        let description = task.querySelector('.description');
        if (description) description.classList.remove('hidden');
    }

    hideDescription(task) {
        task.classList.remove('task-expanded');
        task.classList.add('task');
        let dropdown = task.querySelector('.dropdown img');
        if (dropdown) dropdown.src = dropdownIconPath;
        let description = task.querySelector('.description');
        if (description) description.classList.add('hidden');
    }

    updateTaskPriority(priorityElement, newPriority) {
        priorityElement.classList.remove('G', 'Y', 'R');
        priorityElement.classList.add(newPriority);
        priorityElement.textContent = newPriority;
    }

    updateTaskTitle(titleElement, newTitle) {
        titleElement.textContent = newTitle;
    }

    updateTaskDate(dateElement, newDateStr) {
        dateElement.textContent = format(new Date(newDateStr), "M/d/yy");
    }

    toggleCheckbox(checkboxElement, isChecked) {
        if (!isChecked) {
            checkboxElement.replaceChildren();
        } else {
            let check = document.createElement('img');
            check.src = checkIconPath;
            check.alt = 'check';
            checkboxElement.append(check);
        }
    }
    
    renderCustomDeleteBtn(hoverTarget, onClickCallback) {
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        let deleteIcon = document.createElement('img');
        deleteIcon.src = deleteIconPath;
        deleteIcon.alt = 'delete';
        deleteIcon.style.minWidth = '24px';
        deleteButton.append(deleteIcon);
        
        deleteButton.addEventListener('click', onClickCallback);
        hoverTarget.append(deleteButton);
        return deleteButton;
    }
}
