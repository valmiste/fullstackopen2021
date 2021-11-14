
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


export default App