
//reusable Input Component
import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const FormInput = ({ name, label, control, errors, rules, type, ...rest }) => {
  return (
    <div className="card-input-container">
      <label htmlFor={name} className="card-title">
        <sup className="required super">* </sup>
        {label.toUpperCase()}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input.TextArea
            {...field}
            id={name}
            className="card-input"
            {...rest}
            type={type === "Password" ? "password" : type === "Number" ? "number" : "text"}
            inputMode={type === "Number" ? "numeric" : undefined}
            pattern={type === "Number" ? "[0-9]*" : undefined}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        )}
      />
      {errors[name] && <p className="required">{errors[name].message}</p>}
    </div>
  );
};

export default FormInput;
