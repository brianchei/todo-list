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

export default class UI {
    constructor() {
        this.header = document.createElement('header');
        this.sidebar = document.createElement('div');
        this.content = document.createElement('div');
    }

    // LOADING CONTENT

    // CREATING/DELETING CONTENT

    // EVENT LISTENERS

    // maybe rename to displayDom ?? or loadHomepage
    displayHome() {
        // display header
        let header = document.createElement('header');
        header.innerHTML = `
        <img class="banner" src="images/henrique-ferreira-QjOiTg459jI-unsplash.jpg" alt="banner">
            <button class="menu">
                <img src="images/menu_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="menu" width="32px">
            </button>
            <h1 class="title">LORD WILLING</h1>
            <img class="account" src="images/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="account" width="64px">
            <!--Photo by <a href="https://unsplash.com/@rickpsd?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Henrique Ferreira</a> on <a href="https://unsplash.com/photos/layered-blue-mountains-fade-into-a-soft-pink-sky-QjOiTg459jI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>-->`

        // display content
        let content = document.createElement('div');
        content.classList.add('content');
        content.innerHTML = `
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
            </div>
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
            </div>
        </div>`;

        // append to body
        let body = document.querySelector('body');
        body.append(header, sidebar, content);
    }

    addPageEventListeners() {

    }

    displaySidebar() {
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

        let task = document.createElement('.div');
        task.classList.add('task');

        task.innerHTML = `
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

        tasks.appendChild(task);
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