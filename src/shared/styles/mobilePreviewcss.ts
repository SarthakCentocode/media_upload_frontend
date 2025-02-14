import { CSSProperties } from "react";

export const mobilePreview: {
  container: CSSProperties;
  header: CSSProperties;
  content: CSSProperties;
  heading: CSSProperties;
  message: CSSProperties;
  footer: CSSProperties;
  actionButton: CSSProperties;
} = {
  container: {
    width: "300px",
    height: "550px",
    border: "4px solid #000000",
    borderRadius: "30px",
    background: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  header: {
    height: "40px",
    background: "black",
    top: "10px",
    left: "28%",
    marginTop: "2",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "120px",
    borderRadius: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  content: {
    marginTop: "70px",
    paddingTop: "40px",
    paddingLeft: "20px",
    paddingRight: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "#f4f4f4",
    height: "100%",
    borderRadius: "20px 20px 0 0",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  message: {
    fontSize: "14px",
    lineHeight: "1.5",
  },
  footer: {
    fontSize: "12px",
    color: "#aaa",
    marginTop: "20px",
  },
  actionButton: {
    width: "100%",
    padding: "10px",
    marginTop: "20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background 0.3s ease",
  },
};
