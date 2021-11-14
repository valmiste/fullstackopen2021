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