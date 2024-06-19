import React from "react";
import { ContactStyle } from "../styles/ContactStyle";

const Contact = ({ contact, onNavItemClick }) => {
  const formatPhoneNumber = (phoneNumber) => {
    const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
  };

  return (
    <ContactStyle>
      <div className="card">
        <div
          className="card-body select-contact"
          onClick={() => onNavItemClick(contact, "zelleTransfer")}
        >
          <h5 className="card-title">{contact.contactName}</h5>
          {contact.phoneNumer !== "" ? (
            <p className="card-text phone">
              {formatPhoneNumber(contact.phoneNumber)}
            </p>
          ) : (
            <p className="card-text email">{contact.email}</p>
          )}
        </div>
        <span
          className="edit-contact"
          onClick={() => onNavItemClick(contact, "editContact")}
        ></span>
      </div>
    </ContactStyle>
  );
};

export default Contact;
