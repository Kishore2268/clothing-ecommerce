// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Avatar, CardHeader, Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Customers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5454/api/users', {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  function handlePaginationChange(event, value) {
    setPage(value);
  }

  return (
    <Box>
      <Card>
        <CardHeader
          title='All Customers'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>User Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow hover key={user._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar alt={user.firstName} src={user.profilePicture || ''}>
                      {user.firstName[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 flex justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={Math.ceil(users.length / 10)}
          color="primary"
          onChange={handlePaginationChange}
          page={page}
        />
      </Card>
    </Box>
  )
}

export default Customers;
