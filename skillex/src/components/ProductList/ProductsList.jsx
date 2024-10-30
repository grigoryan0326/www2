import { useEffect, useState } from "react"
import ProductItem from "../ProducItem/ProductItem"
import Loader from "../UI/Loader/Loader"
import Sort from "../Sort/Sort"
import Filters from "../Filters/Filters"
import "./ProductList.scss"

const RESOURCE__URL = "https://672110b898bbb4d93ca7503b.mockapi.io/goods/Goods"

// {
//   "id": 1,
//   "name": "Wireless Headphones",
//   "category": "Electronics",
//   "brand": "Brand A",
//   "price": 99.99,
//   "rating": 4.5,
//   "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZXenJCadtAskhqhmd2sX7oAoZBkfNhFDtlQ&s"
//   },

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsloading] = useState(false)

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
          <ProductItem products={products} />{" "}
        </div>
      )}
    </section>
  )
}
export default ProductsList
