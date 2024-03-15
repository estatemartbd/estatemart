import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
const editorconfig = {
  buttons: [
    "bold",
    "italic",
    "underline",
    "ul",
    "ol",
    "copyformat",
    "hr",
    "table",
    "link",
    "left",
    "undo",
    "redo",
    "source",
    "fullsize",
    // "fontweight"
  ],
};
const RichTextEditor = ({ setValue, content }) => {
	const editor = useRef(null);
  // const [content, setContent] = useState('');
	return (
		<JoditEditor
			ref={editor}
			onChange={newContent => setValue(newContent)}
      config={editorconfig}
      value={content}
		/>
	);
};

export default RichTextEditor;