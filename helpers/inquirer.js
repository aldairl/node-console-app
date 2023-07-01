const inquirer = require("inquirer");

require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "Select an option",
    choices: [
      {
        name: `${"1.".green} Create`,
        value: "1",
        short: "Create task",
      },
      {
        name: `${"2.".green} List tasks`,
        value: "2",
        short: "List tasks",
      },
      {
        name: `${"3.".green} List complete task`,
        value: "3",
        short: "List complete tasks",
      },
      {
        name: `${"4.".green} List pending task`,
        value: "4",
        short: "List pending tasks",
      },
      {
        name: `${"5.".green} Complete task(s)`,
        value: "5",
        short: "complete tasks",
      },
      { name: `${"6.".green} Delete task`, value: "6", short: "delete tasks" },
      { name: `${"0.".green} Exit`, value: "0", short: "exit" },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();

  console.log("====================".green);
  console.log("     TASK LIST".white);
  console.log("====================".green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "continue",
      message: `\nPress ${"ENTER".green} to continue...\n`,
    },
  ];

  return await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "inputUser",
      message,
    },
  ];

  const { inputUser } = await inquirer.prompt(question);
  return inputUser;
};

const deleteTask = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    return {
      name: `${(i + 1 + ".").green} ${task.desc}`,
      value: task.id,
    };
  });

  choices.unshift({
    name: `${"0.".green} Cancel`,
    value: "0",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirmAcction = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "authorize",
      message,
    },
  ];

  const { authorize } = await inquirer.prompt(question);
  return authorize;
};

const checkTaskList = async (task = []) => {
  const choices = task.map((task, i) => {
    return {
      name: `${(i + 1 + ",").green} ${task.desc}`,
      value: task.id,
      checked: task.completedIn ? true : false,
    };
  });

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(questions);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  deleteTask,
  confirmAcction,
  checkTaskList,
};
