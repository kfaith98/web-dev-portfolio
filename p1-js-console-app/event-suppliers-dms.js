const readline = require("readline");

// Create user object
const account = {
  username: "faithputon",
  password: "kfaith98",
};

// Create object to store user input
let supplierList = [];

// Helper functions
// Searches suppliers based on company name
const findMatchingSuppliers = (input) => {
  const matches = [];

  for (let i = 0; i < supplierList.length; i++) {
    const companyName = supplierList[i].companyName.toLowerCase();
    const searchInput = input.toLowerCase();

    if (companyName.includes(searchInput)) {
      matches.push(i); // Stores search index in matches array
    }
  }

  return matches;
};

// Validates user selection
const getValidIndex = (input, max) => {
  const index = Number(input);

  if (isNaN(index) || index < 1 || index > max) {
    return null;
  }

  return index - 1;
};

// Checks for valid phone number
const isValidPhoneNumber = (input) => {
  return /^09\d{9}$/.test(input.trim()); // Used regex - strictly 11-digit numbers starting in 09
};

// Checks for valid email
const isValidEmail = (input) => {
  const email = input.trim();
  return email !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Used regex - valid email
};

// Checks for empty string/spaces
const isNotEmpty = (input) => {
  return input.trim() !== "";
};

// Input/output system for terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Authenticate user
const authenticateLogIn = () => {
  rl.question("Username: ", (usernameInput) => {
    rl.question("Password: ", (passwordInput) => {
      if (
        usernameInput === account.username &&
        passwordInput === account.password
      ) {
        console.log("Successfully logged in.");
        showDashboard();
      } else {
        console.log("Incorrect details. Please try again.");
        authenticateLogIn();
      }
    });
  });
};

// Print dashboard
const showDashboard = () => {
  console.log("\n--- Database Management System ---");
  console.log("1. Add a new supplier");
  console.log("2. Edit an existing supplier");
  console.log("3. Remove a supplier");
  console.log("4. Search for a supplier by company");
  console.log("5. Display all suppliers");
  console.log("6. Log out");
  rl.question("Enter desired option: ", (choice) => {
    switch (choice) {
      case "1":
        addSupplier();
        break;
      case "2":
        editSupplier();
        break;
      case "3":
        removeSupplier();
        break;
      case "4":
        searchSupplier();
        break;
      case "5":
        displayAllSuppliers();
        break;
      case "6":
        logOut();
        break;
      default:
        console.log("Invalid entry. Please select from options below.");
        return showDashboard();
    }
  });
};

// Add a new supplier to the list
/* 
Category
Contact Person
Company Name
Contact Number
Email
*/
const addSupplier = () => {
  let newSupplier = {};

  function askCategory() {
    rl.question("Category: ", (categoryInput) => {
      if (!isNotEmpty(categoryInput)) {
        console.log("Incorrect input. Please try again.");
        askCategory();
      } else {
        newSupplier.category = categoryInput;
        askContactPerson();
      }
    });
  }
  askCategory();

  function askContactPerson() {
    rl.question("Contact Person: ", (contactPersonInput) => {
      if (!isNotEmpty(contactPersonInput)) {
        console.log("Incorrect input. Please try again.");
        askContactPerson();
      } else {
        newSupplier.contactPerson = contactPersonInput;
        askCompanyName();
      }
    });
  }

  function askCompanyName() {
    rl.question("Company Name: ", (companyNameInput) => {
      if (!isNotEmpty(companyNameInput)) {
        console.log("Incorrect input. Please try again.");
        askCompanyName();
      } else {
        newSupplier.companyName = companyNameInput;
        askContactNumber();
      }
    });
  }

  function askContactNumber() {
    rl.question("Contact Number: ", (contactNumberInput) => {
      if (!isValidPhoneNumber(contactNumberInput)) {
        console.log(
          "Invalid contact number. Enter 11 digits starting with 09.",
        );
        askContactNumber();
      } else {
        newSupplier.contactNumber = contactNumberInput;
        askEmail();
      }
    });
  }

  function askEmail() {
    rl.question("Email: ", (emailInput) => {
      if (!isValidEmail(emailInput)) {
        console.log("Incorrect input. Please try again.");
        askEmail();
      } else {
        newSupplier.email = emailInput;
        pushNewSupplier();
      }
    });
  }

  function pushNewSupplier() {
    supplierList.push(newSupplier);
    console.log("Supplier added successfully");
    console.log("Total suppliers:", supplierList.length);
    showDashboard();
  }
};

