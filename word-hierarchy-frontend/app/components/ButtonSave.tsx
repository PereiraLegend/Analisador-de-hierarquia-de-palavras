import React from 'react';

interface ButtonSaveProps {
  hierarchy: { [key: string]: any };
}

const ButtonSave: React.FC<ButtonSaveProps> = ({ hierarchy }) => {
  const handleSave = () => {
    const jsonString = JSON.stringify(hierarchy, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hierarchy.json';
    link.click();
  };

  return <button
  onClick={handleSave}
  className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors focus:outline-none"
>
  Salvar Hierarquia
</button>
};

export default ButtonSave;