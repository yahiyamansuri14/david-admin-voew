export const rules = {
    notNull: "notNull",
    maxLength: "maxLength",
    minLength: "minLength",
    email: "email",
    password: "password",
  };
  
  export const validateInput = (value, rule) => {
    switch (rule.rule) {
      case "notNull":
        return value ? null : "Field Should not be empty";
  
      case "maxLength":
        return value.length > rule.length
          ? `Max length reached(${rule.length})`
          : null;
  
      case "minLength":
        return value.length < rule.length
          ? `Should meet minimum length(${rule.length})`
          : null;
  
      case "email":
        return /^[a-zA-Z0-9-]+[a-zA-Z0-9-.]*\w+@[a-zA-Z0-9-]+\.*[a-zA-Z0-9-]*\.[a-zA-Z0-9-]{2,}$/.test(
          value
        )
          ? null
          : "Enter a valid Email";
  
      case "password":
        return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
          value
        ) || true
          ? null
          : "Should be min 8 letter password, with at least a symbol, upper and lower case letters and a number ";
  
      default:
        return false;
    }
  };
  