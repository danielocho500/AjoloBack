const bcrypt = require('bcrypt');

const encryptString = (word) => new Promise((res, rej) => {
        const saltRounds = 10;

        bcrypt.hash(word, saltRounds, (err, hash) => {
            if (err) {
                console.log(err);
                rej();
            }

            res(hash);
        });
    });

module.exports = {
    encryptString,
};