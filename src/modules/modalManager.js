export default class ModalManager {
    constructor() {
        // Shared overlay element
        this.modalOverlay = null;
    }

    _getOrCreateOverlay() {
        if (!this.modalOverlay) {
            this.modalOverlay = document.querySelector('.modal-overlay');
            if (!this.modalOverlay) {
                this.modalOverlay = document.createElement('div');
                this.modalOverlay.classList.add('modal-overlay');
                document.body.append(this.modalOverlay);
            }
        }
        return this.modalOverlay;
    }

    unhideModal(formType) {
        let overlay = this._getOrCreateOverlay();
        overlay.classList.remove('hidden');
        let modal = formType.parentElement;
        modal.showModal();
    }

    hideActiveModal() {
        let modals = document.querySelectorAll('dialog');
        let overlay = this._getOrCreateOverlay();
        for (let modal of modals) {
            if (modal.open) {
                modal.close();
            }
        }
        overlay.classList.add('hidden');
    }

    displayAccount(onSubmitCallback) {
        let accountForm = document.querySelector('.account-form');
        if (accountForm) {
            this.unhideModal(accountForm);
            return;
        }

        let overlay = this._getOrCreateOverlay();
        overlay.classList.remove('hidden');

        let modal = document.createElement('dialog');
        modal.classList.add('modal');
        
        let form = document.createElement('form');
        form.method = 'dialog';
        form.classList.add('account-form');
        let formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        form.append(formContainer);
        modal.append(form);
        overlay.append(modal);

        // form top
        let formTop = document.createElement('div');
        formTop.classList.add('form-top');
        let heading = document.createElement('h1');
        heading.textContent = 'Login';
        let closeForm = document.createElement('button');
        closeForm.classList.add('close-form');
        closeForm.textContent = 'x';

        closeForm.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideActiveModal();
        });

        formTop.append(heading, closeForm);

        // form bottom
        let formBottom = document.createElement('div');
        formBottom.classList.add('form-bottom');

        let usernameFormControl = this._createFormControl('text', 'username', 'Username');
        let passwordFormControl = this._createFormControl('password', 'password', 'Password'); // changed text to password

        let submit = document.createElement('button');
        submit.classList.add('submit');
        submit.type = 'submit';
        submit.textContent = 'Submit';

        submit.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            let username = formData.get('username');
            let password = formData.get('password');
            if (username.length === 0 || password.length === 0) {
                alert('Please fill out username & password');
                return;
            }
            form.reset();
            this.hideActiveModal();
            if (onSubmitCallback) onSubmitCallback(username, password);
        });

        formBottom.append(usernameFormControl, passwordFormControl, submit);
        formContainer.append(formTop, formBottom);
        modal.showModal();
    }

    displayProjectData(onSubmitCallback) {
        let projectForm = document.querySelector('.project-form');
        if (projectForm) {
            this.unhideModal(projectForm);
            return;
        }

        let overlay = this._getOrCreateOverlay();
        overlay.classList.remove('hidden');

        let modal = document.createElement('dialog');
        modal.classList.add('modal');
        let form = document.createElement('form');
        form.method = 'dialog';
        form.classList.add('project-form');
        let formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        form.append(formContainer);
        modal.append(form);
        overlay.append(modal);

        // form top
        let formTop = document.createElement('div');
        formTop.classList.add('form-top');
        let heading = document.createElement('h1');
        heading.textContent = 'Add Project';
        let closeForm = document.createElement('button');
        closeForm.classList.add('close-form');
        closeForm.textContent = 'x';

        closeForm.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideActiveModal();
        });

        formTop.append(heading, closeForm);

        // form bottom
        let formBottom = document.createElement('div');
        formBottom.classList.add('form-bottom');

        let titleFormControl = this._createFormControl('text', 'title', 'Title');
        let iconFormControl = this._createFormControl('url', 'icon', 'Icon URL');

        let submit = document.createElement('button');
        submit.classList.add('submit');
        submit.type = 'submit';
        submit.textContent = 'Submit';

        submit.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            let title = formData.get('title');
            let icon = formData.get('icon');
            if (title.length === 0) {
                alert('Please fill out title');
                return;
            }
            form.reset();
            this.hideActiveModal();
            if (onSubmitCallback) onSubmitCallback(title, icon);
        });

        formBottom.append(titleFormControl, iconFormControl, submit);
        formContainer.append(formTop, formBottom);
        modal.showModal();
    }

    displayTaskData(onSubmitCallback) {
        let taskForm = document.querySelector('.task-form');
        if (taskForm) {
            this.unhideModal(taskForm);
            return;
        }

        let overlay = this._getOrCreateOverlay();
        overlay.classList.remove('hidden');

        let modal = document.createElement('dialog');
        modal.classList.add('modal');
        let form = document.createElement('form');
        form.method = 'dialog';
        form.classList.add('task-form');
        let formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        form.append(formContainer);
        modal.append(form);
        overlay.append(modal);

        let formTop = document.createElement('div');
        formTop.classList.add('form-top');
        let heading = document.createElement('h1');
        heading.textContent = 'Create Todo';
        let closeForm = document.createElement('button');
        closeForm.classList.add('close-form');
        closeForm.textContent = 'x';

        closeForm.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideActiveModal();
        });
        formTop.append(heading, closeForm);

        let formBottom = document.createElement('div');
        formBottom.classList.add('form-bottom');

        // Priority Group
        let priorityFormControl = document.createElement('div');
        priorityFormControl.classList.add('form-control', 'radio');
        
        let pGreen = this._createRadio('priority', 'G', 'green', 'Green');
        let pYellow = this._createRadio('priority', 'Y', 'yellow', 'Yellow');
        let pRed = this._createRadio('priority', 'R', 'red', 'Red');
        
        priorityFormControl.append(...pGreen, ...pYellow, ...pRed);

        let titleFormControl = this._createFormControl('text', 'title', 'Title');
        let dateFormControl = this._createFormControl('date', 'date', 'Date');
        let descriptionFormControl = this._createFormControl('text', 'description', 'Description');

        let submit = document.createElement('button');
        submit.classList.add('submit');
        submit.type = 'submit';
        submit.textContent = 'Submit';

        submit.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            let priority = formData.get('priority');
            let title = formData.get('title');
            let date = formData.get('date');
            let description = formData.get('description');
            
            if (!priority || title.length === 0 || !date) {
                alert('Please fill out priority, title & date');
                return;
            }
            form.reset();
            this.hideActiveModal();
            if (onSubmitCallback) onSubmitCallback(priority, title, date, description);
        });

        formBottom.append(priorityFormControl, titleFormControl, dateFormControl, descriptionFormControl, submit);
        formContainer.append(formTop, formBottom);
        modal.showModal();
    }

    _createFormControl(type, name, labelText) {
        let wrapper = document.createElement('div');
        wrapper.classList.add('form-control');
        let label = document.createElement('label');
        label.htmlFor = name;
        let input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.id = name;
        let span = document.createElement('span');
        span.textContent = labelText;
        wrapper.append(label, input, span);
        return wrapper;
    }

    _createRadio(name, value, id, labelText) {
        let label = document.createElement('label');
        label.htmlFor = id;
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = name;
        input.value = value;
        input.id = id;
        let span = document.createElement('span');
        span.textContent = labelText;
        span.classList.add(id);
        return [label, input, span];
    }

    displayPrompt(titleText, labelText, defaultValue, inputType, onSubmitCallback) {
        let overlay = this._getOrCreateOverlay();
        overlay.classList.remove('hidden');

        let modal = document.createElement('dialog');
        modal.classList.add('modal', 'dynamic-modal');

        let form = document.createElement('form');
        form.method = 'dialog';
        let formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        form.append(formContainer);
        modal.append(form);
        overlay.append(modal);

        let formTop = document.createElement('div');
        formTop.classList.add('form-top');
        let heading = document.createElement('h1');
        heading.textContent = titleText;
        let closeForm = document.createElement('button');
        closeForm.classList.add('close-form');
        closeForm.textContent = 'x';

        closeForm.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideActiveModal();
            modal.remove();
        });
        
        formTop.append(heading, closeForm);

        let formBottom = document.createElement('div');
        formBottom.classList.add('form-bottom');

        let inputControl = this._createFormControl(inputType, 'promptInput', labelText);
        let inputField = inputControl.querySelector('input');
        inputField.value = defaultValue;

        let submit = document.createElement('button');
        submit.classList.add('submit');
        submit.type = 'submit';
        submit.textContent = 'Submit';

        submit.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            let val = formData.get('promptInput');
            this.hideActiveModal();
            modal.remove();
            if (onSubmitCallback) onSubmitCallback(val);
        });

        formBottom.append(inputControl, submit);
        formContainer.append(formTop, formBottom);
        
        modal.showModal();
    }

    displayConfirm(titleText, messageText, onConfirmCallback) {
        let overlay = this._getOrCreateOverlay();
        overlay.classList.remove('hidden');

        let modal = document.createElement('dialog');
        modal.classList.add('modal', 'dynamic-modal');

        let form = document.createElement('form');
        form.method = 'dialog';
        let formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        form.append(formContainer);
        modal.append(form);
        overlay.append(modal);

        let formTop = document.createElement('div');
        formTop.classList.add('form-top');
        let heading = document.createElement('h1');
        heading.textContent = titleText;
        let closeForm = document.createElement('button');
        closeForm.classList.add('close-form');
        closeForm.textContent = 'x';

        closeForm.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideActiveModal();
            modal.remove();
        });
        
        formTop.append(heading, closeForm);

        let formBottom = document.createElement('div');
        formBottom.classList.add('form-bottom');
        
        let message = document.createElement('p');
        message.textContent = messageText;
        message.style.marginBottom = '1.5rem';
        message.style.textAlign = 'center';
        message.style.fontSize = '1.2rem';
        message.style.color = 'var(--text-primary)';

        let btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.gap = '1rem';
        btnContainer.style.justifyContent = 'center';

        let cancelBtn = document.createElement('button');
        cancelBtn.classList.add('close-form');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.padding = '0.5rem 1.5rem';
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideActiveModal();
            modal.remove();
        });

        let confirmBtn = document.createElement('button');
        confirmBtn.classList.add('submit');
        confirmBtn.textContent = 'Confirm';
        confirmBtn.style.padding = '0.5rem 1.5rem';
        confirmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideActiveModal();
            modal.remove();
            if (onConfirmCallback) onConfirmCallback();
        });

        btnContainer.append(cancelBtn, confirmBtn);
        formBottom.append(message, btnContainer);
        formContainer.append(formTop, formBottom);
        
        modal.showModal();
    }
}
