const fs = require('fs')
const path = require('path')
const cron = require('node-cron')

cron.schedule('*/1 * * * *', () => {
    // Runs every 2 minutes
    const dir = path.join(__dirname, '../temp_uploads'); // change if needed

    console.log('Runs every 2 minutes this is the cleanup Temp');
    fs.readdir(dir, (err, files) => {
        if (err) return console.error('Failed to read dir:', err);

        files.forEach(file => {
            const filePath = path.join(dir, file);

            fs.stat(filePath, (err, stats) => {
                if (err) console.log(err);
                const age = Date.now() - stats.mtimeMs;
                console.log(age);

                if (age > 3660000) {// 1 hour + 1 minute = 3660000 ms
                    console.log(filePath);

                    fs.unlink(filePath, err => {
                        if (!err) {
                            console.log('Deleted old file:', file);
                        }
                    });

                }
            })
        });

    })

})