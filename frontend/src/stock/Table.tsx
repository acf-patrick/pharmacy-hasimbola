import styled, { keyframes } from "styled-components";
import { lighten } from "polished";
import { Medicine } from "../models";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { ChangeEvent, useState } from "react";

const appear = keyframes`
    from {
        transform: translateY(-1rem);
        opacity: 0;
    } to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const StyledTable = styled.div`
  overflow-x: auto;
  border-left: solid 1px ${({ theme }) => theme.colors.quaternary};
  border-radius: 5px 5px 0 0;
  padding-bottom: 0.25rem;
  max-height: 80vh;
  animation: 750ms 500ms both ${appear};

  h2 {
    font-size: 4rem;
    font-weight: normal;
    margin-top: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;

    svg {
      font-size: 6rem;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #80808017;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.tertiary};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => lighten(0.2, theme.colors.tertiary)};
  }

  table {
    border-collapse: collapse;
    width: 100%;

    tr {
      &.selected {
        * {
          color: white;
        }
        td {
          background-color: ${({ theme }) => theme.colors.selectedRow};
        }
      }

      &:nth-of-type(odd) {
        background-color: ${({ theme }) => lighten(0.2, theme.colors.primary)};
      }

      &:nth-of-type(even) {
        background-color: ${({ theme }) =>
          lighten(0.6, theme.colors.secondary)};
      }
    }

    td,
    th {
      text-align: center;
      height: 3rem;
    }

    th {
      color: white;
    }

    td {
      min-width: 10rem;
      border-right: solid 1px black;

      input {
        cursor: pointer;
        width: 1.15rem;
        height: 1.15rem;
      }

      &:first-of-type {
        text-align: start;
        display: flex;
        gap: 1rem;
        align-items: center;
        padding-left: 1rem;
      }
    }
  }

  thead {
    position: sticky;
    top: 0;
    user-select: none;

    tr {
      th {
        padding: 5px 10px;
        color: white;

        .inner-th {
          display: flex;
          justify-content: space-around;
          align-items: center;

          p {
            color: white;
          }

          .arrows {
            display: flex;
            flex-direction: column-reverse;

            * {
              color: white;
              font-size: 0.6rem;
              cursor: pointer;
            }
          }
        }

        &:first-of-type {
          border-radius: 5px 0 0 0;
        }

        &:last-of-type {
          border-radius: 0 5px 0 0;
        }

        &:nth-of-type(odd) {
          background-color: ${({ theme }) => theme.colors.tertiary};
        }

        &:nth-of-type(even) {
          background-color: ${({ theme }) =>
            lighten(0.1, theme.colors.tertiary)};
        }
      }
    }
  }
`;

export default function Table({ medicines }: { medicines: Medicine[] }) {
  const [sortBy, setSortBy] = useState<
    | "name"
    | "sellingPrice"
    | "costPrice"
    | "quantity"
    | "location"
    | "dci"
    | "isTaxed"
    | "min"
    | "max"
    | "expirationDate"
  >("name");

  const [ascending, setAscending] = useState(false);

  const headers = [
    "Nom",
    "Prix d'achat",
    "Prix de vente",
    "Quantité",
    "Emplacement",
    "DCI",
    "Taxé",
    "Stock Min",
    "Stock Max",
    "Expiration",
  ];

  const highlightItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const row = e.currentTarget.parentElement!.parentElement!;
    row.classList.toggle("selected");
  };

  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>
                <div className="inner-th">
                  <p>{header}</p>
                  <div
                    className="arrows"
                    onClick={() => setAscending(!ascending)}
                  >
                    {ascending ? <BiSolidDownArrow /> : <BiSolidUpArrow />}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, i) => (
            <tr key={medicine.name + i}>
              <td>
                <input type="checkbox" name="" onChange={highlightItem} />
                <span>{medicine.name}</span>
              </td>
              <td>{medicine.costPrice}</td>
              <td>{medicine.sellingPrice}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.location}</td>
              <td>{medicine.dci}</td>
              <td>{medicine.isTaxed ? "Oui" : "Non"}</td>
              <td>{medicine.min}</td>
              <td>{medicine.max}</td>
              <td>{new Date(medicine.expirationDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTable>
  );
}
