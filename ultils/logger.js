const infoLog = (...params) => {
  return console.log(...params);
};
const errorLog = (...params) => {
  return console.error(...params);
};
module.exports = {
  infoLog,
  errorLog,
};
