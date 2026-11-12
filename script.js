
// The recruiter's to-do list

const tasks = [
    "receive an application from a woman who's extremely eager to learn",
    "test the to do list she made and be blown away (sarcasm intended)",
    "read CV and either be extremely impressed, disappointed or see potential (hopefully the latter)",
    "invite her for an interview (excellent decision)",
    "offer her an apprenticeship",
    "watch her learn, grow and absolutely thrive",
    "consider keeping her after the apprenticeship",
    "wonder how the team ever managed without her"
];

// Find the HTML elements

const list = document.getElementById("task-list");

const progressLabel = document.getElementById("progress-label");

const progressFill = document.getElementById("progress-fill");

const progressTrack = document.getElementById("progress-track");

const celebration = document.getElementById("celebration");

const resetButton = document.getElementById("reset");

const cvChoice = document.getElementById("cv-choice");

// Start with the first task ticked

let checked = tasks.map(function(task, index) {
    return index === 0;
});

// Update the progress bar

function updateProgress() {

    const completed = checked.filter(Boolean).length;

    const percentage = Math.round((completed / tasks.length) * 100);

    progressLabel.textContent = completed + " of " + tasks.length + " completed";

    progressFill.style.width = percentage + "%";

    progressTrack.setAttribute("aria-valuenow", percentage);

    // Show the congratulations message when all tasks are complete

    celebration.hidden = completed !== tasks.length;

}

// Create the checklist

tasks.forEach(function(task, index) {

    const label = document.createElement("label");

    label.className = "task";

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = checked[index];

    const text = document.createElement("span");

    text.textContent = task;

    // Update progress when a checkbox is ticked or unticked

    checkbox.addEventListener("change", function() {

        checked[index] = checkbox.checked;

        updateProgress();

    });

    // Add the checkbox and text to the webpage

    label.appendChild(checkbox);

    label.appendChild(text);

    list.appendChild(label);

});

// Reset the checklist

resetButton.addEventListener("click", function() {

    checked = tasks.map(function() {
        return false;
    });

    const checkboxes = list.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });

    updateProgress();

});

// Open the traditional CV

cvChoice.addEventListener("change", function() {
    if (cvChoice.checked) {
        const link = document.createElement("a");
        link.href = "cv.pdf";
        link.download = "CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        cvChoice.checked = false;
    }
});

// Set the initial progress

updateProgress();
