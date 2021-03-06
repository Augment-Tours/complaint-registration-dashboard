import { filter } from 'lodash';
import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import CategoryDrawer from '../components/category/CreateCategory';
import EditCategoryDrawer from '../components/category/EditCategory';
//
// import USERLIST from '../_mocks_/user';
import { getAllCategories, deleteCategory } from '../request/category';
import { CategoryPreview } from '../components/form-fields/PreviewCategoryModal';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Category Name', alignRight: false },
  { id: 'parent_category_name', label: 'Parent Category', alignRight: false },
  { id: 'form_name', label: 'Form', alignRight: false },
  { id: 'created_at', label: 'Date', alignRight: false }
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
  const [categoriesList, setCategoriesList] = useState([]);
  const [editId, setEditId] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [previewId, setPreviewId] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    getAllCategories().then((res) => {
      if (Array.isArray(res)) {
        setCategoriesList(res);
      }
    });
  };

  const deleteCategoryWithRefresh = (categoryId) => {
    deleteCategory(categoryId).then(() => {
      fetchCategories();
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = categoriesList.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoriesList.length) : 0;

  const filteredCategories = applySortFilter(
    categoriesList,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredCategories.length === 0;

  const toggleDrawer = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const toggleEditDrawer = (id) => {
    setEditId(id);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const togglePreviewDialog = (id) => {
    setPreviewId(id);
    setPreviewOpen(!previewOpen);
  };

  return (
    <Page title="Category | Addis Ababa City">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to=""
            startIcon={<Icon icon={plusFill} />}
            onClick={toggleDrawer}
          >
            New Category
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
                  rowCount={categoriesList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCategories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, parent_category_name, form_name, created_at } = row;
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
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{parent_category_name}</TableCell>
                          <TableCell align="left">{form_name}</TableCell>
                          <TableCell align="left">
                            {new Date(`${created_at}`).toDateString()}
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              onClick={() => {
                                togglePreviewDialog(id);
                              }}
                            >
                              Preview
                            </Button>
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu
                              toggleEditDrawer={() => {
                                toggleEditDrawer(id);
                              }}
                              deleteItem={() => {
                                deleteCategoryWithRefresh(id);
                              }}
                            />
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
            count={categoriesList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <CategoryDrawer
          isOpenFilter={isOpenFilter}
          toggleDrawer={toggleDrawer}
          fetchCategories={fetchCategories}
        />
        {isEditModalOpen && (
          <EditCategoryDrawer
            categoryId={editId}
            isOpenFilter={isEditModalOpen}
            toggleDrawer={toggleEditDrawer}
            refetchCategories={fetchCategories}
          />
        )}
        {previewOpen && (
          <CategoryPreview
            categoryId={previewId}
            toggleDialog={togglePreviewDialog}
            isPreviewOpen={previewOpen}
          />
        )}
      </Container>
    </Page>
  );
}
