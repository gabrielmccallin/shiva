var Styles = (function () {
    function Styles() {
    }
    Styles.button = {
        whiteSpace: "nowrap",
        msTouchAction: "manipulation",
        touchAction: "manipulation",
        cursor: "pointer",
        webkitUserSelect: "none",
        mozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        text: "Button",
        icon: {
            padding: "0.75rem"
        },
        type: "button",
        attributes: {
            type: "button"
        }
    };
    Styles.drop = {
        fontFamily: "sans-serif",
        fontSize: "1.2rem",
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "1rem",
        durationExpand: 0.5,
        durationContract: 0.5,
        border: "2px solid transparent",
        borderColor: "#eeeeee",
        dropGap: "0.1rem",
        hover: {
            backgroundColor: "#dddddd",
            color: "#000000",
            durationIn: 0,
            durationOut: 0.5,
        },
        caret: {
            width: "0px",
            height: "0px",
            borderLeftWidth: "0.35rem",
            borderLeftStyle: "solid",
            borderLeftColor: "transparent",
            borderRightWidth: "0.35rem",
            borderRightStyle: "solid",
            borderRightColor: "transparent",
            borderTopWidth: "0.35rem",
            borderTopStyle: "solid",
            borderTopColor: "black",
            display: "inline-block",
            verticalAlign: "middle",
            marginLeft: "0.35rem",
            pointerEvents: "none",
            transform: "translateY(-0.1rem)"
        }
    };
    return Styles;
}());
export { Styles };
