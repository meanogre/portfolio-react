import {Link, useMatches} from "react-router-dom";

const Breadcrumbs = () => {
    const matches = useMatches();

    const crumbs = matches
        .filter( m => m.handle?.crumb)
        .map( m => ({
            label: typeof m.handle.crumb === 'function' ? m.handle.crumb(m) : m.handle.crumb,
            to: m.pathname,
        }));

    if (crumbs.length === 0) { return null; }

    return (
      <nav aria-label="breadcrumb" className="breadcrumbs">
          {crumbs.map((c, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                  <span key={c.to}>
                      {i > 0 ? <span className="crumb-sep" aria-hidden="true">»</span> : null}
                      {isLast ? (
                          <span className="crumb-current">{c.label}</span>
                      ) : (
                          <Link className="crumb-link" to={c.to}>{c.label}</Link>
                      )}
                  </span>
              )
          })}
      </nav>
    );
};

export default Breadcrumbs;