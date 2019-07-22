const publicVabidKey = 'BMj47HhUThLJqw1k_V3vwRYAsiq2gUSY43yhbnvW3gDPU39Aokb6pURb4ztat3kmcAReydSt9o9XcjNjFLK_qkA';

// check for service worker
// navigator is an API for ther browser itself
if('serviceWorker' in navigator) {
    send().catch(err => {
        console.err(err)
    });
}

// register service worker, register push, send push or notifier
async function send() {
    // register service worker
    console.log('Registering serviceWorker...');
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    });
    console.log('Service worker registered...');

    // register push
    console.log('Registering push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVabidKey)
    });
    console.log('Push registered');

    // send push or notifier
    console.log('Sending push notification');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push sent');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}