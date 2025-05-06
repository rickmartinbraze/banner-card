import * as braze from '@braze/web-sdk';

let isInitialized = false; // Flag to track if Braze has been initialized

export function initializeBraze() {
  if (isInitialized) return; // Avoid re-initializing

  braze.initialize(''YOUR-API-KEY', {
  baseUrl: 'YOUR-ENDPOINT',
    enableLogging: true,
    allowUserSuppliedJavascript: true
  });

  braze.automaticallyShowInAppMessages();

  braze.subscribeToContentCardsUpdates((cards) => {
    console.log('Content Cards Updated:', cards);
  });

  // Subscribe to banners
  braze.subscribeToBannersUpdates(() => {
    const globalBanner = braze.getBanner('global_banner');
    const container = document.getElementById('global-banner-container');

    if (!container) {
      console.log('Error: Banner container not found.');
      return;
    }

    // Log the current state of globalBanner and container
    console.log('Checking Banner:', globalBanner);
    console.log('Banner Container:', container);

    if (globalBanner) {
      console.log('Global Banner:', globalBanner);
      braze.insertBanner(globalBanner, container);

      if (globalBanner.isControl) {
        container.style.display = 'none';
        console.log('Control variant, hiding the banner.');
      } else {
        container.style.display = 'block';
      }
    } else {
      console.log('No global banner available. Ensure the banner exists in Braze and is eligible for this user.');
      container.innerHTML = ''; // Clear the container if no banner
      container.style.display = 'none'; // Hide the container if no banner
    }
  });

  isInitialized = true; // Mark as initialized
}

export function loginToBraze(userId) {
  // Call initializeBraze to ensure Braze is initialized before using it
  initializeBraze();

  braze.changeUser(userId); // Now safe to call after initialization
  braze.openSession(); // Also safe to call

  // Request banners refresh after the session starts
  braze.requestBannersRefresh(['global_banner']);
}
