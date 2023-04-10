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
  id: notification.id + 1,
  message,
});

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
      updatePerson(changedPerson).then((updatedPerson) => {
        setPersons(
          persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
        );
        setNotification(
          createNotification(`User ${newName} updated`, notification)
        );
      });
    } else {
      const newPerson = { name: newName, number: newNumber };
      createPerson(newPerson).then((createdPerson) => {
        setPersons([...persons, createdPerson]);
        setNotification(
          createNotification(`User ${newName} added`, notification)
        );
      });
    }
  };

  const handleDeleteUser = ({ name, id }) => {
    if (window.confirm(`Delete ${name} ?`)) {
      deletePerson(id).then(() => {
        const leftPersons = persons.filter(excludeName(name));
        setPersons(leftPersons);
        setNotification(
          createNotification(`User ${name} deleted`, notification)
        );
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
