const bcrypt = require('bcryptjs')

class PasswordService {
    hashPassword = async (password) => {
        return await bcrypt.hash(password, 10);
    }

    verifyPassword = async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = new PasswordService();