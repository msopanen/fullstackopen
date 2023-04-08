const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ parts }) => {
  const total = parts.reduce((sum, p) => (sum += p.exercises), 0);
  return <b>total of {total} exercises</b>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
