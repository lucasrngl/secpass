const CHARACTERS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&?';

class GeneratePassword {
  static execute(length: number) {
    const password = Array(length)
      .fill(CHARACTERS)
      .map((x) => {
        return x[Math.floor(Math.random() * x.length)];
      })
      .join('');

    return password;
  }
}

export { GeneratePassword };
