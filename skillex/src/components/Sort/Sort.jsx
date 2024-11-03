import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaSort } from "react-icons/fa"

import { setSortOption, setSortedProducts } from "../../store/filtersSlice"

import "./Sort.scss"

const Sort = () => {
  const [isOpen, setIsOpen] = useState(false)

  const filteredProducts = useSelector(
    (state) => state.filters.filteredProducts
  )
  const sortOption = useSelector((state) => state.filters.sortOption)
  const dispatch = useDispatch()

  const handleSortChange = (option) => {
    dispatch(setSortOption(option))
    sortProducts(option)
    setIsOpen(false)
  }

  const sortProducts = useCallback(
    (option) => {
      let sortedProducts

      switch (option) {
        case "price-asc":
          sortedProducts = [...filteredProducts].sort(
            (a, b) => a.price - b.price
          )
          break
        case "price-desc":
          sortedProducts = [...filteredProducts].sort(
            (a, b) => b.price - a.price
          )
          break
        case "rating":
          sortedProducts = [...filteredProducts].sort(
            (a, b) => b.rating - a.rating
          )
          break
        default:
          sortedProducts = filteredProducts
      }

      dispatch(setSortedProducts(sortedProducts))
    },
    [dispatch, filteredProducts]
  )

  useEffect(() => {
    sortProducts(sortOption)
  }, [filteredProducts, sortOption, sortProducts])

  return (
    <div
      className='sort'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className='sort__btn'>
        <FaSort className='sort__icon' /> Sort: {sortOption}
      </button>
      {isOpen && (
        <ul className='sort__options'>
          <li
            onClick={() => handleSortChange("default")}
            className={sortOption.toLowerCase() === "default" ? "active" : ""}
          >
            Default
          </li>
          <li
            onClick={() => handleSortChange("price-asc")}
            className={sortOption === "price-asc" ? "active" : ""}
          >
            Price: ascending
          </li>
          <li
            onClick={() => handleSortChange("price-desc")}
            className={sortOption === "price-desc" ? "active" : ""}
          >
            Price: descending
          </li>
          <li
            onClick={() => handleSortChange("rating")}
            className={sortOption === "rating" ? "active" : ""}
          >
            Rating
          </li>
        </ul>
      )}
    </div>
  )
}

export default Sort
