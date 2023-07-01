const {
  inquirerMenu,
  pause,
  readInput,
  deleteTask,
  confirmAcction,
  checkTaskList,
} = require("./helpers/inquirer");
const Tasks = require("./models/tasks");

require("colors");

const main = async () => {
  let opt = "";

  const tasksUser = new Tasks();

  do {
    // print the menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const des = await readInput("Insert task name:");
        tasksUser.createTask(des);
        break;
      case "2":
        tasksUser.listAllTask();
        break;
      case "3":
        tasksUser.lisTaskBy();
        break;
      case "4":
        tasksUser.lisTaskBy((complete = false));
        break;
      case "5":
        const ids = await checkTaskList(tasksUser.taskList);
        tasksUser.toggleTasks(ids);
        break;
      case "6":
        const id = await deleteTask(tasksUser.taskList);
        if (id === "0") continue;

        const authorize = await confirmAcction("Are you sure?");
        if (authorize) {
          tasksUser.deleteTask(id);
          console.log("Task delete successfully");
        }
        break;
    }

    if (opt !== "0") await pause();
  } while (opt !== "0");
};

main();
