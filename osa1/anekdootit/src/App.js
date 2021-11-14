import React, { useState } from 'react'

const Button = ({ handleClick, buttonText }) => (
  <button onClick={handleClick}>{buttonText}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  console.log(points)

  const [selected, setSelected] = useState(0)

  const selectNextAnecdote = () => {
    const randomIndexOfAnecdotes = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndexOfAnecdotes)
  }

  const givePointToSelectedAnecdote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  const largestValueInPoints = Math.max( ...points )

  const mostVotedAnecdoteIndex = points.indexOf(largestValueInPoints)

  return (
    <div>
      <h1> Anecdote of the day </h1>
      {anecdotes[selected]}
      <p>Has {points[selected]} votes</p>
      <p>
        <Button handleClick={givePointToSelectedAnecdote} buttonText="vote" />
        <Button handleClick={selectNextAnecdote} buttonText="next anecdote" />
      </p>

      <h2> Anecdote with most votes </h2>
      <p>{ anecdotes[mostVotedAnecdoteIndex] }</p>
      <p>has { points[mostVotedAnecdoteIndex] } votes</p>
    </div>
  )
}

export default App