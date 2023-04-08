import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const isUniquePerson = ({ newPerson, persons }) => {
    return persons.every((p) => p.name !== newPerson.name);
  };

  const nameIncludes =
    (filter) =>
    ({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase());

  const handleAddRecord = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    if (isUniquePerson({ newPerson, persons })) {
      //setPersons(persons.concat([newPerson]));
      setPersons([...persons, newPerson]);
    } else {
      alert(`${newPerson.name} is already added to phonebook`);
    }
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInputChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter(nameIncludes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter show with
        <input value={filter} onChange={handleFilterInputChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleAddRecord}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(({ name, number }) => (
          <div key={name}>
            {name} {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
