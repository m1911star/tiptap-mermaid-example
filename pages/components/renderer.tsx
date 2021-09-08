import React, {useEffect} from 'react'
import {NodeViewContent, NodeViewWrapper} from '@tiptap/react'
import mermaid from 'mermaid';
console.log(mermaid);
mermaid.initialize({ startOnLoad: false });

export enum MODE {
  PREVIEW,
  EDIT
}

// @ts-ignore
export const Block = (props) => {
  const {node, updateAttributes, extension} = props;
  const {attrs: {language: defaultLanguage, mode}, textContent} = node;
  const previewer = React.useRef(null);
  React.useEffect(() => {
    if (mode === MODE.PREVIEW && previewer.current) {
      // mermaid.render()
      try {
        console.log(textContent);
        previewer.current.innerHTML = mermaid.render('content', textContent, () => {}, previewer.current);
      } catch (e) {
        console.log(e);
      }
    }
  }, [mode]);
  return <NodeViewWrapper className="code-block">
    <button contentEditable={false} onClick={() => {
      updateAttributes({ mode: mode === MODE.EDIT ? MODE.PREVIEW : MODE.EDIT });
    }}>
      切换
    </button>
    <select contentEditable={false} defaultValue={defaultLanguage}
            onChange={event => updateAttributes({language: event.target.value})}>
      <option value="null">
        auto
      </option>
      <option disabled>
        —
      </option>
      {extension.options.lowlight.listLanguages().map((lang, index) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre hidden={mode === MODE.PREVIEW}>
      <NodeViewContent mode={mode} as="code"/>
    </pre>
    <pre className="preview" contentEditable={false} hidden={mode === MODE.EDIT} id="preview" ref={previewer}>

    </pre>
  </NodeViewWrapper>
};
