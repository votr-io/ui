import { useState, useCallback, useMemo } from "react";

export const useInputState = (initialValue?: string) => {
  const [value, setValue] = useState(initialValue);
  const [validity, setValidity] = useState<ValidityState | null>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValue(e.target.value);
      setValidity(e.target.validity);
    },
    []
  );

  return [value, validity, onChange] as [
    string,
    ValidityState,
    React.ChangeEventHandler
  ];
};

type InputOrTextArea = HTMLInputElement | HTMLTextAreaElement;
interface UseInputConfig {
  isValid?: (e: React.ChangeEvent<InputOrTextArea>) => boolean;
}
export const useInput = ({ isValid }: UseInputConfig) => {
  const [touched, setTouched] = useState(false);
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState("");

  const onBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<InputOrTextArea>) => {
      if (isValid) {
        setValid(isValid(e));
      }
      setValue(e.target.value);
    },
    [isValid]
  );

  return {
    state: { touched, valid, value },
    props: { onBlur, onChange }
  };
};
