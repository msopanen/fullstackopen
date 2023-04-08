import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const isUniquePerson = ({ newPerson, persons }) => {
    return persons.every((p) => p.name !== newPerson.name);
  };
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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(({ name, number }) => (
          <div key={name}>
            {name} {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
