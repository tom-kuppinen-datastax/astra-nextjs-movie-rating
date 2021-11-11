const headerStyle = {
    backgroundColor: "#222b49",
    color: "white",
    width: "100%",
    height: "100px",
    padding: "10px",
};
const catalogLinkStyle = {
    float: "right"
}
const headerImgUrl = "https://docs.datastax.com/en/astra/assets/img/logo.svg";
const catalogUrl = "/";
const Header = () => (
    <div className="Header" style={headerStyle}>
        <div><a href="/"><img src={headerImgUrl}/></a></div>
        <div style={catalogLinkStyle}><a href={catalogUrl}>Catalog Demo</a></div>
    </div>
);

export default Header;