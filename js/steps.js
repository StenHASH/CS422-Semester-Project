// Builds the step-by-step slide section from the RECYCLE_STEPS object
// that each item page defines. This file is shared by every item page.

function initSteps() {
    const mount = document.getElementById("steps-mount");
    if (!mount || typeof RECYCLE_STEPS === "undefined") return;

    const { title, intro, steps } = RECYCLE_STEPS;
    let current = 0;

    // Builds the layout once
    // Only the contents change between slides
    mount.innerHTML = `
    <h2 class="steps-title">${title}</h2>
    <p class="steps-intro">${intro}</p>

    <div class="steps-grid">
        <div class="steps-image">
            <img src="" alt="">
        </div>

        <div class="steps-info">
            <div class="step-badge"></div>
            <h3 class="reason-label">Reason:</h3>
            <div class="reason-box">
                <div class="reason-text"></div>
            </div>
        </div>

        <div class="steps-controls">
            <div class="state-box"></div>
            <button type="button" class="step-btn step-btn-next"></button>
            <button type="button" class="step-btn step-btn-prev">Previous Step</button>
        </div>
    </div>
  `;

    const img       = mount.querySelector(".steps-image img");
    const badge     = mount.querySelector(".step-badge");
    const reason    = mount.querySelector(".reason-text");
    const stateBox  = mount.querySelector(".state-box");
    const nextBtn   = mount.querySelector(".step-btn-next");
    const prevBtn   = mount.querySelector(".step-btn-prev");

    function showStep(index) {
        current = index;
        const step = steps[index];
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;
    
        img.src = step.image;
        img.alt = step.alt || step.title;

        badge.textContent = `Step ${index + 1} - ${step.title}`;
        reason.innerHTML = step.reason;

        // Red "Not Yet Recyclable" or green "Recyclable" box
        stateBox.className = "state-box " + (step.recyclable ? "is-yes" : "is-no");
        stateBox.innerHTML = step.recyclable
            ? '<span class="state-icon">&#10003;</span> Recyclable!'
            : '<span class="state-icon">&#10005;</span> Not Yet Recyclable!';

        // Hidden buttons keep their space, so the other controls dont jump around
        nextBtn.innerHTML = step.nextLabel || "Next Step";
        nextBtn.classList.toggle("is-hidden", isLast);
        nextBtn.disabled = isLast;

        prevBtn.classList.toggle("is-hidden", isFirst);
        prevBtn.disabled = isFirst;
    }

    // Next Slide Button
    nextBtn.addEventListener("click", () => {
        if (current < steps.length - 1) showStep(current + 1);
    });

    // Previous Slide Button
    prevBtn.addEventListener("click", () => {
        if (current > 0) showStep(current - 1);
    });

    // Preload every slide image so switching steps doesnt flicker
    steps.forEach((s) => { new Image().src = s.image});

    showStep(0);
}

document.addEventListener("DOMContentLoaded", initSteps);