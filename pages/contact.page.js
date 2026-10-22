import { BasePage } from '../pages/base.page.js';

export class ContactPage extends BasePage {
    async fillForm(data) {
        await this.page.getByTestId('first-name').fill(data.firstName);
        await this.page.getByTestId('last-name').fill(data.lastName);
        await this.page.getByTestId('email').fill(data.email);
        await this.page.getByTestId('subject').selectOption(data.subject);
        await this.page.getByTestId('message').fill(data.message);
    }

    async send() {
        await this.page.getByTestId('contact-submit').click();
    }

    confirmationMessage() {
        return this.page.getByText('Thanks for your message', { exact: false });
    }
}