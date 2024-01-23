import "./ManageProduct.scss";
import { useEffect, useState } from "react";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
// } from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import Navbar from "../../components/Navbar/Navbar";
import { loginApi } from "../../services/APIs/UserApi";
import banner from "../../assets/images/banner.png";
import ManageLayout from "../../components/ManageLayout/ManageLayout";
import Table from "../../components/Table/Table";
function ManageProduct() {
  return (
    <ManageLayout>
      <div className="body">
        <div className="tableTopBar">
          <Button colorScheme="blue">Button</Button>
        </div>
        <Table />
      </div>
    </ManageLayout>
  );
}

export default ManageProduct;
