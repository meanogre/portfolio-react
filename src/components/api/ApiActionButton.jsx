const ApiActionButton = ({
    className = "",
    type = "button",
    children,
    ...props
}) => {
    const classes = ["nav-link", className].filter(Boolean).join(" ");

    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    );
};

export default ApiActionButton;