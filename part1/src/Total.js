const Total = (props) => {
    const { parts } = props;
    const count = parts[0].exercises + parts[1].exercises + parts[2].exercises;
    
    return <p>Number of exercises {count}</p>
}

export default Total;