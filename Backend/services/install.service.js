// import query function from the db.config
const { log } = require("console");
const { logger } = require("../libs/common");

const connection = require("../Config/dbconfig");

//  import fs module to read the query from a file
const fs = require("fs");

// function to create the database tables
async function install() {
  //  create a var that takes the path to the sqlQuery file
  const sqlQueryFile = __dirname + "/Sql/initial-queries.sql";
  logger.log(sqlQueryFile);
  let queriesCollection = [];
  let finalMessage = {};
  let templineTracker = "";

  // read all the things in the file
  const lines = await fs.readFileSync(sqlQueryFile, "utf-8").split("\n");
  //  promise to handle the async reading
  const executed = await new Promise((resolve, reject) => {
    // iterate through all lines
    lines.forEach((line) => {
      if (line.trim().startsWith("--") || line.trim() === "") {
        // skip the line if it starts with -- or is empty it is comment
        return;
      }
      templineTracker += line;
      // if it has a semi colon at the end of the line
      if (line.trim().endsWith(";")) {
        // prepare individual query and push on to the prepared queriesCollection array
        const sqlQuery = templineTracker.trim();
        queriesCollection.push(sqlQuery);
        templineTracker = "";
      }
    });
    resolve("done! Queries are added to the collection array list");
  });
  //  loop through the queriesCollection array
  for (let i = 0; i < queriesCollection.length; i++) {
    try {
      // execute the query
      const result = await connection.query(queriesCollection[i]);
      logger.log("Table Created");
    } catch (error) {
      // log if an error occured
      logger.log(error);
      finalMessage.message = "Not all the tables are created";
    }
  }

  if (!finalMessage.message) {
    finalMessage.message = "All Tables are created Successfully";
    finalMessage.status = 200;
  } else {
    finalMessage.status = 500;
  }

  return finalMessage;
}

module.exports = { install };
