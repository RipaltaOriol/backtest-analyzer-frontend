// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import LabsService from '../services/labsService'

// const useLabs = () => {

//   let navigate = useNavigate()
//   const { isAuthorized } = useSelector(state => state.auth)
//   const [labs, setLabs] = useState([])

//   useEffect(async () => {
//     if (!isAuthorized) navigate('/login')
//     const labList = await LabsService.getAllLabs()
//     await setLabs(labList)
//   }, [isAuthorized])

//   return { labs }
// }

// export default useLabs