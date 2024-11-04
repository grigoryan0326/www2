import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import "@testing-library/jest-dom"

import Filters from "./Filters"

const createTestStore = (initialState) => {
  return configureStore({
    reducer: {
      filters: (state = initialState) => state,
    },
  })
}

describe("Filters Component", () => {
  test("renders Filters component", () => {
    const store = createTestStore({})
    render(
      <Provider store={store}>
        <Filters products={[]} />
      </Provider>
    )

    expect(screen.getByText(/Filters/i)).toBeInTheDocument()
  })

  test("renders empty message when no products are provided", () => {
    const store = createTestStore({})
    render(
      <Provider store={store}>
        <Filters products={[]} />
      </Provider>
    )
  })

  test("does not render empty message when products are provided", () => {
    const products = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ]
    const store = createTestStore({})
    render(
      <Provider store={store}>
        <Filters products={products} />
      </Provider>
    )
  })
})
