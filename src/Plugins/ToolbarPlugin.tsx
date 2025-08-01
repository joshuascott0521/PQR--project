import { css } from "@emotion/css";
import { LOW_PRIORIRTY, RICH_TEXT_OPTIONS, RichTextAction } from "../constants";
import { Divider } from "../components/Divider";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import { CustomIconButton } from "../components/shared/CustomIconButton";

export default function ToolbarPlugin() {
  const [disabledMap, setDisableMap] = useState<
    Partial<Record<RichTextAction, boolean>>
  >({
    [RichTextAction.Undo]: true,
    [RichTextAction.Redo]: true,
  });

  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor) return;

    return mergeRegister(
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          // Este console.log ahora mostrará el valor actualizado
          // console.log("🪬🪬", disabledMap);
          // console.log("✅", payload);

          setDisableMap((prev) => ({
            ...prev,
            [RichTextAction.Undo]: !payload,
          }));
          return false;
        },
        LOW_PRIORIRTY
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          // console.log("✅✅", payload);

          setDisableMap((prev) => ({
            ...prev,
            [RichTextAction.Redo]: !payload,
          }));
          return false;
        },
        LOW_PRIORIRTY
      )
    );
  }, [editor]);

  const onAction = (id: RichTextAction) => {
    console.log("🆔 id:", id);
    console.log("⛔ isDisabled:", disabledMap[id]);
    switch (id) {
      case RichTextAction.Bold: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        break;
      }
      case RichTextAction.Italics: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        break;
      }
      case RichTextAction.Underline: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        break;
      }
      case RichTextAction.Strikethrough: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        break;
      }
      case RichTextAction.Superscript: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
        break;
      }
      case RichTextAction.Subscript: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
        break;
      }
      case RichTextAction.Highlight: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
        break;
      }
      case RichTextAction.Code: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        break;
      }
      case RichTextAction.LeftAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        break;
      }
      case RichTextAction.RightAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        break;
      }
      case RichTextAction.CenterAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        break;
      }
      case RichTextAction.JustifyAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        break;
      }
      case RichTextAction.Undo: {
        editor.dispatchCommand(UNDO_COMMAND, undefined);
        break;
      }
      case RichTextAction.Redo: {
        editor.dispatchCommand(REDO_COMMAND, undefined);
        break;
      }
    }
  };

  return (
    <div
      className={css({
        display: "flex",
        gap: "16px", // equivalente a gap={4} en Chakra (4 * 4px)
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "1px",
          "& > button": { borderRadius: 0 },
        })}
      >
        {RICH_TEXT_OPTIONS.map(({ id, label, icon, fontSize }, index) =>
          id === RichTextAction.Divider ? (
            <Divider key={`divider-${index}`} />
          ) : (
            <CustomIconButton
              isDisabled={disabledMap[id]}
              icon={icon}
              key={id}
              onClick={() => onAction(id)}
              title={label}
              fontSize={fontSize}
              // className={css({
              //   background: "none",
              //   border: "none",
              //   padding: "6px",
              //   cursor: "pointer",
              //   display: "flex",
              //   alignItems: "center",
              //   justifyContent: "center",
              //   fontSize: fontSize || 16,
              //   color: "#444",
              //   "&:hover": {
              //     backgroundColor: "#eee",
              //   },
              // })}
            ></CustomIconButton>
          )
        )}
      </div>
    </div>
  );
}