// Edit an existing supplier’s details
const editSupplier = () => {
  if (supplierList.length === 0) {
    console.log("Supplier list is empty");
    return showDashboard();
  }

  rl.question("Enter company name to edit: ", (companyToEdit) => {
    if (!isNotEmpty(companyToEdit)) {
      console.log("Invalid input. Please try again.");
      return editSupplier();
    }

    const matchedSuppliers = findMatchingSuppliers(companyToEdit);

    if (matchedSuppliers.length === 0) {
      console.log("Supplier not found. Please try again.");
      return editSupplier();
    }

    console.log("Matching suppliers:");
    matchedSuppliers.forEach((index, i) => {
      console.log(`${i + 1}. ${supplierList[index].companyName}`);
    });

    rl.question(
      "Enter the number of the supplier you want to edit: ",
      (userChoice) => {
        const selectedIndex = getValidIndex(
          userChoice,
          matchedSuppliers.length,
        );

        if (selectedIndex === null) {
          console.log("Invalid selection. Please try again.");
          return editSupplier();
        }

        const selectedSupplierIndex = matchedSuppliers[selectedIndex];
        showMenu();

        function showMenu() {
          console.log("Which field would you like to edit?");
          console.log("1. Category");
          console.log("2. Contact Person");
          console.log("3. Company Name");
          console.log("4. Contact Number");
          console.log("5. Email");

          rl.question("Please select an option: ", (choice) => {
            switch (choice) {
              case "1":
                rl.question("Enter new category: ", (input) => {
                  if (!isNotEmpty(input)) {
                    console.log("Invalid input.");
                    return showMenu();
                  }
                  supplierList[selectedSupplierIndex].category = input;
                  console.log("Supplier updated successfully.");
                  return showDashboard();
                });
                break;

              case "2":
                rl.question("Enter new contact person: ", (input) => {
                  if (!isNotEmpty(input)) {
                    console.log("Invalid input.");
                    return showMenu();
                  }
                  supplierList[selectedSupplierIndex].contactPerson = input;
                  console.log("Supplier updated successfully.");
                  return showDashboard();
                });
                break;

              case "3":
                rl.question("Enter new company name: ", (input) => {
                  if (!isNotEmpty(input)) {
                    console.log("Invalid input.");
                    return showMenu();
                  }
                  supplierList[selectedSupplierIndex].companyName = input;
                  console.log("Supplier updated successfully.");
                  return showDashboard();
                });
                break;

              case "4":
                rl.question("Enter new contact number: ", (input) => {
                  if (!isValidPhoneNumber(input)) {
                    console.log("Invalid contact number.");
                    return showMenu();
                  }
                  supplierList[selectedSupplierIndex].contactNumber = input;
                  console.log("Supplier updated successfully.");
                  return showDashboard();
                });
                break;

              case "5":
                rl.question("Enter new email: ", (input) => {
                  if (!isValidEmail(input)) {
                    console.log("Invalid email.");
                    return showMenu();
                  }
                  supplierList[selectedSupplierIndex].email = input;
                  console.log("Supplier updated successfully.");
                  return showDashboard();
                });
                break;

              default:
                console.log("Invalid option.");
                return showMenu();
            }
          });
        }
      },
    );
  });
};

// Remove a supplier from the list
const removeSupplier = () => {
  if (supplierList.length === 0) {
    console.log("Supplier list is empty");
    return showDashboard();
  } else {
    console.log("Total suppliers:", supplierList.length);
    rl.question("Enter company name to remove: ", (companyToRemove) => {
      if (!isNotEmpty(companyToRemove)) {
        console.log("Invalid input. Please try again.");
        return removeSupplier();
      }

      const matchedSuppliers = findMatchingSuppliers(companyToRemove);

      if (matchedSuppliers.length === 0) {
        console.log("Supplier not found. Please try again.");
        removeSupplier();
      } else {
        console.log("Matching suppliers:");
        for (let i = 0; i < matchedSuppliers.length; i++) {
          let index = matchedSuppliers[i];
          console.log(`${i + 1}` + ". " + supplierList[index].companyName);
        }
      }
      rl.question(
        "Enter the number of the supplier you want to remove: ",
        (userChoice) => {
          const selectedIndex = getValidIndex(
            userChoice,
            matchedSuppliers.length,
          );

          if (selectedIndex === null) {
            console.log("Invalid selection. Please try again.");
            return removeSupplier();
          }

          const selectedSupplierIndex = matchedSuppliers[selectedIndex];

          supplierList.splice(selectedSupplierIndex, 1);

          console.log("Supplier successfully removed.");
          console.log("Total suppliers:", supplierList.length);
          showDashboard();
        },
      );
    });
  }
};

// Search for a supplier by company name
const searchSupplier = () => {
  if (supplierList.length === 0) {
    console.log("Supplier list is empty");
    return showDashboard();
  }

  rl.question("Enter company name to search: ", (companySearchInput) => {
    if (!isNotEmpty(companySearchInput)) {
      console.log("Invalid input. Please try again.");
      return searchSupplier();
    }

    const matchedSuppliers = findMatchingSuppliers(companySearchInput);

    if (matchedSuppliers.length === 0) {
      console.log("Supplier not found.");
      return searchSupplier();
    }

    console.log("Matching suppliers:");
    matchedSuppliers.forEach((index, i) => {
      console.log(`${i + 1}. ${supplierList[index].companyName}`);
    });

    console.log("========================");

    matchedSuppliers.forEach((index) => {
      const supplier = supplierList[index];
      console.log("Category:", supplier.category);
      console.log("Contact Person:", supplier.contactPerson);
      console.log("Company Name:", supplier.companyName);
      console.log("Contact Number:", supplier.contactNumber);
      console.log("Email:", supplier.email);
      console.log("------------------------");
    });

    showDashboard();
  });
};

// Display all suppliers
const displayAllSuppliers = () => {
  if (supplierList.length === 0) {
    console.log("No suppliers found.");
    showDashboard();
  } else {
    console.log("--- Supplier List ---");
    console.log("Total suppliers:", supplierList.length);
    console.log("========================");
    for (let i = 0; i < supplierList.length; i++) {
      console.log(`Supplier ${i + 1}`);
      console.log("Category:", supplierList[i].category);
      console.log("Contact Person:", supplierList[i].contactPerson);
      console.log("Company Name:", supplierList[i].companyName);
      console.log("Contact Number:", supplierList[i].contactNumber);
      console.log("Email:", supplierList[i].email);
      console.log("------------------------");
    }
    showDashboard();
  }
};

// Log out application
const logOut = () => {
  console.log(
    "Thank you for visiting our Event Suppliers Database Management System.",
  );
  rl.close();
};

// Start the application
console.log("Welcome to Event Suppliers Database Management System!");
console.log("Please log in.");
authenticateLogIn();
