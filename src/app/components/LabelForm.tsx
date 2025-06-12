'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLabel, updateLabel, Label } from '@/store/features/labelSlice';
import { AppDispatch } from '@/store';
import { v4 as uuidv4 } from 'uuid';

import Preview from './Preview';


interface LabelFormProps {
  editingLabel?: Label | null;
  onFormSubmit: () => void;
}

const COLORS = [
  '#000000',
  '#FFFFFF',
  '#FF0000',
  '#008000',
  '#0000FF',
  '#800080',
  '#C0C0C0',
];

const LabelForm: React.FC<LabelFormProps> = ({ editingLabel, onFormSubmit }) => {
  const dispatch: AppDispatch = useDispatch();
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(14);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);


  const resetLabels = () => {
    setText('');
    setTextColor('#000000');
    setBackgroundColor('#ffffff');
    setFontSize(16);
    setIsBold(false);
    setIsItalic(false);
  }

  useEffect(() => {
    if (editingLabel) {
      const { text, textColor, backgroundColor, fontSize, isBold, isItalic} = editingLabel
      setText(text);
      setTextColor(textColor);
      setBackgroundColor(backgroundColor);
      setFontSize(fontSize);
      setIsBold(isBold);
      setIsItalic(isItalic);
    } else {
      resetLabels()
    }
  }, [editingLabel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLabel: Label = {
      id: editingLabel ? editingLabel.id : uuidv4(),
      text,
      textColor,
      backgroundColor,
      fontSize,
      isBold,
      isItalic,
    };

    if (editingLabel) {
      dispatch(updateLabel(newLabel));
    } else {
      dispatch(addLabel(newLabel));
    }
    resetLabels()
    onFormSubmit();
  };

  return (
      <div className="w-96 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-10 text-gray-700">{editingLabel ? 'Редактировать маркировку' : 'Добавить маркировку'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">Текст: </label>
            <input
                type="text"
                id="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition-all duration-200"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
          </div>



        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Цвет текста:</p>
            <div className="flex gap-2">
              {COLORS.map((color) => (
                  <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 ${textColor === color ? 'border-blue-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                      style={{backgroundColor: color}}
                      onClick={() => setTextColor(color)}
                  />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Цвет фона: </p>
            <div className="flex gap-2">
              {COLORS.map((color) => (
                  <button
                        key={color}
                        type="button"
                        className={`w-8 h-8 rounded-full border-2 ${backgroundColor === color ? 'border-blue-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                        style={{backgroundColor: color}}
                        onClick={() => setBackgroundColor(color)}
                        title={color}
                  />
              ))}
            </div>
          </div>
        </div>

        <div>
            <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">Размер шрифта (px):</label>
          <input
              id="fontSize"
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition-all duration-200"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min="8"
              max="72"
          />
        </div>

        <div className="flex items-center space-x-4">
            <div className="flex items-center">
            <input
                type="checkbox"
                id="isBold"
                className="h-4 w-4 text-blue-600 border-gray-300"
                checked={isBold}
                onChange={(e) => setIsBold(e.target.checked)}
            />
            <label htmlFor="isBold" className="ml-2 block font-bold text-sm text-gray-900">Жирный</label>
          </div>
          <div className="flex items-center">
            <input
                type="checkbox"
                id="isItalic"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={isItalic}
                onChange={(e) => setIsItalic(e.target.checked)}
            />
              <label htmlFor="isItalic" className="ml-2 block text-sm italic text-gray-900">Курсив</label>
          </div>
        </div>

        <Preview
            label={{
              text,
              textColor,
              backgroundColor,
              fontSize,
              isBold,
              isItalic,
            }}
        />

        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 outline-none focus:outline-none">
          {editingLabel ? 'Сохранить изменения' : 'Добавить'}
        </button>
      </form>
    </div>
  );
};

export default LabelForm;