import * as faker from 'faker';

export const generateFakeUserData = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const dateOfBirth = faker.date.past(30, '2000-01-01').toISOString();
  const phoneNumber = faker.phone.phoneNumber();
  const sex = faker.random.arrayElement(['Male', 'Female']);
  const pronouns = faker.random.arrayElement(['She/Her', 'He/Him', 'They/Them', 'Other']);
  const addressLine1 = faker.address.streetAddress();
  const addressLine2 = faker.address.secondaryAddress();
  const city = faker.address.city();
  const zipCode = faker.address.zipCode();

  return {
    firstName,
    lastName,
    email,
    dateOfBirth,
    phoneNumber,
    sex,
    pronouns,
    addressLine1,
    addressLine2,
    city,
    zipCode
  };
};