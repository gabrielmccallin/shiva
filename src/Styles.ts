module curly {
    export class Styles {
        static button = {
            fontSize: "1.2em",
            fontFamily: "sans-serif",
            fontWeight: "300",
            fontColourOver: 0x333333,
            fontColourOut: 0xffffff,
            letterSpacing: "0em",
            backgroundColor: "#f1f1f1",
            backgroundColorHover: "#dddddd",
            cornerRadius: "0.5em",
            durationOut: 1,
            durationIn: 0,
            padding: "0.5em",
            textAlign: "left",
            whiteSpace: "nowrap",
            msTouchAction: "manipulation",
            touchAction: "manipulation",
            cursor: "pointer",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            backgroundImage: "none",
            border: "1px solid transparent",
            borderColor: "#dddddd",
            color: "#333333",
            colorHover: "#ffffff",
            text: "button"
        };
        static caret = {
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
            marginLeft: "0.35rem"
        };
        static drop = {            
            fontFamily: "sans-serif",
            fontSize: "1.2rem",
            backgroundColor: "#ffffff",
            backgroundColorHover: "#cccccc",
            colorHover: "#000000",
            color: "#000000",
            durationIn: 0,
            durationOut: 0.5,
            listStyle: "none",
            zIndex: "1000",
            position: "absolute",
            // float: "left",
            //!important to remove default margin on a ul
            marginTop: "0px",
            minWidth: "5rem",
            border: "1px solid rgba(0,0,0,.15)",
            webkitBoxShadow: "0 6px 12px rgba(0,0,0,.175)",
            boxShadow: "0px 6px 12px rgba(0,0,0,0.175)",
            fontWeight: "300",
            paddingLeft: "0px",
            durationExpand: "0.5",
            durationContract: "0.5"

        };
    }
}
 