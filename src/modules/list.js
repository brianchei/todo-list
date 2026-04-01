/* Functionality
- create list with properties (title)
- export list
*/

export default class List {
    constructor(title, projects) {
        this.title = title;
        this.projects = projects;        
    }

    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title;
    }

    setProjects(projects = []) {
         this.projects = projects;
    }
    getProjects() {
        return this.projects;
    }

    addProject(project) {
        this.projects.push(project);
    }
    deleteProject(title) {
        let newProjects = this.projects.filter((project) => project.getTitle() !== title);
        this.projects = newProjects;
        return newProjects;
    }

    getProject(title) {
        for (const project of this.projects) {
            if (project.getTitle() === title) {
                return project;
            }
        }
    }

    containsProject(title) {
        if (this.projects.find(project => project.getTitle() === title)) {
            return true;
        }
        return false;
    }
}