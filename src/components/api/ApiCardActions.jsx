const ApiCardActions = ({ className = "", children }) => {
    const classes = ["apiCardActions", className].filter(Boolean).join(" ");

    return <div className={classes}>{children}</div>;
};

export default ApiCardActions;