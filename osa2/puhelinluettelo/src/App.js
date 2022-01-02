import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    // Add enough default data for testing.
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [currentFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNameAndNumber = (event) => {
    event.preventDefault();
    // Alert user and reset fields in case the name is already in the list.
    if ( persons.findIndex( person => person.name === newName) > -1 ) {
      alert( `${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('');
      return false;
    }
    
    const newContactInfoObj = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    }

    setPersons(persons => [...persons, newContactInfoObj])
    setNewName('');
    setNewNumber('');
  };

  // Create filtered list with case insensitive matching. 
  const contactsToShow = persons.filter( person => {
    if ( currentFilter.length === 0 ) return true;
    const personLowerCase = person.name.toLowerCase();
    return ( personLowerCase.indexOf(currentFilter.toLowerCase()) > -1 )
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addNameAndNumber}>
        <h2> Add a new contact info: </h2>
        <div>
          <label>Name: 
            <input type="text" value={newName} onChange={(event) => setNewName(event.target.value)} />
          </label>
          <br/>
          <label>Number: 
            <input type="tel" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
          </label>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>List of contacts in phonebook</h2>
      <p>
        <label>Only show contacts starting with <input type="text" value={currentFilter} onChange={(event) => setNewFilter(event.target.value)} /></label>
      </p>    
      {contactsToShow.map( person => <li key={person.name}> {person.name} {person.number}</li> )}
    </div>
  );
};

export default App;