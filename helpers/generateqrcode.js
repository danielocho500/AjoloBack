function generateRandomString(length) {
    const specialCharacters = '!@#$%^&*()_+=-{}[]|:;<>,.?/';
    const validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + specialCharacters;
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validCharacters.length);
      result += validCharacters.charAt(randomIndex);
    }
  
    return result;
  }

  module.exports = {
    generateRandomString,
  }