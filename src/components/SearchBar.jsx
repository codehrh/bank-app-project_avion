
export default function SearchBar(){
    const clickMe = () => {
        console.log("clicked");
    };

    return (
        <div className="searchBar">
            <input type="text" placeholder="Search"></input>
            <button className="btn" onClick={clickMe}>
                Search
            </button>
        </div>
    )
}