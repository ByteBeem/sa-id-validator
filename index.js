const validateID = (id) => /^[0-9]{13}$/.test(id);

const luhnCheckSA = (id) => {
  let sum = 0;

  // Odd positions (0-based index)
  for (let i = 0; i < 12; i += 2) {
    sum += parseInt(id[i], 10);
  }

  // Even positions: concatenate, multiply by 2, sum digits
  let evenDigits = "";
  for (let i = 1; i < 12; i += 2) {
    evenDigits += id[i];
  }

  let evenNum = (parseInt(evenDigits, 10) * 2).toString();
  sum += evenNum.split("").reduce((a, b) => a + parseInt(b), 0);

  const checkDigit = (10 - (sum % 10)) % 10;

  return checkDigit === parseInt(id[12], 10);
};

const parseDOB = (id) => {
  const yy = parseInt(id.slice(0, 2), 10);
  const mm = parseInt(id.slice(2, 4), 10);
  const dd = parseInt(id.slice(4, 6), 10);

  const currentYear = new Date().getFullYear() % 100;
  const century = yy <= currentYear ? 2000 : 1900;

  const date = new Date(century + yy, mm - 1, dd);

  // Validate real date
  if (
    date.getFullYear() !== century + yy ||
    date.getMonth() !== mm - 1 ||
    date.getDate() !== dd
  ) {
    return null;
  }

  return date;
};

const getAge = (dob) => {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
};

const idValidationService = {
  checkNumber: (id) => {
    const result = {
      dob: null,
      age: null,
      gender: null,
      citizenship: null,
      isValid: false,
      error: null,
    };

    if (!validateID(id)) {
      result.error = "Invalid format";
      return result;
    }

    const dob = parseDOB(id);
    if (!dob) {
      result.error = "Invalid date of birth";
      return result;
    }

    result.dob = dob;
    result.age = getAge(dob);

    // Gender
    const genderDigit = parseInt(id[6], 10);
    result.gender = genderDigit < 5 ? "Female" : "Male";

    // Citizenship
    const citizenshipDigit = parseInt(id[10], 10);
    result.citizenship =
      citizenshipDigit === 0
        ? "SA Citizen"
        : citizenshipDigit === 1
        ? "Non-SA Citizen"
        : "Unknown";

    // Checksum
    result.isValid = luhnCheckSA(id);

    return result;
  },
};

module.exports = idValidationService;