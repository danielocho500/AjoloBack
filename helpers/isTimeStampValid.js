function isTimestampValid(timestamp) {
    const currentTime = Date.now();
    return timestamp > currentTime;
  }

module.exports = {
  isTimestampValid
}