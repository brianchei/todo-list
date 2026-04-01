import { SYSTEM_PROJECTS } from './constants.js';

export default class EventManager {
    constructor(uiController) {
        this.ui = uiController;
        this.renderer = uiController.renderer;
        this.modal = uiController.modalManager;
    }

    init() {
        this.addPageEventListeners();
        this.addProjectEventListeners();
        this.addTaskEventListeners();
        this.addKeyEventListeners();
    }

    addPageEventListeners() {
        this.renderer.dom.menuBtn.addEventListener('click', () => {
            if (this.renderer.dom.sidebar.classList.contains('hidden')) {
                this.renderer.showSidebar();
            } else {
                this.renderer.hideSidebar();
            }
        });

        this.renderer.dom.accountBtn.addEventListener('click', () => {
            this.modal.displayAccount((username, password) => {
                this.ui.handleAccountSubmit(username, password);
            });
        });
    }

    addProjectEventListeners() {
        // Project Links and Icon clicks
        this.renderer.dom.sidebar.addEventListener('click', (e) => {
            // Click on project text
            let link = e.target.closest('a');
            if (link && link.parentElement.tagName === 'DIV') {
                e.preventDefault();
                this.ui.displayPage(link.parentElement.id);
                return;
            }
            
            // Edit project title on icon click
            let img = e.target.closest('li div img');
            if (img && !img.parentElement.classList.contains('delete')) {
                let projectDiv = img.parentElement;
                let currentTitle = projectDiv.id;
                this.modal.displayPrompt('Edit Project', 'New title', currentTitle, 'text', (newTitle) => {
                    if (newTitle !== null && newTitle.trim().length) {
                        this.ui.handleEditProject(currentTitle, newTitle.trim());
                    }
                });
            }
        });

        // Add project button
        this.renderer.dom.addProjectBtn.addEventListener('click', () => {
            this.modal.displayProjectData((title, icon) => {
                this.ui.handleAddProject(title, icon);
            });
        });

        // Delete project logic (Hover delegation)
        const permanentProjects = [SYSTEM_PROJECTS.INBOX, SYSTEM_PROJECTS.TODAY, SYSTEM_PROJECTS.WEEK, SYSTEM_PROJECTS.MONTH, SYSTEM_PROJECTS.ALL];
        
        this.renderer.dom.sidebar.addEventListener('mouseover', (e) => {
            let projectDiv = e.target.closest('li div');
            if (projectDiv && !permanentProjects.includes(projectDiv.id)) {
                if (!projectDiv.querySelector('.delete')) {
                    this.renderer.renderCustomDeleteBtn(projectDiv, (clickEvent) => {
                        clickEvent.stopPropagation();
                        // ADD DELETE CONFIRMATION
                        this.modal.displayConfirm('Delete Project', `Are you sure you want to delete the project '${projectDiv.id}'?`, () => {
                            this.ui.handleDeleteProject(projectDiv);
                        });
                    });
                }
            }
        });

        this.renderer.dom.sidebar.addEventListener('mouseout', (e) => {
            let projectDiv = e.target.closest('li div');
            if (projectDiv && !projectDiv.contains(e.relatedTarget)) {
                let deleteBtn = projectDiv.querySelector('.delete');
                if (deleteBtn) deleteBtn.remove();
            }
        });
    }

    addTaskEventListeners() {
        this.renderer.dom.addTaskBtn.addEventListener('click', () => {
            this.modal.displayTaskData((priority, title, date, description) => {
                this.ui.handleAddTask(priority, title, date, description);
            });
        });

        this.renderer.dom.taskContainer.addEventListener('click', (e) => {
            let clickTarget = e.target;
            
            if (!clickTarget.closest('.task') && !clickTarget.closest('.task-expanded')) {
                return;
            }

            let currentTaskElement = clickTarget.closest('.task') || clickTarget.closest('.task-expanded');
            let currentTaskTitle = currentTaskElement.querySelector('.title').textContent;

            // Priority
            if (clickTarget.matches('.priority')) {
                this.ui.handleTaskPriorityChange(currentTaskTitle, clickTarget);
            }

            // Title
            if (clickTarget.matches('.title') && clickTarget.matches('p')) {
                this.modal.displayPrompt('Edit Task', 'New title', currentTaskTitle, 'text', (newTitle) => {
                    if (newTitle !== null && newTitle.trim().length) {
                        this.ui.handleTaskTitleChange(currentTaskTitle, newTitle.trim(), clickTarget);
                    }
                });
            }

            // Dropdown (Show/Hide Description)
            if (clickTarget.matches('.dropdown') || clickTarget.matches('.dropdown img')) {
                if (currentTaskElement.classList.contains('task')) {
                    this.renderer.showDescription(currentTaskElement);
                } else if (currentTaskElement.classList.contains('task-expanded')) {
                    this.renderer.hideDescription(currentTaskElement);
                }
            }

            // Delete Task
            if (clickTarget.matches('.delete') || clickTarget.matches('.delete img')) {
                // DELETE CONFIRMATION
                this.modal.displayConfirm('Delete Task', `Are you sure you want to delete task '${currentTaskTitle}'?`, () => {
                    this.ui.handleDeleteTask(currentTaskTitle, currentTaskElement);
                });
            }

            // Date
            if (clickTarget.matches('.date')) {
                this.modal.displayPrompt('Change Date', 'New date', '', 'date', (newDate) => {
                    if (newDate !== null && newDate.length) {
                        this.ui.handleTaskDateChange(currentTaskTitle, newDate, clickTarget);
                    }
                });
            }

            // Check
            if (clickTarget.matches('.checkbox') || clickTarget.matches('.checkbox img')) {
                let checkbox = clickTarget.closest('.checkbox');
                this.ui.handleTaskCheck(currentTaskTitle, checkbox);
            }
        });
    }

    addKeyEventListeners() {
        document.addEventListener('keydown', (e) => {
            let key = e.key;
            if (key === 'Escape') {
                let overlay = document.querySelector('.modal-overlay');
                if (overlay && !overlay.classList.contains('hidden')) {
                    e.preventDefault();
                    this.modal.hideActiveModal();
                }
            }
        });
    }
}
