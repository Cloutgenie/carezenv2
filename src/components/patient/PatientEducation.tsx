import React, { useState, useEffect } from 'react';
import { Book, ChevronRight, Search, Download } from 'lucide-react';

interface EducationMaterial {
  id: number;
  title: string;
  category: string;
  content: string;
  fileUrl?: string;
}

const PatientEducation: React.FC = () => {
  const [materials, setMaterials] = useState<EducationMaterial[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<EducationMaterial | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Simulating API call to fetch education materials
    const fetchMaterials = () => {
      const mockMaterials: EducationMaterial[] = [
        {
          id: 1,
          title: "Understanding Hypertension",
          category: "Cardiovascular Health",
          content: "Hypertension, or high blood pressure, is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease...",
          fileUrl: "/path/to/hypertension.pdf"
        },
        {
          id: 2,
          title: "Diabetes Management",
          category: "Endocrinology",
          content: "Diabetes is a chronic condition that affects how your body turns food into energy. If you have diabetes, your body either doesn't make enough insulin or can't use the insulin it makes as well as it should...",
          fileUrl: "/path/to/diabetes.pdf"
        },
        {
          id: 3,
          title: "Importance of Vaccinations",
          category: "Preventive Care",
          content: "Vaccinations are an important part of preventive healthcare. They work by stimulating your immune system to produce antibodies, exactly like it would if you were exposed to the disease...",
          fileUrl: "/path/to/vaccinations.pdf"
        }
      ];
      setMaterials(mockMaterials);
    };

    fetchMaterials();
  }, []);

  const categories = ['All', ...new Set(materials.map(m => m.category))];

  const filteredMaterials = materials.filter(material =>
    (selectedCategory === 'All' || material.category === selectedCategory) &&
    material.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Patient Education</h2>
      <div className="mb-4 flex space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search education materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border rounded-md"
          />
          <Search className="absolute left-2 top-2.5 text-gray-400" />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 border-r pr-4">
          <h3 className="text-lg font-semibold mb-2">Topics</h3>
          <ul>
            {filteredMaterials.map((material) => (
              <li 
                key={material.id} 
                className="mb-2 cursor-pointer flex items-center justify-between hover:bg-gray-100 p-2 rounded"
                onClick={() => setSelectedMaterial(material)}
              >
                <span>{material.title}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          {selectedMaterial ? (
            <div>
              <h3 className="text-xl font-semibold mb-2">{selectedMaterial.title}</h3>
              <p className="text-sm text-gray-600 mb-4">Category: {selectedMaterial.category}</p>
              <p className="mb-4">{selectedMaterial.content}</p>
              {selectedMaterial.fileUrl && (
                <a
                  href={selectedMaterial.fileUrl}
                  download
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </a>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Book className="w-16 h-16 mb-4" />
              <p>Select a topic to view its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientEducation;