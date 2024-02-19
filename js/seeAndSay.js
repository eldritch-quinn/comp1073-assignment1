const t = document.querySelector("tbody");
const T = document.querySelector("table");
const tHeader = document.querySelector("thead tr");
const tableBody = document.querySelector("table tbody");
const tableFooter = document.querySelector("table tfoot");

const sentence = document.querySelector("main > div");

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

function getWord(type) {
  let randIndex = Math.floor(Math.random() * model[type].length);
  let output = model[type][randIndex];

  model[type].splice(randIndex, 1);

  return output;
}

function regenerateSentence() {
  tableHeaders.forEach((header, i) => {});

  sentence;
}

function getData(x = 0, y = 0) {
  return document.querySelector(
    `table tbody tr:nth-child(${x + 1}) td:nth-child(${y + 1})`
  );
}

function regenerateTable() {
  // Create a copy of the model for reference later
  const OG_MODEL = { ...model };

  const tableHeaders = document.querySelectorAll(`th`);

  while (document.querySelectorAll("table tbody tr").length < 6) {
    tableBody.appendChild(document.createElement("tr"));
  }

  const buttonRow = document.createElement("tr");

  buttonRow.setAttribute("id", "buttons");

  tableFooter.appendChild(buttonRow);

  tableHeaders.forEach((header, i) => {
    //console.log(`i : [${i}]`)
    // Define the header's type for later use
    let type = header.dataset.type;

    // For each row
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

    let rowButton = document.createElement("button");
    let buttonRowData = document.createElement("td");

    rowButton.dataset.index = 0;
    rowButton.dataset.columnIndex = i;
    rowButton.innerText = getData(0, i).innerText;

    rowButton.addEventListener("click", (event) => {
      let index = Number(event.target.dataset.index) ?? 0;
      let buttonColumnIndex = Number(event.target.dataset.columnIndex);

      index++;

      if (index >= 6) index = 0;

      let newData = getData(index, buttonColumnIndex);

      event.target.innerText = newData.innerText;

      event.target.dataset.index = index;
    });

    buttonRowData.appendChild(rowButton);
    buttonRow.appendChild(buttonRowData);
  });
}

regenerateTable();