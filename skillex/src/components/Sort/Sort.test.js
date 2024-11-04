import "@testing-library/jest-dom"
import { render, fireEvent, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

import { setSortOption, setSortedProducts } from "../../store/filtersSlice"
import Sort from "./Sort"

const mockStore = configureStore([])

describe("Sort Component", () => {
  let store

  beforeEach(() => {
    store = mockStore({
      filters: {
        filteredProducts: [
          { id: 1, price: 10, rating: 4 },
          { id: 2, price: 5, rating: 5 },
          { id: 3, price: 15, rating: 3 },
        ],
        sortOption: "Default",
      },
    })

    store.dispatch = jest.fn()
  })

  test("renders correctly", () => {
    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    )

    expect(screen.getByText(/Sort:/)).toBeInTheDocument()
  })

  test("opens and closes dropdown on mouse events", () => {
    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    )

    const sortButton = screen.getByText(/Sort:/)
    fireEvent.mouseEnter(sortButton)
    expect(screen.getByRole("list")).toBeInTheDocument()

    fireEvent.mouseLeave(sortButton)
    expect(screen.queryByRole("list")).not.toBeInTheDocument()
  })

  test("dispatches setSortOption and setSortedProducts on sort change", () => {
    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    )

    fireEvent.mouseEnter(screen.getByText(/Sort:/))
    fireEvent.click(screen.getByText("Price: ascending"))

    expect(store.dispatch).toHaveBeenCalledWith(setSortOption("Price-asc"))
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: setSortedProducts.type,
      })
    )
  })

  test("sorts products correctly", () => {
    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    )

    fireEvent.mouseEnter(screen.getByText(/Sort:/))
    fireEvent.click(screen.getByText("Price: ascending"))

    expect(store.dispatch).toHaveBeenCalledWith(
      setSortedProducts(expect.any(Array))
    )
  })
})
