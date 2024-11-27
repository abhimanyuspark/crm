export const formValidation = (data) => {
  const errors = {};

  // Check if email is provided and valid
  if (data.hasOwnProperty("email")) {
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }
  }

  // Check if password is provided and meets length criteria
  if (data.hasOwnProperty("password")) {
    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 8 || data.password.length > 10) {
      errors.password = "Password must be between 8 to 10 characters long";
    }
  }

  // Check if phoneNumber is provided and meets length criteria
  if (data.hasOwnProperty("phoneNumber")) {
    if (data.phoneNumber.length > 10) {
      errors.phoneNumber = "PhoneNumber must be exactly 10 characters long";
    }
  }

  // Check if name is provided
  if (data.hasOwnProperty("name")) {
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
  }

  // Check if title is provided
  if (data.hasOwnProperty("title")) {
    if (!data.title.trim()) {
      errors.title = "Title is required";
    }
  }

  // check if officeWebsite is provided
  if (data.hasOwnProperty("officeWebsite")) {
    if (data.officeWebsite !== "") {
      if (!/^(http|https):\/\/[^ "]+$/.test(data.officeWebsite)) {
        errors.officeWebsite = "Office website URL format is incorrect.";
      }
    }
  }

  return errors;
};
