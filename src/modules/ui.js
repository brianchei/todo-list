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

export default class UI {
    constructor() {
        let page = document.createElement('div');
        page.classList.add('page');
        document.body.append(page);

        let content = document.createElement('div');
        content.classList.add('content');
        
        page.append(this.createHeader());
        content.append(this.createSidebar(), this.createMain());
        page.append(content);
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
            let li = document.createElement('li');

            let div = document.createElement('div');
            div.classList.add(projectName);

            let img = document.createElement('img');
            img.src = currentImagePaths[currentProjects.indexOf(projectName)];
            img.width = '32';

            let link = document.createElement('a');
            // link.href = TODO
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
            let li = document.createElement('li');

            let div = document.createElement('div');
            div.classList.add(projectName);

            let img = document.createElement('img');
            img.src = defaultImagePaths[defaultProjects.indexOf(projectName)];
            img.width = '32';

            let link = document.createElement('a');
            // link.href = TODO
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

        let task = this.createTask('G', 'PAY BILLS', '2/3/2025');

        // task expanded
        let taskExpanded = this.createTask('G', 'PAY BILLS', '2/3/2025', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin elit dolor, a tincidunt mauris pellentesque a. Aliquam at justo id nisi accumsan pharetra id in massa. In quis placerat nulla. Morbi fringilla odio odio, at bibendum erat feugiat quis. Morbi rhoncus ut nunc sit amet posuere. Maecenas nec venenatis nulla. Nunc eleifend justo et est viverra, ac congue arcu venenatis. Nullam dignissim, augue id vulputate bibendum, odio ligula pretium ante, bibendum ultrices nisl lacus viverra dui. Sed vulputate turpis tempor est aliquam, vel egestas neque posuere.')
        taskExpanded.classList.remove('task');
        taskExpanded.classList.add('task-expanded');

        
        // build container
        taskContainer.append(heading, addTask, task, taskExpanded);


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
        let task = document.createElement('div');
        task.classList.add('task');

        // left
        let taskLeft = document.createElement('div');
        taskLeft.classList.add('left');

        let priority = document.createElement('div');
        priority.classList.add('priority');
        priority.textContent = setPriority;

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

        let checkboxIcon = document.createElement('img');
        checkboxIcon.src = checkIconPath;
        checkboxIcon.alt = 'checkbox';
        checkboxIcon.width = 32;

        checkbox.append(checkboxIcon);

        taskRight.append(date, checkbox);

        // description
        let description = document.createElement('p');
        description.classList.add('description');
        description.textContent = setDescription;

        task.append(taskLeft, taskRight);
        if (setDescription) {
            task.append(description);
        }

        return task;
    }

    addPageEventListeners() {

    }

    showSidebar() {
    }
    hideSidebar() {
        let sidebar = document.querySelector('.sidebar');
        sidebar.remove();
    }

    displayAccount() {
        let modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');
        modalOverlay.innerHTML = `
        <dialog class="modal">
            <form action="" method="dialog">
                <div class="form-container">
                    <div class="form-top">
                        <h1>Login</h1>
                        <button class="close-form">x</button>
                    </div>
                    <div class="form-bottom">
                        <div class="form-control">
                            <label for="username"></label>
                            <input type="text" name="username" id="username">
                            <span>Username</span>
                        </div>
                        <div class="form-control">
                            <label for="password"></label>
                            <input type="text" name="password" id="password">
                            <span>Password</span>
                        </div>
                        <button class="submit" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </dialog>`;
        let modal = modalOverlay.querySelector('dialog');
        modal.showModal();
    }
    hideAccount() {
        let modal = document.querySelector('dialog');
        modal.close();
    }

    displayPage(page) {
        // show/switch to/navigate project pages
    }


    addProjectEventListeners() {

    }

    addProject(title) {
        let projects = document.querySelector('.projects');
        let projectTitle = project.getTitle;
        projects.innerHTML += `
        <li>
            <div class="` + projectTitle + `">
                <img src="" alt="` + projectTitle + `" width="32px">
                <a href="">` + projectTitle + `</a>
            </div>
        </li>`
    }
    deleteProject(title) {
        let toDelete = document.querySelector('.' + title);
        let listItem = toDelete.parentElement;
        listItem.remove();
    }

    editProject(title, newTitle) {
        // TODO
    }


    addTaskEventListeners() {

    }

    addTask(task) {
        let tasks = document.querySelector('.main');
        let title = task.getTitle();
        let priority = task.getPriority();
        let dueDate = task.getDueDate();

        let toAdd = document.createElement('.div');
        toAdd.classList.add('task');

        toAdd.innerHTML = `
        <div class="left">
            <div class="priority">` + priority + `</div>
                <p class="title">` + title + `</p>
                <button class="dropdown"><img src="images/arrow_drop_down_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="drop-down"></button>
                <button class="delete"><img src="images/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="delete"></button>
            </div>
            <div class="right">
                <p class="date">` + dueDate + `</p>
            <div class="checkbox"><img src="images/check_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="check"></div>
        </div>`

        tasks.appendChild(toAdd);
    }
    deleteTask(title) {
        let toDelete = document.querySelector('.' + title);
        let task = toDelete.parentElement;
        task.parentElement.remove();
    }

    showDescription(task) {
        // TODO
    }
    hideDescription(task) {
        // TODO
    }

    checkTask(task) {
        // TODO
    }
}



// old methods
// displayHome
/*
        // display header
        let header = document.createElement('header');
        header.innerHTML = `
        <img class="banner" src="images/henrique-ferreira-QjOiTg459jI-unsplash.jpg" alt="banner">
            <button class="menu">
                <img src="images/menu_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="menu" width="32px">
            </button>
            <h1 class="title">LORD WILLING</h1>
            <img class="account" src="images/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="account" width="64px">
            <!--Photo by <a href="https://unsplash.com/@rickpsd?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Henrique Ferreira</a> on <a href="https://unsplash.com/photos/layered-blue-mountains-fade-into-a-soft-pink-sky-QjOiTg459jI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>-->`;

        // display sidebar
        let sidebar = document.createElement('div');
        sidebar.classList.add('sidebar');
        sidebar.innerHTML = `
        <div class="sidebar">
            <ul class="current">
                <li>
                    <div class="inbox">
                        <img src="images/inbox_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="inbox" width="32px">
                        <a href="">INBOX</a>
                    </div>
                </li>
                <li>
                    <div class="today">
                        <img src="images/calendar_view_day_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="today" width="32px">
                        <a href="">TODAY</a>
                       </div>
                </li>
                <li>
                    <div class="week">
                        <img src="images/calendar_view_week_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="week" width="32px">
                        <a href="">WEEK</a>
                    </div>
                </li>
                <li>
                    <div class="month">
                        <img src="images/calendar_view_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="month" width="32px">
                        <a href="">MONTH</a>
                    </div>
                </li>
            </ul>
            <div class="add-project">PROJECTS<button>+</button></div>
            <ul class="projects">
                <li>
                    <div class="all">
                        <img src="images/overview_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="all" width="32px">
                        <a href="">ALL</a>
                    </div>
                </li>
                <li>
                    <div class="school">
                        <img src="images/school_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="school" width="32px">
                        <a href="">SCHOOL</a>
                    </div>
                </li>
                <li>
                    <div class="work">
                        <img src="images/work_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="work" width="32px">
                        <a href="">WORK</a>
                    </div>
                </li>
                <li>
                    <div class="hobbies">
                        <img src="images/sports_basketball_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="hobbies" width="32px">
                        <a href="">HOBBIES</a>
                    </div>
                </li>
                <li>
                    <div class="faith">
                        <img src="images/church_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="faith" width="32px">
                        <a href="">FAITH</a>
                    </div>
                </li>
            </ul>
        </div>`;

        // display content
        let content = document.createElement('div');
        content.classList.add('main');
        content.innerHTML = `
        <div class="main">
            <div class="task-container">
                <h2 class="tasks">TASKS</h2>
                <div class="add-task">
                    <button>+</button>
                    <p>ADD TASK</p>
                </div>
                <div class="task">
                    <div class="left">
                        <div class="priority">G</div>
                        <p class="title">PAY BILLS</p>
                        <button class="dropdown"><img src="images/arrow_drop_down_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="drop-down"></button>
                        <button class="delete"><img src="images/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="delete"></button>
                    </div>
                    <div class="right">
                        <p class="date">2/3/2025</p>
                        <div class="checkbox"><img src="images/check_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="check"></div>
                    </div>
                </div>
                <div class="task-expanded">
                    <div class="left">
                        <div class="priority">G</div>
                        <p class="title">PAY BILLS</p>
                        <button class="dropdown"><img src="images/arrow_drop_up_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="drop-down"></button>
                        <button class="delete"><img src="images/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="delete"></button>
                    </div>
                    <div class="right">
                        <p class="date">2/3/2025</p>
                        <div class="checkbox"><img src="images/check_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="check"></div>
                    </div>
                    <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin elit dolor, a tincidunt mauris pellentesque a. Aliquam at justo id nisi accumsan pharetra id in massa. In quis placerat nulla. Morbi fringilla odio odio, at bibendum erat feugiat quis. Morbi rhoncus ut nunc sit amet posuere. Maecenas nec venenatis nulla. Nunc eleifend justo et est viverra, ac congue arcu venenatis. Nullam dignissim, augue id vulputate bibendum, odio ligula pretium ante, bibendum ultrices nisl lacus viverra dui. Sed vulputate turpis tempor est aliquam, vel egestas neque posuere.</p>
                </div>
            </div>
            <div class="bible-verse">
                <p class="verse">Come now, you who say, “Today or tomorrow we will go into such and such a town and spend a year there and trade and make a profit”— yet you do not know what tomorrow will bring. What is your life? For you are a mist that appears for a little time and then vanishes. Instead you ought to say, “If the Lord wills, we will live and do this or that.”</p>
                <p class="location">James 4:13-15</p>
            </div>
        </div>`;

        let contentContainer = document.createElement('div');
        contentContainer.innerHTML = sidebar.innerHTML + '\n' + content.innerHTML;

        */

