function expiresInToMilliseconds(expiresIn) {
    const unit = expiresIn.slice(-1); // Extract the last character (e.g., 'd' for days)
    const value = parseInt(expiresIn, 10); // Parse the integer value
    let multiplier;
  
    switch (unit) {
      case 's': // seconds
        multiplier = 1000;
        break;
      case 'm': // minutes
        multiplier = 1000 * 60;
        break;
      case 'h': // hours
        multiplier = 1000 * 60 * 60;
        break;
      case 'd': // days
        multiplier = 1000 * 60 * 60 * 24;
        break;
      default:
        throw new Error('Invalid expiresIn format');
    }
  
    return value * multiplier;
  }

  export default expiresInToMilliseconds;