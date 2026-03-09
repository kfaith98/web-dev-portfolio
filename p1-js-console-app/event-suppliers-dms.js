const readline = require('readline');

// Create user object
const account = {
    username: 'faithputon',
    password: 'kfaith98'
};

// Create object to store user input
let supplierList = [];

// Create related variables
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Authenticate user
const authenticateLogIn = () => {
  rl.question('Username: ', (usernameInput) => {
    rl.question('Password: ', (passwordInput) => {
      if (usernameInput === account.username && passwordInput === account.password) {
      console.log('Successfully logged in.');
      showDashboard();
      } else {
        console.log('Incorrect details. Please try again.');
        authenticateLogIn();
      }
    })
  })
}

// Print dashboard
const showDashboard = () => {
  console.log('\n--- Database Management System ---');
  console.log('1. Add a new supplier');
  console.log('2. Edit an existing supplier');
  console.log('3. Remove a supplier');
  console.log('4. Search for a supplier by company');
  console.log('5. Display all suppliers');
  console.log('6. Log out');
  rl.question('Enter desired option: ', (choice) => {
    switch (choice) {
      case '1':
        addSupplier();
        break;
      case '2':
        editSupplier();
        break;
      case '3':
        removeSupplier();
        break;
      case '4':
        searchSupplier();
        break;
      case '5':
        displayAllSuppliers();
        break;
      case '6':
        logOut();
        break;
      default:
        console.log('Invalid entry. Please select from options below.');
        showDashboard();
        break;
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
    rl.question('Category: ', (categoryInput) => {
      if (categoryInput.trim() === '') {
      console.log('Incorrect input. Please try again.');
      askCategory();
      } else {
        newSupplier.category = categoryInput;
        askContactPerson();
      };
    });
  };
  askCategory();
 
  function askContactPerson() {
    rl.question('Contact Person: ', (contactPersonInput) => {
      if (contactPersonInput.trim() === '') {
      console.log('Incorrect input. Please try again.');
      askContactPerson();
      } else {
        newSupplier.contactPerson = contactPersonInput;
        askCompanyName();
      };
    });
  };

  function askCompanyName() {
    rl.question('Company Name: ', (companyNameInput) => {
      if (companyNameInput.trim() === '') {
      console.log('Incorrect input. Please try again.');
      askCompanyName();
      } else {
        newSupplier.companyName = companyNameInput;
        askContactNumber();
      };
    });
  };

  function askContactNumber() {
    rl.question('Contact Number: ', (contactNumberInput)  => {
      if (contactNumberInput.trim() === '' || isNaN(contactNumberInput.trim())) {
      console.log('Incorrect input. Please try again.');
      askContactNumber();
      } else {
        newSupplier.contactNumber = contactNumberInput;
        askEmail();
      };
    });
  };
  
  function askEmail() {
    rl.question('Email: ', (emailInput)  => {
      if (emailInput.trim() === '' || (!emailInput.includes('@'))) {
      console.log('Incorrect input. Please try again.');
      askEmail();
      } else {
        newSupplier.email = emailInput;
        pushNewSupplier();
      };
    });
  };

  function pushNewSupplier() {
    supplierList.push(newSupplier);
    console.log('Supplier added successfully');
    console.log('Total suppliers:', supplierList.length);
    showDashboard();
  };
};

// Edit an existing supplier’s details
const editSupplier = () => {
  if (supplierList.length === 0) {
    console.log('Supplier list is empty');
    return showDashboard();
  } else {
    rl.question('Enter company name to edit: ', (companyToEdit) => {    
      let matchedSuppliers = [];

      for (let i = 0; i < supplierList.length; i++) {
        let supplierCompanyName = supplierList[i].companyName.toLowerCase();
        let companyNameToEdit = companyToEdit.toLowerCase();

        if (supplierCompanyName.includes(companyNameToEdit)) {
            matchedSuppliers.push(i);
        }; 
      };

      if (matchedSuppliers.length === 0) {
        console.log('Supplier not found. Please try again.');
        return showDashboard();
      } else {
        console.log('Matching suppliers:');
        for (let i = 0; i < matchedSuppliers.length; i++) {
          let index = matchedSuppliers[i];
          console.log(`${i + 1}` + '. ' + supplierList[index].companyName);
        };
      };
      rl.question('Enter the number of the supplier you want to edit: ', (userChoice) => {
        let actualIndex = matchedSuppliers[userChoice - 1];
        showMenu();

        function showMenu() {
          console.log('Which field would you like to edit?');
          console.log('1. Category');
          console.log('2. Contact Person');
          console.log('3. Company Name');
          console.log('4. Contact Number');
          console.log('5. Email');
          rl.question('Please select an option: ', (choice) => {
            switch (choice) {
              case '1':
                rl.question('Enter new category: ', (newCategory) => {
                  supplierList[actualIndex].category = newCategory;
                  console.log('Supplier updated successfully.');
                  showDashboard();
                });
                break;
              case '2':
                rl.question('Enter new contact person: ', (newContactPerson) =>{
                  supplierList[actualIndex].contactPerson = newContactPerson;
                  console.log('Supplier updated successfully.');
                  showDashboard();
                });   
                break;             
              case '3':
                rl.question('Enter new company name: ', (newCompanyName) => {
                  supplierList[actualIndex].companyName = newCompanyName;
                  console.log('Supplier updated successfully.');
                  showDashboard();
                });
                break;
              case '4':
                rl.question('Enter new contact number: ', (newContactNumber) => {
                  supplierList[actualIndex].contactNumber = newContactNumber;
                  console.log('Supplier updated successfully.');
                  showDashboard();
                });
                break;
              case '5':
                rl.question('Enter new email: ', (newEmail) => {
                  supplierList[actualIndex].email = newEmail;
                  console.log('Supplier updated successfully.');
                  showDashboard();
                });
                break;
              default:
                console.log('Invalid entry. Please select from specified options only.');
                showMenu();
                break;
            };
          });
        };  
      });
    });
  };
};

// Remove a supplier from the list
const removeSupplier = () => {
  if (supplierList.length === 0) {
      console.log('Supplier list is empty');
      return showDashboard();
  } else {
    console.log('Total suppliers:', supplierList.length);
  rl.question('Enter company name to remove: ', (companyToRemove) => {
      let matchedSuppliers = [];

      for (let i = 0; i < supplierList.length; i++) {
        let supplierCompanyName = supplierList[i].companyName.toLowerCase();
        let companyNameToRemove = companyToRemove.toLowerCase();

        if (supplierCompanyName.includes(companyNameToRemove)) {
            matchedSuppliers.push(i);
        }; 
      };
      if (matchedSuppliers.length === 0) {
        console.log('Supplier not found. Please try again.');
        return showDashboard();
      } else {
        console.log('Matching suppliers:');
        for (let i = 0; i < matchedSuppliers.length; i++) {
          let index = matchedSuppliers[i];
          console.log(`${i + 1}` + '. ' + supplierList[index].companyName);
        };
      };
      rl.question('Enter the number of the supplier you want to remove: ', (userChoice) => {
        let actualIndex = matchedSuppliers[userChoice - 1];
        supplierList.splice(actualIndex, 1)
        console.log('Supplier successfully removed.');
        console.log('Total suppliers:', supplierList.length);
        showDashboard();
      });
    });
  };
};

// Search for a supplier by company name
const searchSupplier = () => {
  if (supplierList.length === 0) {
    console.log('Supplier list is empty');
    return showDashboard();
  } else {
    rl.question('Enter company name to search: ', (companySearchInput) => {
    let found = false;
    for (let i = 0; i < supplierList.length; i++) {
      let supplierCompanyName = supplierList[i].companyName.toLowerCase();
      let companyNameSearchInput = companySearchInput.toLowerCase();

      if (supplierCompanyName.includes(companyNameSearchInput)) {
        found = true;
        console.log('========================');
        console.log('Category:', supplierList[i].category);
        console.log('Contact Person:', supplierList[i].contactPerson);
        console.log('Company Name:', supplierList[i].companyName);
        console.log('Contact Number:', supplierList[i].contactNumber);
        console.log('Email:', supplierList[i].email);
        console.log('----------------')
      };
    };
    if (!found) {
      console.log('Supplier not found.');
      showDashboard();
    };
    showDashboard();
    });
  };
};

// Display all suppliers 
const displayAllSuppliers = () => {
  if (supplierList.length === 0) {
      console.log('No suppliers found.');
      return showDashboard();
  } else {
    console.log('--- Supplier List ---');
    console.log('Total suppliers:', supplierList.length);
    console.log('========================');
    for (let i = 0; i < supplierList.length; i++) {
      console.log(`Supplier ${i + 1}`);
      console.log('Category:', supplierList[i].category);
      console.log('Contact Person:', supplierList[i].contactPerson);
      console.log('Company Name:', supplierList[i].companyName);
      console.log('Contact Number:', supplierList[i].contactNumber);
      console.log('Email:', supplierList[i].email);
      console.log('------------------------');
    };
    showDashboard();
  };
};

// Log out application
const logOut = () => {
  console.log('Thank you for visiting our Event Suppliers Database Management System.')
  rl.close();
};

// Start the application
console.log('Welcome to Event Suppliers Database Management System!');
console.log('Please log in.');
authenticateLogIn();