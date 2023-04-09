import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import UserForm from "./components/UserForm";
import Persons from "./components/Persons";

const isUniquePerson = ({ newPerson, persons }) => {
  return persons.every((p) => p.name !== newPerson.name);
};

const nameIncludes =
  (filter) =>
  ({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase());

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    if (isUniquePerson({ newPerson, persons })) {
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          setPersons([...persons, response.data]);
        });
    } else {
      alert(`${newPerson.name} is already added to phonebook`);
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
