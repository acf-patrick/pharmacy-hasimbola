import { styled } from "styled-components";
import { darken, lighten } from "polished";
import { createPortal } from "react-dom";

export type Content = {
  content: string;
  color: string;
};

const StyledButton = styled.button<{ $color: string }>`
  border: none;
  padding: 0.75rem 0;
  width: 100px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: color 250ms, background-color 250ms;

  background-color: ${({ $color }) => $color};
  outline: solid 3px ${({ $color }) => darken(0.25, $color)};
  color: white;

  &:hover {
    background-color: ${({ $color }) => lighten(0.1, $color)};
    outline: solid 3px ${({ $color }) => $color};
    color: white;
  }
`;

const StyledModal = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  backdrop-filter: blur(2px);

  .modal {
    background-color: ${({ theme }) => theme.colors.modalBackground};
    height: ${({ theme }) => theme.size.modalHeight};
    width: ${({ theme }) => theme.size.modalWidth};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 0 5px #808080b8;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;

      h1 {
        text-align: center;
        font-size: 1.25rem;
        padding-bottom: 1rem;
        border-bottom: solid 2px black;
      }

      p {
        text-align: justify;
        font-size: 1rem;
        margin: 0;
        padding: 0 2rem;
      }
    }

    .buttons {
      width: 100%;
      padding-right: 3rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
`;

const ConfirmationDialog = ({
  header,
  info,
  leftContent,
  rightContent,
  close,
  action,
}: {
  header: string;
  info: string;
  leftContent: Content;
  rightContent: Content;
  close: () => void;
  action: () => void;
}) => {
  return createPortal(
    <StyledModal>
      <div className="modal">
        <div className="content">
          <h1>{header}</h1>
          <p>{info}</p>
        </div>
        <div className="buttons">
          <StyledButton $color={leftContent.color} onClick={close}>
            {leftContent.content}
          </StyledButton>
          <StyledButton $color={rightContent.color} onClick={action}>
            {rightContent.content}
          </StyledButton>
        </div>
      </div>
    </StyledModal>,
    document.querySelector("#portal")!
  );
};

export default ConfirmationDialog;
