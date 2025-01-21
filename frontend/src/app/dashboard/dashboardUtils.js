import axios from 'axios';
import { Camera, Car, PenTool } from 'lucide-react';


const iconMap = {
    'camera': Camera,
    'car': Car,
    'pentool': PenTool,
  };

  export const fetchMenuItems = async () => {
    const response = await axios.get('http://localhost:3004/geral'); // Obtém os dados do backend
    const data = response.data;

    console.log(data);
    // Mapeia as categorias para substituir a string do ícone pelo componente correspondente
    const updatedData = data.map((item) => {
        // Substitui o ícone string pelo componente do Lucide React
        const IconComponent = iconMap[item.icon] || null; // Se não encontrar, fica null
        return {
          ...item,
          icon: IconComponent, // Substitui o valor do ícone pela variável componente
        };
      });
      
    console.log(updatedData);
    return updatedData;
  };

  export const fetchItemList = async (item) => {

    const response = await axios.get(`http://localhost:3004/${item}`); // Obtém os dados do backend
    return response.data;
  }

  export const addItems = async (item, selectedItem) => {
    const response = await axios.post(`http://localhost:3004/${selectedItem}`, item);
    return response.data;
  }