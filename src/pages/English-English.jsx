import { useEffect, useState } from "react";
import { ActionButton } from "../components/ActionButton";

export const EnglishEnglish = () => {
  const [inputedText, setInputedText] = useState("");
  const [dictInfo, setDictInfo] = useState("（未取得）");
  
  const [lookupResult, setLookupResult] = useState({
    myWord: "入力待ち",
    // result: "未取得",
  });

  const [history, setHistory] = useState([]);

  // 取得した辞書のデータを整形する
  const getDictString = (json) => {
    // const dictString = json.length;
    console.log(json);
    let dictString = "";
    try {
      let dictStrings = [];
      for (let dict of json) {
        dictStrings.push(dict.word);
      }
      dictString = dictStrings.join(", ");
      // console.log(dictString);
    } catch (error) {
      console.error(error);
      console.log("<error on getDictString>");
      dictString = "（取得できませんでした）";
    }
    setDictInfo(dictString);
  };

  // 辞書のデータを外部APIから取得する
  const getDictInfo = (myWord) => {
    let dictUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    dictUrl += myWord;
    try {
      setDictInfo("（取得中…）");
      fetch(dictUrl)
        .then(res => res.json())
        .then(json => getDictString(json));
    } catch (error) {
      console.error(error);
      console.log("<error>");
      setDictInfo("<error>");
    };
  };

  useEffect(() => {
    // console.log(dictInfo);
  }, [dictInfo])

  const getLookupResult = (myWord) => {
    getDictInfo(myWord);
    return {
      myWord: myWord,
      // result: dictInfo.length,
    };
  };

  const getWord = (myWord) => {
    const result = getLookupResult(myWord);
    setInputedText(inputedText);
    setLookupResult(result);
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

      <p>検索した語句：{lookupResult.myWord}</p>
      <p>意味：{dictInfo}</p>
      <h3>検索履歴</h3>
      <table>
        <thead>
          <tr>
            <th>検索語句</th>
            {/* <th>意味</th> */}
          </tr>
        </thead>
        <tbody>
          {history.map((x, i) => (
            <tr key={i}>
              <td>{x.myWord}</td>
              {/* <td>{x.result}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};