import React, { useEffect, useState } from 'react'
import propertyService from '../../../services/property.service'
import { toast } from 'react-toastify'
import PropertyCard from '../../../common/propertyCard'
import locationService from '../../../services/location.service'
import categoriesService from '../../../services/categories.service'

function MyFavorites() {
  const [favoriteList, setFavoriteList] = useState([])
  const [catagoriesList, setCatagoriesList] = useState([])
  const [locationList, setLocationList] = useState([])
  const [imagePath, setImgPath] = useState('')

  // get favorites
  const getFavorites = () => {
    let data = { limit: 30, offset: 0 }
    propertyService.getMyFavorites(data).then(
      (res) => {
        if (res?.data?.success) {
          setFavoriteList(res?.data?.data)
          setImgPath(res?.data?.imageFolderPath)
        } else {
          setFavoriteList([])
          toast.info(res?.data?.message)
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message)
      },
    )
  }

  // init
  useEffect(() => {
    getFavorites()
    getLocations()
    getCatagories()
  }, [])

  // get locations
  const getLocations = () => {
    locationService.getLocationList().then((res) => {
      setLocationList(res?.data?.data)
    })
  }
  // get property list
  const getCatagories = () => {
    categoriesService.getCategoriesList().then(
      (res) => {
        if (res?.data?.success) {
          setCatagoriesList(res?.data?.data)
        } else {
          setCatagoriesList([])
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
  }
  // make favorite
  const makeFavoriteProperty = (id) => {
    propertyService.makeFavourite(id).then(
      (res) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message)
          getFavorites()
        } else {
          toast.info(res?.data?.message)
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message)
      },
    )
  }

  return (
    <div className="row">
      {favoriteList?.map((e) => (
        <div className="col-lg-3 col-xl-3 mb10" key={e?.id}>
          <PropertyCard
            id={e?.id}
            total_price={e?.total_price}
            is_featured={e?.is_featured}
            purpose={e?.purpose}
            create_at={e?.create_at}
            property_name={e?.property_name}
            locationList={locationList}
            area={e?.area}
            bedroom={e?.bedroom}
            bathroom={e?.bathroom}
            catagoriesList={catagoriesList}
            category={e?.category}
            imagePath={imagePath}
            property_image={e?.property_image ? e?.property_image : []}
            is_favourite={e?.is_favourite ? e?.is_favourite : 1}
            makeFavoriteProperty={makeFavoriteProperty}
            canUpdateFavorite={true}
          />
        </div>
      ))}
    </div>
  )
}

export default MyFavorites
