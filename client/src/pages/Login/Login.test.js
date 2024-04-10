const { Login } = require('./Login.js');

test('renders Login correctly', () => {
  render(Login);
  expect(screen.getByText('Sign Up')).toBeInTheDocument();
});
