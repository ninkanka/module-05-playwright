import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/contact.page.js';

const contact = {
    firstName: "Ola",
    lastName: "Nowak",
    email: "aaa@gmail.com",
    subject: "Customer service",
    message: "Hello! I would like to ask about the delivery time from Warsaw to Krakow",
};

test('Scenario: Enter and send contact form', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.open('/');
    await contactPage.openContact();
    await contactPage.fillForm(contact);
    await contactPage.send();

    await expect(contactPage.confirmationMessage()).toBeVisible();
});