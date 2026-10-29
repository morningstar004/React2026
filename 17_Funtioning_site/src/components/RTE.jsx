import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";
export default function RTE({ name, control, label, defaultValue = "", rules, error }) {
  return (
    <div className="w-full">
      {label && <label className="mb-1 block pl-1 text-sm font-medium text-slate-700">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Editor
            apiKey={conf.tinyMCEAPIKey}
            value={value ?? defaultValue}
            init={{
              height: 420,
              menubar: false,
              plugins: [
                "link",
                "lists",
                "autolink",
                "wordcount",
              ],
              toolbar: "undo redo | blocks | bold italic | bullist numlist | blockquote | link | removeformat",
              content_css: "default",
              content_style:
                "body { font-family: Inter, Arial, sans-serif; font-size: 15px; line-height: 1.7; padding: 8px 12px; color: #334155; }",
              placeholder: "Start with the main idea, then add details that help your reader…",
            }}
            onEditorChange={(content) => onChange(content)}
            onBlur={onBlur}
            textareaName={name || "content"}
            onInit={(_event, editor) => ref?.(editor.getContentAreaContainer())}
          />
        )}
      />
      {error && <p className="mt-2 text-sm text-rose-700">{error}</p>}
    </div>
  );
}
