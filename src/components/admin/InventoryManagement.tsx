import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, PlusCircle, Edit, Trash } from 'lucide-react';
import { useApi } from '../../hooks/useApi';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
  expirationDate: string;
}

const InventoryManagement: React.FC = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id'>>({
    name: '',
    quantity: 0,
    unit: '',
    reorderPoint: 0,
    expirationDate: '',
  });
  const { execute: fetchInventory } = useApi<InventoryItem[]>();
  const { execute: addInventoryItem } = useApi<InventoryItem>();
  const { execute: updateInventoryItem } = useApi<InventoryItem>();
  const { execute: deleteInventoryItem } = useApi<void>();

  useEffect(() => {
    fetchInventory('/api/inventory')
      .then(setInventoryItems)
      .catch(console.error);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInventoryItem('/api/inventory', {
      method: 'POST',
      body: JSON.stringify(newItem),
    })
      .then(item => {
        setInventoryItems(prev => [...prev, item]);
        setNewItem({ name: '', quantity: 0, unit: '', reorderPoint: 0, expirationDate: '' });
      })
      .catch(console.error);
  };

  const handleUpdate = (id: number, updates: Partial<InventoryItem>) => {
    updateInventoryItem(`/api/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
      .then(updatedItem => {
        setInventoryItems(prev => prev.map(item => item.id === id ? updatedItem : item));
      })
      .catch(console.error);
  };

  const handleDelete = (id: number) => {
    deleteInventoryItem(`/api/inventory/${id}`, { method: 'DELETE' })
      .then(() => {
        setInventoryItems(prev => prev.filter(item => item.id !== id));
      })
      .catch(console.error);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Inventory Management</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit"
            value={newItem.unit}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="reorderPoint"
            placeholder="Reorder Point"
            value={newItem.reorderPoint}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="expirationDate"
            placeholder="Expiration Date"
            value={newItem.expirationDate}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <PlusCircle className="inline-block mr-2" />
          Add Item
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Point</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiration Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.reorderPoint}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.expirationDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleUpdate(item.id, { quantity: item.quantity + 1 })} className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <PlusCircle className="inline-block" />
                  </button>
                  <button onClick={() => handleUpdate(item.id, { quantity: Math.max(0, item.quantity - 1) })} className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <Edit className="inline-block" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                    <Trash className="inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Low Stock Alerts</h3>
        {inventoryItems.filter(item => item.quantity <= item.reorderPoint).map(item => (
          <div key={item.id} className="flex items-center text-yellow-600 mb-2">
            <AlertTriangle className="mr-2" />
            <span>{item.name} is low on stock (Current: {item.quantity} {item.unit})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryManagement;