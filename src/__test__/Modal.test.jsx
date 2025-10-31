import { render, screen } from '@testing-library/react';
import FormEdit from '../components/Modal';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const preloadedStateEditOpen = {
  users: {
    isModal: true,
    selectedUserById: 1,
    type: 'edit',
    listUsers: [],
  },
};

const mockStoreEditOpen = initialize =>
  configureStore({
    reducer: {
      users: (state = preloadedStateEditOpen.users) => state,
    },
    preloadedState: initialize,
  });

describe('Modal Component', () => {
  let store;

  test('Inputs inside modal check', async () => {
    store = mockStoreEditOpen({ users: { ...preloadedStateEditOpen.users, isModal: true } });
    render(
      <Provider store={store}>
        <FormEdit />
      </Provider>
    );

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const usernameInput = screen.getByRole('textbox', { name: 'Username' });
    const emailInput = screen.getByRole('textbox', { name: 'Email Address' });
    const phoneInput = screen.getByRole('textbox', { name: 'Phone' });
    const websiteInput = screen.getByRole('textbox', { name: 'Website' });

    expect(nameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(websiteInput).toBeInTheDocument();
  });

  test('Button inside modal edit', () => {
    store = mockStoreEditOpen({ users: { ...preloadedStateEditOpen.users, isModal: true } });
    render(
      <Provider store={store}>
        <FormEdit />
      </Provider>
    );

    const buttonEdit = screen.getByRole('button', { name: /Edit/i });
    const buttonCancel = screen.getByRole('button', { name: /Cancel/i });
    expect(buttonEdit).toBeInTheDocument();
    expect(buttonCancel).toBeInTheDocument();
  });
});
