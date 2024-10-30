import { FaStar } from "react-icons/fa6"
import "./ProducItem.scss"

const ProductItem = ({ products }) => {
  return (
    <ul className='products__list'>
      {products.length ? (
        products.map((product) => (
          <li
            className='product__item'
            key={product.id}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className='product__img'
            />
            <div className='product__content'>
              <h3 className='product__name'>{product.name}</h3>
              <p className='product__price'>{product.price} $</p>
              <p className='product__rating'>
                <FaStar className='product__star' />
                {product.rating}
              </p>
              <p className='product__btn'>Add to Cart</p>
            </div>
          </li>
        ))
      ) : (
        <p>Nothing to show</p>
      )}
    </ul>
  )
}
export default ProductItem
