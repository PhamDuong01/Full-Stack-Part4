const app = require('./app');
const { PORT } = require('./ultils/config');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
