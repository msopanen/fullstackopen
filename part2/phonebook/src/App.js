import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const isUniqueEntry = ({ newPerson, persons }) => {
    const newPersonStr = JSON.stringify(newPerson);
    return persons.every((p) => JSON.stringify(p) !== newPersonStr);
  };
  const handleAddRecord = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };

    if (isUniqueEntry({ newPerson, persons })) {
      //setPersons(persons.concat([newPerson]));
      setPersons([...persons, newPerson]);
    } else {
      alert(`${newPerson.name} is already added to phonebook`);
    }
  };

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddRecord}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(({ name }) => (
          <div key={name}>{name}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
