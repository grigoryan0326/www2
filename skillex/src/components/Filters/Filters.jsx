import { useEffect, useState } from "react"
import { FaFilter } from "react-icons/fa6"
import { MdOutlineClose } from "react-icons/md"
import { FaStar } from "react-icons/fa6"
import Switch from "../UI/Switch/Switch"
import CheckBox from "../UI/CheckBox/CheckBox"
import "./Filters.scss"

const Filter = ({ products }) => {
  const [maxPrice, setMaxPrice] = useState(0)
  const [minPrice, setMinPrice] = useState(0)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const productsPrices = products.map((product) => product.price)
    setMaxPrice(Math.max(...productsPrices))
    setMinPrice(Math.min(...productsPrices))

    const productsCategories = products.map((product) => product.category)
    const uniqueCategories = [...new Set(productsCategories)]
    setCategories(uniqueCategories)

    const productsBrands = products.map((product) => product.brand)
    const uniqueBrands = [...new Set(productsBrands)]
    setBrands(uniqueBrands)
  }, [products])

  const [filterOpen, setFilterOpen] = useState(false)
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

            <div className='filters__price'>
              <p className='filters__price__title'>Price, $</p>
              <div className='filters__price__range'>
                <input
                  type='number'
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className='from__input price__input'
                />
                <input
                  type='number'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className='to__input price__input'
                />
              </div>
            </div>
            <div className='filters__raiting'>
              <p className='filters__raiting__title'>
                Raiting from 4.5 <FaStar className='filters__star' />
              </p>
              <Switch className='filters__switch' />
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

          </div>
        </>
      )}
    </section>
  )
}
export default Filter
