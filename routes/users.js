const express = require("express");
const router = express.Router();

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  // Copy the code here
  res.send(JSON.stringify({ users }, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
  // Copy the code here
  res.send(users.filter((user) => user.email === req.params.email));
});

router.get("/lastName/:lastName", (req, res) => {
  const lastName = req.params.lastName;
  let filtered_lastname = users.filter((user) => user.lastName === lastName);
  res.send(filtered_lastname);
});

function getDateFromString(strDate) {
  let [dd, mm, yyyy] = strDate.split("-");
  return new Date(yyyy + "/" + mm + "/" + dd);
}
// console.log(sorted_users);
router.get("/sort", (req, res) => {
  let sorted_users = users.sort(function (a, b) {
    let d1 = getDateFromString(a.DOB);
    let d2 = getDateFromString(b.DOB);
    return d1 - d2;
  });
  res.send(sorted_users);
});

// POST request: Create a new user
router.post("/", (req, res) => {
  // Copy the code here
  users.push(req.query);
  res.send(users);
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  const email = req.params.email;
  let filteredUsers = users.filter((user) => user.email === email);
  if (filteredUsers.length > 0) {
    filteredUsers = filteredUsers[0];
    let DOB = req.query.DOB;
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;

    if (DOB) {
      filteredUsers.DOB = DOB;
    }
    if (firstName) {
      filteredUsers.firstName = firstName;
    }
    if (lastName) {
      filteredUsers.lastName = lastName;
    }
    users = users.filter((user) => user.email !== email);
    users.push(filteredUsers);
    res.send("User updated successfully");
  } else {
    res.send("User not found");
  }
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  const email = req.params.email;
  users = users.filter((user) => user.email !== email);
  res.send("User deleted successfully");
});

module.exports = router;
