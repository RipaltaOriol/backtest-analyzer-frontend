import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import InfoIcon from "@mui/icons-material/Info";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";

import "./TipTapEditor.css";

const NotesBorder = styled(Box)({
    border: "1px solid #DDE2E4",
    borderRadius: "6px",
});

const TextEditorIconButton = styled(IconButton)({
    color: "#5B6871",
    minWidth: "45px",
    margin: "0 5px",
});

// import "./styles.scss";

export const editorNoteContent = (state, props) => ({});

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <Box
            className="menu-editor"
            display="flex"
            justifyContent="space-between"
        >
            <Box>
                <TextEditorIconButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`menu-editor-icon ${
                        editor.isActive("bold") ? "is-active" : ""
                    }`}
                >
                    <FormatBoldIcon
                        fontSize="small"
                        className="menu-editor-icon"
                    />
                </TextEditorIconButton>
                <TextEditorIconButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    className={`menu-editor-icon ${
                        editor.isActive("italic") ? "is-active" : ""
                    }`}
                >
                    <FormatItalicIcon
                        fontSize="small"
                        className="menu-editor-icon"
                    />
                </TextEditorIconButton>
                <TextEditorIconButton
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    className={`menu-editor-icon ${
                        editor.isActive("underline") ? "is-active" : ""
                    }`}
                >
                    <FormatUnderlinedIcon
                        fontSize="small"
                        className="menu-editor-icon"
                    />
                </TextEditorIconButton>
                <TextEditorIconButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    className={`menu-editor-icon ${
                        editor.isActive("strike") ? "is-active" : ""
                    }`}
                >
                    <StrikethroughSIcon
                        fontSize="small"
                        className="menu-editor-icon"
                    />
                </TextEditorIconButton>
                <TextEditorIconButton
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={`menu-editor-icon ${
                        editor.isActive("bulletList") ? "is-active" : ""
                    }`}
                >
                    <FormatListBulletedIcon
                        fontSize="small"
                        className="menu-editor-icon"
                    />
                </TextEditorIconButton>
                <TextEditorIconButton
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={`menu-editor-icon ${
                        editor.isActive("orderedList") ? "is-active" : ""
                    }`}
                >
                    <FormatListNumberedIcon
                        fontSize="small"
                        className="menu-editor-icon"
                    />
                </TextEditorIconButton>
            </Box>
            <Box>
                <Tooltip title="Markdown is available" placement="top">
                    <span>
                        <IconButton sx={{ mr: 1 }} disabled>
                            <InfoIcon
                                fontSize="small"
                                sx={{ color: "#6D6D6E" }}
                            />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
        </Box>
    );
};

// New approach - set it as before but pass the row ID as dependency for updating the eidtor!
export const useTextEditor = (content = "") => {
    return useEditor({
        extensions: [StarterKit, Underline],
        content: content,
    });
};

const TipTapEditor = ({ editor }) => {
    return (
        <NotesBorder className="text-editor">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </NotesBorder>
    );
};

export default TipTapEditor;
