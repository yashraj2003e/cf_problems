import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);
function App() {
  const [contests, setContests] = useState("");
  const [index, setIndex] = useState("");
  const [division, setDivision] = useState("");
  const [isLoading, setIsLoading] = useState("idle");
  const [data, setData] = useState([]);

  function format(response) {
    const formattedArray = Object.entries(response)
      .filter(([key]) => key !== "undefined")
      .map(([key, value]) => ({
        rating: Number(key),
        count: value,
      }));
    setData(formattedArray);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!contests || !index || !division) {
      alert("Please Fill Out All Fields !");
      return;
    }

    const body = {
      indexOfProblem: index,
      countOfProblems: contests,
      div: division,
    };
    console.log(body);
    try {
      setIsLoading("true");
      const data = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let response = await data.json();
      format(response);
      setIsLoading("idle");
    } catch (e) {
      setIsLoading("error");
    }
  }

  return (
    <div className="flex items-center flex-col bg-[#E6E6FA] h-dvh text-center">
      <h1 className="text-3xl mt-10">Codeforces !</h1>
      <form className="mt-10 flex flex-col items-center">
        <label>Number of Contests:</label>
        <input
          className="border-solid border-2 mt-2 px-1 py-1 border-neutral-700 mb-2"
          value={contests}
          onChange={(e) => setContests(e.target.value)}
          disabled={isLoading === "true"}
        ></input>
        <label>Index of Problem:</label>
        <input
          className="border-solid border-2 mt-2 px-1 py-1 border-neutral-700 mb-2"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          disabled={isLoading === "true"}
        ></input>
        <label>Division:</label>
        <input
          className="border-solid border-2 mt-2 px-1 py-1 border-neutral-700 mb-2"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          disabled={isLoading === "true"}
        ></input>
        <button
          className="px-4 py-2 rounded-xl border-2 text-1xl font-bold border-red-200 bg-gray-400 hover:bg-slate-400 text-white disabled:cursor-not-allowed"
          onClick={(e) => handleSubmit(e)}
          disabled={isLoading === "true"}
        >
          Get Data
        </button>
      </form>
      {isLoading === "error" && <h2>Some Error Occurred !</h2>}
      {isLoading === "idle" &&
        data.map((element) => (
          <div key={element.count}>
            {element.rating} : {element.count}
          </div>
        ))}
    </div>
  );
}

export default App;
