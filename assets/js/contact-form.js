document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loading = form.querySelector(".loading");
    const errorMessage = form.querySelector(".error-message");
    const sentMessage = form.querySelector(".sent-message");

    loading.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      loading.style.display = "none";

      if (response.ok) {
        // ✅ Message sent successfully
        sentMessage.style.display = "block";
        form.reset();
        return;
      }

      // ❌ Handle real error only
      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      errorMessage.textContent = data.error || "Something went wrong. Please try again.";
      errorMessage.style.display = "block";
    } catch (error) {
      loading.style.display = "none";
      errorMessage.textContent = "Network error. Please try again.";
      errorMessage.style.display = "block";
    }
  });
});
