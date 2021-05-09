/// ```ts
///  const paginaton: PaginationType = {
///    offset: 0, // starts from 0. index
///    limit: 5,  // 5 item
///    sort: [['createdAt', 'asc']] // sort by 'createdAt' ascending
/// }
///```
export type PaginationType = {
	offset?: number;
	limit?: number;
	sort?: [by?: string, type?: string | Number];
}