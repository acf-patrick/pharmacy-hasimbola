import { useState } from "react";
import { keyframes, styled } from "styled-components";
import { api } from "../api";
import { Medicine, MedicineDto } from "../models";

const appear = keyframes`
    from {
        opacity: 0;
    } to {
        opacity: 1;
    }
`;

const StyledModal = styled.div`
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    backdrop-filter: blur(1.5px);
    background-color: #ffffff2a;
  }

  form {
    background-color: white;
    width: 100%;
    min-width: 400px;
    max-width: 480px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 0 0 5px grey;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 500px;
    overflow-y: auto;
    padding-bottom: 0;
    animation: 500ms both ${appear};

    .inputs {
      padding: 1rem;

      & > div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;

        label {
          font-weight: bolder;
        }

        input[type="text"],
        input[type="number"] {
          padding: 0.75rem;
        }
      }

      .tax {
        display: flex;
        flex-direction: row;

        input[type="checkbox"] {
          padding: 0.75rem;
        }
      }
    }

    .buttons {
      user-select: none;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      position: sticky;
      bottom: 0;
      background: linear-gradient(to bottom, white, #dcd8d8ac);
      padding: 0.5rem 0 1rem;
      padding-right: 1rem;

      button {
        all: unset;
        padding: 0.5rem 0.75rem;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        width: 60px;
        text-align: center;
        transition: background-color 250ms;

        &:nth-of-type(1) {
          background-color: ${({ theme }) => theme.colors.cancelButton};

          &:hover {
            background-color: ${({ theme }) => theme.colors.cancelButtonLight};
          }
        }

        &:nth-of-type(2) {
          background-color: grey;

          &:hover {
            background-color: #8080808d;
          }
        }

        &:last-of-type {
          background-color: ${({ theme }) => theme.colors.acceptButton};

          &:hover {
            background-color: ${({ theme }) => theme.colors.acceptButtonLight};
          }
        }
      }
    }
  }
`;

const UpdateForm = ({
  selectedRows,
  onClose,
}: {
  selectedRows: Medicine[];
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateMedicine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const medicineToUpdate: MedicineDto = {
      name: data.get("name")!.toString(),
      costPrice: parseFloat(data.get("cost-price")!.toString()),
      sellingPrice: parseFloat(data.get("selling-price")!.toString()),
      dci: data.get("dci")!.toString(),
      isTaxed: data.get("tax") ? true : false,
      location: data.get("location")!.toString(),
      min: parseInt(data.get("min")!.toString()),
      max: parseInt(data.get("max")!.toString()),
      quantity: parseInt(data.get("quantity")!.toString()),
    };

    api
      .patch("/stock/" + selectedRows[currentIndex].id, {
        ...medicineToUpdate,
      })
      .catch((e) => console.log(e))
      .finally(() => onClose());

    if (currentIndex < selectedRows.length - 1)
      setCurrentIndex((currentIndex) => currentIndex + 1);
    else onClose();
  };

  return (
    <StyledModal>
      <div className="background" onClick={onClose}></div>
      <form onSubmit={updateMedicine}>
        <div className="inputs">
          <div>
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={selectedRows[currentIndex].name}
              key={selectedRows[currentIndex].id}
              onChange={() => {}}
            />
          </div>
          <div>
            <label htmlFor="cost-price">Prix d'achat</label>
            <input
              id="cost-price"
              name="cost-price"
              type="number"
              min={0}
              defaultValue={selectedRows[currentIndex].costPrice}
              key={selectedRows[currentIndex].id}
              onChange={() => {}}
              onMouseLeave={(e) => {
                if (parseFloat(e.currentTarget.value) < 0)
                  e.currentTarget.value = "0";
              }}
            />
          </div>
          <div>
            <label htmlFor="selling-price">Prix de vente</label>
            <input
              id="selling-price"
              name="selling-price"
              type="number"
              min={0}
              defaultValue={selectedRows[currentIndex].sellingPrice}
              key={selectedRows[currentIndex].id}
              onChange={() => {}}
              onMouseLeave={(e) => {
                if (parseFloat(e.currentTarget.value) < 0)
                  e.currentTarget.value = "0";
              }}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantité</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min={0}
              defaultValue={selectedRows[currentIndex].quantity}
              key={selectedRows[currentIndex].id}
              onChange={() => {}}
              onMouseLeave={(e) => {
                if (parseFloat(e.currentTarget.value) < 0)
                  e.currentTarget.value = "0";
              }}
            />
          </div>
          <div>
            <label htmlFor="location">Emplacement</label>
            <input
              id="location"
              name="location"
              type="text"
              defaultValue={selectedRows[currentIndex].location}
              key={selectedRows[currentIndex].id}
              onChange={() => {}}
            />
          </div>
          <div>
            <label htmlFor="dci">DCI</label>
            <input
              id="dci"
              name="dci"
              type="text"
              defaultValue={selectedRows[currentIndex].dci}
              key={selectedRows[currentIndex].id}
              onChange={() => {}}
            />
          </div>
          <div className="tax">
            <label htmlFor="tax">Taxé</label>
            <input
              id="tax"
              name="tax"
              type="checkbox"
              defaultChecked={selectedRows[currentIndex].isTaxed}
              key={selectedRows[currentIndex].id}
              onChange={() => {}}
            />
            <span>(Taxé si coché)</span>
          </div>
          <div>
            <label htmlFor="min">Stock Min</label>
            <input
              id="min"
              name="min"
              type="number"
              min={0}
              defaultValue={selectedRows[currentIndex].min}
              key={selectedRows[currentIndex].id}
              onChange={() => {}}
              onMouseLeave={(e) => {
                if (parseFloat(e.currentTarget.value) < 0)
                  e.currentTarget.value = "0";
              }}
            />
          </div>
          <div>
            <label htmlFor="max">Stock Max</label>
            <input
              id="max"
              name="max"
              type="number"
              defaultValue={selectedRows[currentIndex].max}
              key={selectedRows[currentIndex].id}
              onChange={() => {}}
              onMouseLeave={(e) => {
                if (parseFloat(e.currentTarget.value) < 0)
                  e.currentTarget.value = "0";
              }}
            />
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={onClose}>
            Annuler
          </button>
          {currentIndex >= selectedRows.length - 1 ? null : (
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((currentIndex) => currentIndex + 1)
              }
              disabled={currentIndex >= selectedRows.length - 1}
            >
              Suivant
            </button>
          )}
          <button>Modifier</button>
        </div>
      </form>
    </StyledModal>
  );
};

export default UpdateForm;
