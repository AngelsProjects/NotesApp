/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import { equals, assoc } from 'ramda';

export default function useForm(initialState: any, onSubmit?: () => void) {
  const [form, setForm] = useState(initialState);

  const handleChange = useCallback((event) => {
    event.persist();
    setForm((_form: any) =>
      assoc(
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
        { ..._form }
      )
    );
  }, []);

  const resetForm = useCallback(() => {
    if (!equals(initialState, form)) {
      setForm(initialState);
    }
  }, [form, initialState]);

  const setInForm = useCallback((name, value) => {
    setForm((_form: any) => assoc(name, value, _form));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      if (event) {
        event.preventDefault();
      }
      if (onSubmit) {
        onSubmit();
      }
    },
    [onSubmit]
  );

  return {
    form,
    handleChange,
    handleSubmit,
    resetForm,
    setForm,
    setInForm
  };
}
