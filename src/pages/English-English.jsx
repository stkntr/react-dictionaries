import { useState } from "react";
import { ActionButton } from "../components/ActionButton";

export const EnglishEnglish = () => {
  const [wordResult, setWordResult] = useState({
    myWord: "入力待ち",
    result: "未取得",
  });

  const [history, setHistory] = useState([]);

  const getWordResult = (myWord) => {


    return {
      myWord: myWord,
      result: "愛",
    };
  };

  const getWord = (myWord) => {
    const result = getWordResult(myWord);
    setWordResult(result);
    setHistory([result, ...history]);
  };

  return (
    <>
      <p>英英辞書の画面</p>
      <label>
        検索する語句：<input name="myInput" />
      </label>
      <ActionButton text="英英辞書でひく" action={() => getWord("love")}/>
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