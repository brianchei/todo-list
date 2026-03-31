/* Functionality
- Save/load application state to/from localStorage
- Handle serialization/deserialization of projects and todos
- Provide clear storage functionality
*/

import Todo from './todo.js';
import Project from './project.js';
import List from './list.js';

export default class Storage {
    constructor() {
        this.STORAGE_KEY = 'todoApp';
    }

    /**
     * Save the entire application state to localStorage
     * @param {List} list - The list object containing all projects and todos
     * @param {Object} user - Current user data (username, etc.)
     */
    save(list, user = null) {
        try {
            const data = {
                list: this.serializeList(list),
                user: user,
                timestamp: Date.now()
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            // Handle storage quota exceeded
            if (error.name === 'QuotaExceededError') {
                alert('Storage full! Please delete some tasks/projects.');
            }
        }
    }

    /**
     * Load application state from localStorage
     * @returns {Object|null} - Deserialized data or null if nothing saved
     */
    load() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (!saved) return null;

            const data = JSON.parse(saved);
            return {
                list: this.deserializeList(data.list),
                user: data.user || null,
                timestamp: data.timestamp || null
            };
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            // Corrupted data - clear and start fresh
            this.clear();
            return null;
        }
    }

    /**
     * Clear all stored data
     */
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    /**
     * Serialize list object for storage
     * Converts class instances to plain objects
     */
    serializeList(list) {
        return {
            title: list.getTitle(),
            projects: list.getProjects().map(project => ({
                title: project.getTitle(),
                image: project.image,
                todos: project.getTodos().map(todo => ({
                    priority: todo.getPriority(),
                    title: todo.getTitle(),
                    dueDate: todo.getDueDate(),
                    description: todo.getDescription(),
                    checked: todo.getChecked()
                }))
            }))
        };
    }

    /**
     * Deserialize list data and reconstruct class instances
     * @param {Object} data - Serialized list data
     * @returns {List} - Reconstructed list instance
     */
    deserializeList(data) {
        if (!data) return null;

        const list = new List(data.title, []);

        for (const projData of data.projects) {
            const project = new Project(projData.title, projData.image, []);

            for (const todoData of projData.todos) {
                const todo = new Todo(
                    todoData.priority,
                    todoData.title,
                    todoData.dueDate,
                    todoData.description
                );
                if (todoData.checked) {
                    todo.setChecked();
                }
                project.addTodo(todo);
            }

            list.addProject(project);
        }

        return list;
    }

    /**
     * Check if there's saved data available
     * @returns {boolean}
     */
    hasData() {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
    }

    /**
     * Get storage usage information
     * @returns {Object} - Usage stats
     */
    getUsage() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return {
            used: total,
            available: 5 * 1024 * 1024, // ~5MB typical limit
            percentage: (total / (5 * 1024 * 1024)) * 100
        };
    }
}
