const { createWriteStream } = require("fs");
const { rm } = require("fs/promises");

module.exports.streamToFile = (stream, outputFile) => {
    return new Promise((resolve, reject) => {
        const outputStream = createWriteStream(outputFile);

        stream.pipe(outputStream)
            .on('finish', () => {
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

module.exports.cleanupTemp = async (zip, dir) => {
    try {
        zip && await rm(zip)
        dir && await rm(dir, { recursive: true });
    } catch {
        return;
    }
}