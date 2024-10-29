import { useEffect, useState } from "react"
import ProductItem from "./ProductItem"
import Loader from "./UI/Loader"

const RESOURCE__URL = "https://672110b898bbb4d93ca7503b.mockapi.io/goods/Goods"

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
    <section className='products'>
      <div className='container products__container'>
        <h2 className='products__title'>Our Products</h2>
        {isLoading ? <Loader /> : <ProductItem products={products} />}
      </div>
    </section>
  )
}
export default ProductsList
