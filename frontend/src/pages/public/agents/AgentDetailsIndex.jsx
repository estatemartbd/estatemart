import React, { useEffect, useState } from 'react'
import categoriesService from '../../../services/categories.service'
import locationService from '../../../services/location.service'
import { toast } from 'react-toastify'
import userService from '../../../services/user.service'
import ListingPostCard from '../../../common/public/ListingPostCard'

function AgentDetailsIndex() {
  const url = window.location.href
  var agentID = url.substring(url.lastIndexOf('/') + 1)

  const [catagoriesList, setCatagoriesList] = useState([])
  const [locationList, setLocationList] = useState([])
  const [agentProperties, setAgentProperties] = useState()

  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)

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

  // get locations
  const getLocations = () => {
    locationService.getLocationList().then((res) => {
      setLocationList(res?.data?.data)
    })
  }

  const getAgentListing = () => {
    let data = {
      limit: limit,
      offset: offset,
      user_id: agentID,
    }

    userService.agentWiseProperties(data).then(
      (res) => {
        if (res?.data?.success) {
          setAgentProperties((prevAgentProperties) => ({
            ...prevAgentProperties,
            ...res?.data,
          }))
        } else {
          setAgentProperties({})
          toast.error(res?.data?.message, { theme: 'dark' })
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
  }
  useEffect(() => {
    getCatagories()
    getLocations()
  }, [])

  useEffect(() => {
    getAgentListing()
  }, [offset, limit])

  // Pagination event handlers
  const handlePageChange = (newOffset) => {
    setOffset(newOffset)
  }

  return (
    <div className="row">
      {agentProperties?.data?.map((item, index) => {
        return (
          <div className="col-lg-12" key={index}>
            <ListingPostCard
              data={agentProperties}
              item={item}
              location={locationList
                ?.map((l) => l?.id === item?.area && l?.title)
                .filter(Boolean)}
              category={catagoriesList?.map(
                (d) => d?.id === item?.category && d?.title,
              )}
            />
          </div>
        )
      })}

      {/* Pagination controls */}
      {agentProperties?.data?.length > 9 && (
        <div className="text-center">
          <button
            className="btn btn-sm btn-dark"
            onClick={() => handlePageChange(offset - limit)}
            disabled={offset === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-dark mx-2"
            onClick={() => handlePageChange(offset + limit)}
            //   disabled={
            //     offset + limit >= (agentProperties.total || 0) // Update the total property count
            //   }
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default AgentDetailsIndex
