import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaFilter } from "react-icons/fa6"
import { MdOutlineClose } from "react-icons/md"
import { FaStar } from "react-icons/fa6"

import {
  setFilteredProducts,
  setSearchQuery,
  setSelectedCategories,
  setSelectedBrands,
  setSelectedRating,
  setMinPrice,
  setMaxPrice,
} from "../../store/filtersSlice"

import Switch from "../UI/Switch/Switch"
import CheckBox from "../UI/CheckBox/CheckBox"

import "./Filters.scss"

const Filter = ({ products, filtered }) => {
  const dispatch = useDispatch()
  const {
    selectedCategories,
    searchQuery,
    selectedBrands,
    selectedRating,
    minPrice,
    maxPrice,
    filteredProducts,
  } = useSelector((state) => state.filters)

  const [filterOpen, setFilterOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [priceRange, setPriceRange] = useState({})

  useEffect(() => {
    const productsPrices = products.map((product) => product.price)
    const minPrice = Math.min(...productsPrices)
    const maxPrice = Math.max(...productsPrices)

    dispatch(setMaxPrice(maxPrice))
    dispatch(setMinPrice(minPrice))
    setPriceRange({
      defaultMinPrice: minPrice,
      defaultMaxPrice: maxPrice,
      minPrice,
      maxPrice,
    })

    const productsCategories = products.map((product) => product.category)
    const uniqueCategories = [...new Set(productsCategories)]
    setCategories(uniqueCategories)

    const productsBrands = products.map((product) => product.brand)
    const uniqueBrands = [...new Set(productsBrands)]
    setBrands(uniqueBrands)
  }, [products, dispatch])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setSearchQuery(searchTerm))
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, dispatch])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category]
    dispatch(setSelectedCategories(updatedCategories))
  }

  const handleBrandChange = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand]
    dispatch(setSelectedBrands(updatedBrands))
  }

  const handleSelectedChange = useCallback(() => {
    dispatch(setSelectedRating(!selectedRating))
  }, [selectedRating, dispatch])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setMinPrice(priceRange.minPrice))
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [priceRange.minPrice, dispatch])

  const handleMinPriceChange = (e) => {
    if (e.target.value === "") {
      setPriceRange({ ...priceRange, minPrice: "" })
    } else setPriceRange({ ...priceRange, minPrice: Number(e.target.value) })
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setMaxPrice(priceRange.maxPrice))
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [priceRange.maxPrice, dispatch])

  const handleMaxPriceChange = (e) => {
    if (e.target.value === "") {
      setPriceRange({ ...priceRange, maxPrice: "" })
    } else setPriceRange({ ...priceRange, maxPrice: Number(e.target.value) })
  }

  const handleFiltersReset = () => {
    dispatch(setSearchQuery(""))
    dispatch(setSelectedCategories([]))
    dispatch(setSelectedBrands([]))
    dispatch(setSelectedRating(false))
    dispatch(setMinPrice(priceRange?.defaultMinPrice))
    dispatch(setMaxPrice(priceRange?.defaultMaxPrice))

    setSearchTerm("")
    setPriceRange({
      ...priceRange,
      minPrice: priceRange?.defaultMinPrice,
      maxPrice: priceRange?.defaultMaxPrice,
    })
    setFilterOpen(false)
  }

  useEffect(() => {
    const filteredProducts = products
      .filter(
        (product) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)
      )
      .filter(
        (product) =>
          selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      )
      .filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      )
      .filter((product) => (selectedRating ? product.rating >= 4.5 : true))
      .filter(
        (product) =>
          searchQuery === "" ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )

    dispatch(setFilteredProducts(filteredProducts))
  }, [
    selectedCategories,
    searchQuery,
    selectedBrands,
    minPrice,
    maxPrice,
    selectedRating,
    products,
    dispatch,
  ])

  return (
    <section className='filter__container container'>
      <button
        className='filter__btn btn__primary'
        onClick={() => setFilterOpen(!filterOpen)}
      >
        <FaFilter className='filter__icon' />
        Filters
      </button>
      {filterOpen && (
        <>
          <div
            className='filters__wrapper__mask'
            onClick={() => setFilterOpen(!filterOpen)}
          ></div>

          <div className='filters__wrapper'>
            <h2 className='filters__title'>
              Filters
              <MdOutlineClose
                className='filters__close'
                onClick={() => setFilterOpen(!filterOpen)}
              />
            </h2>

            <div className='filters__search'>
              <p className='filters__search__title'>Search by name</p>
              <input
                className='search__input'
                type='text'
                placeholder='Shoes'
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className='filters__price'>
              <p className='filters__price__title'>Price, $</p>
              <div className='filters__price__range'>
                <input
                  type='number'
                  value={priceRange?.minPrice}
                  onChange={handleMinPriceChange}
                  className='from__input price__input'
                  placeholder={priceRange?.minPrice}
                />
                -
                <input
                  type='number'
                  value={priceRange?.maxPrice}
                  onChange={handleMaxPriceChange}
                  className='to__input price__input'
                  placeholder={priceRange?.maxPrice}
                />
              </div>
            </div>

            <div className='filters__raiting'>
              <p className='filters__raiting__title'>
                Raiting from 4.5 <FaStar className='filters__star' />
              </p>
              <Switch
                className='filters__switch'
                onChange={handleSelectedChange}
                checked={selectedRating}
              />
            </div>

            <div className='filters__category'>
              <p className='filters__category__title'>Category</p>
              <ul className='filters__category__list'>
                {categories.map((category, i) => {
                  return (
                    <li
                      className='filters__category__item'
                      key={i}
                    >
                      <CheckBox
                        className='filters__category__checkbox'
                        id={`checkbox${i}`}
                        onChange={() => handleCategoryChange(category)}
                        checked={selectedCategories.includes(category)}
                      />
                      <label
                        htmlFor={`checkbox${i}`}
                        className='filters__category__name'
                      >
                        {category}
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className='filters__brand'>
              <p className='filters__brand__title'>Brands</p>
              <ul className='filters__brand__list'>
                {brands.map((brand, i) => {
                  return (
                    <li
                      className='filters__brand__item'
                      key={i}
                    >
                      <CheckBox
                        className='filters__brand__checkbox'
                        id={`brandChackBox${i}`}
                        onChange={() => handleBrandChange(brand)}
                        checked={selectedBrands.includes(brand)}
                      />
                      <label
                        htmlFor={`brandChackBox${i}`}
                        className='filters__brand__name'
                      >
                        {brand}
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className='filters__reset'>
              <p className='items__count'>
                Found {filteredProducts.length} items
              </p>
              <button
                className='reset__btn'
                onClick={handleFiltersReset}
              >
                Reset
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Filter
