import { Editor as TinyMCE } from "@tinymce/tinymce-react"
import React, { useRef } from 'react'
export default function Editor (props) {

  const editorRef = useRef(null)

  return (<TinyMCE
    tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
    onInit={(evt, editor) => editorRef.current = editor}
    init={{
      height: 500,
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    }}
    {...props}
  />)
}