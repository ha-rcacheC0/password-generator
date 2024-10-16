document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generate-button");
  if (generateButton) {
    generateButton.addEventListener("click", handleGeneratePassword);
  } else {
    console.log("Generate button not found! :(");
  }
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

  document.getElementById("password-display").textContent = password;
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

// const passwordLength = 12;

// let includeLowerCase = true;
// let includeUpperCase = true;
// let includeNumbers = true;
// let includeSymbols = true;

// const password = generatePassword(
//   passwordLength,
//   includeLowerCase,
//   includeUpperCase,
//   includeNumbers,
//   includeSymbols
// );

// console.log(`Generated Password: ${password}`);
