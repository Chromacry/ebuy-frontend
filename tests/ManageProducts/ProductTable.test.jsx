import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageProductTable from "../../src/pages/ManageProduct/ManageProductTable/ManageProductTable";

vi.mock("../src/services/APIs/ProductApi", () => ({
  updateMemberApi: vi.fn(),
  deleteMemberApi: vi.fn(),
}));

describe('Manage Product Table Component', () => {
  let mockData = [
    {
      id: 1,
      product_name: 'Gaming PC',
      product_description: '12345',
      product_image: 'path/to/image1.jpg',
      product_quantity: 22,
      created_time: '2023-12-12 00:00:00',
      seller_id: 1,
    },
    {
      id: 1,
      product_name: 'Nike Airjordans',
      product_description: '12345',
      product_image: 'path/to/image2.jpg',
      product_quantity: 22,
      created_time: '2023-12-12 00:00:00',
      seller_id: 1,
    },
  ];

  it('should display the loading skeleton when isLoading is true', () => {
    render(<ManageProductTable 
      data={mockData} 
      dataCount={2} 
      isLoading={true} 
      isModalOpen={false} 
      handleDelete={() => {}}
      handleEdit={() => {}}
      handlePagination={(page) => {}}
      handleModalIsOpen={() => {}}
      />);

    const skeletonLoader = screen.getByTestId('skeleton-loader');
    expect(skeletonLoader).toBeInTheDocument();
  });

  it('should display product data when provided', async () => {

    render(
      <ManageProductTable 
        data={mockData} 
        dataCount={5}
        isLoading={false} 
      />
    );

    expect(screen.getByText('Nike Airjordans')).toBeInTheDocument();
    expect(screen.getByText('Gaming PC')).toBeInTheDocument();
  });


  it('should display a confirmation dialog when delete button is clicked', () => {
    window.confirm = vi.fn(() => true);

    render(
      <ManageProductTable 
        data={mockData}
        isLoading={false}
        handleDeleteMessage={'Are you sure you want to delete this product?'}
        handleDelete={() => {}}
      />
    );

    const deleteButton = document.querySelector('.memberDeleteBtn');
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this product?');
  });

  it('should display the edit modal when edit button is clicked', () => {
    render(
      <ManageProductTable 
        data={mockData}
        dataCount={2}
        isModalOpen={true}
        handleModalIsOpen={() => {}}
        isLoading={false}
      />
    );

    const firstEditButton = document.querySelectorAll('.memberEditBtn')[0];
    fireEvent.click(firstEditButton);

    const modal = screen.getByTestId('edit-modal');
    expect(modal).toBeInTheDocument();
  });


  // it('should display a success message when product is successfully updated', async () => {
  //   updateMemberApi.mockResolvedValue({ status: 200, message: 'Member updated successfully' });
  
  //   render(<ManageProductTable data={mockData} isLoading={false} />);
  
  //   const firstEditButton = document.querySelectorAll('.memberEditBtn')[0];
  //   fireEvent.click(firstEditButton);
  //   fireEvent.click(screen.getByText('Save Changes'));
  
  //   await waitFor(() => {
  //     expect(screen.getByText('Product updated successfully')).toBeInTheDocument();
  //   });
  // });

  // it('should display an error message when member update fails', async () => {
  //   updateMemberApi.mockResolvedValue({ status: 500, message: 'Error updating product' });

  //   render(<ManageProductTable data={mockData} isLoading={false} />);

  //   const firstEditButton = document.querySelectorAll('.memberEditBtn')[0];
  //   fireEvent.click(firstEditButton);
  //   fireEvent.click(screen.getByText('Save Changes'));

  //   await waitFor(() => {
  //     expect(screen.getByText('Error updating member')).toBeInTheDocument();
  //   });
  // });
});