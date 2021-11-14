
import React, { useState } from 'react'

const StatisticLine = ({value, text}) => (
  <> 
    <tr>
      <td> {text} </td>
      <td>&nbsp;</td>
      <td>{value} </td>
    </tr>
  </>
)
const Button = ({handleClick, buttonText}) => (
    <button onClick={handleClick}>{buttonText}</button>
)

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all === 0 ) {
    return <p>No feedback given</p>
  } else {
    return (
      <>
      <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={ average }/>
      <StatisticLine text="positive" value={ positive }/>
      </tbody>
      </>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const increaseGood = () => {
    setGood(good + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
  }

  const resetAll = () => {
    setGood(0)
    setNeutral(0)
    setBad(0)
  }

  const allValues = good + neutral + bad

  const averageOfValues = ((good * 1) + (bad * -1)) / (good + neutral + bad)

  return (
    <>
      <h1> Give feedback </h1>
      <Button handleClick={increaseGood} buttonText="Good"/>
      <Button handleClick={increaseNeutral} buttonText="Neutral"/>
      <Button handleClick={increaseBad} buttonText="Bad"/>
      
      <h2> Statistics </h2>
      <Statistics good={good} neutral={neutral} bad={bad} average={averageOfValues} all={allValues} positive={(good / allValues) * 100 + '%'}/>
      <Button handleClick={resetAll} buttonText="Reset"/>
    </>
  )
}

export default App

/*
const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  const exercises = props.parts.map(part => part.exercises)
  const partnames = props.parts.map(part => part.partname)
  return (
    <div>
      <Part partname={partnames[0]} exercises={exercises[0]} />
      <Part partname={partnames[1]} exercises={exercises[1]} />
      <Part partname={partnames[2]} exercises={exercises[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.partname} {props.exercises}</p>
  )
}

const Total = (props) => {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  return (
    <>
      <p> Number of exercises {props.parts.map(part => Number(part.exercises)).reduce(reducer)}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
*/

