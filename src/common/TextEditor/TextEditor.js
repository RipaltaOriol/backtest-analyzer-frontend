import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";

import "./TextEditor.css";
import editorConfig from "./editorConfig";
import onChange from "./onChange";
import EmoticonPlugin from "./plugins/EmoticonPlugin";
import MyCustomAutoFocusPlugin from "./plugins/MyCustomAutoFocusPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";

function Placeholder() {
    return <div className="editor-placeholder">Enter your notes here...</div>;
}

const TextEditor = () => {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-container">
                <PlainTextPlugin
                    contentEditable={
                        <ContentEditable className="editor-input" />
                    }
                    placeholder={<Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin onChange={onChange} />
                <HistoryPlugin />
                <TreeViewPlugin />
                <EmoticonPlugin />
                <MyCustomAutoFocusPlugin />
            </div>
        </LexicalComposer>
    );
};

export default TextEditor;
