const rules = {
  space: () => ({
    name: 'space',
    validator: (value) => ({
      isValid: /^[^\s]+\s[^\s]+$/.test(value),
      errorText: 'Please fill in First name and Last name separated by a space',
    }),
  }),
  onlyLetters: () => ({
    name: 'onlyLetters',
    validator: (value) => ({
      isValid: /^[a-zA-Z ]+$/.test(value),
      errorText: 'Only letters and space can be used',
    }),
  }),
  email: () => ({
    name: 'email',
    validator: (value) => ({
      isValid: /\S+@\S+\.\S+/.test(value),
      errorText: 'Email is not correct',
    }),
  }),
  password: () => ({
    name: 'password',
    validator: (value) => ({
      isValid: /(?=.*\d)[0-9a-zA-Z!@#$%^&*]/.test(value),
      errorText: 'Password is not correct',
    }),
  }),
  repeatPassword: (password) => ({
    name: 'repeatPassword',
    source: password,
    validator: () => ({
      isValid: (value) => value === password && value.length >= 6,
      errorText: 'Passwords are not same',
    }),
  }),
  userName: () => ({
    name: 'userName',
    validator: (value) => ({
      isValid: value.length >= 3,
      errorText: 'UserName should have at list 3 symbols',
    }),
  }),
  required: () => ({
    name: 'required',
    validator: (value) => ({
      isValid: Boolean(value),
      errorText: 'Required field',
    }),
  }),
  minLength: (min) => ({
    name: 'minLength',
    validator: (value) => ({
      isValid: value.length >= min,
      errorText: `Minimum length is ${min}`,
    }),
  }),
  maxLength: (max) => ({
    name: 'minLength',
    validator: (value) => ({
      isValid: value.length <= max,
      errorText: `Maximum length is ${max}`,
    }),
  }),
  isAgree: () => ({
    name: 'isAgree',
    validator: (value) => ({
      isValid: value === true,
    }),
  }),
  hasNumber: () => ({
    name: 'hasNumber',
    validator: (value) => ({
      isValid: /[0-9.,:]/.test(value),
      errorText: 'Password must have at least 1 number',
    }),
  }),
  hasLetter: () => ({
    name: 'hasLetter',
    validator: (value) => ({
      isValid: /[a-zA-Z.,:]/.test(value),
      errorText: 'Password must have at least 1 letter',
    }),
  }),
  isGUID: () => ({
    name: 'isUUID',
    validator: (value) => ({
      isValid: /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i.test(value),
      errorText: 'Must be a valid GUID',
    }),
  }),
  selected: () => ({
    name: 'selected',
    validator: (value) => ({
      isValid: value,
      errorText: 'Select one option',
    }),
  }),
};

export default rules;