import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleAddRecord = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    //setPersons(persons.concat([newPerson]));
    setPersons([...persons, newPerson]);
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
