import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import createImagePlugin from '@draft-js-plugins/image';
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  AlignTextCenterButton,
  AlignTextLeftButton,
  AlignTextRightButton,
  OrderedListButton,
  UnorderedListButton
} from '@draft-js-plugins/buttons';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';



const toolbarPlugin = createToolbarPlugin();
const imagePlugin = createImagePlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin, imagePlugin];

const RichTextEditor = ({editorState, handleEditorChange}) => {

  

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px' }}>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          plugins={plugins}
        />
        <Toolbar >
          {(externalProps) => (
            <>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <Separator />
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <HeadlineThreeButton {...externalProps} />
              <AlignTextCenterButton {...externalProps}/>
              <AlignTextLeftButton {...externalProps}/>
              <AlignTextRightButton {...externalProps}/>
              <OrderedListButton {...externalProps}/>
              <UnorderedListButton {...externalProps}/>
            </>
          )}
        </Toolbar>
      </div>
    </div>
  );
};

export default RichTextEditor;