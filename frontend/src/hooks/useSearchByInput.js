import { useEffect, useState } from "react";
import useQuery from "./useQuery";


const useSearchByInput = ({ urlSearch, searchOption, payload, parseResultsByField, }) => {
  const { searchResults, error, searchItems, searchData } = useQuery();
  const [results, setResults] = useState([{}]);

  useEffect(() => {
    if (searchResults) {
      console.log(searchResults);
    }
    if (error) {
      console.log(error);
    }
  }, [searchResults, error]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchItems(urlSearch, payload);
    }
  };
  
  switch (searchOption) {

    case "input":
      searchItems(urlSearch, payload);
      break;

    case "enter":
      searchItems(urlSearch, payload);
      break;

    default:
      break;
  };

  const mapResults = () => {
    return (
      <div className="bg-bla">

      </div>
    )
  }

  return {
    handleChange,
    handleKeyDown,
    results,

  }
}
 
export default useSearchByInput;