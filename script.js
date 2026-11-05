
/* ======================================
   1. FORM SUBMISSION AND VALIDATION
   ====================================== */

const form = document.getElementById("feedback-form");

form.addEventListener("submit", function(e) {

    // Stop the page from refreshing
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    const formMessage = document.getElementById("form-message");
    const discountMessage = document.getElementById("discount-message");

    formMessage.textContent = "";
    discountMessage.textContent = "";

    // Check whether username and email are filled
    if (username === "" || email === "") {
        formMessage.textContent = "Please enter your username and email.";
        return;
    }

    // Display personalized message
    formMessage.textContent =
        `Thank you for visiting, ${username}! We will contact you at ${email}.`;

    /* ======================================
       2. TYPE CONVERSION AND AGE DISCOUNT
       ====================================== */

    const birthYearText = document.getElementById("birth-year").value.trim();

    // Only calculate age if a birth year was entered
    if (birthYearText !== "") {

        // Convert text to an integer
        const birthYear = Number(birthYearText);
        const currentYear = new Date().getFullYear();

        // Validate the year before calculating age
        if (
            !/^\d{4}$/.test(birthYearText) ||
            !Number.isInteger(birthYear) ||
            birthYear < 1900 ||
            birthYear > currentYear
        ) {
            discountMessage.textContent =
                "Please enter a valid four-digit birth year.";
        } else {

            const age = currentYear - birthYear;

            // Example discount rules for this assignment
            if (age <= 25) {
                discountMessage.textContent =
                    `Your age is ${age}. You qualify for the student discount!`;
            } else if (age >= 60) {
                discountMessage.textContent =
                    `Your age is ${age}. You qualify for the senior discount!`;
            } else {
                discountMessage.textContent =
                    `Your age is ${age}. No special age discount applies.`;
            }
        }
    }
});


/* ======================================
   3. MENU TABLE ROW HIGHLIGHTING
   ====================================== */

const menuRows = document.querySelectorAll(".menu-row");

menuRows.forEach(function(row) {

    row.addEventListener("mouseover", function() {
        row.style.backgroundColor = "#f3dfc1";
    });

    row.addEventListener("mouseout", function() {
        // Clear inline color and return to normal styling
        row.style.backgroundColor = "";
    });

});


/* ======================================
   4. LIGHT / DARK MODE SWITCHER
   ====================================== */

const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", function() {

    // Add dark-mode class if absent; remove it if present
    document.body.classList.toggle("dark-mode");

});


/* ======================================
   5. INTERACTIVE ORDER TOTAL CALCULATOR
   ====================================== */

const checkboxes = document.querySelectorAll(".menu-item");
const totalDisplay = document.getElementById("total");

checkboxes.forEach(function(checkbox) {

    checkbox.addEventListener("change", function() {

        let total = 0;

        // Check every menu checkbox
        checkboxes.forEach(function(item) {

            if (item.checked) {
                total += parseFloat(item.dataset.price);
            }

        });

        // Show the updated total
        totalDisplay.textContent = `Total: $${total.toFixed(2)}`;

    });

});


/* ======================================
   6. READ MORE / READ LESS
   ====================================== */

const readMoreButton = document.getElementById("read-more-button");
const extraText = document.getElementById("extra-text");

readMoreButton.addEventListener("click", function() {

    if (extraText.classList.contains("hidden")) {

        // Show the extra paragraph
        extraText.classList.remove("hidden");
        readMoreButton.textContent = "Read Less";

    } else {

        // Hide the extra paragraph
        extraText.classList.add("hidden");
        readMoreButton.textContent = "Read More";

    }

});


/* ======================================
   7. LIVE MENU CATEGORY FILTER
   ====================================== */

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCategory = button.dataset.category;

        menuRows.forEach(function(row) {

            const rowCategory = row.dataset.category;

            if (
                selectedCategory === "All" ||
                rowCategory === selectedCategory
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });

});


/* ======================================
   8. DYNAMIC CAFE OPENING STATUS
   ====================================== */

const openingStatus = document.getElementById("opening-status");

function updateOpeningStatus() {

    const currentHour = new Date().getHours();

    // Cafe opens at 8 AM and closes at 10 PM
    if (currentHour >= 8 && currentHour < 22) {

        openingStatus.textContent = "We are Open!";
        openingStatus.style.color = "green";

    } else {

        openingStatus.textContent = "Closed - Open at 8 AM";
        openingStatus.style.color = "red";

    }

}

// Run immediately when the page loads
updateOpeningStatus();


/* ======================================
   9. LIVE CHARACTER COUNTER
   ====================================== */

const specialNotes = document.getElementById("special-notes");
const charCount = document.getElementById("char-count");

specialNotes.addEventListener("input", function() {

    const remaining = 100 - specialNotes.value.length;

    charCount.textContent = `${remaining} characters remaining`;

});
