import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import './index.css';

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
      <strong>{props.person.name}</strong> {props.person.number}{" "}
      <button
        type="button"
        onClick={() => {
          props.removePerson(props.person.id, props.person.name);
        }}
      >
        delete
      </button>
    </li>
  );
};

const Persons = (props) => {
  return (
    <ul className='persons__container'>
      {props.contactsToShow.map((person) => (
        <Person
          key={person.name + person.id}
          person={person}
          removePerson={props.removePerson}
        />
      ))}
    </ul>
  );
};

const Filter = (props) => {
  return (
    <p>
      <label>
        Only show contacts containing {" "}
        <input
          type="text"
          value={props.currentFilter}
          onChange={(event) => props.setNewFilter(event.target.value)}
        />
      </label>
    </p>
  );
};

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={ ( isError ? 'message__container message__container--error' : 'message__container' ) }>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    // Add enough default data for testing. External fetch should overwrite these.
    // { name: "Arto Hellas", number: "040-123456" },
    { },
  ]);
  const [currentFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    document.title = 'Phonebook, part3';
    const handlePersonsData = (initialPersonsData) => {
      setPersons(initialPersonsData);
    };

    const promiseFromPersons = personService.getAll();
    promiseFromPersons.then(handlePersonsData);
  }, []);

  const showToast = (notificationMessage, isError = false, toastDurationInSec = 3) => {
    setNotificationMessage(notificationMessage);
    setIsError(isError)
    setTimeout(() => {
      setNotificationMessage(null)
    }, (toastDurationInSec * 1000))
  }

  const removePerson = (id, personName) => {
    if (!window.confirm(`Delete ${personName}`)) return false;

    personService
      .remove(id)
      .then((response) => {
        if (response.status === 200) {
          showToast(`Successfully removed the person with ID ${id}`)
        }
      })
      .catch((error) => {
        showToast(`Having problems with removal, is the ID: ${id} deleted already?`, true)
      });
    // Remove missing ID also from Reacts' state.
    setPersons(persons.filter((person) => person.id !== id));
  };

  const addNameAndNumber = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => {
      // Check if exists, case insensitively & ignore lead/trail whitespace.
      return person.name.trim().toLowerCase() === newName.trim().toLowerCase();
    });

    const newContactInfoObj = {
      name: newName,
      number: newNumber,
    };

    // TODO: updating does not work.
    if (typeof existingPerson === "object" && existingPerson !== null) {
      // If user already exists, check if we want to update.
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(existingPerson.id, newContactInfoObj)
          .then((returnedPersonData) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPersonData : person
              )
            );
            showToast(`Successfully updated ${returnedPersonData.name}`)
          })
          .catch((error) => {
            showToast(`Could not update, ${newName} is already missing from the server.`, true, 5)
          });
      }
      return;
    }
    personService.create(newContactInfoObj)
    .then((updatedPersonsData) => {
      setPersons(persons.concat(updatedPersonsData));
      showToast(`Successfully added ${updatedPersonsData.name}`)
      setNewName("");
      setNewNumber("");
    })
    .catch((error) => {
      showToast('Could not add name and number to the server – please check your input values', true)
      console.log('error while creating:', error)
    });
    return;
  };

  // Create filtered list with case insensitive matching.
  const contactsToShow = persons.filter((person) => {
    if (currentFilter.length === 0) return true;
    const personLowerCase = person.name.toLowerCase();
    return personLowerCase.indexOf(currentFilter.toLowerCase()) > -1;
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} isError={isError}/>
      <PersonForm
        addNameAndNumber={addNameAndNumber}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>List of contacts in phonebook</h2>

      <Filter currentFilter={currentFilter} setNewFilter={setNewFilter} />

      <Persons 
        contactsToShow={contactsToShow} 
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
