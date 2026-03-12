/* Functionality
- load/create default DOM elements/structure (header, sidebar, content)
- methods for each interactive capability (open/close sidebar, navigate pages, account, add project, add task, delete task, open/close description, check task)
- export methods
*/


/* Features
- View all projects
- View all todos in each project (title+due date, diff. colors for priorities)
- Expand todo to see details
- Delete todo
*/


/* Pseudocode
CLASS UI
    INITIALIZE DOM elements (header, sidebar, content)

    DISPLAY DOM

    // DOCUMENT EVENT LISTENERS
    FUNCTION ADD event listeners (sidebar, account, page/project)

    FUNCTION DISPLAY sidebar
    FUNCTION HIDE sidebar

    FUNCTION DISPLAY account
    FUNCTION HIDE account

    FUNCTION DISPLAY(page) page



    // PROJECT EVENT LISTENERS
    FUNCTION ADD event listeners (add, delete, edit/update)

    FUNCTION ADD project
    FUNCTION DELETE project

    FUNCTION EDIT/UPDATE project

    // TASK EVENT LISTENERS
    FUNCTION ADD event listeners (add, delete, expand, edit/update, check)

    FUNCTION ADD task
    FUNCTION DELETE task

    FUNCTION SHOW description
    FUNCTION HIDE description

    FUNCTION CHECK task
*/

// import images
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
import deleteIconPath from '../images/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import checkIconPath from '../images/check_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';

// import classes
import Todo from './todo';
import Project from './project';
import List from './list';

export default class UI {
    constructor() {
        // initialize todo list
        this.list = new List('current', []);
        
        // build homepage
        let page = document.createElement('div');
        page.classList.add('page');
        document.body.append(page);

        let content = document.createElement('div');
        content.classList.add('content');
        
        page.append(this.createHeader());
        content.append(this.createSidebar(), this.createMain());
        page.append(content);

        // this.displayAccount();

        // attach event listeners
        this.addPageEventListeners();
        this.addProjectEventListeners();
        this.addTaskEventListeners();

        // add placeholder tasks
        this.createPlaceholders();
    }

    // LOADING CONTENT

    // CREATING/DELETING CONTENT

    // EVENT LISTENERS

