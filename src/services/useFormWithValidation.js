import { useCallback, useState } from "react";
// Валидация
export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({})

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsValid(false);
  }, []);

  return { values, setValues, errors, isValid, resetForm };
}