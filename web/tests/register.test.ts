import { Builder, By, until, WebDriver } from 'selenium-webdriver'

async function waitForElement(driver: WebDriver, locator: By) {
  await driver.wait(until.elementLocated(locator), 10000)
  return driver.findElement(locator)
}

test('Teste de registro de usuário', async () => {
  const driver = new Builder().forBrowser('chrome').build()

  try {
    await driver.get('https://minigproject.vercel.app/auth/register')

    const nameField = await waitForElement(driver, By.id('fullName'))
    const emailField = await waitForElement(driver, By.id('email'))
    const usernameField = await waitForElement(driver, By.id('username'))
    const passwordField = await waitForElement(driver, By.id('password'))
    const confirmPasswordField = await waitForElement(
      driver,
      By.id('confirmPassword'),
    )

    await nameField.sendKeys('Teste 123')
    await usernameField.sendKeys('teste1234')
    await emailField.sendKeys('teste1234@mail.com')
    await passwordField.sendKeys('teste1234')
    await confirmPasswordField.sendKeys('teste1234')

    const registerButton = await waitForElement(
      driver,
      By.xpath('/html/body/main/div[1]/form/button'),
    )

    await registerButton.click()
    await new Promise((resolve) => setTimeout(resolve, 3000))

    await driver.wait(until.urlContains('auth/activate'), 8000)
  } catch (error) {
    console.error('Erro durante o teste:', error)
    throw error
  } finally {
    // Fechar o navegador, independentemente de falhas ou sucesso
    await driver.quit()
  }
}, 35000)
