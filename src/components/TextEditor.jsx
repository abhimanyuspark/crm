import React from "react";
import ReactQuill, { Quill } from "react-quill";
import quillEmoji from "react-quill-emoji";
import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.bubble.css";
import "react-quill-emoji/dist/quill-emoji.css";

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

Quill.register(
  {
    "formats/emoji": EmojiBlot,
    "modules/emoji-shortname": ShortNameEmoji,
    "modules/emoji-toolbar": ToolbarEmoji,
    "modules/emoji-textarea": TextAreaEmoji,
  },
  true
);

const TextEditor = ({ value, onChange }) => {
  const toolbarOptions = [
    [
      { font: [] },
      { size: ["small", false, "large", "huge"] },
      { header: [1, 2, 3, 4, 5, 6, false] },
    ], // custom dropdown

    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block", "link", "image", "video"],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme

    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }], // outdent/indent

    [{ direction: "rtl" }], // text direction
    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: true,
    },
    "emoji-toolbar": true,
    "emoji-textarea": true,
    "emoji-shortname": true,
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "ordered",
    "bullet",
    "indent",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "emoji",
    "color",
    "background",
    "script",
    "sub",
    "super",
  ];

  return (
    <div className="relative">
      <ReactQuill
        onChange={onChange}
        value={value}
        modules={modules}
        formats={formats}
        theme="snow"
        className="mycontainer"
      />
    </div>
  );
};

export default TextEditor;
