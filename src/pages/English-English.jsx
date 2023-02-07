import { useState } from "react";
import { ActionButton } from "../components/ActionButton";

export const EnglishEnglish = () => {
  const [inputedText, setInputedText] = useState("");
  const [dictInfo, setDictInfo] = useState([]);
  
  const [wordResult, setWordResult] = useState({
    myWord: "入力待ち",
    result: "未取得",
  });

  const [history, setHistory] = useState([]);

  const getDictInfo = async (myWord) => {
    let dictUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    dictUrl += myWord;
    try {
      const res = await fetch(dictUrl);
      const json = await res.json();
      await setDictInfo(json);
      // console.log(myWord);
      await console.log(dictInfo.length);
      // console.log(json.length);
    } catch (error) {
      console.error(error);
    };
  };

  const getWordResult = (myWord) => {
    getDictInfo(myWord);
    // console.log(myWord);
    // console.log(dictInfo.length);
    return {
      myWord: myWord,
      result: dictInfo.length,
    };
  };

  const getWord = (myWord) => {
    const result = getWordResult(myWord);
    setInputedText(inputedText);
    setWordResult(result);
    setHistory([result, ...history]);
  };

  return (
    <>
      <h2>英英辞書の画面</h2>
      <label>
        検索する語句：
        <input
          name="myInput" 
          value={inputedText}
          onChange={(event) => setInputedText(event.target.value)}
        />
      </label>
      <ActionButton text="英英辞書でひく" action={() => getWord(inputedText)}/>
      <p>入力した語句：{inputedText}</p>

      <p>検索した語句：{wordResult.myWord}</p>
      <p>意味：{wordResult.result}</p>
      <h3>履歴</h3>
      <table>
        <thead>
          <tr>
            <th>検索語句</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          {history.map((x, i) => (
            <tr key={i}>
              <td>{x.myWord}</td>
              <td>{x.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};