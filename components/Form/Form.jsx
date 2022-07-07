import { createElement } from "react";
import { useForm } from "react-hook-form";
import styles from "./Form.module.css";

export const Form = ({ children, onSubmit }) => {
  const { handleSubmit, register } = useForm({ mode: "onBlur" });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
                ? createElement(child.type, {
                    ...{
                      ...child.props,
                      register,
                      key: child.props.name,
                    },
                  })
                : child;
            })
          : children}
      </form>
    </>
  );
};

export const Input = ({ register, name, options, label, ...rest }) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input {...register(name, options)} {...rest} />
    </>
  );
};
