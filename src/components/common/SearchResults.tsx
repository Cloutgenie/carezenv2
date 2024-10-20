import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileText, User, Calendar } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'patient' | 'appointment' | 'document';
  title: string;
  description: string;
}

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');

    if (query) {
      // Simulating an API call
      setTimeout(() => {
        const mockResults: SearchResult[] = [
          { id: '1', type: 'patient', title: 'John Doe', description: 'Patient ID: 12345' },
          { id: '2', type: 'appointment', title: 'Checkup with Dr. Smith', description: 'April 15, 2023 at 10:00 AM' },
          { id: '3', type: 'document', title: 'Lab Results', description: 'Blood test results from March 1, 2023' },
        ];
        setResults(mockResults);
        setLoading(false);
      }, 1000);
    }
  }, [location]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'patient':
        return <User className="w-6 h-6 text-blue-500" />;
      case 'appointment':
        return <Calendar className="w-6 h-6 text-green-500" />;
      case 'document':
        return <FileText className="w-6 h-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((result) => (
            <li key={result.id} className="bg-white shadow rounded-lg p-4">
              <Link to={`/${result.type}/${result.id}`} className="flex items-start">
                <div className="mr-4">{getIcon(result.type)}</div>
                <div>
                  <h3 className="text-lg font-semibold">{result.title}</h3>
                  <p className="text-gray-600">{result.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;