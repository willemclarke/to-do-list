const fs = require('fs');
const toDoStoredPath = "todoliststoredmemory.json";

// Empty object of ID: "to do string"
let storeData = {}

// separating the command and the input string
const command = process.argv[2];

// function to send user input to object
function appendToObject(id, toDo) {
  return storeData[id] = toDo
};

// Read data from JSON file --> if is for case where JSON object is empty
fs.readFile(toDoStoredPath, (err, data) => {
  if (err) {
    return console.log("Problem with readFile");
  }
  const readData = data.toString()
  if (readData) {
    storeData = JSON.parse(readData)
  }
  switch(command) {
    case "add":
      const toDoString = process.argv[3];
      const randomID = Math.floor(Date.now() * Math.random()).toString(36);
      appendToObject(randomID, toDoString)
      const jsonConvertedData = JSON.stringify(storeData)
      return fs.writeFile(toDoStoredPath, jsonConvertedData, (err) => {
        if (err) { 
          return console.log(err)
        }
        console.log(`Saved to list: ${randomID} ${toDoString}`);
      });   
    case "list":
      return console.log(storeData)
    case "delete":
      const idKey = process.argv[3]
      const toDo = storeData[idKey]
      delete storeData[idKey]
      const dataConvertedJson = JSON.stringify(storeData)
      fs.writeFile(toDoStoredPath, dataConvertedJson, (err) => {
        if (err) {
          return console.log(err)
        }
        console.log(`Deleted from List: ${idKey} ${toDo}`);
      })
  }
})


// order of commands (add, list, delete etc) --> what each command runs
// take ID from user (toDoString)
// read fs.readFile --> filter for the ID and delete ID
// rewrite to the object with the deleted ID
// return fs.readFile

// const jsonConvertedData = JSON.stringify(storeData)
// fs.appendFile(toDoStoredMemory, jsonConvertedData, (err) => {
//   if (err) throw err;
//   console.log("Deleted from List " + "'" + idKey + "'");
// })
