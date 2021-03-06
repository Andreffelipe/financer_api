export class EmailValidator {
  static validator(email: string): boolean {
    if (!email) {
      return false;
    }
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!tester.test(email)) {
      return false;
    }
    return true;
  }
}
