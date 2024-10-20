import React, { useState, useEffect } from 'react';
import { Pill, Send, AlertCircle, Search } from 'lucide-react';
import { useApi } from '../../hooks/useApi';

interface Medication {
  id: string;
  name: string;
  dosage: string;
}

interface DrugInteraction {
  severity: 'low' | 'moderate' | 'high';
  description: string;
}

const EPrescribing: React.FC = () => {
  const [patientName, setPatientName] = useState('');
  const [selectedMedications, setSelectedMedications] = useState<Medication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Medication[]>([]);
  const [interactions, setInteractions] = useState<DrugInteraction[]>([]);
  const [isNarcotic, setIsNarcotic] = useState(false);
  const [prescriptionSent, setPrescriptionSent] = useState(false);

  const { execute: searchMedications } = useApi<Medication[]>();
  const { execute: checkInteractions } = useApi<DrugInteraction[]>();
  const { execute: checkNarcotic } = useApi<boolean>();
  const { execute: sendPrescription } = useApi<void>();

  useEffect(() => {
    if (searchTerm.length > 2) {
      searchMedications(`/api/medications/search?term=${searchTerm}`)
        .then(setSearchResults)
        .catch(console.error);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (selectedMedications.length > 1) {
      const medicationIds = selectedMedications.map(med => med.id);
      checkInteractions('/api/medications/interactions', { method: 'POST', body: JSON.stringify({ medications: medicationIds }) })
        .then(setInteractions)
        .catch(console.error);
    } else {
      setInteractions([]);
    }
  }, [selectedMedications]);

  const handleAddMedication = (medication: Medication) => {
    setSelectedMedications([...selectedMedications, medication]);
    setSearchTerm('');
    checkNarcotic(`/api/medications/narcotic/${medication.id}`)
      .then(setIsNarcotic)
      .catch(console.error);
  };

  const handleRemoveMedication = (medicationId: string) => {
    setSelectedMedications(selectedMedications.filter(med => med.id !== medicationId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPrescription('/api/prescriptions', {
        method: 'POST',
        body: JSON.stringify({
          patientName,
          medications: selectedMedications,
          isNarcotic
        })
      });
      setPrescriptionSent(true);
      // Reset form
      setPatientName('');
      setSelectedMedications([]);
      setIsNarcotic(false);
    } catch (error) {
      console.error('Error sending prescription:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">E-Prescribing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="medicationSearch" className="block text-sm font-medium text-gray-700">Search Medications</label>
          <div className="relative">
            <input
              type="text"
              id="medicationSearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10"
            />
            <Search className="absolute right-3 top-3 text-gray-400" />
          </div>
          {searchResults.length > 0 && (
            <ul className="mt-2 border border-gray-300 rounded-md shadow-sm max-h-40 overflow-y-auto">
              {searchResults.map((medication) => (
                <li
                  key={medication.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAddMedication(medication)}
                >
                  {medication.name} - {medication.dosage}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Selected Medications</h3>
          <ul className="space-y-2">
            {selectedMedications.map((medication) => (
              <li key={medication.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>{medication.name} - {medication.dosage}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMedication(medication.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        {interactions.length > 0 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <p className="font-bold">Potential Drug Interactions:</p>
            <ul>
              {interactions.map((interaction, index) => (
                <li key={index}>
                  <span className="font-semibold">{interaction.severity} severity:</span> {interaction.description}
                </li>
              ))}
            </ul>
          </div>
        )}
        {isNarcotic && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Warning: Narcotic Medication</p>
            <p>This prescription includes a controlled substance. Please ensure all necessary protocols are followed.</p>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
        >
          <Send className="w-5 h-5 mr-2" />
          Send Prescription
        </button>
      </form>
      {prescriptionSent && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Prescription sent successfully!
        </div>
      )}
    </div>
  );
};

export default EPrescribing;