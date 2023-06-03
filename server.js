const express = require("express");
const cors = require("cors");
const app = express();
const dbConfig = require('./app/config/db.config');
const cookieParser = require('cookie-parser');

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
const db = require("./app/models/index.js");
const Role = db.role;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes for authentication and user management
require('./app/routes/auth.routes.js')(app);
require('./app/routes/user.routes.js')(app);

// Sync database and create initial roles
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
}).catch(error => {
  console.error('Error synchronizing database:', error);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

// Require routes for blog posts
require('./app/routes/blogPosts.routes.js')(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend application." });
});

// Set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
