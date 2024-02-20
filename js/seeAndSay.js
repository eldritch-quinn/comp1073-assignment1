// © Quinn Faulkner 2024

// Some global variables !
const t = document.querySelector("tbody");
const T = document.querySelector("table");
const tHeader = document.querySelector("thead tr");
const tableBody = document.querySelector("table tbody");
const tableFooter = document.querySelector("table tfoot");

// Define some prefixes
const prefixes = ["a", "the"];

// Defining my Dungeons & Dragons themed words
const model = {
  nouns: [
    "Red Dragon",
    "Lich",
    "Mind Flayer",
    "Beholder",
    "Troll",
    "band of Goblins",
    "Hero",
    "King",
    "Guard",
    "Commoner",
    "Goat",
    "Cart",
  ],
  verbs: [
    "attacked",
    "defended",
    "usurped",
    "summoned",
    "destroyed",
    "crushed",
  ],
  adjectives: ["legendary", "weak", "scary", "strong", "stealthy", "clumsy"],
  settings: [
    "in the dungeon",
    "in Waterdeep",
    "in Baldur's Gate",
    "in the Astral Plane",
    "in a Tavern",
    "last night",
  ],
};

// Define a function that grabs a random word & removes it from the list
function getWord(type) {

  // Define a random index
  let randIndex = Math.floor(Math.random() * model[type].length);

  // Grab the word at that index in the model
  let output = model[type][randIndex];

  // Remove the word from the model
  model[type].splice(randIndex, 1);

  // Return the word
  return output;
}

// Define a function that returns an Element from the table's body
function getData(x = 0, y = 0) {

  // Return the element located at x, y in the table's body
  return document.querySelector(
    `table tbody tr:nth-child(${x + 1}) td:nth-child(${y + 1})`
  );
}

// Define a functions that creates and fills in parts of my table
function generateTable() {

  // Add an array to store our buttons
  let buttonArray = [];

  // Store all of the headers of the table
  const tableHeaders = document.querySelectorAll(`th`);

  // Output variables
  const submitButton = document.querySelector("section button");
  const outputSentence = document.querySelector("section h1");

  // While there are less than 6 rows in the table, add one
  while (document.querySelectorAll("table tbody tr").length < 6) {

    // Add a row to the table's body
    tableBody.appendChild(document.createElement("tr"));
  }

  // Create a row for the buttons at the end
  const buttonRow = document.createElement("tr");

  // Add the row of buttons to the table
  tableFooter.appendChild(buttonRow);

  // For each of the table headers
  tableHeaders.forEach((header, i) => {

    // Define the header's type for later use
    let type = header.dataset.type;

    // From 1-6...
    for (let r = 1; r <= 6; r++) {

      // Create the new table data cell
      let newRowData = document.createElement("td");

      // Sets the inner text of the data cell to either
      /* a random prefix followed by a random value of the data's type */
      // or
      /* a random value of the data's type */
      // also removes the value from the model, so it cannot be used again
      newRowData.innerText = `${
        (type == "nouns" && i == 0) || type == "adjectives"
          ? prefixes[Math.floor(Math.random() * prefixes.length)] + " "
          : ""
      }${getWord(type)}`;

      // Query select the correct row
      let row = document.querySelector(`table tbody tr:nth-child(${r})`);

      // Add the new table data to the row
      row.appendChild(newRowData);
    }

    // Create a button
    let rowButton = document.createElement("button");

    // Create a table data element for the button
    let buttonRowData = document.createElement("td");

    // Set the values of the button for display
    rowButton.dataset.index = 0;
    rowButton.dataset.columnIndex = i;

    // Set the text to the first row
    rowButton.innerText = getData(0, i).innerText;

    // Create an anonymous function for the buttons
    rowButton.addEventListener("click", (event) => {

      // Grab the row index from the element, otherwise 0
      let index = Number(event.target.dataset.index) ?? 0;

      // Grab the column index from the element 
      let buttonColumnIndex = Number(event.target.dataset.columnIndex);

      // Increment the index by 1
      index++;

      // If the index is greater than or equal to 6, cycle it back to the first
      if (index >= 6) index = 0;

      // Grab the data element from the table
      let newData = getData(index, buttonColumnIndex);

      // Set the inner text of the button to the inner text of the table data element
      event.target.innerText = newData.innerText;

      // Set the index to the new updated value
      event.target.dataset.index = index;
    });

    // Add the button to the data element
    buttonRowData.appendChild(rowButton);

    buttonArray.push(rowButton);

    // Add the data element to the table row
    buttonRow.appendChild(buttonRowData);
  });

  // Add an eventlistener to the submit button to handle the click
  submitButton.addEventListener("click", (event) => { 
    
    // Create the output string
    let outputString = "";

    // For each button in the button row..
    buttonArray.forEach((btn, i) => { 

      outputString = `${outputString} ${btn.innerText}`

    });

    // Capitalize the first letter and set the output text
    outputSentence.innerText = outputString.charAt(0).toUpperCase() + outputString.slice(1);

  } );


}

// Run the function !
generateTable();