const fs = require("fs").promises;
const path = require("path");
const heicConvert = require("heic-convert");

async function convertHeicToPng(sourceFolder) {
  try {
    const files = await fs.readdir(sourceFolder);

    for (const file of files) {
      if (path.extname(file).toLowerCase() === ".heic") {
        const inputPath = path.join(sourceFolder, file);
        const outputPath = path.join(
          sourceFolder,
          path.basename(file, ".heic") + ".png"
        );

        const inputBuffer = await fs.readFile(inputPath);
        const outputBuffer = await heicConvert({
          buffer: inputBuffer, // the HEIC file buffer
          format: "PNG", // output format
        });

        await fs.writeFile(outputPath, outputBuffer);
        console.log(`Converted ${file} to PNG.`);
      }
    }

    console.log("Conversion completed.");
  } catch (error) {
    console.error("Error during conversion:", error);
  }
}
// Replace 'path/to/your/folder' with the path to the folder containing HEIC files
convertHeicToPng(`C:\\Users\\byron\\OneDrive\\Desktop\\heic`);
