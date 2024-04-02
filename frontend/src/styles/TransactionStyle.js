import styled from "styled-components";

export const TransactionStyle = styled.div`
  .accordion {
    margin-top: 30px;
    .accordion-body {
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

                &.debit {
                  color: #126bc5;
                }

                &.credit {
                  color: #c50404;
                }
              }
            }
          }
        }
      }
    }
  }
`;
