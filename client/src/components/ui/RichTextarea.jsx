import React, { useRef } from 'react';
import { Bold, Italic, Underline, Strikethrough, List, Link, AlignLeft, ListOrdered } from 'lucide-react';

const RichTextarea = ({ label, value, onChange, className = '', rows = 4, placeholder }) => {
    const textareaRef = useRef(null);

    const insertFormatting = (type, extra = null) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);
        let newText = value;
        let newCursorPos = end;

        if (type === 'bold') {
            newText = value.substring(0, start) + `**${selectedText || 'bold text'}**` + value.substring(end);
            newCursorPos = start + 2 + (selectedText.length || 9);
        } else if (type === 'italic') {
            newText = value.substring(0, start) + `*${selectedText || 'italic text'}*` + value.substring(end);
            newCursorPos = start + 1 + (selectedText.length || 11);
        } else if (type === 'underline') {
            // Markdown doesn't support underline natively, use HTML
            newText = value.substring(0, start) + `<u>${selectedText || 'underlined text'}</u>` + value.substring(end);
            newCursorPos = start + 3 + (selectedText.length || 15);
        } else if (type === 'strikethrough') {
            newText = value.substring(0, start) + `~~${selectedText || 'strikethrough text'}~~` + value.substring(end);
            newCursorPos = start + 2 + (selectedText.length || 18);
        } else if (type === 'list') {
            const prefix = '\n- ';
            newText = value.substring(0, start) + prefix + (selectedText || 'List item') + value.substring(end);
            newCursorPos = start + prefix.length + (selectedText.length || 9);
        } else if (type === 'ordered-list') {
            const prefix = '\n1. ';
            newText = value.substring(0, start) + prefix + (selectedText || 'List item') + value.substring(end);
            newCursorPos = start + prefix.length + (selectedText.length || 9);
        } else if (type === 'link') {
            const url = prompt("Enter URL:", "https://");
            if (url) {
                newText = value.substring(0, start) + `[${selectedText || 'Link Text'}](${url})` + value.substring(end);
                newCursorPos = start + 1 + (selectedText.length || 9) + 2 + url.length + 1;
            } else {
                return; // Cancelled
            }
        } else if (type === 'color') {
            // Simple color formatting using span
            // In a real editor, this would be a dropdown. For now, prompt or simple standard colors.
            // Let's use red as a default or prompts? User asked for "color".
            // Let's prompt for color name/hex for simplicity or just cycle popular ones?
            // Prompt is safer.
            const color = extra || prompt("Enter color (name or hex):", "red");
            if (color) {
                newText = value.substring(0, start) + `<span style="color:${color}">${selectedText || 'colored text'}</span>` + value.substring(end);
                newCursorPos = end + 20 + color.length + 7; // Approx
            } else {
                return;
            }
        }

        // Create synthetic event
        const event = {
            target: { value: newText }
        };
        onChange(event);

        // Restore focus
        setTimeout(() => {
            textarea.focus();
            // textarea.setSelectionRange(newCursorPos, newCursorPos); // Optional: selection management is tricky
        }, 0);
    };

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                {/* Toolbar */}
                <div className="bg-gray-50 border-b border-gray-200 px-2 py-1 flex flex-wrap gap-1">
                    <button type="button" onClick={() => insertFormatting('bold')} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Bold">
                        <Bold className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => insertFormatting('italic')} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Italic">
                        <Italic className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => insertFormatting('underline')} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Underline">
                        <Underline className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => insertFormatting('strikethrough')} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Strikethrough">
                        <Strikethrough className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
                    <button type="button" onClick={() => insertFormatting('list')} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Bullet List">
                        <List className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => insertFormatting('ordered-list')} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Ordered List">
                        <ListOrdered className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
                    <button type="button" onClick={() => insertFormatting('link')} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Link">
                        <Link className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => insertFormatting('color', 'red')} className="p-1.5 hover:bg-gray-200 rounded text-red-600 font-bold" title="Red Text">
                        A
                    </button>
                    <button type="button" onClick={() => insertFormatting('color', 'blue')} className="p-1.5 hover:bg-gray-200 rounded text-blue-600 font-bold" title="Blue Text">
                        A
                    </button>
                </div>

                <textarea
                    ref={textareaRef}
                    className="w-full px-3 py-2 focus:outline-none block sm:text-sm border-none resize-y min-h-[100px]"
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
            <p className="mt-1 text-xs text-gray-500">
                Supports Markdown & basic HTML styling.
            </p>
        </div>
    );
};

export default RichTextarea;
