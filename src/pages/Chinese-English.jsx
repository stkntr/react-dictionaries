import { useEffect, useState } from "react";
import { ActionButton } from "../components/ActionButton";
// import {superscript} from "numbers-to-superscript";
import parse from 'html-react-parser';
import Cedict from '../cedict.json';

export const ChineseEnglish = () => {
  const [inputedText, setInputedText] = useState("");
  const [dictInfo, setDictInfo] = useState("（未取得）");
  
  const [lookupResult, setLookupResult] = useState({
    myWord: "（入力待ち）",
    // result: "未取得",
  });

  const [history, setHistory] = useState([]);

  // 取得した辞書のデータを整形する
  const getDictString = (json, myWord) => {
    // const dictString = json.length;
    // console.log(json);
    // console.log(json instanceof Array);

    let dictString = "";

    if (json instanceof Array) {
      try {
        // console.log(json[0]);
        // console.log(myWord);
        let dictStrings = [];
        const entries = json.filter(
          entry => entry.simplified === myWord || entry.traditional === myWord
          );
        // console.log(entries.length);
        if (entries.length > 0) {
          for (let i=0; i<entries.length; i++) {
            let entry = entries[i];
            // console.log(entry);
            let currentString = ""
            currentString += "<b>" + entry.traditional;
            currentString += "（" + entry.simplified + "）</b>";
            currentString += "[" + entry.pinyin + "]";
            for (let j=0; j<entry.english.length; j++) {
              let currentEnglish = entry.english[j];
              if (currentEnglish.startsWith("CL:")) {
                currentString += "<br>" + currentEnglish;
              } else {
                currentString += "<br>" + "• " + currentEnglish;
              }
            }
            dictStrings.push(currentString);
          }  
          dictString = dictStrings.join("<br>");
        } else {
          dictString = "（項目がありませんでした）";
        }
        // console.log(dictString);
      } catch (error) {
        console.error(error);
        // console.log("<error on getDictString>");
        dictString = "（取得できませんでした）";
      }
    } else {
      dictString = "（取得できませんでした）";
    }
    setDictInfo(parse(dictString));
  };

  // 辞書のデータを外部APIから取得する
  const getDictInfo = (myWord) => {
    try {
      setDictInfo("（取得中…）");
      // console.log(Cedict.length);
      getDictString(Cedict, myWord);
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
    if (myWord !== "") {
      const result = getLookupResult(myWord);
      setInputedText(inputedText);
      setLookupResult(result);
      setHistory([result, ...history]);
    } else {

    }
  };

  return (
    <>
      <h2 className="font-bold text-center">中英辞書</h2>
      <section className="text-center py-4">
        <label>
          <span className="font-bold">検索語句：</span>
          <input
            className="w-28 border px-2 py-1 mr-2 shadow-inner" 
            name="myInput" 
            value={inputedText}
            onChange={(event) => setInputedText(event.target.value)}
          />
        </label>
        <ActionButton text="辞書でひく" action={() => getWord(inputedText)}/>
        {/* <p>入力した語句：{inputedText}</p> */}
        {/* <p>検索した語句：{lookupResult.myWord}</p> */}
      </section>

      <section className="sm:flex">
        <section className="sm:w-3/4 p-8">
          <section>
            <h3 className="font-bold">検索結果：</h3>
            <p className="">{dictInfo}</p>
          </section>
        </section>

        <section className="sm:w-1/4 p-8 pt-0 sm:pt-8 sm:border-l">
          <h3 className="font-bold">検索履歴：</h3>
          <ul>
            {history.map((x, i) => (
              <li key={i}>{x.myWord}</li>
            ))}
          </ul>
        </section>

      </section>

    </>
  );
};