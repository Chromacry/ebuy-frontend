import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ManageOrderTable from "../../src/pages/ManageOrder/ManageOrderTable/ManageOrderTable";

vi.mock("../src/services/APIs/OrderApi", () => ({
  updateOrderApi: vi.fn(),
  deleteOrderApi: vi.fn(),
}));

describe("Manage Order Table Component", () => {
  let mockData = [
    {
      id: 189,
      user_id: 274,
      product_id: 2,
      order_quantity: 1,
      order_status: "Paid",
      created_time: "2024-01-27 02:05:06",
      tracking_number: "J3THB7",
      product_price: 40,
    },
    {
      id: 1,
      user_id: 1,
      product_id: 1,
      order_quantity: 22,
      order_status: "Paid",
      created_time: "2023-12-12 00:00:00",
      tracking_number: "J3THB6",
      product_price: 40,
    },
  ];

  it("should display the loading skeleton when isLoading is true", () => {
    render(
      <ManageOrderTable
        data={mockData}
        dataCount={2}
        isLoading={true}
        isModalOpen={false}
        handleDelete={() => {}}
        handleEdit={() => {}}
        handlePagination={(page) => {}}
        handleModalIsOpen={() => {}}
      />
    );

    const skeletonLoader = screen.getByTestId("skeleton-loader");
    expect(skeletonLoader).toBeInTheDocument();
  });

  it("should display order data when provided", async () => {
    render(
      <ManageOrderTable data={mockData} dataCount={5} isLoading={false} />
    );

    const elementsWithTextJ3THB7 = screen.getAllByText("J3THB7");
    expect(elementsWithTextJ3THB7.length).toBeGreaterThanOrEqual(1);

    const elementsWithTextJ3THB6 = screen.getAllByText("J3THB6");
    expect(elementsWithTextJ3THB6.length).toBeGreaterThanOrEqual(1);
  });

  it("should display a confirmation dialog when delete button is clicked", () => {
    window.confirm = vi.fn(() => true);

    render(
      <ManageOrderTable
        data={mockData}
        isLoading={false}
        handleDeleteMessage={"Are you sure you want to delete this order?"}
        handleDelete={() => {}}
      />
    );

    const deleteButton = document.querySelector(".memberDeleteBtn");
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this order?"
    );
  });

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
