import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tr = styled.tr``;

export const Tbody = styled.tbody``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({pet, setPet, setOnEditPet}) => {

    const handleEdit = (item) => {
        setOnEditPet(item);
      };
    

    const handleDelete = async (id) => {
        await axios
          .delete("http://localhost:8800/pet" + id)
          .then(({ data }) => {
            const newArray = pet.filter((pet) => pet.id !== id);
    
            setPet(newArray);
            toast.success(data);
          })
          .catch(({ data }) => toast.error(data));
    
        setOnEditPet(null);
      };

    return (
        <Table>
            <Thead>
                <Tr>
                <Th>Cpf Dono</Th>
                <Th>Pet</Th>
                <Th onlyWeb>Raca</Th>
                <Th></Th>
                <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
            {pet?.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.cpf_user}</Td>
            <Td width="30%">{item.nome_pet}</Td>
            <Td width="20%" onlyWeb>
              {item.raca}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))} 
            </Tbody>
        </Table>
    );
}

export default Grid;