const Task = require("./task");
const { saveInDb, getDataFromFile } = require("../helpers/saveData");
/**
 * _taskList:
 *  { 'uuid-345-756': { id: uuid-3496, desc: desc, completedIn: 8168 } }
 */

class Tasks {
  _taskList = {};

  get taskList() {
    const list = Object.values(this._taskList);
    return list;
  }

  constructor() {
    this._taskList = {};
    this.loadData();
  }

  createTask(des = "") {
    const task = new Task(des);
    this._taskList[task.id] = task;
    saveInDb(this.taskList);
  }

  loadData() {
    const data = getDataFromFile();
    if (!data) return;

    data.forEach((task) => {
      this._taskList[task.id] = task;
    });
  }

  listAllTask() {
    this.taskList.forEach((task, index) => {
      const id = `${index + 1}.`.green;
      const complete = task.completedIn ? "Complete".green : "Pending".red;
      console.log(`${id} ${task.desc} :: ${complete}`);
    });
  }

  lisTaskBy(complete = true) {
    let taskToShow = [];

    if (!complete) {
      taskToShow = this.taskList.filter((task) => !task.completedIn);
    } else {
      taskToShow = this.taskList.filter((task) => task.completedIn);
    }

    taskToShow.forEach((task, index) => {
      const id = `${index + 1}.`.green;
      const complete = task.completedIn
        ? `${task.completedIn}`.green
        : "Pending".red;
      console.log(`${id} ${task.desc} :: ${complete}`);
    });
  }

  deleteTask(id = "") {
    delete this._taskList[id];
    saveInDb(this.taskList);
  }

  toggleTasks(ids = []) {
    this.taskList.forEach((task) => {
      let state = null;

      if (ids.includes(task.id)) {
        state = new Date().toISOString();
      }

      task.completedIn = state;
    });
    saveInDb(this.taskList);
  }
}

module.exports = Tasks;
