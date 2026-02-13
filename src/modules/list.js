/* Functionality
- create list with properties (title)
- export list
*/

/* Pseudocode
CLASS List
    INITIALIZE title, projects
    
    SET title
    GET title

    SET projects
    GET projects

    ADD project
    DELETE project

    GET project

    CONTAINS project

    UPDATE project
*/

export default class List {
    constructor() {
        this.title = '';
        this.projects = [];        
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
        let newProjects = this.projects.filter((project) => project.title !== title);
        this.projects = newProjects;
        return newProjects;
    }

    getProject(title) {
        for (project in projects) {
            if (project.getTitle === title) {
                return project;
            }
        }
    }

    containsProject(title) {
        if (this.projects.find(project => project.title === title)) {
            return true;
        }
        return false;
    }


    updateTodayProjects() {
        // TODO
    }

    updateWeekProjects() {
        // TODO
    }

}