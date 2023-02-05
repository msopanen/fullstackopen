import Part from './Part';

const Content = (props) => {
    const { name1, exercises1, name2, exercises2, name3, exercises3 } = props;
    return (
        <>
            <Part name={name1} exercises={exercises1} />
            <Part name={name2} exercises={exercises2} />
            <Part name={name3} exercises={exercises3} />
        </>
    )
}

export default Content;