    createHeader() {
        let header = document.createElement('header');

        let banner = document.createElement('img');
        banner.classList.add('banner');
        banner.src = bannerPath;
        banner.alt = banner;

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

    createSidebar() {
        let sidebar = document.createElement('div');
        sidebar.classList.add('sidebar');

        // current projects
        let current = document.createElement('ul');
        current.classList.add('current');

        let currentProjects = ['inbox', 'today', 'week', 'month'];
        let currentImagePaths = [inboxIconPath, todayIconPath, weekIconPath, monthIconPath];

        for (let projectName of currentProjects) {
            // this.addProject(projectName, currentImagePaths[currentProjects.indexOf(projectName)]);
            
            // add project to list
            let toAdd = new Project(projectName, currentImagePaths[currentProjects.indexOf(projectName)], []);
            this.list.addProject(toAdd);

            // add project to DOM
            let li = document.createElement('li');

            let div = document.createElement('div');
            div.id = projectName;

            let img = document.createElement('img');
            img.src = currentImagePaths[currentProjects.indexOf(projectName)];
            img.width = '32';

            let link = document.createElement('a');
            // link.href = ''; // TODO
            link.textContent = projectName.toUpperCase();

            div.append(img, link);
            li.append(div);
            current.append(li);
        }

        // add project
        let addProject = document.createElement('div');
        addProject.classList.add('add-project');
        addProject.textContent = 'PROJECTS';
        let addProjectButton = document.createElement('button');
        addProjectButton.textContent = '+';

        addProject.append(addProjectButton);

        // default projects
        let defaults = document.createElement('ul');
        defaults.classList.add('projects');

        let defaultProjects = ['all', 'school', 'work', 'hobbies', 'faith'];
        let defaultImagePaths = [allIconPath, schoolIconPath, workIconPath, hobbiesIconPath, faithIconPath];

        for (let projectName of defaultProjects) {
            // add project to list
            let toAdd = new Project(projectName, currentImagePaths[currentProjects.indexOf(projectName)], []);
            this.list.addProject(toAdd);

            // add project to DOM
            let li = document.createElement('li');

            let div = document.createElement('div');
            div.id = projectName;

            let img = document.createElement('img');
            img.src = defaultImagePaths[defaultProjects.indexOf(projectName)];
            img.width = '32';

            let link = document.createElement('a');
            // link.href = ''; // TODO
            link.textContent = projectName.toUpperCase();

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

        // task container
        let taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        // container elements
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

        // task list
        let taskList = document.createElement('ul');
        taskList.classList.add('task-list');

        // build task list
        taskContainer.append(heading, addTask, taskList);

        // bible verse
        let bibleVerse = document.createElement('div');
        bibleVerse.classList.add('bible-verse');

        let verse = document.createElement('p');
        verse.classList.add('verse');
        verse.textContent = 'Come now, you who say, “Today or tomorrow we will go into such and such a town and spend a year there and trade and make a profit”— yet you do not know what tomorrow will bring. What is your life? For you are a mist that appears for a little time and then vanishes. Instead you ought to say, “If the Lord wills, we will live and do this or that.';

        let location = document.createElement('p');
        location.classList.add('location');
        location.textContent = 'James 4:13-15';

        bibleVerse.append(verse, location);

        // build main
        main.append(taskContainer, bibleVerse);

        return main;
    }

    // task (call function)
    createTask(setPriority, setTitle, setDate, setDescription) {
        let task = document.createElement('li');
        task.classList.add('task');

        // left
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
        dropdownIcon.alt = 'drop-down'
        dropdownButton.append(dropdownIcon);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        let deleteIcon = document.createElement('img');
        deleteIcon.src = deleteIconPath;
        deleteIcon.alt = 'delete';
        deleteButton.append(deleteIcon);

        taskLeft.append(priority, title, dropdownButton, deleteButton);

        // right
        let taskRight = document.createElement('div');
        taskRight.classList.add('right');

        let date = document.createElement('p');
        date.classList.add('date')
        date.textContent = setDate;

        let checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');

        // TODO: delete automatic check
        /*
        let checkboxIcon = document.createElement('img');
        checkboxIcon.src = checkIconPath;
        checkboxIcon.alt = 'checkbox';
        checkboxIcon.width = 32;

        checkbox.append(checkboxIcon);
        */

        taskRight.append(date, checkbox);

        if (setDescription) {
            // description
            let description = document.createElement('p');
            description.classList.add('description');
            description.textContent = setDescription;

            if (setDescription) {
                task.append(description);
            }

            description.classList.add('hidden');
        }

        task.append(taskLeft, taskRight);

        return task;
    }

    createPlaceholders() {
        // task
        let task = this.createTask('G', 'PAY BILLS', '2/3/2025', '');

        // task expanded
        let taskExpanded = this.createTask('G', 'PAY BILLS EXPANDED', '2/3/2025', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin elit dolor, a tincidunt mauris pellentesque a. Aliquam at justo id nisi accumsan pharetra id in massa. In quis placerat nulla. Morbi fringilla odio odio, at bibendum erat feugiat quis. Morbi rhoncus ut nunc sit amet posuere. Maecenas nec venenatis nulla. Nunc eleifend justo et est viverra, ac congue arcu venenatis. Nullam dignissim, augue id vulputate bibendum, odio ligula pretium ante, bibendum ultrices nisl lacus viverra dui. Sed vulputate turpis tempor est aliquam, vel egestas neque posuere.')
        taskExpanded.classList.remove('task');
        taskExpanded.classList.add('task-expanded');

        // make placeholder todos
        let todo = new Todo('G', 'PAY BILLS', '2/3/2025', '');
        let todoExpanded = new Todo('G', 'PAY BILLS EXPANDED', '2/3/2025', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin elit dolor, a tincidunt mauris pellentesque a. Aliquam at justo id nisi accumsan pharetra id in massa. In quis placerat nulla. Morbi fringilla odio odio, at bibendum erat feugiat quis. Morbi rhoncus ut nunc sit amet posuere. Maecenas nec venenatis nulla. Nunc eleifend justo et est viverra, ac congue arcu venenatis. Nullam dignissim, augue id vulputate bibendum, odio ligula pretium ante, bibendum ultrices nisl lacus viverra dui. Sed vulputate turpis tempor est aliquam, vel egestas neque posuere.');

        // add tasks to inbox
        let currentProject = document.querySelector('.bolded');
        let project = this.list.getProject(currentProject.id);

        // add todo to project
        project.addTodo(todo);
        project.addTodo(todoExpanded);

        // add placeholder todos to DOM
        let taskList = document.querySelector('.task-list');
        taskList.append(task, taskExpanded);
    }

    addPageEventListeners() {
        // Sidebar/menu
        let sidebar = document.querySelector('.sidebar');
        let menu = document.querySelector('.menu');
        menu.addEventListener('click', () => {
            if (sidebar.classList.contains('hidden')) {
                this.showSidebar();
            } else {
                this.hideSidebar();
            }
        });

        // Account
        let account = document.querySelector('.account');
        account.addEventListener('click', () => {
            this.displayAccount();
        });
    }

    showSidebar() {
        let content = document.querySelector('.content');
        content.style.gridTemplateColumns = '2fr 8fr';
        let sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('hidden');
    }
    hideSidebar() {
        let content = document.querySelector('.content');
        content.style.gridTemplateColumns = '1fr';
        let sidebar = document.querySelector('.sidebar');
        sidebar.classList.add('hidden');
    }

    displayAccount() {
        // TODO: if account modal already exists unhide
        let accountForm = document.querySelector('.account-form');
        if (accountForm) {
            let modalOverlay = document.querySelector('.modal-overlay');
            modalOverlay.classList.remove('hidden');
            let modal = accountForm.parentElement;
            modal.showModal();
            return;
        }

        // construct modal
        let modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');
        let modal = document.createElement('dialog');
        modal.classList.add('modal');
        let form = document.createElement('form');
        form.method = 'dialog';
        form.classList.add('account-form');
        let formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        form.append(formContainer);
        modal.append(form);
        modalOverlay.append(modal);
        
        // form top
        let formTop = document.createElement('div');
        formTop.classList.add('form-top');
        let heading = document.createElement('h1');
        heading.textContent = 'Login';
        let closeForm = document.createElement('button');
        closeForm.classList.add('close-form');
        closeForm.textContent = 'x';

        closeForm.addEventListener('click', () => {
            let modal = document.querySelector('dialog');
            let modalOverlay = document.querySelector('.modal-overlay');
            modal.close();
            modalOverlay.classList.add('hidden');
        });

        formTop.append(heading, closeForm);

        // form bottom
        let formBottom = document.createElement('div');
        formBottom.classList.add('form-bottom');

        // username
        let usernameFormControl = document.createElement('div');
        usernameFormControl.classList.add('form-control');
        let username = document.createElement('label');
        username.htmlFor = 'username';
        let usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.name = 'username';
        usernameInput.id = 'username';
        let usernameText = document.createElement('span');
        usernameText.textContent = 'Username';

        usernameFormControl.append(username, usernameInput, usernameText);

        // password
        let passwordFormControl = document.createElement('div');
        passwordFormControl.classList.add('form-control');
        let password = document.createElement('label');
        password.htmlFor = 'password';
        let passwordInput = document.createElement('input');
        passwordInput.type = 'text';
        passwordInput.name = 'password';
        passwordInput.id = 'password';
        let passwordText = document.createElement('span');
        passwordText.textContent = 'Password';

        passwordFormControl.append(password, passwordInput, passwordText);

        // submit
        let submit = document.createElement('button');
        submit.classList.add('submit');
        submit.type = 'submit';
        submit.textContent = 'Submit';

        submit.addEventListener('click', (e) => {
            // TODO: maybe close form before getting data
            let modal = document.querySelector('dialog');
            let modalOverlay = document.querySelector('.modal-overlay');
            modal.close();
            modalOverlay.classList.add('hidden');

            // get data
            let form = document.querySelector('.account-form');
            const formData = new FormData(form);
            let username = formData.get('username');
            let password = formData.get('password');

            // reset form
            form.reset();

            // TODO: load data
        });

        formBottom.append(usernameFormControl, passwordFormControl, submit);


        formContainer.append(formTop, formBottom);

        document.body.append(modalOverlay);
        modal.showModal();
    }
    hideAccount() {
        let modal = document.querySelector('dialog');
        let modalOverlay = document.querySelector('.modal-overlay');
        modal.close();
        modalOverlay.classList.add('hidden');
    }

    displayPage(project) {
        // show/switch to/navigate project pages
        let taskList = document.querySelector('.task-list');

        // clear tasks
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // load project tasks
        let selectedProj = this.list.getProject(project);
        let tasks = selectedProj.getTodos();

        // update DOM
        for (let task of tasks) {
            let toAdd = this.createTask(task.getPriority(), task.getTitle(), task.getDueDate(), task.getDescription());
            taskList.append(toAdd);
        }

        // update current project
        let bolded = document.querySelector('.bolded');
        bolded.classList.remove('bolded');

        let currentProject = document.querySelector('#' + selectedProj.getTitle());
        currentProject.classList.add('bolded');
    }


    addProjectEventListeners() {
        // TODO: add functionality to fetch current project (date = today, week, month)

        // Switch project
        let projects = document.querySelectorAll('.sidebar li');
        projects.forEach((project) => {
            project.querySelector('a').addEventListener('click', (e) => {
                let clickTarget = e.target;
                let currentProject = clickTarget.parentElement.id;
                this.displayPage(currentProject);
                // TODO: set current .bolded class
            });
        })
        /*
        for (project of projects) {
            project.querySelector('a').addEventListener('click', (e) => {
                let clickTarget = e.target;
                let currentProject = clickTarget.parentElement.id;
                this.displayPage(currentProject);
                // TODO: set current .bolded class
            });
        }
        */

        // Add project
        let addProject = document.querySelector('.add-project > button');
        addProject.addEventListener('click', () => {
            this.getProjectData();
        });

        // TODO: Delete project

        // All

        // Named project (School, Work, Hobbies, Faith)
    }

    // project data
    getProjectData() {
        let projectForm = document.querySelector('.project-form');
        if (projectForm) {
            let modalOverlay = document.querySelector('.modal-overlay');
            modalOverlay.classList.remove('hidden');
            let modal = projectForm.parentElement;
            modal.showModal();
            return;
        }

        // construct modal
        let modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');
        let modal = document.createElement('dialog');
        modal.classList.add('modal');
        let form = document.createElement('form');
        form.method = 'dialog';
        form.classList.add('project-form');
        let formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        form.append(formContainer);
        modal.append(form);
        modalOverlay.append(modal);
        
        // form top
        let formTop = document.createElement('div');
        formTop.classList.add('form-top');
        let heading = document.createElement('h1');
        heading.textContent = 'Add Project';
        let closeForm = document.createElement('button');
        closeForm.classList.add('close-form');
        closeForm.textContent = 'x';

        closeForm.addEventListener('click', () => {
            let modal = document.querySelector('dialog');
            let modalOverlay = document.querySelector('.modal-overlay');
            modal.close();
            modalOverlay.classList.add('hidden');
        });

        formTop.append(heading, closeForm);

        // form bottom
        let formBottom = document.createElement('div');
        formBottom.classList.add('form-bottom');

        // title
        let titleFormControl = document.createElement('div');
        titleFormControl.classList.add('form-control');
        let title = document.createElement('label');
        title.htmlFor = 'title';
        let titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.name = 'title';
        titleInput.id = 'title';
        let titleText = document.createElement('span');
        titleText.textContent = 'Title';

        titleFormControl.append(title, titleInput, titleText);

        // icon
        let iconFormControl = document.createElement('div');
        iconFormControl.classList.add('form-control');
        let icon = document.createElement('label');
        icon.htmlFor = 'icon';
        let iconInput = document.createElement('input');
        iconInput.type = 'text';
        iconInput.name = 'icon';
        iconInput.id = 'icon';
        let iconText = document.createElement('span');
        iconText.textContent = 'Icon';

        iconFormControl.append(icon, iconInput, iconText);

        // submit
        let submit = document.createElement('button');
        submit.classList.add('submit');
        submit.type = 'submit';
        submit.textContent = 'Submit';

        submit.addEventListener('click', (e) => {
            // close form before getting data
            let modal = document.querySelector('dialog');
            let modalOverlay = document.querySelector('.modal-overlay');
            modal.close();
            modalOverlay.classList.add('hidden');

            // get data
            let form = document.querySelector('.project-form');
            const formData = new FormData(form);
            let title = formData.get('title');
            let icon = formData.get('icon');

            // reset form
            form.reset();

            // add project to DOM
            this.addProject(title, icon);
        });

        formBottom.append(titleFormControl, iconFormControl, submit);


        formContainer.append(formTop, formBottom);

        document.body.append(modalOverlay);
        modal.showModal();
    }

    addProject(title, image) {
        // add project to list
        let toAdd = new Project(title, image, []);
        this.list.addProject(toAdd);

        // add project to DOM
        let projects = document.querySelector('.projects');
        let li = document.createElement('li');
        let projectContainer = document.createElement('div');
        projectContainer.id = title;
        let img = document.createElement('img');
        img.src = image;
        img.alt = title;
        img.width = '32';
        let link = document.createElement('a');
        link.href = ''; // TODO
        link.textContent = title.toUpperCase();

        projectContainer.append(image, link);
        li.append(projectContainer);
        projects.append(li);
    }
    deleteProject(title) {
        this.list.deleteProject(title);

        let toDelete = document.querySelector('.' + title);
        let listItem = toDelete.parentElement;
        listItem.remove();
    }

    editProject(title, newTitle, image) {
        this.list.getProject(title).setTitle(newTitle);
        
        let project = document.querySelector('.' + title);
        project.classList.remove(title);
        project.classList.add(newTitle);

        let img = project.querySelector('img');
        if (image) img.src = image;
        img.alt = newTitle;
        let link = project.querySelector('a');
        link.textContent = newTitle.toUpperCase();
    }


    addTaskEventListeners() {
        // set inbox bolded by default
        let inbox = document.querySelector('#inbox');
        inbox.classList.add('bolded');

        let taskContainer = document.querySelector('.task-container');

        // Add task
        let addTask = document.querySelector('.add-task > button');
        addTask.addEventListener('click', () => {
            this.getTaskData();
        });

        taskContainer.addEventListener('click', (e) => {
            let clickTarget = e.target;

            // get current project
            let currentProject = document.querySelector('.bolded');
            let project = this.list.getProject(currentProject.id);

            // exit if not task related click
            if (!clickTarget.closest('.task') && !clickTarget.closest('.task-expanded')) {
                return;
            }

            // get current task
            let currentTaskElement = clickTarget.closest('.task') ? clickTarget.closest('.task') : clickTarget.closest('.task-expanded');
            let currentTaskTitle = currentTaskElement.querySelector('.title').textContent;
            let currentTask = project.getTodo(currentTaskTitle);

            // priority
            if (clickTarget.matches('.priority')) {
                // change task priority
                let priority = currentTask.getPriority();
                if (priority === 'G') {
                    currentTask.setPriority('Y');
                } else if (priority === 'Y') {
                    currentTask.setPriority('R');
                } else {
                    currentTask.setPriority('G');
                }
                // update element display
                clickTarget.classList.remove('G', 'Y', 'R');
                clickTarget.classList.add(currentTask.getPriority());
                clickTarget.textContent = currentTask.getPriority();
            }

            // title
            if (clickTarget.matches('.title') && clickTarget.matches('p')) {
                // change task title
                let newTitle = prompt('New title?', currentTaskTitle);
                // keep same if empty input or cancel
                if (newTitle !== null && newTitle.length) {
                    currentTask.setTitle(newTitle);

                    // update element display
                    clickTarget.textContent = newTitle;
                }
            }
            
            // dropdown
            if (clickTarget.matches('.dropdown') || clickTarget.matches('.dropdown img')) {
                if (currentTaskElement.classList.contains('task')) {
                    this.showDescription(currentTaskElement);
                } else if (currentTaskElement.classList.contains('task-expanded')) {
                    this.hideDescription(currentTaskElement);
                }
            }

            // delete
            if (clickTarget.matches('.delete') || clickTarget.matches('.delete img')) {
                // remove from project
                project.deleteTodo(currentTaskTitle);

                // remove from DOM
                currentTaskElement.remove();
            }

            // date
            if (clickTarget.matches('.date')) {
                // change task date
                let currentDate = clickTarget.textContent;
                let newDate = prompt('New date?', currentDate);

                // keep same if empty input
                if (newDate !== null && newDate.length) {
                    currentTask.setDueDate(newDate);

                    // update element display
                    clickTarget.textContent = newDate;
                }
            }

            // TODO: set to toggle
            // check
            if ((clickTarget.matches('.checkbox') || clickTarget.matches('.checkbox img'))) {
                this.checkTask(e);
            }
        });

        // Change priority

        // Change title

        // Dropdown/description

        // Delete

        // Change Date

        // Check

    }

    // task data
    getTaskData() {
        // if task modal already exists unhide
        let taskForm = document.querySelector('.task-form');
        if (taskForm) {
            let modalOverlay = document.querySelector('.modal-overlay');
            modalOverlay.classList.remove('hidden');
            let modal = taskForm.parentElement;
            modal.showModal();
            return;
        }

        // create task modal
        // construct modal
        let modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');
        let modal = document.createElement('dialog');
        modal.classList.add('modal');
        let form = document.createElement('form');
        form.method = 'dialog';
        form.classList.add('task-form');
        let formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        form.append(formContainer);
        modal.append(form);
        modalOverlay.append(modal);
        
        // form top
        let formTop = document.createElement('div');
        formTop.classList.add('form-top');
        let heading = document.createElement('h1');
        heading.textContent = 'Create Todo';
        let closeForm = document.createElement('button');
        closeForm.classList.add('close-form');
        closeForm.textContent = 'x';

        // close
        closeForm.addEventListener('click', (e) => {
            let modal = document.querySelector('dialog');
            let modalOverlay = document.querySelector('.modal-overlay');
            modal.close();
            modalOverlay.classList.add('hidden');
        });

        formTop.append(heading, closeForm);

        // form bottom
        let formBottom = document.createElement('div');
        formBottom.classList.add('form-bottom');

        // priority
        let priorityFormControl = document.createElement('div');
        priorityFormControl.classList.add('form-control');
        priorityFormControl.classList.add('radio');
        // green
        let priorityGreen = document.createElement('label');
        priorityGreen.htmlFor = 'green';
        let priorityInputGreen = document.createElement('input');
        priorityInputGreen.type = 'radio';
        priorityInputGreen.name = 'priority';
        priorityInputGreen.value = 'G';
        priorityInputGreen.id = 'green';
        let priorityTextGreen = document.createElement('span');
        priorityTextGreen.textContent = 'Green';
        priorityTextGreen.classList.add('green');

        priorityFormControl.append(priorityGreen, priorityInputGreen, priorityTextGreen);

        // yellow
        let priorityYellow = document.createElement('label');
        priorityYellow.htmlFor = 'yellow';
        let priorityInputYellow = document.createElement('input');
        priorityInputYellow.type = 'radio';
        priorityInputYellow.name = 'priority';
        priorityInputYellow.value = 'Y';
        priorityInputYellow.id = 'yellow';
        let priorityTextYellow = document.createElement('span');
        priorityTextYellow.textContent = 'Yellow';
        priorityTextYellow.classList.add('yellow');

        priorityFormControl.append(priorityYellow, priorityInputYellow, priorityTextYellow);

        // red
        let priorityRed = document.createElement('label');
        priorityRed.htmlFor = 'red';
        let priorityInputRed = document.createElement('input');
        priorityInputRed.type = 'radio';
        priorityInputRed.name = 'priority';
        priorityInputRed.value = 'R';
        priorityInputRed.id = 'red';
        let priorityTextRed = document.createElement('span');
        priorityTextRed.textContent = 'Red';
        priorityTextRed.classList.add('red');

        priorityFormControl.append(priorityRed, priorityInputRed, priorityTextRed);


        // title
        let titleFormControl = document.createElement('div');
        titleFormControl.classList.add('form-control');
        let title = document.createElement('label');
        title.htmlFor = 'title';
        let titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.name = 'title';
        titleInput.id = 'title';
        let titleText = document.createElement('span');
        titleText.textContent = 'Title';

        titleFormControl.append(title, titleInput, titleText);


        // date
        let dateFormControl = document.createElement('div');
        dateFormControl.classList.add('form-control');
        let date = document.createElement('label');
        date.htmlFor = 'date';
        let dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.name = 'date';
        dateInput.id = 'date';
        let dateText = document.createElement('span');
        dateText.textContent = 'Date';

        dateFormControl.append(date, dateInput, dateText);

        
        // description
        let descriptionFormControl = document.createElement('div');
        descriptionFormControl.classList.add('form-control');
        let description = document.createElement('label');
        description.htmlFor = 'description';
        let descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.name = 'description';
        descriptionInput.id = 'description';
        let descriptionText = document.createElement('span');
        descriptionText.textContent = 'Description';

        descriptionFormControl.append(description, descriptionInput, descriptionText);

        // submit
        let submit = document.createElement('button');
        submit.classList.add('submit');
        submit.type = 'submit';
        submit.textContent = 'Submit';

        submit.addEventListener('click', (e) => {
            // close form before getting data
            let modal = document.querySelector('dialog');
            let modalOverlay = document.querySelector('.modal-overlay');
            modal.close();
            modalOverlay.classList.add('hidden');

            // get data
            let form = document.querySelector('.task-form');
            const formData = new FormData(form);
            let priority = formData.get('priority');
            let title = formData.get('title');
            let date = formData.get('date');
            let description = formData.get('description');

            /*
            // add task to current project
            let toAdd = new Todo(title, description, date, priority);
            let currentProject = document.querySelector('.bolded'); // or .active or .current ...
            let project = this.list.getProject(currentProject.id);
            project.addTodo(toAdd);
            */

            // add project to DOM
            this.addTask(e);
        });

        formBottom.append(priorityFormControl, titleFormControl, dateFormControl, descriptionFormControl, submit);


        formContainer.append(formTop, formBottom);

        document.body.append(modalOverlay);
        modal.showModal();
    }
    
    addTask(e) {
        // get data
        let form = document.querySelector('.task-form');
        const formData = new FormData(form);
        let priority = formData.get('priority');
        let title = formData.get('title');
        let date = formData.get('date');
        let description = formData.get('description');

        // reset form
        form.reset();

        // create task instance
        let task = new Todo(priority, title, date, description);
        // get current project
        let currentProject = document.querySelector('.bolded'); // or .active or .current ...
        let project = this.list.getProject(currentProject.id);
        // add task to project
        project.addTodo(task);

        // add task DOM
        let taskList = document.querySelector('.task-list');
        
        let toAdd = this.createTask(priority, title, date, description);

        taskList.appendChild(toAdd);
    }
    deleteTask(e) {
        let clickTarget = e.target;
        let task = clickTarget.parentElement.querySelector('.title').textContent;
        let toDelete = clickTarget.parentElement.parentElement;
        // get current project
        let currentProject = document.querySelector('.bolded');
        let project = this.list.getProject(currentProject.id);
        // delete task from project
        project.deleteTodo(task);
        // delete from DOM
        toDelete.remove();
    }

    showDescription(task) {
        task.classList.remove('task');
        task.classList.add('task-expanded');

        let description = task.querySelector('.description');
        if (description === null) return;
        description.classList.remove('hidden');
    }
    hideDescription(task) {
        task.classList.remove('task-expanded');
        task.classList.add('task');

        let description = task.querySelector('.description');
        if (description === null) return;
        description.classList.add('hidden');
    }

    checkTask(e) {
        // get current project
        let currentProject = document.querySelector('.bolded');
        let project = this.list.getProject(currentProject.id);
        
        // get current task
        let checkbox = e.target.closest('.checkbox');
        // check if task expanded
        let task = checkbox.closest('.task')
        ? checkbox.closest('.task').querySelector('.title').textContent 
        : checkbox.closest('.task-expanded').querySelector('.title').textContent;

        if (project.getTodo(task).getChecked()) return;
        // task set checked
        project.getTodo(task).setChecked();
        // set checked DOM
        let check = document.createElement('img');
        check.src = checkIconPath;
        check.alt = 'check';
        
        // check checkbox
        checkbox.append(check);
    }
}

/* TODO: 
- add accessibility for keypress
- display description on load for placeholder task expanded
- activate all event listeners
- create modal function
- refactor add project/event listener
- refactor event delegation (one event listener, bubbling)
- use .toggle and .matches methods
*/