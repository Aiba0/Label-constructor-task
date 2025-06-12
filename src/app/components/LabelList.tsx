'use client';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store';
import {Label, setFilterColor} from '@/store/features/labelSlice';

import LabelItem from './LabelItem';

interface LabelListProps {
  onEdit: (label: Label) => void;
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

const LabelList: React.FC<LabelListProps> = ({ onEdit }) => {

   const labels = useSelector((state: RootState) => state.labels.labels);
   const filterColor = useSelector((state: RootState) => state.labels.filterColor);
   const dispatch: AppDispatch = useDispatch();

   const filteredLabels = filterColor
        ? labels.filter(
            // (label) => label.backgroundColor === filterColor || label.textColor === filterColor
            (label) => label.backgroundColor === filterColor
        )
        : labels;


   if (!labels.length) {
     return (
       <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <p className="text-gray-600">Список маркировок пусто...</p>
       </div>
     );
   }

  return (
      <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Список маркировок</h2>

          <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 text-gray-700">Фильтр по цвету:</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                  {COLORS.map((color) => (
                      <button
                          key={color}
                          type="button"
                          className={`w-8 h-8 rounded-full border-2 ${
                              filterColor === color ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
                          } focus:outline-none transition-all duration-200`}
                          style={{backgroundColor: color}}
                          onClick={() => dispatch(setFilterColor(color))}
                          title={color}
                      />
                  ))}
              </div>

              {filterColor && (
                   <button
                      onClick={() => dispatch(setFilterColor(null))}
                      className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 focus:outline-none"
                   >
                      Сбросить фильтр ({filterColor})
                  </button>
              )}
          </div>

          <div className="space-y-3">
              {filteredLabels.map((label) => (
                  <LabelItem key={label.id} label={label} onEdit={onEdit}/>
              ))}
          </div>
      </div>
  );
};

export default LabelList;