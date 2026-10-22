import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page.js';

const users = {
  valid : {
    email:'customer2@practicesoftwaretesting.com',
    password:'welcome01',
  }, 
};
const newUser = {
    firstName: 'Nina',
    lastName: 'Nina',
    dateOfBirth: '2001-12-12',
    houseNumber: '12',
    street: 'Wieniawskiego',
    postalCode: '33-333',
    city: 'Leszno',
    state: 'Swietokrzyskie',
    country: 'Poland',
    phone: '555111555',
    password: 'passPass1=',
};

test('Scenario: User signs in with valid information', async ({ page }) => {
    const authPage = new AuthPage(page);

    await authPage.openLoginPage();
    await authPage.login(users.valid.email, users.valid.password);

    await expect(authPage.userMenu()).toBeVisible();
});

test('Scenario: User signs up', async ({ page }) => {
    const authPage = new AuthPage(page);
    const user = {
        ...newUser,
        email: `nina.${Date.now()}.${Math.floor(Math.random() * 1000)}@gmail.com`,
    };

    await authPage.openLoginPage();
    await authPage.goToRegister();
    await authPage.fillRegistrationForm(user);
    await authPage.submitRegistration();
    await authPage.waitForRegistrationToFinish();
    await expect(page).not.toHaveURL(/\/auth\/register/);
});

test('Scenario: User signs out', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.openLoginPage();
    await authPage.login(users.valid.email, users.valid.password);
    await authPage.signOut();
    await expect(authPage.signInLink()).toHaveText('Sign in');
});
