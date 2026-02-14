const ApiCardHeader = ( {title, source } ) => {
    return (
        <header className="apiCardHeader">
            <h3 className="apiCardTitle">{title}</h3>
            <span className="muted apiCardMeta">{source}</span>
        </header>
    );
};

export default ApiCardHeader;