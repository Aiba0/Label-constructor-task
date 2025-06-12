'use client';

import React from 'react';
import { Label } from '@/store/features/labelSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import {removeLabel} from '@/store/features/labelSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface LabelItemProps {
  label: Label;
  onEdit: (label: Label) => void;
}

const LabelItem: React.FC<LabelItemProps> = ({ label, onEdit }) => {
  const dispatch: AppDispatch = useDispatch();


  const handleEdit = () => {
    onEdit(label);
  };
  const handleDelete = () => {
    dispatch(removeLabel(label.id));
  };

  const style: React.CSSProperties = {
    backgroundColor: label.backgroundColor,
    color: label.textColor,
    fontSize: `${label.fontSize}px`,
    fontWeight: label.isBold ? 'bold' : 'normal',
    fontStyle: label.isItalic ? 'italic' : 'normal',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    border: '1px solid #ccc',
    overflow: 'hidden',
    padding: '6px 10px',
    borderRadius: '3px',
    textOverflow: 'ellipsis',
  };

  return (
    <div className="flex items-center p-3 bg-gray-50 rounded-md shadow-sm mb-2 justify-between">
      <div style={style} className="flex-grow mr-4">{label.text}</div>


      <div className="flex space-x-2">
        <button
            onClick={handleEdit}
          className="px-3 py-1 text-gray-500 rounded  focus:outline-none cursor-pointer"
        >
          <FaEdit className="w-6 h-6" />
        </button>

        <button
          onClick={handleDelete}
          className="px-3 py-1s rounded text-red-500  focus:outline-none cursor-pointer"
        >
          <FaTrash className="w-4 h-6" />
        </button>
      </div>
    </div>
  );
};

export default LabelItem;