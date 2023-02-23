const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

const base = path.join(__dirname, "temp");
const logFilename = path.join(base, "logs.txt");

const getContent = () => `\n${process.argv[2] ?? ""}`;

async function start() {
  try {
    if (!fsSync.existsSync(base)) {
      await fs.mkdir(base);
      console.log("folder created");
    }

    await fs.appendFile(logFilename, getContent());

    const data = await fs.readFile(logFilename, { encoding: "utf-8" });
    console.log(data);
  } catch (error) {
    console.log("err", error);
  }
}

start();
