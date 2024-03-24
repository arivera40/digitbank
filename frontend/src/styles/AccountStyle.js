import styled from "styled-components";

export const AccountStyle = styled.div`
  .nav {
    flex-direction: column;
    .nav-item {
      margin-top: 15px;

      &:first-child {
        margin-top: 30px;
      }
    }
    .nav-link {
      padding: 0;

      .card {
        .card-body {
          display: flex;
          flex-direction: column;

          .card-title {
            text-align: left;
            margin-bottom: 15px;
          }

          p {
            text-align: right;
            margin: 0;
          }
        }
      }
    }
  }
`;
