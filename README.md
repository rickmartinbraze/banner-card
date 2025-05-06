# Braze Web SDK Demo – Banner Integration

This project is a simple React web application demonstrating how to integrate the [Braze Web SDK](https://www.braze.com/docs/developer_guide/platform_integration/web/) to display **Banners** dynamically based on user eligibility.

It is designed to:
- Initialize the Braze SDK with a valid API key and endpoint.
- Allow a user to "log in" by entering a `user_id`, triggering a Braze session.
- Retrieve and display a banner (if eligible) using the `global_banner` placement.
- Automatically **hide the banner container** if no banner is returned or the user is in a **control group**.

---

## 🚀 How It Works

1. The user enters a `user_id` and clicks **Log In**.
2. The app calls `braze.changeUser()` and `braze.openSession()` with that ID.
3. Braze fetches any eligible banners assigned to the placement name `global_banner`.
4. If a banner is found:
   - It is inserted into the container `<div id="global-banner-container">`.
   - If the user is **not** in a control variant, the container is shown.
5. If **no banner** is found, or the user is in a **control variant**, the container is hidden to ensure a clean UI.

---

## 🧠 Key Code Concepts

### Braze Initialization (`brazeInit.js`)

```js
braze.initialize('YOUR-API-KEY', {
  baseUrl: 'YOUR-ENDPOINT',
  allowUserSuppliedJavascript: true,
});

braze.subscribeToBannersUpdates(() => {
  const globalBanner = braze.getBanner('global_banner');
  const container = document.getElementById('global-banner-container');

  if (!container) return;

  if (globalBanner) {
    braze.insertBanner(globalBanner, container);

    if (globalBanner.isControl) {
      container.style.display = 'none';
    } else {
      container.style.display = 'block';
    }
  } else {
    container.innerHTML = '';
    container.style.display = 'none';
  }
});
```

---

## 🧪 How to Test

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Replace the following placeholders with your **Braze credentials**:
   - `YOUR-API-KEY`
   - `YOUR-ENDPOINT` (e.g., `sdk.iad-01.braze.com`)

3. Run the app:

   ```bash
   npm start
   ```

4. Enter a known `user_id` who is eligible for the `global_banner` placement.

---

## 📝 Notes

- This example uses **direct DOM manipulation** for inserting banners, as currently required by the Braze Web SDK.
- The banner container (`#global-banner-container`) is hidden if:
  - No banner is returned for the user.
  - The user is in a **control group** within the campaign.
- You can expand this app to include other Braze features like **In-App Messages** or **Content Cards** as needed.

---

## 📂 Project Structure

```
/src
  ├── App.js               // Main React component
  ├── brazeInit.js         // SDK initialization and banner logic
  ├── styles.css           // Basic styles
/public
  └── index.html           // HTML shell
```

---

## 📧 Questions?

Feel free to reach out if you need support customizing this example for your campaign setup, additional placements, or other Braze SDK features.

---
