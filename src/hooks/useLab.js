// import { useEffect, useState } from 'react'
// import LabsService from '../services/labsService'

// const useLab = () => {
//   const [lab, setLab] = useState(null)
//   const [labStats, setLabStats] = useState(null)
//   const [labRow, setLabRow] = useState({})
//   const [labNote, setLabNote] = useState('')
//   const [labFilters, setLabFilters] = useState([])
//   const [labData, setLabData] = useState([])
//   const [labColumns, setLabColumns] = useState([])

//   const applyFilter = async (filter, action, value, method) => {
//     const filterObject = {
//       filter,
//       action,
//       value
//     }
//     const { stats, filters, columns, rows } = await LabsService.applyFilter(lab.id, filterObject, method)
//     setLabStats(stats)
//     setLabFilters(filters)
//     setLabData(rows)
//     setLabColumns(columns)
//   }

//   useEffect(async () => {
//     if (lab) {
//       const { stats, note, filters, columns, rows } = await LabsService.getOneLab(lab.id)
//       setLabStats(stats)
//       setLabNote(note)
//       setLabFilters(filters)
//       setLabData(rows)
//       setLabColumns(columns)
//     }
//   }, [lab])

//   return {
//     lab,
//     labStats,
//     labRow,
//     labNote,
//     labFilters,
//     labData,
//     labColumns,
//     setLab,
//     setLabRow,
//     setLabNote,
//     applyFilter
//   }
// }

// export default useLab