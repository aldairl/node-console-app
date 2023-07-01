require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();

    console.log("====================".green);
    console.log("     TASK LIST".green);
    console.log("====================".green);

    console.log(`${"1.".green} Create task`);
    console.log(`${"2.".green} List tasks`);
    console.log(`${"3.".green} List complete tasks`);
    console.log(`${"4.".green} List pending tasks`);
    console.log(`${"5.".green} Complete task(s)`);
    console.log(`${"6.".green} delete task`);
    console.log(`${"0.".green} exit`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Select an option: ", (opt) => {
      resolve(opt);
      readline.close();
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPress ${"ENTER".green} to continue\n`, () => {
      resolve();
      readline.close();
    });
  });
};

module.exports = {
  mostrarMenu,
  pause,
};
