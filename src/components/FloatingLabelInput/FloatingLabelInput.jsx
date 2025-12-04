import { useEffect, useRef } from "react";
import css from "./FloatingLabelInput.module.css";

const FloatingLabelInput = ({
  id,
  labelName,
  placeholder,
  type = "text",
  register,
  error,
  disabled = false,
  autoComplete, // optional prop
  className = "",
}) => {
  const inputRef = useRef(null);
  const groupRef = useRef(null);

  // Якщо register повертає ref через react-hook-form, треба зберегти його.
  const reg = register ? register(id) : {};

  useEffect(() => {
    // невеликий таймаут — autofill іноді заповнює пізніше, тому перевіряємо двічі
    const check = () => {
      const el = inputRef.current;
      const group = groupRef.current;
      if (!el || !group) return;

      // Якщо інпут має value (autofill або інше), ставимо клас filled
      if (el.value && el.value.length > 0) {
        group.classList.add(css.filledFloat);
      } else {
        group.classList.remove(css.filledFloat);
      }
    };

    check();
    const t1 = setTimeout(check, 50);
    const t2 = setTimeout(check, 500);
    const t3 = setTimeout(check, 1000);

    const el = inputRef.current;
    if (el) {
      el.addEventListener("input", check);
      // Обробник для autofill
      el.addEventListener("change", check);
    }

    // Додаємо обробник для animation start (коли браузер застосовує autofill)
    const handleAnimationStart = (e) => {
      if (e.animationName === "onAutoFillStart") {
        check();
      }
    };

    if (el) {
      el.addEventListener("animationstart", handleAnimationStart);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (el) {
        el.removeEventListener("input", check);
        el.removeEventListener("change", check);
        el.removeEventListener("animationstart", handleAnimationStart);
      }
    };
  }, []);

  return (
    <div ref={groupRef} className={css.formGroupFloat} data-field={id}>
      <div className={css.inputWrapperFloat}>
        <input
          {...reg}
          ref={(node) => {
            inputRef.current = node;
            if (typeof reg === "object" && reg?.ref) reg.ref(node);
          }}
          type={type}
          id={id}
          placeholder=" "
          disabled={disabled}
          autoComplete={
            autoComplete || (id === "password" ? "current-password" : id)
          }
          className={`${css.formInputFloat} ${className} ${
            error ? css.formInputErrorFloat : ""
          }`}
        />

        {/* Лейбл всередині інпуту */}
        <div className={css.placeholderLabelFloat}>
          <span className={css.labelNameFloat}>{labelName}: </span>
          <span className={css.labelValueFloat}>{placeholder}</span>
        </div>
      </div>

      {error && <span className={css.formErrorFloat}>{error.message}</span>}
    </div>
  );
};

export default FloatingLabelInput;
