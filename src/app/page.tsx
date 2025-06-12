'use client';

import React, { useState } from 'react';
import LabelForm from './components/LabelForm';
import LabelList from './components/LabelList';
import { Label } from '@/store/features/labelSlice';

export default function Home() {
  const [editingLabel, setEditingLabel] = useState<Label | null>(null);

  const handleEditLabel = (label: Label) => {
    setEditingLabel(label);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleFormSubmit = () => {
    setEditingLabel(null);
  };

  return (
    <main className="flex flex-col items-center p-12">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-10">Конструктор маркировки</h1>

        <div className="flex gap-4">
          <LabelForm editingLabel={editingLabel} onFormSubmit={handleFormSubmit} />
          <LabelList onEdit={handleEditLabel} />
        </div>
    </main>
  );
}