import React, { useState } from 'react';
import { Save, Plus, Search } from 'lucide-react';

interface Note {
  id: number;
  date: string;
  content: string;
  tags: string[];
}

const PatientNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, date: '2023-04-01', content: 'Patient reported improved sleep patterns.', tags: ['sleep', 'improvement'] },
    { id: 2, date: '2023-03-15', content: 'Prescribed new medication for hypertension.', tags: ['medication', 'hypertension'] },
  ]);

  const [newNote, setNewNote] = useState('');
  const [newTags, setNewTags] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      const currentDate = new Date().toISOString().split('T')[0];
      const tags = newTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      setNotes([
        { id: notes.length + 1, date: currentDate, content: newNote.trim(), tags },
        ...notes
      ]);
      setNewNote('');
      setNewTags('');
    }
  };

  const filteredNotes = notes.filter(note => 
    (note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (filterTag === '' || note.tags.includes(filterTag))
  );

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Patient Notes</h2>
      <div className="mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          className="w-full p-2 border rounded-md"
          rows={3}
        />
        <input
          type="text"
          value={newTags}
          onChange={(e) => setNewTags(e.target.value)}
          placeholder="Add tags (comma-separated)"
          className="w-full mt-2 p-2 border rounded-md"
        />
        <button
          onClick={handleAddNote}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </button>
      </div>
      <div className="mb-4 flex space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes..."
            className="w-full p-2 pl-8 border rounded-md"
          />
          <Search className="w-5 h-5 absolute left-2 top-2.5 text-gray-400" />
        </div>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{note.date}</span>
              <button className="text-blue-500 hover:text-blue-700">
                <Save className="w-4 h-4" />
              </button>
            </div>
            <p>{note.content}</p>
            <div className="mt-2">
              {note.tags.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientNotes;