import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormStyle } from "../styles/FormStyle";

const ContactForm = ({ contact, onContactCreate }) => {
  const schema = yup.object().shape({
    contactName: yup.string().required(),
    email: yup.string().email(),
    phoneNumber: yup.string(),
    oneOf: yup.mixed().oneOf(["email", "phoneNumber"], "Please enter an email address or phone number"), 
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // Set initial form values based on the contact prop
  useEffect(() => {
    if (contact) {
      setValue("contactName", contact.contactName);
      setValue("email", contact.email);
      setValue("phoneNumber", contact.phoneNumber);
    }
  }, [contact, setValue]);

  const onSubmitContact = (data) => {
    console.log(data);
    onContactCreate(data.contactName, data.email, data.phoneNumber);
  };

  return (
    <FormStyle>
      <form onSubmit={handleSubmit(onSubmitContact)}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="contactName">
            Contact Name
          </label>
          <input
            type="text"
            className="form-control"
            {...register("contactName")}
          />
          {errors.contactName && (
            <p className="error">{errors.contactName.message}</p>
          )}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input type="text" className="form-control" {...register("email")} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="error">{errors.phoneNumber.message}</p>
          )}
        </div>
        {errors.oneOf && <p className="error">{errors.oneOf.message}</p>}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          {(contact) ? "Update" : "Add" }
        </button>
      </form>
    </FormStyle>
  );
};

export default ContactForm;