        /*
        // append to body
        let page = document.querySelector('.page');
        page.append(header, contentContainer);
        */


// show sidebar
/*
        let sidebar = document.createElement(div);
        sidebar.classList.add('sidebar');
        sidebar.innerHTML = `
        <ul class="current">
                    <li>
                        <div class="inbox">
                            <img src="images/inbox_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="inbox" width="32px">
                            <a href="">INBOX</a>
                        </div>
                    </li>
                    <li>
                        <div class="today">
                            <img src="images/calendar_view_day_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="today" width="32px">
                            <a href="">TODAY</a>
                        </div>
                    </li>
                    <li>
                        <div class="week">
                            <img src="images/calendar_view_week_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="week" width="32px">
                            <a href="">WEEK</a>
                        </div>
                    </li>
                    <li>
                        <div class="month">
                            <img src="images/calendar_view_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="month" width="32px">
                            <a href="">MONTH</a>
                        </div>
                    </li>
                </ul>
                <div class="add-project">PROJECTS<button>+</button></div>
                <ul class="projects">
                    <li>
                        <div class="all">
                            <img src="images/overview_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="all" width="32px">
                            <a href="">ALL</a>
                        </div>
                    </li>
                    <li>
                        <div class="school">
                            <img src="images/school_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="school" width="32px">
                            <a href="">SCHOOL</a>
                        </div>
                    </li>
                    <li>
                        <div class="work">
                            <img src="images/work_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="work" width="32px">
                            <a href="">WORK</a>
                        </div>
                    </li>
                    <li>
                        <div class="hobbies">
                            <img src="images/sports_basketball_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="hobbies" width="32px">
                            <a href="">HOBBIES</a>
                        </div>
                    </li>
                    <li>
                        <div class="faith">
                            <img src="images/church_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="faith" width="32px">
                            <a href="">FAITH</a>
                        </div>
                    </li>
                </ul>`;
                */
