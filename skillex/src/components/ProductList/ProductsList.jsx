import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"

import ProductItem from "../ProducItem/ProductItem"
import Sort from "../Sort/Sort"
import Filters from "../Filters/Filters"

import "./ProductList.scss"

const RESOURCE__URL = "https://672110b898bbb4d93ca7503b.mockapi.io/goods/Goods"

const cssOverride = {
  display: "block",
  margin: "0 auto",
  marginTop: "100px",
}

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsloading] = useState(true)

  const sorted = useSelector((state) => state.filters.sortedProducts)

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(RESOURCE__URL)
      if (!response.ok) throw new Error("Network response was not ok")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error while fetching:", error)
    } finally {
      setIsloading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <section className='products container'>
      <h2 className='products__title'>Our Products</h2>

      {isLoading ? (
        <ClimbingBoxLoader
          size={25}
          color='#fff'
          loading={isLoading}
          cssOverride={cssOverride}
        />
      ) : (
        <div className='products__container'>
          <div className='products__filters'>
            <Filters products={products} />
            <Sort />
          </div>
          <ProductItem sorted={sorted} />{" "}
        </div>
      )}
    </section>
  )
}
export default ProductsList
