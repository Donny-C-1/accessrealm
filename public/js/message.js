function message() {
  const toggleButton = document.querySelector(
    "[data-func='toggle-create-form']"
  );
  const form = document.querySelector("[data-id='form']");
  if (!toggleButton || !form) return;
  toggleButton.addEventListener("click");
}
