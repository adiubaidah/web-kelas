import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import PlaceHolder from "@tiptap/extension-placeholder";
import { Toolbar } from "./toolbar";

export default function Tiptap({
  defaultValue,
  placeHolder,
  onChange,
}: {
  defaultValue?: string;
  placeHolder?: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-2xl font-bold",
          levels: [2],
        },
      }),
      PlaceHolder.configure({
        placeholder: placeHolder,
      }),
    ],
    content: defaultValue || null,
    editorProps: {
      attributes: {
        class:
          "bg-indigo-950 w-full px-9 py-4 rounded-lg border border-blue-800 focus:outline-0 h-[250px] overflow-y-auto",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="min-h-[250px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
