export function createProfile(firstName, email) {
  return {
    firstName: firstName.trim(),
    lastName: '',
    email: email.trim(),
    phone: '',
    notifications: {
      orders: true,
      password: true,
      offers: false,
      newsletter: false,
    },
  };
}
