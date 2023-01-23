const Total = (props) => {
    const { exercises1, exercises2, exercises3 } = props;
    const count = exercises1 + exercises2 + exercises3;
    
    return <p>Number of exercises {count}</p>
}

export default Total;