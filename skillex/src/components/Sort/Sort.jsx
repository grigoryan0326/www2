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

  const sortProducts = useCallback(
    (option) => {
      let sortedProducts

      switch (option.toLowerCase()) {
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

  const handleSortChange = useCallback(
    (option) => {
      dispatch(setSortOption(option))
      sortProducts(option)
      setIsOpen(false)
    },
    [dispatch, sortProducts]
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
      <button
        className='sort__btn'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaSort className='sort__icon' /> Sort: {sortOption}
      </button>
      {isOpen && (
        <ul className='sort__options'>
          <li
            onClick={() => handleSortChange("Default")}
            className={sortOption.toLowerCase() === "default" ? "active" : ""}
          >
            Default
          </li>
          <li
            onClick={() => handleSortChange("Price-asc")}
            className={sortOption.toLowerCase() === "price-asc" ? "active" : ""}
          >
            Price: ascending
          </li>
          <li
            onClick={() => handleSortChange("Price-desc")}
            className={
              sortOption.toLowerCase() === "price-desc" ? "active" : ""
            }
          >
            Price: descending
          </li>
          <li
            onClick={() => handleSortChange("Rating")}
            className={sortOption.toLowerCase() === "rating" ? "active" : ""}
          >
            Rating
          </li>
        </ul>
      )}
    </div>
  )
}

export default Sort
