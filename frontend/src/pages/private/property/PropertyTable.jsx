import React from 'react'
import { Link } from 'react-router-dom'
import ReactSwitch from 'react-switch'
import DataTable from '../helper/dataTable/DataTable'
import defaultSlide from '../../Image_not_available.png'

export const PropertyTable = ({
  propertyData,
  imageResizeFolderPath,
  imageFolderPath,
  locationData,
  categories,
  handleMarkFeatured,
  handlePropertyStatus,
}) => {
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = defaultSlide
  }
  // console.log(locationData.map(i=>i.title))
  const columns = React.useMemo(() => [
    {
      Header: 'Listing Title',
      disableSortBy: false,
      Cell: (values) => {
        // console.log("values");
        // console.log(values);
        return (
          <div className="feat_property list favorite_page style2">
            <div className="thumb">
              <img
                className="img-whp"
                src={
                  imageResizeFolderPath +
                  '/' +
                  values?.row?.original?.property_image[0]?.name
                }
                alt="fp1.jpg"
                onError={handleImageError}
              />
              <div className="thmb_cntnt">
                <ul className="tag mb0">
                  <li className="list-inline-item dn"></li>
                  <li className="list-inline-item">
                    <a href="#">
                      For{' '}
                      {values.row.original.purpose == 1 ? <>Rent</> : <>Sale</>}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="details">
              <div className="tc_content">
                <h4>{values.row.original.property_name}</h4>
                <p>
                  <span className="flaticon-placeholder"></span>
                  {locationData
                    ?.filter(
                      (element) => element.id == values.row.original.location,
                    )
                    .map((element) => element.title)}
                  , <></>
                  {locationData
                    ?.filter(
                      (element) => element.id == values.row.original.area,
                    )
                    .map((element) => element.title)}
                </p>
                <p>
                  {values.row.original.address
                    ? values.row.original.address
                    : '--'}
                </p>
                <a className="fp_price text-thm" href="#">
                  {values.row.original.total_price}BDT
                  {values.row.original.purpose == 1 ? (
                    <small>/mo</small>
                  ) : (
                    <></>
                  )}
                </a>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      Header: 'Posted By',
      disableSortBy: false,
      Cell: (values) => {
        return (
          <p>
            {values.row.original.owner_ship == 1 && 'Agent'}
            {values.row.original.owner_ship == 2 && 'Owner'}
            {values.row.original.owner_ship == 3 && 'builder'}
          </p>
        )
      },
    },
    {
      Header: 'Category',
      disableSortBy: false,
      Cell: (values) => {
        return (
          <p>
            {categories
              .filter((element) => element.id == values.row.original.category)
              .map((element) => element.title)}
          </p>
        )
      },
    },
    {
      Header: 'Inquiries',
      disableSortBy: false,
      Cell: (values) =>
        values.row.original.total_inquiries_count &&
        values.row.original.total_inquiries_count,
    },
    {
      Header: 'Total Visit',
      disableSortBy: false,
      Cell: (values) =>
        values.row.original.total_device_click_count
          ? values.row.original.total_device_click_count
          : '--',
    },
    {
      Header: 'Featured',
      disableSortBy: false,
      Cell: (values) => {
        return (
          <>
            <ReactSwitch
              onChange={() =>
                handleMarkFeatured(
                  values.row.original.id,
                  values.row.original.is_featured,
                )
              }
              checked={values.row.original.is_featured === 1}
            />
          </>
        )
      },
    },
    {
      Header: 'Publish',
      disableSortBy: false,
      Cell: (values) => {
        return (
          <>
            <ReactSwitch
              onChange={() =>
                handlePropertyStatus(
                  values.row.original.id,
                  values.row.original.is_published,
                  'publish',
                )
              }
              checked={values.row.original.is_published === 1}
            />
          </>
        )
      },
    },
    {
      Header: 'Sold Out',
      disableSortBy: false,
      Cell: (values) => {
        const isSoldOut = values.row.original.is_sold_out === 1

        return (
          <>
            <div>
              {isSoldOut ? (
                <span className="badge badge-danger ml-2">Sold Out</span>
              ) : (
                <ReactSwitch
                  onChange={() =>
                    handlePropertyStatus(
                      values.row.original.id,
                      values.row.original.is_sold_out,
                      'sold_out',
                    )
                  }
                  checked={isSoldOut}
                />
              )}
            </div>
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
            <li
              className="list-inline-item"
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="View"
            >
              <Link
                to={'/property-details/' + values.row.original.id}
                target="_blank"
              >
                <span className="flaticon-view"></span>
              </Link>
            </li>
            <li
              className="list-inline-item"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit"
            >
              <Link to={'/auth/update-property/' + values.row.original.id}>
                <span className="flaticon-edit"></span>
              </Link>
            </li>
            <li
              className="list-inline-item"
              data-toggle="tooltip"
              data-placement="top"
              title="Delete"
            >
              <Link href="#">
                <span className="flaticon-garbage"></span>
              </Link>
            </li>
          </ul>
        )
      },
    },
  ])

  return <DataTable columns={columns} data={propertyData} />
}
