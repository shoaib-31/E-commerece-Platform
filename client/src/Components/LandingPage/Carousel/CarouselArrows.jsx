import MediaQuery from "react-responsive";

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MediaQuery minWidth={601}>
      <div
        className={className}
        onClick={onClick}
        style={{
          ...style,
          width: "2rem",
          height: "3rem",
          backgroundColor: "#ccb1d3",
          position: "absolute",
          outline: "none",
          borderRadius: "2px",
          borderColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          right: "0",
        }}
      >
        <svg
          fill="#fff"
          width="800px"
          height="800px"
          viewBox="-128 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
        </svg>
      </div>
    </MediaQuery>
  );
}

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MediaQuery minWidth={601}>
      <div
        className={className}
        onClick={onClick}
        style={{
          ...style,
          width: "2rem",
          height: "3rem",
          backgroundColor: "#ccb1d3",
          position: "absolute",
          outline: "none",
          borderRadius: "2px",
          borderColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          left: "0",
        }}
      >
        <svg
          fill="#fff"
          width="800px"
          height="800px"
          viewBox="-128 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
        </svg>
      </div>
    </MediaQuery>
  );
}
