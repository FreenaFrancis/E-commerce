// import { useState,useEffect,useContext,createContext } from "react";
// // import axios from 'axios'
// const SearchContext=createContext()


// const SearchProvider=({children})=>{
//     const [auth,setAuth]=useState({
        
//       keyword:"",
//       results:[]
//     }) 

//     // default axios
// // axios.defaults.headers.common['Authorization']=auth?.token


  
//     return(
//       <SearchContext.Provider value={[auth,setAuth]}>
//         {children}
//       </SearchContext.Provider> 
//     )
// }

// // custom hook

// const useSearch=()=>useContext(SearchContext)
// export {useSearch,SearchProvider}


import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };