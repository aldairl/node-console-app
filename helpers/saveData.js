const fs = require("fs");

const pathFile = "./db/data.json";

const saveInDb = (data) => {
  fs.writeFileSync(pathFile, JSON.stringify(data));
};

const getDataFromFile = () => {
  if (!fs.existsSync(pathFile)) return null;

  const data = fs.readFileSync(pathFile, { encoding: "utf-8" });
  return JSON.parse(data);
};

module.exports = {
  saveInDb,
  getDataFromFile,
};
