import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cart from "../../src/pages/Cart/Cart";

vi.mock("../src/services/APIs/OrderApi", () => ({
  addOrderApi: vi.fn(),
}));

describe("Manage Order Table Component", () => {
  let mockData = [
    {
      id: 189,
      product_name: "NikeAirjordans",
      product_description: "12345",
      product_image: "path/to/image2.jpg",
      order_quantity: 1,
      product_id: 2,
      created_time: "2024-01-27 02:05:06",
    },
    {
      id: 189,
      product_name: "Shoes",
      product_description: "12345",
      product_image: "path/to/image1.jpg",
      order_quantity: 1,
      product_id: 2,
      created_time: "2024-01-27 02:05:06",
    },
  ];

//   it("should display the loading skeleton when isLoading is true", () => {
//     render(
//       <ManageOrderTable
//         data={mockData}
//         dataCount={2}
//         isLoading={true}
//         isModalOpen={false}
//         handleDelete={() => {}}
//         handleEdit={() => {}}
//         handlePagination={(page) => {}}
//         handleModalIsOpen={() => {}}
//       />
//     );

//     const skeletonLoader = screen.getByTestId("skeleton-loader");
//     expect(skeletonLoader).toBeInTheDocument();
//   });

  it("should display cart data when provided", async () => {
    render(
      <Cart data={mockData} dataCount={5} isLoading={false} />
    );

    const elementsWithTextNikeAirjordans = screen.getAllByText("Nike Airjordans");
    expect(elementsWithTextNikeAirjordans.length).toBeGreaterThanOrEqual(1);

    const elementsWithTextShoes = screen.getAllByText("Shoes");
    expect(elementsWithTextShoes.length).toBeGreaterThanOrEqual(1);
  });

//   it("should display a confirmation dialog when delete button is clicked", () => {
//     window.confirm = vi.fn(() => true);

//     render(
//       <ManageOrderTable
//         data={mockData}
//         isLoading={false}
//         handleDeleteMessage={"Are you sure you want to delete this order?"}
//         handleDelete={() => {}}
//       />
//     );

//     const deleteButton = document.querySelector(".memberDeleteBtn");
//     fireEvent.click(deleteButton);

//     expect(window.confirm).toHaveBeenCalledWith(
//       "Are you sure you want to delete this order?"
//     );
//   });

  // it("should invoke handleUpdate function when order status is changed", async () => {
  //   // Mock the handleUpdate function
  //   const handleUpdateMock = vi.fn(() => true);

  //   render(
  //     <ManageOrderTable
  //       data={mockData}
  //       dataCount={2}
  //       isLoading={false}
  //       handleDelete={() => {}}
  //       handleEdit={() => {}}
  //       handleUpdate={handleUpdateMock}
  //       handlePagination={() => {}}
  //       handleModalIsOpen={() => {}}
  //     />
  //   );

  //   const orderStatusSelects = screen.getAllByTestId("order_status1");

  //   fireEvent.select(orderStatusSelects, { target: { value: "Delivered" } });

  //   expect(handleUpdateMock).toHaveBeenCalledWith(
  //     expect.any(Object),
  //     mockData[0].id
  //   );

  //   handleUpdateMock.mockClear();
  // });
});
