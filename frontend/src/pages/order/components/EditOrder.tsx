import { lighten } from "polished";
import { styled } from "styled-components";
import { Order } from "../types";
import { useLoaderData } from "react-router-dom";
import { api } from "../../../api";
import { RiDeleteBin5Line } from "react-icons/ri";
import React, { useEffect, useState } from "react";

export async function loader({ params }) {
  const res = await api.get(`/order/${params.id}`);
  return res.data;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      color: green;
      font-size: 1.5rem;
    }

    .buttons {
      display: flex;
      gap: 1rem;

      button {
        height: 2rem;
        padding: 5px 20px;
        border: none;
        color: white;
        font-weight: 600;
        border-radius: 3px;
        cursor: pointer;

        &:first-of-type {
          background-color: ${({ theme }) => theme.colors.buttons.edit};

          &:hover {
            background-color: ${({ theme }) =>
              lighten(0.1, theme.colors.buttons.edit)};
          }
        }

        &:last-of-type {
          background-color: ${({ theme }) => theme.colors.buttons.add};

          &:hover {
            background-color: ${({ theme }) =>
              lighten(0.1, theme.colors.buttons.add)};
          }
        }
      }
    }
  }

  .table {
    &-container {
      max-height: 50vh;
      overflow-y: auto;
    }

    display: grid;
    grid-template-columns: 1fr repeat(3, 0.5fr) 64px;

    div {
      padding: 5px;
      border: 1px solid #00000014;
      text-align: center;
      display: grid;
      place-items: center;
    }

    button {
      all: unset;
      background: red;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      outline: 2px solid transparent;
      transition: outline 500ms;

      svg {
        fill: white;
      }

      &:hover {
        outline: 2px solid #ff8282;
      }
    }

    .odd {
      background-color: ${({ theme }) => lighten(0.2, theme.colors.primary)};
    }

    .even {
      background-color: ${({ theme }) => lighten(0.25, theme.colors.primary)};
    }

    .blank {
      background: white;
      position: sticky;
      top: 0;
    }

    .heading {
      position: sticky;
      top: 0;
      color: white;
      font-weight: bold;
      padding: 10px 0;

      &:nth-of-type(odd) {
        background-color: ${({ theme }) => theme.colors.tertiary};
      }

      &:nth-of-type(even) {
        background-color: ${({ theme }) => lighten(0.1, theme.colors.tertiary)};
      }
    }
  }

  .prices {
    margin: 0;
    padding-right: 2rem;

    p {
      text-align: end;
    }

    span {
      &:last-of-type {
        margin-left: 1rem;
        font-weight: 700;
      }
    }
  }
`;

export default function EditOrder() {
  const order = useLoaderData() as Order;
  const onValidate = () => {};

  const [rows, setRows] = useState<
    {
      medicineName: string;
      quantity: number;
      priceWithTax: number;
      priceWithoutTax: number;
    }[]
  >([]);

  useEffect(() => {
    setRows(
      order.orderMedicines.map((medicine) => ({
        medicineName: medicine.name,
        priceWithoutTax: medicine.priceWithoutTax,
        priceWithTax: medicine.priceWithTax,
        quantity: medicine.quantity,
      }))
    );
  }, [order]);

  return (
    <StyledContainer>
      <header>
        <h1>🍃 {order.providerName}</h1>
        <div className="buttons">
          <button>Ajouter</button>
          <button onClick={onValidate}>Valider</button>
        </div>
      </header>
      <div className="table-container">
        <div className="table">
          <div className="heading">Nom</div>
          <div className="heading">Quantité</div>
          <div className="heading">Prix HT</div>
          <div className="heading">Prix TTC</div>
          <div className="blank"></div>
          {rows.map((row, i) => (
            <React.Fragment key={i}>
              <div className={i % 2 ? "odd" : "even"}>
                <span>{row.medicineName}</span>
              </div>
              <div className={i % 2 ? "odd" : "even"}>
                <input
                  type="number"
                  min={1}
                  value={row.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.currentTarget.value);
                    setRows((rows) => {
                      const row = rows[i];
                      row.quantity = value;
                      return [...rows];
                    });
                  }}
                />
              </div>
              <div className={i % 2 ? "odd" : "even"}>
                <span>{row.quantity * row.priceWithTax}</span>
              </div>
              <div className={i % 2 ? "odd" : "even"}>
                <span>{row.quantity * row.priceWithoutTax}</span>
              </div>
              <div className={i % 2 ? "odd" : "even"}>
                <button>
                  <RiDeleteBin5Line />
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="prices">
        <p>
          <span>Prix Total HT</span>{" "}
          <span>
            {(function () {
              let total = 0;
              rows.forEach((row) => {
                total += row.priceWithTax * row.quantity;
              });
              return total;
            })()}
            Ar.
          </span>
        </p>
        <p>
          <span>Prix Total TTC</span>{" "}
          <span>
            {(function () {
              let total = 0;
              rows.forEach((row) => {
                total += row.priceWithoutTax * row.quantity;
              });
              return total;
            })()}
            Ar.
          </span>
        </p>
      </div>
    </StyledContainer>
  );
}
