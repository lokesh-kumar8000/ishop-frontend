"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic"; 
import "jodit/es5/jodit.min.css";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false }); 

const TextEditor = ({ changeHandler, value }) => {
  const editor = useRef(null);
 
  return (
    <JoditEditor
      ref={editor}
      value={value}
      tabIndex={3}
      onChange={(newContent) => changeHandler(newContent)} 
    />
  );
}; 

export default TextEditor;
