import { useCallback, useEffect, useState } from "react"
import { debounce } from "lodash"
import { getApiResource } from "@utils/network"
import { API_SEARCH } from "@constants/api"
import { getPeopleId, getPeopleImage } from "@services/getPeopleData"
import ErrorMessage from "@components/ErrorMessage/ErrorMessage"
import SearchPageInfo from "@components/SearchPage/SearchPageInfo/SearchPageInfo"
import UiInput from "@components/UI/UiInput/UiInput"
import styles from "./SearchPage.module.scss"

const SearchPage = () => {
  const [inputValue, setInputValue] = useState("")
  const [people, setPeople] = useState([])
  const [error, setError] = useState(false)

  const handleSearch = (value) => {
    setInputValue(value)
    debouncedGetResponse(value)
  }

  useEffect(() => {
    getResponse("")
  }, [])

  const debouncedGetResponse = useCallback(
    debounce((value) => getResponse(value), 300),
    []
  )

  const getResponse = async (param) => {
    const res = await getApiResource(API_SEARCH + param)

    if (res) {
      const peopleList = res.results.map(({ name, url }) => {
        const id = getPeopleId(url)
        const image = getPeopleImage(id)
        return { name, image, id }
      })
      setPeople(peopleList)
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <div className={styles.SearchPage}>
      <h1 className='header__text'>Search Page</h1>
      <UiInput
        value={inputValue}
        handleSearch={handleSearch}
        placeholder='Search by name'
        classes={styles.input__search}
      />
      {error ? <ErrorMessage /> : <SearchPageInfo people={people} />}
    </div>
  )
}

export default SearchPage
