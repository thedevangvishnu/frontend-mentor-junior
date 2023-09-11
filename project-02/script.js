// selecting necessary elements: button, inputs, spans

// handle click should check for these cases
// 1. empty inputs...all or any
/* 2. invalid inputs
        - year greater than present year
        - day must be 30 or 31 depending upon the month number
        - check for days of Feb
            - for normal years
            - for leap years
*/

// create year array in which each month is an obj
const year = [
  {
    month: "Jan",
    days: 31,
  },
  {
    month: "Feb",
    days: 28,
  },
  {
    month: "Mar",
    days: 31,
  },
  {
    month: "Apr",
    days: 30,
  },
  {
    month: "May",
    days: 31,
  },
  {
    month: "Jun",
    days: 30,
  },
  {
    month: "Jul",
    days: 31,
  },
  {
    month: "Aug",
    days: 31,
  },
  {
    month: "Sep",
    days: 30,
  },
  {
    month: "Oct",
    days: 31,
  },
  {
    month: "Nov",
    days: 30,
  },
  {
    month: "Dec",
    days: 31,
  },
];

// selecting all necessary elements
const button = document.querySelector("button");
const formItems = document.querySelectorAll(".form__items");
const errorMessages = document.querySelector(".error__message");
const resultYear = document.querySelector(".years");
const resultMonth = document.querySelector(".months");
const resultDay = document.querySelector(".days");

// handleClick() checks for all conditions and then only prints results

let hasError = false;

const handleClick = () => {
  hasError = false;

  // create new date obj and get present day, month and year
  const date = new Date();

  let presentDay, presentMonth, presentYear;
  presentDay = date.getDate();
  presentMonth = date.getMonth() + 1; // months are 0 indexed
  presentYear = date.getFullYear();

  // check all conditions

  // 1. for each formItem, check if input value is empty and if so, show error message
  let userYear, userMonth, userDay;
  formItems.forEach((item) => {
    const label = item.querySelector("label");
    const input = item.querySelector("input");
    const errorMessage = item.querySelector("p");

    if (input.value === "") {
      hasError = true;

      label.classList.add("error");
      input.classList.add("error");
      errorMessage.textContent = "This field is required";
    }

    // to remove error messages automatically
    setTimeout(() => {
      if (input.value === "") {
        label.classList.remove("error");
        input.classList.remove("error");
        errorMessage.textContent = "";
      }
    }, 2000);

    // 2. if inputs are not empty, remove messages
    input.addEventListener("input", () => {
      label.classList.remove("error");
      input.classList.remove("error");
      errorMessage.textContent = "";
    });

    if (input.value !== "") {
      // 3. validate year input
      if (item.classList.contains("year__item")) {
        const yearLabel = item.querySelector("label");
        const yearInput = item.querySelector("input");
        const yearErrorMsg = item.querySelector("p");

        const enteredYear = parseInt(yearInput.value);

        if (
          isNaN(enteredYear) ||
          enteredYear < 0 ||
          enteredYear > presentYear
        ) {
          hasError = true;

          yearLabel.classList.add("error");
          yearInput.classList.add("error");
          yearErrorMsg.textContent = "Enter a valid year";
        }

        // when entered year is correct, determine user year
        userYear = presentYear - enteredYear; // presentYear will always be >= enteredYear
      }

      // 4. validate days and month inputs
      if (item.classList.contains("month__item")) {
        const monthLabel = label;
        const monthInput = input;
        const monthErrorMsg = errorMessage;

        const enteredMonth = parseInt(monthInput.value);

        if (isNaN(enteredMonth) || enteredMonth < 1 || enteredMonth > 12) {
          hasError = true;

          monthLabel.classList.add("error");
          monthInput.classList.add("error");
          monthErrorMsg.textContent = "Enter a valid month";
        }

        // when entered month is correct, determine user month
        userMonth = presentMonth - enteredMonth;
      }

      // 5. validate day
      if (item.classList.contains("day__item")) {
        const dayLabel = label;
        const dayInput = input;
        const dayErrorMsg = errorMessage;

        const enteredDay = parseInt(dayInput.value);
        const respectiveMonth = parseInt(
          document.querySelector(".month__item input").value
        );
        let maxDays = year[respectiveMonth - 1].days;

        if (isNaN(enteredDay) || enteredDay < 1 || enteredDay > maxDays) {
          hasError = true;
          dayLabel.classList.add("error");
          dayInput.classList.add("error");
          dayErrorMsg.textContent = `Enter a valid day for ${
            year[respectiveMonth - 1].month
          }`;
        }

        // when entered day is correct, determine user day
        userDay = presentDay - enteredDay;
      }
    }
  });

  // Calculate age function
  const calculateAge = (enteredDate, presentDate) => {
    const enteredYear = enteredDate.getFullYear();
    const enteredMonth = enteredDate.getMonth();
    const enteredDay = enteredDate.getDate();

    const presentYear = presentDate.getFullYear();
    const presentMonth = presentDate.getMonth();
    const presentDay = presentDate.getDate();

    let ageYear = presentYear - enteredYear;
    let ageMonth = presentMonth - enteredMonth;
    let ageDay = presentDay - enteredDay;

    if (ageDay < 0) {
      ageMonth--; // Adjust months if user's birth day is in the future this year
      const maxDayInEnteredMonth = new Date(
        enteredYear,
        enteredMonth + 1,
        0
      ).getDate();
      ageDay += maxDayInEnteredMonth;
    }

    if (ageMonth < 0) {
      ageYear--; // Adjust years if user's birth month is in the future this year
      ageMonth += 12; // Add 12 months to make it positive
    }

    return { ageYear, ageMonth, ageDay };
  };

  // Calculate user age
  const enteredYear = parseInt(
    document.querySelector(".year__item input").value
  );
  const enteredMonth =
    parseInt(document.querySelector(".month__item input").value) - 1; // Adjust for 0-based index
  const enteredDay = parseInt(document.querySelector(".day__item input").value);

  if (!hasError) {
    const enteredBirthday = new Date(enteredYear, enteredMonth, enteredDay);
    const presentDate = new Date();

    const age = calculateAge(enteredBirthday, presentDate);

    resultYear.textContent = age.ageYear;
    resultMonth.textContent = age.ageMonth;
    resultDay.textContent = age.ageDay;
  } else {
    // Clear the age if there are errors
    resultYear.textContent = "--";
    resultMonth.textContent = "--";
    resultDay.textContent = "--";
  }
};

// handle button click

button.addEventListener("click", handleClick);

/* edge cases for userYear, userMonth and userDay
  - if userMonth < 0
  - if userDay < 0
*/
