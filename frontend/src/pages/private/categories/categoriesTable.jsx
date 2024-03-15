import React from 'react'
import DataTable from '../helper/dataTable/DataTable'
// import defaultImg from '../../blank.png';
import Switch from 'react-switch'
import { Link } from 'react-router-dom'
import defaultImg from '../../Image_not_available.png'
import { useState } from 'react'

export const ServiceTable = ({
  categoriesData,
  statusChange,
  categoriesDelete,
  imagePath,
  handleChangeStatus,
}) => {
  const [defaultImgPath, setDefaultImgPath] = useState(defaultImg)
  const addDefaultSrc = (ev) => {
    ev.target.src = defaultImgPath
  }
  const columns = React.useMemo(
    () => [
      {
        Header: 'SL',
        disableSortBy: false,
        Cell: (values) => Number(values.row.id) + 1,
      },

      {
        Header: 'Title',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.title ? values.row.original.title : '--',
      },
      {
        Header: 'Sub Title',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.sub_title ? values.row.original.sub_title : '--',
      },

      // {
      //   Header: 'Status',
      //   disableSortBy: false,
      //   Cell: (values) => {
      //     return (
      //       <>
      //         <Switch
      //           disabled
      //           // onChange={() => handleChangeStatus(values.row.original.id)}
      //           checked={values.row.original.status === 1}
      //         />
      //       </>
      //     )
      //   },
      // },
      // {
      //   Header: 'Action',
      //   accessor: 'actions',
      //   Cell: (values) => {
      //     return (
      //       <ul className="view_edit_delete_list mb0">
      //         <li
      //           className="list-inline-item"
      //           data-toggle="tooltip"
      //           data-placement="top"
      //           title="Edit"
      //         >
      //           <Link to={'/categories/edit/' + values.row.original.id}>
      //             <span className="flaticon-edit"></span>
      //           </Link>
      //         </li>
      //         <li
      //           className="list-inline-item"
      //           data-toggle="tooltip"
      //           data-placement="top"
      //           title="Delete"
      //         >
      //           <a
      //             // href="#"
      //             onClick={() => {
      //               // console.log(values.row.original.id)
      //               categoriesDelete(values.row.original.id)
      //             }}
      //           >
      //             <span className="flaticon-garbage"></span>
      //           </a>
      //         </li>
      //       </ul>
      //     )
      //   },
      // },
    ],
    [statusChange, categoriesDelete, categoriesData, handleChangeStatus],
  )

  return <DataTable columns={columns} data={categoriesData} />
}
