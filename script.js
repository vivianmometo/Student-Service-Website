document.addEventListener("DOMContentLoaded", () => {
    const serviceDropdown = document.getElementById("service");
    const dynamicQuestions = document.getElementById("dynamic-questions");
    const form = document.getElementById("application-form");

    // Placeholder for submissions
    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

    // Handle service selection changes
    if (serviceDropdown) {
        serviceDropdown.addEventListener("change", (event) => {
            dynamicQuestions.innerHTML = ""; // Clear existing questions

            if (event.target.value === "residency") {
                dynamicQuestions.innerHTML = `
                    <label for="residency-type">Residency Type:</label>
                    <select id="residency-type" name="residency-type" required>
                        <option value="">--Choose--</option>
                        <option value="student">Student</option>
                        <option value="tourist">Tourist</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="family">Family</option>
                    </select>
                    <label for="passport-number">Passport Number:</label>
                    <input type="text" id="passport-number" name="passport-number" placeholder="Enter your passport number" required>
                `;
            }
        });
    }

    // Handle form submission
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            // Capture form data
            const formData = new FormData(form);
            const submission = {
                id: Date.now(),
                status: "Submitted", // Default status
            };
            formData.forEach((value, key) => {
                submission[key] = value;
            });

            // Save submission
            submissions.push(submission);
            localStorage.setItem("submissions", JSON.stringify(submissions));
            alert("Form submitted successfully!");
            form.reset();
            dynamicQuestions.innerHTML = "";
        });
    }

    // Populate submissions on Status Tracker Page
    const submissionList = document.getElementById("submission-list");
    if (submissionList) {
        if (submissions.length > 0) {
            submissions.forEach((submission, index) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <strong>Submission #${index + 1}</strong> - Service: ${submission.service || "N/A"}
                    <p>Status: <span class="status">${submission.status}</span></p>
                    <select class="status-dropdown" data-id="${submission.id}">
                        <option value="Submitted" ${submission.status === "Submitted" ? "selected" : ""}>Submitted</option>
                        <option value="In Progress" ${submission.status === "In Progress" ? "selected" : ""}>In Progress</option>
                        <option value="Waiting for Approval" ${submission.status === "Waiting for Approval" ? "selected" : ""}>Waiting for Approval</option>
                        <option value="Not Approved" ${submission.status === "Not Approved" ? "selected" : ""}>Not Approved</option>
                        <option value="Approved" ${submission.status === "Approved" ? "selected" : ""}>Approved</option>
                    </select>
                `;
                submissionList.appendChild(listItem);
            });

            // Handle status changes
            document.querySelectorAll(".status-dropdown").forEach((dropdown) => {
                dropdown.addEventListener("change", (event) => {
                    const id = parseInt(event.target.getAttribute("data-id"));
                    const newStatus = event.target.value;
                    submissions = submissions.map((submission) =>
                        submission.id === id ? { ...submission, status: newStatus } : submission
                    );
                    localStorage.setItem("submissions", JSON.stringify(submissions));
                    location.reload(); // Reload to show updated statuses
                });
            });
        } else {
            submissionList.innerHTML = "<p>No submissions found.</p>";
        }
    }
});
