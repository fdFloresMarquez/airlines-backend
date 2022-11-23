const fs = require("fs");
const csvParser = require("csv-parser");
const csvData: any = [];

fs.createReadStream("./assets/flights.csv")
  .pipe(
    csvParser({
      mapHeaders: ({ header }: { header: string }) => header.toLowerCase(),
    })
  )
  .on("data", (data: any) => {
    console.log(data);
  })
  .on("end", () => {
    console.log(csvData);
  });
