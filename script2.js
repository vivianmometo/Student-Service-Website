document.addEventListener("DOMContentLoaded", () => {
    const serviceDropdown = document.getElementById("service");
    const dynamicQuestions = document.getElementById("dynamic-questions");

    // Handle service selection changes
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
        } else if (event.target.value === "insurance") {
            dynamicQuestions.innerHTML = `
                <label for="insurance-type">Insurance Type:</label>
                <select id="insurance-type" name="insurance-type" required>
                    <option value="">--Choose--</option>
                    <option value="health">Health</option>
                    <option value="travel">Travel</option>
                </select>
            `;
        } else if (event.target.value === "plane") {
            dynamicQuestions.innerHTML = `
                <label for="destination">Destination:</label>
                <input type="text" id="destination" name="destination" placeholder="Enter your destination" required>
                <label for="departure-date">Departure Date:</label>
                <input type="date" id="departure-date" name="departure-date" required>
            `;
        }
    });

    // Handle form submission
    const form = document.getElementById("application-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Form submitted successfully!");
    });
});
