const bcrypt = require('bcrypt');

const Hasher = {

    generateHash: function(str) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(str, salt);
        return hash;
    },

    compareHash: function(str, hash) {
        return bcrypt.compareSync(str, hash);
    }

};

module.exports = Hasher;