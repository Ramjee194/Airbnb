import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Card from "../component/Card";
import Nav from "../component/Nav";

function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:8000/api/listings/search?query=${query}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.error("Search failed:", err));
    }
  }, [query]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      <div className="pt-28 px-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">
          Search Results for "{query}"
        </h1>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((listing) => (
              <Card key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No listings found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
