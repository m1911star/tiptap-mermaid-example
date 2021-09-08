import {Block, Block as CustomBlock} from './renderer';
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {ReactNodeViewRenderer} from "@tiptap/react";
import lowlight from "lowlight";
import { MODE } from "./renderer";

export const CustomBlockExtension = CodeBlockLowlight
  .extend({
    addNodeView() {
      return ReactNodeViewRenderer(Block)
    },
    addAttributes() {
      return {
        mode: {
          default: MODE.EDIT,
        },
        language: {
          default: null
        },
        id: {
          default: 'content',
        }
      }
    },
  })
  .configure({ lowlight });
