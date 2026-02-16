const StatusBlock = ({ status, error, loadingText="Loading..."}) => {
    if (status === "loading") {
        return (
            <p className="muted" style={{ margin: 0 }}>
                {loadingText}
            </p>
        );
    }

    if (status === "error") {
        if (!error) return null;

        return (
            <p className="muted" style={{ margin: 0 }}>
                <span style={{ fontWeight: 700 }}>Error:</span> {error}
            </p>
        );
    }

    return null;
};

export default StatusBlock;