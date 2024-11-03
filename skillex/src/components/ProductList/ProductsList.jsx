import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import ProductItem from "../ProducItem/ProductItem"
import Loader from "../UI/Loader/Loader"
import Sort from "../Sort/Sort"
import Filters from "../Filters/Filters"

import "./ProductList.scss"

const RESOURCE__URL = "https://672110b898bbb4d93ca7503b.mockapi.io/goods/Goods"

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsloading] = useState(false)

  const filtered = useSelector((state) => state.filters.filteredProducts)
  const sorted = useSelector((state) => state.filters.sortedProducts)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsloading(true)
      try {
        const response = await fetch(RESOURCE__URL)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error while fetching:", error)
      } finally {
        setIsloading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className='products container'>
      <h2 className='products__title'>Our Products</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <div className='products__container'>
          <div className='products__filters'>
            <Filters products={products} />
            <Sort />
          </div>
          <ProductItem
            filtered={filtered}
            sorted={sorted}
          />{" "}
        </div>
      )}
    </section>
  )
}
export default ProductsList
