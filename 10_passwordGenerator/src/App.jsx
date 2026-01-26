import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(7);

  const [useNum, setUseNum] = useState(false);

  const [useChar, setUseChar] = useState(false);

  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const CopyPass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert('password copied')
  },[password])

  const passwordGenerator = useCallback(() => {
    let pass ='';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (useNum) {
      str += "1234567890123546321324686813216497984653";
    }
    if (useChar) {
      str += "/*-+)(&^%$#@!";
    }

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length );
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, useNum, useChar, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, useNum, useChar, passwordGenerator]);

  return (
    <>
      <div
        id="body"
        className="bg-[#242424] text-white h-screen w-full flex flex-wrap justify-center flex-col items-center"
      >
        <h1 className="text-2xl font-semibold m-2">Password Generator</h1>
        <div className="bg-gray-700 w-full max-w-md h-56 flex flex-col justify-center items-center rounded">
          <div className="w-3/4 flex flex-row">
            <input
              type="text"
              value={password}
              className="text-blue-400 bg-amber-50 rounded-md w-72 h-8 px-2 outline-0"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button onClick={CopyPass} className="bg-amber-300 rounded-lg px-1.5 py-0.5 mx-1.5 cursor-pointer outline-0 shrink-0 hover:bg-amber-200 ">
              Copy
            </button>
          </div>
          <div className="flex flex-row gap-2 m-2">
            <div id="length" className="items-center flex">
              <input
                type="range"
                min={5}
                max={50}
                value={length}
                className="cursor-pointer gap-x-1"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="text-[12px]">Lenght: {length}</label>
            </div>
            <div className="items-center flex">
              <input
                type="checkbox"
                className="m-1 pt-4 outline-0"
                defaultChecked={useNum}
                id="useNum"
                onChange={() => {
                  setUseNum((prev) => !prev);
                }}
              />
              <label className="text-[14px]">Numbers</label>
            </div>
            <div className="items-center flex">
              <input
                type="checkbox"
                className="m-1 pt-4 outline-0"
                defaultChecked={useChar}
                id="useChar"
                onChange={() => {
                  setUseChar((prev) => !prev);
                }}
              />
              <label className="text-[14px]">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
