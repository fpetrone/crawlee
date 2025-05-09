import async from "async"; // It does work with neo-async
import fs from "fs";

const fields = {
  batchID: "",
  orgID: "",
  orgName: "",
  domainName: "",
  pageNum: "",
  originalURL: "",
  isHomepage: "",
};


const dir = "./storage/datasets/default/";

fs.readdir(dir, (err, files) => {
  if (err) console.log(err);
  else {
    // Iterate through the array of file names and log each one
    files.forEach((file) => {
      console.log(file);
      fs.readFile(dir +file, function(err, data) { 
        if (err) throw err; 
        const books = JSON.parse(data); 
        console.log(books); 
    }); 
    });
  }
});

/*
    async.eachOfSeries(
        listOfPages,
        async function (page, callback) {
          await processAPage(page);
        },
        function (err) {
          console.log(err);
        }
      );*/

/*
fs.readFile('books.json', function(err, data) { 

    if (err) throw err; 

    const books = JSON.parse(data); 
    console.log(books); 
}); 

*/
