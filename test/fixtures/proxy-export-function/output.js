import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var _accountSmartListMembersTableDataFetchThunk = accountSmartListMembersTableDataFetchThunk;

var accountSmartListMembersTableDataFetchThunk = _$rwProx(_accountSmartListMembersTableDataFetchThunk, "accountSmartListMembersTableDataFetchThunk", () => accountSmartListMembersTableDataFetchThunk, val => accountSmartListMembersTableDataFetchThunk = val);

function accountSmartListMembersTableDataFetchThunk({
  id
}) {
  return async (dispatch, getState) => {
    const currentPageNumber = getState().getIn(['components', 'DataTable', TABLE_ID, id, 'currentPageNumber']);
    const searchQuery = getState().getIn(['components', 'DataTable', TABLE_ID, id, 'searchQuery']);
    const resultsPerPage = getState().getIn(['components', 'DataTable', 'resultsPerPage']);
    const sortBy = getState().getIn(['components', 'DataTable', TABLE_ID, id, 'sortBy']);
    await Promise.all([dispatch(dataTableColumnsFetchThunk({
      id,
      tableId: TABLE_ID
    })), dispatch(dataTableViewsFetchThunk({
      id,
      tableId: TABLE_ID
    })), dispatch(accountSmartListMembersFetchThunk({
      sortBy: sortBy ? sortBy.toJS() : {},
      resultsPerPage,
      id,
      programId: id,
      currentPage: currentPageNumber || 1,
      filterBy: [],
      searchQuery: searchQuery || ''
    }))]);
  };
}

export { accountSmartListMembersTableDataFetchThunk, _$rwRuntime as __RewireAPI__ };