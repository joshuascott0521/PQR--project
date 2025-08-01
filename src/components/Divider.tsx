import { css } from "@emotion/css";

export const Divider = () => (
  <div
    className={css({
      width: "1px",
      backgroundColor: "#aaa",
      margin: "0 6px",
      height: "16px",
    })}
  />
);
