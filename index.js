  const form = document.getElementById("contact-form");
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");
  const submitBtn = document.getElementById("submit-btn");
  const spinner = document.getElementById("form-loading");

  // Real-time form validation
  function validateFields() {
    const allFilled =
      nameField.value.trim() &&
      emailField.value.trim() &&
      messageField.value.trim();
    submitBtn.disabled = !allFilled;
  }

  [nameField, emailField, messageField].forEach((input) =>
    input.addEventListener("input", validateFields)
  );

  // Submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    spinner.style.display = "block";
    submitBtn.style.display = "none";

    const formData = new FormData(form);

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbwkXKkwZD_tu0E3YUHRQPzOPUdWmlu-z2R9YRqxtKKNJc2JDBuYLaHNNgUm7p1U3Xc82g/exec", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to send");

      Toastify({
        text: "✅ Message sent successfully!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();

      form.reset();
      validateFields(); // disable again
    } catch (err) {
      console.error(err);
      Toastify({
        text: "❌ Failed to send message!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();
    } finally {
      spinner.style.display = "none";
      submitBtn.style.display = "block";
    }
  });