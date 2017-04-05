module shiva {
    export class Styles {
        static button = {
            fontSize: "1.2em",
            fontFamily: "sans-serif",
            // fontWeight: "300",
            backgroundColor: "#fefefe",
            hover: {
                backgroundColor: "#dddddd",
                durationOut: 1,
                durationIn: 0,
                color: "#000000"
            },
            padding: "0.75rem",
            textAlign: "left",
            whiteSpace: "nowrap",
            msTouchAction: "manipulation",
            touchAction: "manipulation",
            cursor: "pointer",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            border: "2px solid transparent",
            borderColor: "#eeeeee",
            color: "#000000",
            text: "Button"
        };
        static drop = {
            fontFamily: "sans-serif",
            fontSize: "1.2rem",
            backgroundColor: "#ffffff",
            color: "#000000",
            // minWidth: "5rem",
            // fontWeight: "300",
            padding: "1rem",
            durationExpand: 0.5,
            durationContract: 0.5,
            // marginTop: "0.3rem",
            border: "2px solid transparent",
            borderColor: "#eeeeee",
            dropGap: "0.1rem",
            // boxShadow: "0px 12px 20px rgba(0,0,0,0.1)"
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
    }
}
