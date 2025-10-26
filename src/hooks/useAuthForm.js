import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register as registerUser, login } from "../redux/auth/authOperations";
import { selectIsLoading, selectError } from "../redux/auth/authSlice";
import {
  showErrorNotification,
  showOperationSuccess,
} from "../utils/notifications";
import { useEffect } from "react";

//  для обробки форм авторизації та реєстрації

export const useAuthForm = (schema, formType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // Показуємо помилку, якщо вона є
  useEffect(() => {
    if (error) {
      showErrorNotification(error);
    }
  }, [error]);

  const onSubmit = async (data) => {
    try {
      let result;

      if (formType === "register") {
        result = await dispatch(registerUser(data)).unwrap();
        showOperationSuccess("register");
      } else if (formType === "login") {
        result = await dispatch(login(data)).unwrap();
        showOperationSuccess("login");
      }

      // Якщо успішно - редірект на recommended
      if (result) {
        reset();
        navigate("/recommended");
      }
    } catch (err) {
      // Помилка вже оброблена в Redux та показана через useEffect
      console.error("Auth error:", err);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
  };
};
