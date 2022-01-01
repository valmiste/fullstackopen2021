import React from "react";

const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    );
  };
  
  const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    );
  };
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} partname={part.name} exercises={part.exercises} />
        ))}
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
          <strong>
            Total of{" "}
            {props.parts.map((part) => Number(part.exercises)).reduce(reducer)}{" "}
            exercises
          </strong>
        </p>
      </>
    );
  };

export default Course;
