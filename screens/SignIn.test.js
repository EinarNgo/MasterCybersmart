const sum = require('./SignIn');

test('Log user inn', () => {   
    const user = "EinarN"
    const pass = "Einarngo123"
  expect(signIn(user,pass)).toBe("Success");
  expect(signIn(pass,user)).toBe("Failed");
});