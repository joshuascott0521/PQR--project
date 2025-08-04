import { css } from "@emotion/css";
import {
  HEADINGS,
  LOW_PRIORIRTY,
  RICH_TEXT_OPTIONS,
  RichTextAction,
} from "../constants";
import { Divider } from "../components/Divider";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  // $isParagraphNode,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import { CustomIconButton } from "../components/shared/CustomIconButton";
import {
  type HeadingTagType,
  $createHeadingNode,
  // $isHeadingNode,
} from "@lexical/rich-text";
// import { $wrapNodes } from "@lexical/selection";

export default function ToolbarPlugin() {
  const [disabledMap, setDisableMap] = useState<
    Partial<Record<RichTextAction, boolean>>
  >({
    [RichTextAction.Undo]: true,
    [RichTextAction.Redo]: true,
  });
  const [selectionMap, setSelectionMap] = useState<
    Partial<Record<RichTextAction, boolean>>
  >({});
  const [currentHeading, setCurrentHeading] = useState<
    HeadingTagType | "paragraph"
  >("paragraph");

  const [editor] = useLexicalComposerContext();
  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const newSelectionMap = {
        [RichTextAction.Bold]: selection.hasFormat("bold"),
        [RichTextAction.Italics]: selection.hasFormat("italic"),
        [RichTextAction.Underline]: selection.hasFormat("underline"),
        [RichTextAction.Strikethrough]: selection.hasFormat("strikethrough"),
        [RichTextAction.Superscript]: selection.hasFormat("superscript"),
        [RichTextAction.Subscript]: selection.hasFormat("subscript"),
        [RichTextAction.Code]: selection.hasFormat("code"),
        [RichTextAction.Highlight]: selection.hasFormat("highlight"),
      };
      setSelectionMap(newSelectionMap);
    }
  };
  useEffect(() => {
    if (!editor) return;

    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (payload) => {
          updateToolbar();
          console.log(payload);

          return false;
        },
        LOW_PRIORIRTY
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
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
  const getSelectedBtnProps = (isSelected: boolean) =>
    isSelected ? { isActive: true } : {};

  const updateHeading = (headingTag: HeadingTagType | "paragraph") => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const nodes = selection.getNodes();

      for (const node of nodes) {
        const parent = node.getTopLevelElementOrThrow();

        if (!$isElementNode(parent)) continue; // 👈 Evita el error de tipo

        if (headingTag === "paragraph") {
          if (parent.getType() !== "paragraph") {
            const paragraphNode = $createParagraphNode();

            // Solo si es ElementNode usamos .getChildren()
            if ($isElementNode(parent)) {
              paragraphNode.append(...parent.getChildren());
              parent.replace(paragraphNode);
            }
          }
        } else {
          if (parent.getType() !== "heading") {
            const headingNode = $createHeadingNode(headingTag);
            if ($isElementNode(parent)) {
              headingNode.append(...parent.getChildren());
              parent.replace(headingNode);
            }
          } else if (parent.getType() === "heading") {
            const current = parent;
            if ((current as any).getTag() !== headingTag) {
              const newHeadingNode = $createHeadingNode(headingTag);
              if ($isElementNode(current)) {
                newHeadingNode.append(...current.getChildren());
                current.replace(newHeadingNode);
              }
            }
          }
        }
      }
    });
  };
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        const anchorNode = selection.anchor.getNode();
        const parent = anchorNode.getTopLevelElementOrThrow();

        if (parent.getType() === "heading") {
          setCurrentHeading((parent as any).getTag() as HeadingTagType);
        } else {
          setCurrentHeading("paragraph");
        }
      });
    });
  }, [editor]);

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
        <select
          className="mr-2 w-52 px-2 py-1 rounded-md border border-gray-300 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={currentHeading}
          onChange={(e) => {
            updateHeading(e.target.value as HeadingTagType | "paragraph");
          }}
        >
          <option value="paragraph">Texto normal</option>
          <option value="h1">Título grande (H1)</option>
          <option value="h2">Subtítulo (H2)</option>
          <option value="h3">Encabezado medio (H3)</option>
          <option value="h4">Encabezado pequeño (H4)</option>
          <option value="h5">Texto auxiliar (H5)</option>
          <option value="h6">Texto más pequeño (H6)</option>
        </select>

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
              {...getSelectedBtnProps(selectionMap[id] === true)}

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
