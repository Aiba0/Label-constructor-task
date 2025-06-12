import React from 'react';
import {Label} from '@/store/features/labelSlice';

interface PreviewProps {
  label: Omit<Label, 'id'>;
}

const Preview: React.FC<PreviewProps> = ({ label }) => {

  const { text, textColor, backgroundColor, fontSize, isBold, isItalic } = label;

  const style: React.CSSProperties = {
    backgroundColor: backgroundColor || '#ffffff',
    color: textColor || '#000000',
    fontSize: fontSize ? `${fontSize}px` : '14px',
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    padding: '10px 14px',
    borderRadius: '4px',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    border: '1px solid #ccc',
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg mb-10">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Превью маркировки:</h3>
      <div style={style}>
        {text || 'Введите текст'}
      </div>
    </div>
  );
};

export default Preview;