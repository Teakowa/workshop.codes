document.addEventListener("turbolinks:load", function() {
    const elements = document.querySelectorAll("[data-action~='disable-by-select']")

    elements.forEach((element) => element.removeAndAddEventListener("input", updateFormSubmitButton))
})

function updateFormSubmitButton(event) {
    const target = document.querySelector(`[data-disable-by-select-target="${ this.value }"]`)
    const elements = document.querySelectorAll("[data-disable-by-select-target]")

    elements.forEach(element => element.disabled = false)
    if (target) target.disabled = true
}
