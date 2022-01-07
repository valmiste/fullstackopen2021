import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const PersonForm = ({
  addNameAndNumber,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) => {
  return (
    <form onSubmit={addNameAndNumber}>
      <h2> Add a new contact info: </h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Number:
          <input
            type="tel"
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = (props) => {
  return (
    <li>
      {" "}
      {props.person.name} {props.person.number}
      {" "}
      <button type="button" onClick={() => {
        props.removePerson(props.person.id, props.person.name)}
        }>
        delete
      </button>
    </li>
  );
};

const Persons = (props) => {
  return (
    <>
      {props.contactsToShow.map((person) => (
        <Person key={person.name} person={person} removePerson={props.removePerson}/>
      ))}
    </>
  );
};

const Filter = (props) => {
  return (
    <p>
      <label>
        Only show contacts starting with{" "}
        <input
          type="text"
          value={props.currentFilter}
          onChange={(event) => props.setNewFilter(event.target.value)}
        />
      </label>
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    // Add enough default data for testing.
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [currentFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    console.log("effect run");

    const handlePersonsData = (initialPersonsData) => {
      setPersons(initialPersonsData);
    };

    // const promiseFromPersons = axios.get("http://localhost:3001/persons")
    const promiseFromPersons = personService.getAll();
    promiseFromPersons.then(handlePersonsData);
  }, []);

  const removePerson = (id, personName) => {

    if (!window.confirm(`Delete ${personName}`)) return false;

    personService.remove(id)
    .then( response => {
      if (response.status === 200) {
        console.log(`Successfully removed the person with ID ${id}`);
      }
    })
    .catch( error => {
      console.log(`Having problems with removal, is the ID: ${id} deleted already?`);
    })
    // Remove missing ID also from Reacts' state.
    setPersons(persons.filter(person => person.id !== id));
  };

  const addNameAndNumber = (event) => {
    event.preventDefault();
    // Alert user and reset fields in case the name is already in the list.
    if (persons.findIndex((person) => person.name === newName) > -1) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return false;
    }

    const newContactInfoObj = {
      name: newName,
      // id: persons.length + 1, // JSON-server will create this.
      number: newNumber,
    };

    personService.create(newContactInfoObj).then((updatedPersonsData) => {
      setPersons(persons.concat(updatedPersonsData));
      setNewName("");
      setNewNumber("");
    });
  };

  // Create filtered list with case insensitive matching.
  const contactsToShow = persons.filter((person) => {
    if (currentFilter.length === 0) return true;
    const personLowerCase = person.name.toLowerCase();
    return personLowerCase.indexOf(currentFilter.toLowerCase()) > -1;
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <PersonForm
        addNameAndNumber={addNameAndNumber}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>List of contacts in phonebook</h2>

      <Filter currentFilter={currentFilter} setNewFilter={setNewFilter} />

      <Persons contactsToShow={contactsToShow} removePerson={removePerson}/>
    </div>
  );
};

export default App;
