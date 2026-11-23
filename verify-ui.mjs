import { chromium, devices } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runVerification() {
  console.log('Iniciando verificación visual con Playwright en modo móvil...');
  
  const iPhone = devices['iPhone 14'];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...iPhone,
    permissions: ['geolocation'],
    geolocation: { latitude: 11.9299, longitude: -85.9560 }
  });
  
  const page = await context.newPage();
  const filePath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  
  console.log('Cargando:', filePath);
  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // Esperar renderizado del mapa
  
  // 1. Screenshot de la pantalla principal móvil
  await page.screenshot({ path: 'screenshot_1_main_mobile.png' });
  console.log('✓ Captura 1 guardada: screenshot_1_main_mobile.png');

  // 2. Click en Pin de Inicio (Última vez visto) -> Verificar modal centrado
  console.log('Abriendo modal de pin...');
  await page.click('button[onclick*="prepareAddPin(\'last_seen\')"]');
  await page.waitForSelector('#addPinModal:not(.hidden)');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_2_pin_modal.png' });
  console.log('✓ Captura 2 guardada: screenshot_2_pin_modal.png');

  // Cerrar modal de pin
  await page.click('#addPinModal button:has-text("Cancelar")');
  await page.waitForSelector('#addPinModal', { state: 'hidden' });

  // 3. Iniciar simulación y hacer click en "Fin" -> Verificar modal de confirmación
  console.log('Iniciando búsqueda para probar modal de Finalizar...');
  await page.click('#btnMainTracking');
  await page.waitForTimeout(1000);
  
  // Click en Fin
  await page.click('#btnFinishTracking');
  await page.waitForSelector('#customConfirmModal:not(.hidden)');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_3_confirm_modal.png' });
  console.log('✓ Captura 3 guardada: screenshot_3_confirm_modal.png');

  // Cerrar modal de confirmación
  await page.click('#customConfirmModal button:has-text("Cancelar")');
  await page.waitForSelector('#customConfirmModal', { state: 'hidden' });

  // 4. Abrir lista de pines
  console.log('Abriendo drawer de pines...');
  await page.click('button[onclick*="openPinsDrawer"]');
  await page.waitForSelector('#pinsDrawer:not(.hidden)');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_4_pins_drawer.png' });
  console.log('✓ Captura 4 guardada: screenshot_4_pins_drawer.png');

  await browser.close();
  console.log('¡Verificación con Playwright completada con éxito!');
}

runVerification().catch(err => {
  console.error('Error durante la verificación:', err);
  process.exit(1);
});
