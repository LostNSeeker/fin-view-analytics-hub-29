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
        const response = await axios.get(`/api/claims?page=${page}&limit=${limit}&search=${searchTerm}`);
        setClaims(response.data.claims);         // assuming response { claims: [], total: number }
        setTotalClaims(response.data.total);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
      setLoading(false);
    };

    fetchClaims();
  }, [page, limit, searchTerm]);

  return { claims, totalClaims, loading };
};

