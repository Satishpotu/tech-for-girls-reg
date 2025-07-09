// let counter = parseInt(localStorage.getItem("shareCount")) || 0;
let submitted = localStorage.getItem("submitted") === "true";

// const shareBtn = document.getElementById("shareBtn");
// const counterText = document.getElementById("counterText");
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

updateCounterText();

if (submitted) {
  disableForm();
}
  if (localStorage.getItem("submitted") === "true") {
  // Disable form and show message
  }

//     if (counter >= 5) {
//         counterText.textContent = "Sharing complete. Please continue.";
//         shareBtn.disabled == true;
//   }
// };
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (counter < 5) {
    alert("Please share on WhatsApp 5 times before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const fileInput = document.getElementById("screenshot");

//   if (!fileInput.files.length) {
//     alert("Please upload a file.");
//     return;
//   }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onloadend = async function () {
    const base64File = reader.result;

    const data = {
      name,
      phone,
      email,
      college,
      file: base64File, // to be handled by Apps Script
    };

    // Replace with your actual Google Apps Script Web App URL
    const scriptURL = "https://web.whatsapp.com/";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        message.textContent =
          "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
        localStorage.setItem("submitted", "true");
        disableForm();
      } else {
        alert("Submission failed. Try again later.");
      }
    } catch (error) {
      console.error("Error!", error.message);
    }
  };

  reader.readAsDataURL(file);
});

function updateCounterText() {
  counterText.textContent = `Click count: ${counter} / 5`;
}

function disableForm() {
  form.querySelectorAll("input, button").forEach((el) => (el.disabled = true));
  message.textContent =
    "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
}
