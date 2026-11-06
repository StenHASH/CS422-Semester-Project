//Show On-The-Go guidance when the user reaches the rinse step.
document.addEventListener("DOMContentLoaded", () => {
    const mount = document.getElementById("steps-mount");
    const controls = mount?.querySelector(".steps-controls");
    const badge = mount?.querySelector(".step-badge");

    if (!controls || !badge) return;

    const shortcut = document.createElement("a");

    shortcut.className = "extra-shortcut";
    shortcut.href = "#on-the-go";
    shortcut.textContent = "No sink nearby? See quick alternatives ↓";

    controls.appendChild(shortcut);

    function updateShortcut() {
        //Show alternatives when the current step requires rinsing.
        const currentStep = badge.textContent.toLowerCase();

        shortcut.hidden = !(
            currentStep.includes("rinse") ||
            currentStep.includes("wash")
        );
    }

    //Watch for changes made by the step-by-step system.
    const observer = new MutationObserver(updateShortcut);

    observer.observe(badge, {
        childList: true,
        characterData: true,
        subtree: true
    });

    updateShortcut();
});
