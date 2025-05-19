import { useEffect, useState } from 'react';
import axios from 'axios';
import { DocumentType } from '@/types/document';

export const useClaims = (page: number, limit: number, searchTerm: string) => {
  const [claims, setClaims] = useState<DocumentType[]>([]);
  const [totalClaims, setTotalClaims] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/claims?page=${page}&limit=${limit}&search=${searchTerm}`);
        
        const data = response.data;

        setClaims(data.data);                                // Set claim array
        setTotalClaims(data.pagination?.total || 0);         // Set total from pagination
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
      setLoading(false);
    };

    fetchClaims();
  }, [page, limit, searchTerm]);

  return { claims, totalClaims, loading };
};
