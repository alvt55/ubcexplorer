'use client'

import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ['.xlsx'];

export default function FileUpload() {
  const [file, setFile] = useState();

  const handleChange = (file) => {
    setFile(file);
  };


  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

