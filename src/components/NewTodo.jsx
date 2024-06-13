import React, { useEffect } from "react";
import FormInput from "./FormInput";
import { Controller, useForm } from "react-hook-form";
import { Button, Select } from "antd";

const { Option } = Select;

const NewTodo = ({ onSubmit, handleCancel,defaultValues }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      todo: "",
      completed: "",
    },
  });

  console.log(defaultValues);

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        completed: defaultValues.completed ? "true" : "false",
      });
    }
  }, [defaultValues, reset]);


  const onFormSubmit = (data) => {
    onSubmit(data)
    console.log(data);
    reset({})
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormInput
          name="todo"
          label="Description"
          control={control}
          errors={errors}
          rules={{
            required: { value: true, message: "Description is required" },
          }}
        />
        {/* <div className="card-input-container">
              <label htmlFor="completed" className="card-title">
                <sup className="required super">* </sup>
                Status
              </label>
              <select
                className="card-input"
                {...register("completed", { required: true })}
              >
                <option value=""></option>
                <option value="false">InProgress</option>
                <option value="true">Completed</option>
              </select>
              {errors.tag_name && (
                <p className="required">Status is Required</p>
              )}
            </div> */}

            <div className="card-input-container">
          <label htmlFor="completed" className="card-title">
            <sup className="required super">* </sup>
            Status
          </label>
          <Controller
            name="completed"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select
                {...field}
                id="completed"
                className="card-input"
                placeholder="Select status"
              >
                <Option value="false">In Progress</Option>
                <Option value="true">Completed</Option>
              </Select>
            )}
          />
          {errors.completed && (
            <p className="required">{errors.completed.message}</p>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button key="cancel" onClick={handleCancel} style={{marginRight:"2rem"}}>
            Cancel
          </Button>
          <Button key="submit" type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewTodo;
