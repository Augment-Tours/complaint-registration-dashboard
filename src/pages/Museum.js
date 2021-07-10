import { filter } from 'lodash';
import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  IconButton,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Drawer
} from '@material-ui/core';
// components
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
// import USERLIST from '../_mocks_/user';
import { getAllMuseums, createMuseum } from './request/museum';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Museum Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Museum() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [museumList, setMuseumList] = useState([]);

  const [museumName, setMuseumName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const museumList = getAllMuseums(1).then((res) => {
      console.log(res);
      setMuseumList(res);
    });
    console.log(museumList);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = museumList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - museumList.length) : 0;

  const filteredUsers = applySortFilter(museumList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const toggleDrawer = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  return (
    <Page title="Museums | Augment-Tours">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Museum
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={toggleDrawer}
            startIcon={<Icon icon={plusFill} />}
          >
            New Museum
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={museumList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, description, image } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={image} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">Test Location</TableCell>
                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={museumList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <Drawer
          anchor="right"
          open={isOpenFilter}
          onClose={() => {}}
          PaperProps={{
            sx: { width: 400, border: 'none', overflow: 'hidden', padding: '20px 20px' }
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 1, py: 2 }}
          >
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Add Museum
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <Icon icon={closeFill} width={20} height={20} />
            </IconButton>
          </Stack>
          <TextField
            fullWidth
            label="Museum"
            onChange={(e) => {
              setMuseumName(e.target.value);
            }}
            value={museumName}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Description"
            style={{ marginBottom: '15px' }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
          <TextField
            fullWidth
            label="Image URL"
            style={{ marginBottom: '30px' }}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
            value={imageUrl}
          />

          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={() => {
              createMuseum(museumName, description, imageUrl)
                .then((res) => {
                  console.log(res);
                })
                .catch((e) => console.log(e));
            }}
          >
            Add
          </Button>
        </Drawer>
      </Container>
    </Page>
  );
}
