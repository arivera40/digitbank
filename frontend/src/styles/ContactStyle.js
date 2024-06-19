import styled from "styled-components";

export const ContactStyle = styled.div`
  .nav {
    flex-direction: column;
    .nav-item {
      margin-top: 0;

      &:first-child {
        margin-top: 30px;
      }
    }
    .nav-link {
      padding: 0;

      .card {
        border-radius: 0;
        display: flex;
        flex-direction: row;

        .card-body {
          display: flex;
          flex-direction: column;
          padding: 10px;
          position: relative; /* Ensure relative positioning */
          cursor: pointer; /* Add cursor pointer */

          .card-title {
            text-align: left;
            margin-bottom: 10px;
          }

          p {
            text-align: left;
            margin: 0;
          }
        }

        .edit-contact {
          content: url("/edit_icon.svg");
          margin: 15px;
          height: 24px;
          cursor: pointer;
        }
      }
    }
  }
`;
