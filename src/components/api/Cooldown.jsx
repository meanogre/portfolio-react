import { cloneElement, useCallback, useEffect, useMemo, useState } from "react";

const TICK_MS = 250; // ms

const appendDisabledClass = (className = "", disabledClass = "isDisabled") => {
    if (!className) return disabledClass;
    return className.includes(disabledClass) ? className : `${className} ${disabledClass}`;
};

/**
 * <Cooldown>
 *
 * Default behavior:
 * - After click, disables child for 'ms' milliseconds.
 * - Shows coutdown in label if 'label' is provided.
 *
 * Optional backoff:
 *  - Pass 'error'
 *  - Pass 'backoffOn' (string | regex | function)
 *  - Pass 'backoffMs'
 *
 *  Example:
 *  <Cooldown
 *      ms={3000}
 *      label="New Question"
 *      error={error}
 *      backoffOn="HTTP 429"
 *      backoffMs={15000}
 *  >
 *      <button onClick={refetch}>New Question</Button>
 *  </Cooldown>
 */

const Cooldown = ({
    ms = 2000,
    label = null,
    disabledClass = "isDisabled",
    tickMs = TICK_MS,

    // Optional backoff support
    error = null,
    backoffOn = null,
    backoffMs = null,

    children,
}) => {
    if (!children || Array.isArray(children)) {
        throw new Error("<Cooldown> expects exactly one child element.");
    }

    const child = children;
    const childProps = child.props || {};

    const [until, setUntil] = useState(0);
    const [nowMs, setNowMs] = useState(0);

    const isCoolingDown = until > 0 && nowMs > 0 && nowMs < until;

    const start = useCallback((duration) => {
        const target = Date.now() + Math.max(0, duration || 0);
        setUntil(target);
        setNowMs(Date.now());
    },[]);

    // Handle ticking while cooling down
    useEffect(() => {
        if (until <= 0) return;

        const id = setInterval(() => {
            const now = Date.now();

            if (now >= until) {
                clearInterval(id);
                setUntil(0);
                setNowMs(0);
                return;
            }
            setNowMs(now);
        }, tickMs);

        return () => clearInterval(id);
    }, [until, tickMs]);


    // Optional backoff trigger
    useEffect(() => {
        if (!error || !backoffOn || !backoffMs) return;

        const errString = String(error);

        let match = false;

        if (typeof backoffOn === 'string') {
            match = errString.includes(backoffOn);
        } else if (backoffOn instanceof RegExp) {
            match = backoffOn.test(errString);
        } else if (typeof backoffOn === 'function') {
            match = backoffOn(error);
        }

        if (match) {
            const tid = setTimeout(() => start(backoffMs), 0);
            return () => clearTimeout(tid);
        }
    }, [error, backoffOn, backoffMs, start]);

    const secondsLeft = useMemo(() => {
        if (!isCoolingDown) return 0;
        return Math.ceil((until - nowMs) / 1000);
    }, [isCoolingDown, until, nowMs]);

    const disabled = !!childProps.disabled || isCoolingDown;

    const wrappedOnClick = (e) => {
        if (disabled) return;

        start(ms);
        childProps.onClick?.(e);
    };

    const nextClassName = disabled
        ? appendDisabledClass(childProps.className, disabledClass)
        : childProps.className || "";

    const nextTitle = isCoolingDown
        ? `Wait ${secondsLeft}s`
        : childProps.title || "";

    const nextLabel =
        label && isCoolingDown
            ? `${label} (${secondsLeft}s)`
            : childProps.children;

    return cloneElement(child, {
        ...childProps,
        disabled,
        className: nextClassName,
        title: nextTitle,
        onClick: wrappedOnClick,
        children: nextLabel,
    });
};

export default Cooldown;