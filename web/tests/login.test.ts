import { Builder, By, until, WebDriver } from 'selenium-webdriver'

async function waitForElement(driver: WebDriver, locator: By) {
  await driver.wait(until.elementLocated(locator), 10000)
  return driver.findElement(locator)
}

test('Teste de login de usuário', async () => {
  const driver = new Builder().forBrowser('chrome').build()

  try {
    await driver.get('https://minigproject.vercel.app/auth/login')

    const usernameField = await waitForElement(driver, By.id('username'))
    const passwordField = await waitForElement(driver, By.id('password'))

    await usernameField.sendKeys('teste')
    await passwordField.sendKeys('teste123')

    const loginButton = await waitForElement(
      driver,
      By.xpath('/html/body/main/div[1]/form/button'),
    )

    await loginButton.click()
    await new Promise((resolve) => setTimeout(resolve, 4000))

    await driver.wait(until.urlContains('dashboard'), 12000)
  } catch (error) {
    console.error('Erro durante o teste:', error)
    throw error
  } finally {
    // Fechar o navegador, independentemente de falhas ou sucesso
    await driver.quit()
  }
}, 35000)
