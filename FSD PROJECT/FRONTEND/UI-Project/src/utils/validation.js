// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validateBookingForm = (formData) => {
  const errors = {};

  if (!formData.fullName?.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!formData.mobile?.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!validatePhone(formData.mobile)) {
    errors.mobile = "Please enter a valid Indian mobile number";
  }

  if (!formData.pickupDate) {
    errors.pickupDate = "Pickup date is required";
  } else {
    const today = new Date();
    const pickupDate = new Date(formData.pickupDate);
    if (pickupDate < today.setHours(0, 0, 0, 0)) {
      errors.pickupDate = "Pickup date cannot be in the past";
    }
  }

  if (!formData.dropoffDate) {
    errors.dropoffDate = "Drop-off date is required";
  } else if (formData.pickupDate) {
    const pickup = new Date(formData.pickupDate);
    const dropoff = new Date(formData.dropoffDate);
    if (dropoff <= pickup) {
      errors.dropoffDate = "Drop-off date must be after pickup date";
    }
  }

  return errors;
};

export const validateLoginForm = (formData) => {
  const errors = {};

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.password?.trim()) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const validateSignupForm = (formData) => {
  const errors = validateLoginForm(formData);

  if (!formData.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.confirmPassword?.trim()) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateContactForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.message?.trim()) {
    errors.message = "Message is required";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};
