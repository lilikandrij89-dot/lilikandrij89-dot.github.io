import React, { useState } from 'react';

const Edit = ({ oldCityName, onEditCity }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newCityName, setNewCityName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCityName.trim()) {
      onEditCity(oldCityName, newCityName);
      setNewCityName('');
      setIsEdit(false);
    }
  };

  return (
    <div className="edit-wrapper">
      <button className="btn-toggle-edit" onClick={() => setIsEdit(!isEdit)}>
        {isEdit ? 'Скасувати' : 'Редагувати'}
      </button>

      {isEdit && (
        <form className="edit-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="edit-input"
            value={newCityName} 
            onChange={(e) => setNewCityName(e.target.value)} 
            placeholder="Нова назва міста..."
          />
          <button type="submit" className="btn-update">Обновити</button>
        </form>
      )}
    </div>
  );
};

export default Edit;