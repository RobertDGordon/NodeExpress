const bcrypt = require("bcrypt");

const Models = require("../models");

const data = [
  {
    firstName: "What",
    lastName: "TheHeck",
    email: "work@now.com",
    password: "testtest",
  },
  {
    firstName: "Testy",
    lastName: "McTesterson",
    email: "test@test.com",
    password: "testtest",
  },
  {
    firstName: "Nooby",
    lastName: "McNooby",
    email: "noob@noob.com",
    password: "testtest",
  },
  {
    firstName: "MC",
    lastName: "Lovin",
    email: "mc@lovin.com",
    password: "testtest",
  },
  {
    firstName: "2",
    lastName: "2",
    email: "2@lovin.com",
    password: "testtest",
  },
  {
    firstName: "3",
    lastName: "3",
    email: "3@lovin.com",
    password: "testtest",
  },
];

const seedUsers = async () => {
  // Loop over data, await is important to resolve the promise (I promise you that the findAll method is a promise)
  for await (const element of data) {
    // Check if the user exists in the DB already
    const user = await Models.User.findAll({
      where: {
        email: element.email,
        firstName: element.firstName,
        lastName: element.lastName,
      },
      raw: true,
    })
      .then((data) => {
        // If a user is found the length will be > 1, else 0
        return data;
      })
      .catch((err) => {
        console.log("Error:", err);
        throw err;
      });

    // Check if the data returned has a user or not
    if (user.length === 0) {
      // If no user, add one
      const rounds = 10; //any more than 10 will take exponentially more CPU power
      const salt = await bcrypt.genSaltSync(rounds);
      const originalPassword = element.password;
      const hashedPassword = bcrypt.hashSync(originalPassword, salt);
      element.password = hashedPassword;
      Models.User.create(element)
        .then((data) => {
          console.log("Added", element);
        })
        .catch((err) => {
          console.log("Error:", err);
          throw err;
        });
    } else {
      console.log("User exists", user[0].email);
      //Run update
    }
  }
};

module.exports = {
  seedUsers,
};
