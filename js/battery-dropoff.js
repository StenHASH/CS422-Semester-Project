//Section 3 - Battery Disposal Guidance

document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("battery-type");
    const advice = document.getElementById("battery-type-advice");

    const cards = document.querySelectorAll(
        ".extra-location-card"
    );

    if (!select || !advice) return;

    //Guidance changes based on the battery type.
    const messages = {
        rechargeable:
            "Rechargeable AA/AAA batteries should be taken " +
            "to a battery collection facility. Check that " +
            "the location accepts NiMH or NiCd batteries.",

        lithium:
            "Lithium-ion batteries and power banks require " +
            "special collection. Confirm that a facility " +
            "accepts your exact battery or device before visiting.",

        alkaline:
            "Single-use alkaline AA/AAA batteries can be recycled " +
            "through participating Illinois battery collection sites. " +
            "The locations listed above are not confirmed to accept " +
            "alkaline batteries. Use the Battery Network locator " +
            "to find a suitable drop-off location.",

        unknown:
            "Check the battery label for 'Alkaline', 'NiMH', " +
            "'NiCd', or 'Li-ion'. If you cannot identify the " +
            "battery type, ask a collection facility before disposal."
    };

    function updateBatteryGuidance() {
        const type = select.value;

        //Update the explanatory feedback.
        advice.textContent = messages[type];

        //Hide unsuitable drop-off suggestions for alkaline batteries.
        cards.forEach(card => {
            card.hidden = type === "alkaline";
        });
    }

    //Update when the user selects another type.
    select.addEventListener("change", updateBatteryGuidance);

    //Display the default selection immediately.
    updateBatteryGuidance();
});
