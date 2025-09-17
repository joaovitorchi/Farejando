import { useState } from "react";

export function useOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (term) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/offers?term=${encodeURIComponent(term)}`
      );
      const data = await res.json();
      setOffers(data.offers || []);
    } catch (err) {
      setError("Erro ao buscar ofertas");
    }
    setLoading(false);
  };

  return { offers, loading, error, search };
}
