const { createWriteStream, rmSync } = require("fs");

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

module.exports.cleanupTemp = (zip, dir) => {
    try {
        zip && rmSync(zip)
        dir && rmSync(dir, { recursive: true });
    } catch {
        return;
    }
}