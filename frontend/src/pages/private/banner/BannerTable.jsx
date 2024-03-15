import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactSwitch from 'react-switch'
import DataTable from '../helper/dataTable/DataTable'
import defaultImg from '../../Image_not_available.png'
import * as moment from 'moment'

export const BannerTable = ({
  bannerData,
  statusChange,
  locationDelete,
  handleChangeStatus,
  imagePath,
}) => {
  const [defaultImgPath, setDefaultImgPath] = useState(defaultImg)

  const addDefaultSrc = (ev) => {
    ev.target.src = defaultImgPath
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Image',
        disableSortBy: false,
        Cell: (values) => {
          return (
            <div className="feat_property list favorite_page style2">
              <div className="thumb">
                <img
                  className="img-whp"
                  src={imagePath + '/' + values.row.original.image}
                  alt="fp1.jpg"
                  onError={addDefaultSrc}
                />
                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    <li className="list-inline-item dn"></li>
                    <li className="list-inline-item">
                      For{' '}
                      {values.row.original.banner_type === 1
                        ? 'Left'
                        : values.row.original.banner_type === 2
                        ? 'Right'
                        : values.row.original.banner_type === 3
                        ? 'Middle'
                        : 'Home'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
      },
      {
        Header: 'From Date',
        disableSortBy: false,
        Cell: (values) =>
          moment(values.row.original.from_date).format('MMMM Do, YYYY'),
      },
      {
        Header: 'To Date',
        disableSortBy: false,
        Cell: (values) =>
          moment(values.row.original.to_date).format('MMMM Do, YYYY'),
      },
      {
        Header: 'Position',
        disableSortBy: false,
        Cell: (values) =>
        <p>
          {values.row.original.banner_type == 4 && 'Home'}
          {values.row.original.banner_type == 3 && 'Middle'}
          {values.row.original.banner_type == 2 && 'Right'}
        </p>
      },
      {
        Header: 'Status',
        disableSortBy: false,
        Cell: (values) => {
          return (
            <>
              <ReactSwitch
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
            <>
              <ul className="view_edit_delete_list mb0">
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit"
                >
                  <Link to={'/auth/banner/edit/' + values.row.original.id}>
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
                    onClick={() => {
                      locationDelete(values.row.original.id)
                    }}
                  >
                    <span className="flaticon-garbage"></span>
                  </a>
                </li>
              </ul>
            </>
          )
        },
      },
    ],
    [statusChange, locationDelete, bannerData, handleChangeStatus, imagePath],
  )

  return <DataTable columns={columns} data={bannerData} />
}
