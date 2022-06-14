import { useState, useEffect } from 'react'
// import LabsService from '../services/labsService'

// const useLabFeatures = (lab) => {

//   const [activeFilter, setActiveFilter] = useState(false)
//   const [activeScreenshot, setActiveScreenshot] = useState(false)
//   const [activeNote, setActiveNote] = useState(false)

//   const [filters, setFilters] = useState([])
  
//   useEffect(async () => {
//     if (lab) {
//       const filterList = await LabsService.getFilters(lab.id)
//       setFilters(filterList)
//     }
//   }, [lab])

//   return {
//     activeFilter,
//     activeScreenshot,
//     activeNote,
//     filters,
//     setActiveFilter,
//     setActiveScreenshot,
//     setActiveNote
//   }
// }

// export default useLabFeatures
