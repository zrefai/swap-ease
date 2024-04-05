import fs from "fs";

export function writeToJSON(data: unknown, fileName: string) {
  const json = JSON.stringify(data);

  fs.writeFile(fileName, json, "utf8", function (err: unknown) {
    if (err) throw err;
  });
}
