import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import UserForm from "./components/UserForm";
import Persons from "./components/Persons";
import Notification, { DEFAULT_NOTIFICATION } from "./components/Notification";

import {
  createPerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from "./services/persons";

const findByName = ({ name, persons }) =>
  persons.find((p) => p.name.toLowerCase() === name.toLocaleLowerCase());

const confirmOperation = (name) =>
  window.confirm(
    `${name} is already added to phonebook, replace the old number with a new one?`
  );

const nameIncludes =
  (filter) =>
  ({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase());

const excludeName =
  (excludedName) =>
  ({ name }) =>
    name !== excludedName;

const createNotification = (message, notification) => ({
  ...notification,
  id: notification.id + 1,
  message,
});

const createErrorNotification = (errorMessage, notification, error) => {
  const { response, code } = error;
  let message = "";

  if (code === "ERR_NETWORK") {
    message = `${errorMessage}, because cannot not connect to server. Please check your network connection and try again later.`;
  } else if (response.status === 404) {
    message = `${errorMessage}, user information not found. Please check that the user exists and try again later.`;
  } else {
    message = `${errorMessage}, please try again later.`;
  }

  return { ...notification, id: notification.id + 1, message, error: true };
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(DEFAULT_NOTIFICATION);

  useEffect(() => {
    getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();

    const oldPerson = findByName({ name: newName, persons });

    if (oldPerson && confirmOperation(oldPerson.name)) {
      const changedPerson = { ...oldPerson, number: newNumber };

      updatePerson(changedPerson)
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
          );

          const updateNtf = createNotification(
            `User ${newName} updated`,
            notification
          );
          setNotification(updateNtf);
        })
        .catch((error) => {
          const errorNtf = createErrorNotification(
            `Could not update user ${newName}`,
            notification,
            error
          );
          setNotification(errorNtf);
        });
    } else {
      const newPerson = { name: newName, number: newNumber };

      createPerson(newPerson)
        .then((createdPerson) => {
          setPersons([...persons, createdPerson]);

          const createNtf = createNotification(
            `User ${newName} added`,
            notification
          );
          setNotification(createNtf);
        })
        .catch((error) => {
          const errorNtf = createErrorNotification(
            `Could not add user ${newName}`,
            notification,
            error
          );
          setNotification(errorNtf);
        });
    }
  };

  const handleDeleteUser = ({ name, id }) => {
    if (window.confirm(`Delete ${name} ?`)) {
      deletePerson(id)
        .then(() => {
          const leftPersons = persons.filter(excludeName(name));
          setPersons(leftPersons);
          setNotification(
            createNotification(`User ${name} deleted`, notification)
          );
        })
        .catch((error) => {
          const errorNtf = createErrorNotification(
            `Could not delete user ${name}`,
            notification,
            error
          );
          setNotification(errorNtf);
        });
    }
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter(nameIncludes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} onFilterInputChange={handleFilterChange} />
      <h2>add a new</h2>
      <UserForm
        name={newName}
        number={newNumber}
        onAddUser={handleAddUser}
        onNameInput={handleNameInput}
        onNumberInput={handleNumberInput}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDeleteUser} />
    </div>
  );
};

export default App;
