const jwt = require('jsonwebtoken');

class TokenService {
    generateToken(firstname, lastname, email, password) {
        try {
            const accessToken = jwt.sign({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                isActivate: false
            }, process.env.SECRET_KEY, {algorithm: 'HS256', expiresIn: 1000 * 60 * 60 * 24});

            const refreshToken = jwt.sign({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                isActivate: false
            }, process.env.SECRET_KEY, {algorithm: 'HS256', expiresIn: 1000 * 60 * 60 * 24 * 14});
            
            return {accessToken, refreshToken}
        } catch (e) {
            throw Error('Failed to generate');
        }
    }

    
}

module.exports = new TokenService();