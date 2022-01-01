const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Course = ({course}) => {
  return (
    <>
     <Header course={course.name} />
     <Content parts={course.parts} />
     <Total parts={course.parts} />
    </>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map( (part) => <Part key={part.id} partname={part.partname} exercises={part.exercises}/>)}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.partname} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  return (
    <>
      <p>
        {" "}
        Total number of exercises{" "}
        {props.parts.map((part) => Number(part.exercises)).reduce(reducer)}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        partname: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        partname: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        partname: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        partname: "New test part",
        exercises: 10,
        id: 4,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
