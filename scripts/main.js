if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./scripts/serviceWorker.js").then(
      (registration) => {
        console.log("Service Worker registered with scope:");
      },
      (error) => {
        console.log("Service Worker registration failed:", error);
      }
    );
  });
}