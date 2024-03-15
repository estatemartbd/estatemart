import React from 'react'
import DataTable from '../helper/dataTable/DataTable'
// import defaultImg from '../../blank.png';
import Switch from 'react-switch'
import { Link } from 'react-router-dom'
import defaultImg from '../../Image_not_available.png'
import { useState } from 'react'

export const BlogTable = ({
  serviceData,
  statusChange,
  serviceDelete,
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
        Header: 'Image',
        disableSortBy: false,
        Cell: (values) => {
          return (
            <div
              className="feat_property  favorite_page style2"
              style={{ width: '200px' }}
            >
              <div className="thumb">
                <img
                  className="img-whp"
                  src={imagePath + '/' + values.row.original.image}
                  alt="fp1.jpg"
                  onError={addDefaultSrc}
                />
              </div>
            </div>
          )
        },
      },
      {
        Header: 'Blog Title',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.title ? values.row.original.title : '--',
      },
      {
        Header: 'Details',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.details ? values.row.original.details : '--',
      },
      {
        Header: 'Status',
        disableSortBy: false,
        Cell: (values) => {
          return (
            <>
              <Switch
                onChange={() => handleChangeStatus(values.row.original.id)}
                checked={values.row.original.status === 1}
              />
            </>
          )
        },
      },
      {
        Header: 'Action',
        accessor: 'actions',
        Cell: (values) => {
          return (
            <ul className="view_edit_delete_list mb0">
              {/* <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title=""
                data-original-title="View"
              >
                <a href="#">
                  <span className="flaticon-view"></span>
                </a>
              </li> */}
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
              >
                <Link to={'/auth/blogs/edit/' + values.row.original.id}>
                  <span className="flaticon-edit"></span>
                </Link>
              </li>
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
              >
                <a
                  // href="#"
                  onClick={() => {
                    // console.log(values.row.original.id)
                    serviceDelete(values.row.original.id)
                  }}
                >
                  <span className="flaticon-garbage"></span>
                </a>
              </li>
            </ul>
          )
        },
      },
    ],
    [statusChange, serviceDelete, serviceData, handleChangeStatus],
  )

  return <DataTable columns={columns} data={serviceData} />
}
