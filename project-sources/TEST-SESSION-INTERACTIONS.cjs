// Observable behavioral tests for the v13 HTML reference; no network required.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox'],
  });
  try {
    const url = pathToFileURL(path.resolve(process.argv[2])).href;
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(url);
    const widgets = page.locator('[data-widget]');
    const n = await widgets.count();
    assert(n > 0);
    for (let i = 0; i < n; i++) {
      const widget = widgets.nth(i),
        mode = await widget.getAttribute('data-widget'),
        output = widget.locator('[data-result]');
      const read = () => output.innerText();
      const initial = await read();
      const button = (key) => widget.locator(`[data-action="${key}"]`);
      if (mode === 'mind-map' || mode === 'architecture-explorer') {
        await button('select').nth(1).focus();
        await page.keyboard.press('Enter');
        assert.notEqual(await read(), initial);
        assert.equal(await button('select').nth(1).getAttribute('aria-pressed'), 'true');
        await button('select').first().click();
        assert.equal(await read(), initial);
      } else if (mode === 'flashcards') {
        assert(await button('previous').isDisabled());
        await button('flip').click();
        assert.notEqual(await read(), initial);
        await button('next').click();
        assert.match(await read(), /^2\//);
        await button('previous').click();
        assert.equal(await read(), initial);
      } else if (mode === 'simulator') {
        await button('variable').uncheck();
        assert.match(await read(), /Rechazado/);
        await button('variable').check();
        await button('scenario').selectOption('Ruptura');
        assert.match(await read(), /incompatible/);
        await button('scenario').selectOption('Límite');
        assert.match(await read(), /mínima/);
      } else if (mode === 'decision-matrix') {
        await button('weight').first().fill('0');
        assert.match(await read(), /Primero: Ruptura/);
        await button('weight').last().fill('0');
        assert.match(await read(), /pesos nulos/);
        await button('weight').first().fill('3');
        await button('weight').last().fill('4');
        assert.match(await read(), /Empate/);
        await button('weight').first().fill('5');
        assert.match(await read(), /Primero: Aditivo/);
      } else throw Error(`Unknown mode ${mode}`);
      console.log(`PASS ${i + 1}: ${mode}`);
    }
    assert.deepEqual(errors, []);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
    const noJs = await browser.newPage({ javaScriptEnabled: false });
    await noJs.goto(url);
    assert.equal(await noJs.locator('.fallback:visible').count(), n);
    console.log(
      `PASS ${n} widgets, mobile overflow, keyboard selection, no-JS fallback, no page errors`,
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
