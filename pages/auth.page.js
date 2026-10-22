import { BasePage } from './base.page.js';

export class AuthPage extends BasePage {
    async openLoginPage() {
        await this.open('/auth/login');
    }

    async login(email, password) {
        await this.page.getByTestId('email').fill(email);
        await this.page.getByTestId('password').fill(password);
        await this.page.getByTestId('login-submit').click();
    }

    async goToRegister() {
        await this.page.getByTestId('register-link').click();
    }

    async fillRegistrationForm(user) {
        await this.page.getByTestId('first-name').fill(user.firstName);
        await this.page.getByTestId('last-name').fill(user.lastName);
        await this.page.getByTestId('dob').fill(user.dateOfBirth);
        await this.page.getByTestId('street').fill(user.street);
        await this.page.getByTestId('house_number').fill(user.houseNumber);
        await this.page.getByTestId('postal_code').fill(user.postalCode);
        await this.page.getByTestId('city').fill(user.city);
        await this.page.getByTestId('state').fill(user.state);
        await this.page.getByTestId('country').selectOption(user.country);
        await this.page.getByTestId('phone').fill(user.phone);
        await this.page.getByTestId('email').fill(user.email);
        await this.page.getByTestId('password').fill(user.password);
    }

    async submitRegistration() {
        await this.page.getByTestId('register-submit').click();
    }

    async waitForRegistrationToFinish() {
        await this.page.waitForURL((url) => !url.pathname.includes('/auth/register'));
    }

    async signOut() {
        await this.openUserMenu();
        await this.page.getByTestId('nav-sign-out').click();
    }

    userMenu() {
        return this.page.getByTestId('nav-menu');
    }

    signInLink() {
        return this.page.getByTestId('nav-sign-in');
    }
}