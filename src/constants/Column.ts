import { Column } from '../types/user.type';

export const COLUMNS: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 10 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'username', label: 'Username', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
  },
  {
    id: 'phone',
    label: 'Phone',
    minWidth: 170,
  },
  {
    id: 'website',
    label: 'Website',
    minWidth: 170,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
  },
];
