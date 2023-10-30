import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.validateForm();
    const inputFields = document.querySelectorAll('input[data-controller^="personal-data"]');
    inputFields.forEach(inputField => {
      inputField.addEventListener('input', () => {
        this.validateForm();
      });
    });
  }

  validateForm() {
    const firstNameError = document.getElementById('firstNameError').textContent;
    const lastNameError = document.getElementById('lastNameError').textContent;
    const emailError = document.getElementById('emailError').textContent;
    const phoneNumberError = document.getElementById('phoneNumberError').textContent;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email_address').value;
    const phone_number = document.getElementById('phone_number').value;

    const saveButton = document.getElementById('saveButton');

    if (firstNameError || lastNameError || emailError || phoneNumberError || firstName === '' || lastName === '' || email === '' || phone_number === '') {
      saveButton.classList.remove('bg-green-600');
      saveButton.classList.add('bg-gray-400');
      saveButton.disabled = true;
    } else {
      saveButton.classList.remove('bg-gray-400');
      saveButton.classList.add('bg-green-600');
      saveButton.disabled = false;
    }
  }

  validateName(e) {
    const inputElement = e.target;
    const maxLen = parseInt(inputElement.getAttribute("data-maxlength"), 10);
    const name = inputElement.getAttribute("data-name");
    const errorElement = document.getElementById(inputElement.getAttribute("data-error"));
    const nameRegex = /^[A-Za-z]+$/;

    if (inputElement.value.length === 0) {
      errorElement.innerHTML = '';
    } else if (!nameRegex.test(inputElement.value)) {
      errorElement.innerHTML = `${name} should only contain characters`;
    } else if (inputElement.value.length > maxLen) {
      errorElement.innerHTML = `${name} should not exceed ${maxLen} characters`;
    } else {
      errorElement.innerHTML = '';
    }
  }

  validateEmail(event) {
    const emailVal = event.target.value;
    const email = document.getElementById("email_address");
    const emailError = document.getElementById('emailError');

    if (this.isValidEmail(emailVal) || emailVal == '') {
      emailError.innerHTML = '';
    } else {
      emailError.innerHTML = 'Please enter a valid email address';
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhoneNumber(event) {
    let phoneNumberValue = event.target.value.replace(/[^\d]/g, "");
    const phoneNumberElement = document.getElementById("phone_number");
    const phoneNumberError = document.getElementById("phoneNumberError");
    phoneNumberError.innerHTML = '';

    if (phoneNumberValue.length > 10) {
      phoneNumberValue = phoneNumberValue.slice(0, 10);
    }

    if (phoneNumberValue.length === 10) {
      phoneNumberValue = `${phoneNumberValue.slice(0, 3)}-${phoneNumberValue.slice(3, 6)}-${phoneNumberValue.slice(6)}`;
      phoneNumberElement.value = phoneNumberValue;
      phoneNumberError.innerHTML = '';
    } else if ((phoneNumberValue.length < 10 || phoneNumberValue.length > 0) && /^\d+$/.test(phoneNumberValue)) {
      phoneNumberError.innerHTML = 'Please enter a 10-digit phone number';
    } else if (!/^\d+$/.test(phoneNumberValue) && (phoneNumberElement.value).length > 0) {
      phoneNumberError.innerHTML = 'Please enter only integer digit';
    } else if ((phoneNumberValue.length === 0) || (phoneNumberElement.value).length === 0) {
      phoneNumberError.innerHTML = '';
    } else {
      phoneNumberError.innerHTML = '';
    }
  }
}
