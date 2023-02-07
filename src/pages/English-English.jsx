import { useState } from "react";
import { ActionButton } from "../components/ActionButton";

export const EnglishEnglish = () => {
  const [inputedText, setInputedText] = useState("");
  const [returnedText, setReturnedText] = useState("");
  
  const [wordResult, setWordResult] = useState({
    myWord: "入力待ち",
    result: "未取得",
  });

  const [history, setHistory] = useState([]);

  const getWordInfo = async (myWord) => {
    let dictUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    dictUrl += myWord;
    try {
      const res = await fetch(dictUrl);
      const dictInfo = await res.json();
      // console.log(dictInfo);
      // await setReturnedText(JSON.stringify(dictInfo)) ;
      await setReturnedText(dictInfo.length) ;
      // return "結果";
      // return JSON.stringify(dictInfo);
    } catch (error) {
      console.error(error);
      // return error;
    };
  };

  const getWordResult = (myWord) => {
    //console.log(myWord);
    getWordInfo(myWord);
    return {
      myWord: myWord,
      result: returnedText,
    };
  };

  const getWord = (myWord) => {
    setInputedText(inputedText);
    const result = getWordResult(myWord);
    setWordResult(result);
    setHistory([result, ...history]);
  };

  return (
    <>
      <p>英英辞書の画面</p>
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
      <p>履歴</p>
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