import '@Components/shared/loader/Loader.css';

const Loader = () => {
    return (
        <div className="typing-indicator">
        <div className="typing-circle"></div>
        <div className="typing-circle"></div>
        <div className="typing-circle"></div>
        <div className="typing-shadow"></div>
        <div className="typing-shadow"></div>
        <div className="typing-shadow"></div>
    </div>
    );
};

export default Loader;