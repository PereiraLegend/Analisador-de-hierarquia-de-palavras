import React, { useState } from 'react';
import ButtonSave from './ButtonSave';

interface HierarchyBuilderProps {
  hierarchy: { [key: string]: any };
  setHierarchy: (newHierarchy: { [key: string]: any }) => void;
}

const HierarchyBuilder: React.FC<HierarchyBuilderProps> = ({ hierarchy, setHierarchy }) => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [item, setItem] = useState('');
  const [itemParentCategory, setItemParentCategory] = useState('');
  const [itemSubCategory, setItemSubCategory] = useState('');

  const addCategory = () => {
    if (!category) return;

    const newHierarchy = { ...hierarchy };

    if (!parentCategory) {
      newHierarchy[category] = {};
    } else {

      if (newHierarchy[parentCategory]) {
        newHierarchy[parentCategory][category] = {};
      }
    }

    setHierarchy(newHierarchy);
    setCategory('');
  };

  const addSubCategory = () => {
    if (!subCategory || !parentCategory) return;

    const newHierarchy = { ...hierarchy };

    if (newHierarchy[parentCategory]) {
      newHierarchy[parentCategory][subCategory] = [];
    }

    setHierarchy(newHierarchy);
    setSubCategory('');
  };

  const addItem = () => {
    if (!item || !itemParentCategory || !itemSubCategory) return;

    const newHierarchy = { ...hierarchy };

    if (newHierarchy[itemParentCategory] && newHierarchy[itemParentCategory][itemSubCategory]) {
      if (Array.isArray(newHierarchy[itemParentCategory][itemSubCategory])) {
        newHierarchy[itemParentCategory][itemSubCategory].push(item);
      } else {
        newHierarchy[itemParentCategory][itemSubCategory] = [item];
      }
    }

    setHierarchy(newHierarchy);
    setItem('');
  };

  return (
  <div className="flex flex-col lg:flex-row justify-between p-6 max-w-7xl mx-auto space-y-8 lg:space-y-0 lg:space-x-8">
    <div className="lg:w-2/3 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Adicionar Categoria</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Nome da Categoria Pai"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCategory}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none"
          >
            Adicionar Categoria
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Adicionar Subcategoria</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            placeholder="Nome da Subcategoria"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            placeholder="Informe a Categoria Pai"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addSubCategory}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none"
          >
            Adicionar Subcategoria
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Adicionar Item à Subcategoria</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Nome do Item"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={itemSubCategory}
            onChange={(e) => setItemSubCategory(e.target.value)}
            placeholder="Informe a Subcategoria"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={itemParentCategory}
            onChange={(e) => setItemParentCategory(e.target.value)}
            placeholder="Informe a Categoria Pai"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addItem}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none"
          >
            Adicionar Item
          </button>
        </div>
      </div>
    </div>

    <div className="lg:w-1/2 space-y-4">
      <pre className="bg-gray-300 p-4 rounded-lg text-sm text-gray-700 overflow-auto max-h-[500px] mt-8 font-bold">
        {JSON.stringify(hierarchy, null, 2)}
      </pre>
      <ButtonSave hierarchy={hierarchy}/>
    </div>
  </div>
);

};

export default HierarchyBuilder;