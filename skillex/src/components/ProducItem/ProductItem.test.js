import { render, screen, within, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"
import ProductItem from "./ProductItem"

afterEach(() => {
  cleanup()
})

test("renders ProductItem with products", () => {
  const sortedProducts = [
    {
      id: 1,
      name: "Product 1",
      imageUrl: "http://example.com/product1.jpg",
      price: 100,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Product 2",
      imageUrl: "http://example.com/product2.jpg",
      price: 200,
      rating: 5.0,
    },
  ]

  render(<ProductItem sorted={sortedProducts} />)

  const productItems = screen.getAllByRole("listitem")

  expect(screen.getByText(/Product 1/i)).toBeInTheDocument()
  expect(screen.getByText(/Product 2/i)).toBeInTheDocument()

  expect(within(productItems[0]).getByText(/100 \$/i)).toBeInTheDocument()
  expect(within(productItems[0]).getByText(/4.5/i)).toBeInTheDocument()

  expect(within(productItems[1]).getByText(/200 \$/i)).toBeInTheDocument()
  expect(within(productItems[1]).getByText(/5/i)).toBeInTheDocument()
})

test("renders empty message when no products", () => {
  render(<ProductItem sorted={[]} />)

  expect(screen.getByText(/Nothing to show :\(/i)).toBeInTheDocument()
})
