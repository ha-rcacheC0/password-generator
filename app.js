document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generate-button");
  if (generateButton) {
    generateButton.addEventListener("click", handleGeneratePassword);
  } else {
    console.log("Generate button not found! :(");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const updateProgress = () => {
    let progress = 0;
    let progressText = document.getElementById("progress-text");
    let progressBar = document.getElementById("bar").style;
    let lengthValue = Number(document.getElementById("password-length").value);
    let lowerValue = document.getElementById("include-lower");
    let upperValue = document.getElementById("include-upper");
    let numberValue = document.getElementById("include-numbers");
    let symbolValue = document.getElementById("include-symbols");

    if (lengthValue < 6) {
      progress--;
    } else if (lengthValue > 6 && lengthValue <= 12) {
      progress++;
    } else if (lengthValue >= 13 && lengthValue <= 16) {
      progress += 2;
    } else if (lengthValue >= 17) {
      progress += 3;
    }

    if (lowerValue.checked) {
      progress++;
    }
    if (upperValue.checked) {
      progress++;
    }
    if (numberValue.checked) {
      progress++;
    }
    if (symbolValue.checked) {
      progress++;
    }

    if (progress === 6) {
      progressText.textContent = `Secure. 🔐`;
      progressBar.width = "250px";
      progressBar.backgroundColor = "var(--p-c)";
    } else if (progress === 5) {
      progressText.textContent = `Excellent! ✅`;
      progressBar.width = "220px";
      progressBar.backgroundColor = "var(--p-c)";
    } else if (progress <= 4 && progress > 2) {
      progressText.textContent = `Use more characters. Make it longer. ⚠️`;
      progressText.style.color = "#020202";
      progressBar.width = "125px";
      progressBar.backgroundColor = "var(--s-c)";
    } else if (progress <= 2) {
      progressText.textContent = `Weak. Use more characters. Make it longer. ⛔️`;
      progressText.style.color = "red";
      progressBar.width = "20px";
      progressBar.backgroundColor = "red";
    }
  };

  document
    .getElementById("password-length")
    .addEventListener("change", updateProgress);
  document
    .getElementById("include-lower")
    .addEventListener("change", updateProgress);
  document
    .getElementById("include-upper")
    .addEventListener("change", updateProgress);
  document
    .getElementById("include-numbers")
    .addEventListener("change", updateProgress);
  document
    .getElementById("include-symbols")
    .addEventListener("change", updateProgress);

  updateProgress();
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("copy-btn").addEventListener("click", () => {
    const copyContent = async () => {
      try {
        let text = document.querySelector("textarea").value;
        await navigator.clipboard.writeText(text);
        document.getElementById("clip-text").textContent = "Copied!";
        document.getElementById("clip-text").style.backgroundColor =
          "rgb(90, 90, 90)";
        setTimeout(() => {
          document.getElementById("clip-text").textContent = "";
          document.getElementById("clip-text").style.backgroundColor =
            "transparent";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };
    copyContent();
  });
});

function handleGeneratePassword() {
  const passwordLength = parseInt(
    document.getElementById("password-length").value
  );
  const includeLowerCase = document.getElementById("include-lower").checked;
  const includeUpperCase = document.getElementById("include-upper").checked;
  const includeNumbers = document.getElementById("include-numbers").checked;
  const includeSymbols = document.getElementById("include-symbols").checked;

  const password = generatePassword(
    passwordLength,
    includeLowerCase,
    includeUpperCase,
    includeNumbers,
    includeSymbols
  );

  // document.getElementById("password-display").textContent = password;
  document.getElementById("text-area").value = password;
}

function generatePassword(
  length,
  includeLowerCase,
  includeUpperCase,
  includeNumbers,
  includeSymbols
) {
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "1234567890";
  const symbolChars = "!@#$%^&*()_+-=,./<>?`~[]{}";

  let allowedChars = "";
  let password = "";

  allowedChars += includeLowerCase ? lowerCaseChars : "";
  allowedChars += includeUpperCase ? upperCaseChars : "";
  allowedChars += includeNumbers ? numberChars : "";
  allowedChars += includeSymbols ? symbolChars : "";

  if (length <= 0) {
    return `Password length must be at least 1`;
  }
  if (allowedChars.length === 0) {
    return `At least one set of characters needs to be selected`;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  return password;
}
