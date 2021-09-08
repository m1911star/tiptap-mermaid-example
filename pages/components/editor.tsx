import React from 'react'
import {EditorContent, useEditor} from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

// load all highlight.js languages
import {CustomBlockExtension} from "./extension";

// load specific languages only
// import lowlight from 'lowlight/lib/core'
// import javascript from 'highlight.js/lib/languages/javascript'
// lowlight.registerLanguage('javascript', javascript)

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}>
      code block
    </button>
  )
}

export default () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      CustomBlockExtension
    ],
    content: `
        <p>
          That’s a boring paragraph followed by a fenced code block:
        </p>
        <pre><code class="language-mermaid">
flowchart TD
    A[Start] --> B{Is it?};
    B -- Yes --> C[OK];
    C --> D[Rethink];
    D --> B;
    B -- No ----> E[End];</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
      `,
  })

  return (
    <div>
      <MenuBar editor={editor}/>
      <EditorContent editor={editor}/>
    </div>
  )
}
