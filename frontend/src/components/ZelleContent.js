import React from "react";
import { ContactStyle } from "../styles/ContactStyle";
import Contact from "./Contact";

const ZelleContent = ({ contacts, onNavItemClick }) => {

  const handleNavigationClick = (contact, nav) => {
        return () => {
            console.log(nav);
            onNavItemClick(contact, nav);
          };
  };

  return (
    <ContactStyle>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => onNavItemClick(null, "addContact")}
          >
            Add Contact
          </button>
          <ul
            className="nav nav-pills nav-justified mb-3"
            id="ex1"
            role="tablist"
          >
            {contacts.map((contact, index) => (
              <li key={index} className="nav-item">
                <a
                  className="nav-link"
                  id={`contact-${index}-tab`}
                  data-toggle="pill"
                  href={`#contact-${index}`}
                  role="tab"
                  aria-controls={`contact-${index}`}
                  aria-selected="true"
                >
                  <Contact contact={contact} onNavItemClick={onNavItemClick} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContactStyle>
  );
};

export default ZelleContent;
