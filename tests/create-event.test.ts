import {expect, test} from '@playwright/test';
import {
  currentMonthPL,
  eventEndDay,
  eventEndHour,
  eventEndMinute,
  eventStartDay,
  eventStartHour,
  eventStartMinute,
  login,
  userName
} from "./common";
import * as UUID from 'uuid';


test.beforeEach(async ({page}) => {
  await login(page);
})

test('Core functionalities', async ({page}) => {
  const UID = UUID.v4();
  await test.step('Open create event form', async () => {
    await page.getByRole('button', {name: 'add Nowe wydarzenie'}).click();
    const heading = page.getByRole('heading', {name: 'Tworzenie wydarzenia'});
    expect(heading.isVisible());
  });

  await test.step('Fill base info tab', async () => {
    await page.getByText('Nazwa wydarzenia').click();
    await page.getByLabel('Nazwa wydarzenia').pressSequentially(UID, {delay: 50});
    await page.getByText('Kategoria wydarzenia').click({delay: 500});
    await page.getByRole('option', {name: 'Konferencje biznesowe'}).click({delay: 500});
    await page.getByLabel('Open calendar').click({delay: 500});
    await page.getByLabel(eventStartDay + ' ' + currentMonthPL.slice(0, 2)).click({delay: 500});
    await page.locator('#mat-input-5').fill('');
    await page.locator('#mat-input-5').pressSequentially(eventStartHour, {delay: 100});
    await page.locator('#mat-input-6').fill('');
    await page.locator('#mat-input-6').pressSequentially(eventStartMinute, {delay: 100});
    await page.keyboard.press('Escape');
    await page.getByRole('button', {name: 'Dodaj datę zakończenia'}).press('Enter');
    await page.getByLabel('Open calendar').nth(1).click({delay: 500});
    await page.getByLabel(eventEndDay + ' ' + currentMonthPL.slice(0, 2)).click({delay: 500});
    await page.locator('#mat-input-8').fill('');
    await page.locator('#mat-input-8').pressSequentially(eventEndHour, {delay: 100});
    await page.locator('#mat-input-9').fill('');
    await page.locator('#mat-input-9').pressSequentially(eventEndMinute, {delay: 100});
    await page.keyboard.press('Escape');
    await page.getByText('Opis wydarzenia').click({delay: 500});
    await page.getByText('Opis wydarzenia').pressSequentially('To jest opis testowego wydarzenia. Wydarzenie zostało wygenerowane za pomocą testów automatycznych.', {delay: 50});
  })

  await test.step('Go to location tab and set place info', async () => {
    await page.getByRole('tab', {name: 'Miejsce wydarzenia'}).click({delay: 500});
    await page.locator('.mapboxgl-ctrl-geocoder--input').click({delay: 500});
    await page.locator('.mapboxgl-ctrl-geocoder--input').pressSequentially('Jana kasprowicza 5', {delay: 100});
    await page.locator('a').filter({hasText: 'Jana Kasprowicza 5 43-300'}).click({delay: 500});
    await page.getByLabel('Nazwa', {exact: true}).click({delay: 500});
    await page.getByLabel('Nazwa', {exact: true}).press('Control+a');
    await page.getByLabel('Nazwa', {exact: true}).fill('');
    await page.getByLabel('Nazwa', {exact: true}).pressSequentially('Centrum Badawczo Rozwojowe, Rekord SI', {delay: 100});
  })

  await test.step('Go to event image tab and select first from gallery', async () => {
    await page.getByRole('tab', {name: 'Zdjęcie wydarzenia'}).click({delay: 500});
    await page.getByText('Kliknij tutaj i wybierz dostę').click({delay: 500});
    await page.getByRole('img').first().click({delay: 500});
  })

  await test.step('Submit form and create event', async () => {
    await page.getByRole('button', {name: 'Utwórz wydarzenie'}).click({delay: 500});
    await page.waitForSelector('.message.text-gray-500');
    expect(await page.getByText('Utworzono nowe wydarzenie').isVisible());
  })

  await test.step('Open event details from schedule', async () => {
    const btn = page.getByRole('button', {name: 'menu'});
    if (await btn.isVisible()) {
      await btn.click({delay: 500});
    }

    await page.getByText('Wydarzenia', {exact: true}).click({delay: 500});
    await page.getByText(eventStartDay, {exact: true}).click({delay: 2000});
    await page.locator('mat-drawer').getByText(UID).click();
    await page.waitForLoadState('networkidle');
    expect(await page.getByText(UID).isVisible())
  })

  await test.step('Join to event', async () => {
    await page.getByRole('button', {name: 'check Wezmę udział'}).click({delay: 500});
    await page.waitForSelector('.message.text-gray-500');
    expect(page.getByText('Zmieniono deklarację udziału').isVisible());
  })

  await test.step('Check user is on participant list', async () => {
    await page.getByText('Wezmą udział').click({delay: 500});
    await page.getByRole('img', {name: 'participant'}).click({delay: 500});
    expect(await page.locator('#mat-mdc-dialog-1').getByText(userName).isVisible());
    await page.getByRole('button', {name: 'Anuluj'}).click({delay: 500});
  })

  await test.step('Delete event', async () => {
    await page.locator('button').filter({hasText: 'more_vert'}).click({delay: 500});
    await page.getByRole('button', {name: 'delete Usuń wydarzenie'}).click({delay: 500});
    await page.getByRole('button', {name: 'Potwierdź'}).click({delay: 500});
    await page.waitForSelector('.message.text-gray-500');
  })
})
