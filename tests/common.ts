import {expect, Page} from "@playwright/test";

export const now = new Date();
const options: Intl.DateTimeFormatOptions = {month: 'long'};
let dateFormat = new Intl.DateTimeFormat('pl-PL', options);
export const currentMonthPL = dateFormat.format(now);
export const plusTenMinutes = new Date(now.getTime() + 10 * 60000);
export const plusOneHour = new Date(now.getTime() + 60 * 60000);

// Event start time
export const eventStartDay = plusTenMinutes.getDate() + '';
export const eventStartHour = plusTenMinutes.getHours() + '';
export const eventStartMinute = plusTenMinutes.getMinutes() + '';

// Event end time
export const eventEndDay = plusOneHour.getDate() + '';
export const eventEndHour = plusOneHour.getHours() + '';
export const eventEndMinute = plusOneHour.getMinutes() + '';

// userInfo

export const userName = 'test1234';
export const userEmail = 'test1234@example.com';
export const userPwd = 'test123456';

export const login = async (page: Page) => {
  await page.goto('http://localhost:4200/');
  await page.getByLabel('E-mail').click({delay: 500});
  await page.getByLabel('E-mail').pressSequentially(userEmail, {delay: 100});
  await page.getByLabel('Hasło').click({delay: 500});
  await page.getByLabel('Hasło').pressSequentially(userPwd, {delay: 100});
  await page.keyboard.press('Enter');
  const notification = page.getByText('Logowanie przebiegło pomyślnie.');
  expect(notification.isVisible());
}

