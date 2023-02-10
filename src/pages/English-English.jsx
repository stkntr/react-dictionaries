import { useEffect, useState } from "react";
import { ActionButton } from "../components/ActionButton";
// import {superscript} from "numbers-to-superscript";
import parse from 'html-react-parser';

export const EnglishEnglish = () => {
  const [inputedText, setInputedText] = useState("");
  const [dictInfo, setDictInfo] = useState("（未取得）");
  
  const [lookupResult, setLookupResult] = useState({
    myWord: "（入力待ち）",
    // result: "未取得",
  });

  const [history, setHistory] = useState([]);

  // 取得した辞書のデータを整形する
  const getDictString = (json) => {
    // const dictString = json.length;
    console.log(json);
    console.log(json instanceof Array);

    let dictString = "";

    if (json instanceof Array) {
      try {
        let dictStrings = [];
        for (let i=0; i<json.length; i++) {
          let dict = json[i];
          let dictString = "";
          if (json.length > 1) {
            let supNumber = i+1;
            // supNumber = superscript(supNumber);
            dictString = "<b>" + dict.word + "<sup>" + supNumber + "</sup>" + "</b>";
          } else {
            dictString = "<b>" + dict.word + "</b>";
          }
          if ("phonetic" in dict) {
            dictString += " " + dict.phonetic;
          }
          for (let j=0; j<dict.meanings.length; j++) {
            let meaning = dict.meanings[j];
            dictString += "<br>(" + meaning.partOfSpeech + ")";
            for (let k=0; k<meaning.definitions.length; k++) {
              let currentDefinition = meaning.definitions[k];
              let definition = currentDefinition.definition;
              if (meaning.definitions.length > 1) {
                let definitionNumber = k + 1;
                dictString += "&ensp;<b>" + definitionNumber + ".</b> " + definition + "";
              } else {
                dictString += "&ensp;" + definition + "";
              }
              if ("example" in currentDefinition) {
                dictString += "&ensp;<i>" + currentDefinition.example + "</i>";
              }    
            }
          }
          if ("origin" in dict) {
            dictString += "<br><b>Origin:</b> " + dict.origin;
          }

          dictStrings.push(dictString);
        }
        dictString = dictStrings.join("<br>");
        // console.log(dictString);
      } catch (error) {
        console.error(error);
        // console.log("<error on getDictString>");
        dictString = "（取得できませんでした）";
      }
    } else if (json instanceof Object) {
      if ("title" in json) {
        if (json.title === "No Definitions Found") {
          dictString = "（項目がありませんでした）";
        } else {
          dictString = "（取得できませんでした）";
        }
      }
    } else {
      dictString = "（取得できませんでした）";
    }
    setDictInfo(parse(dictString));
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
      <h2 className="text-center">英英辞書の画面</h2>

      <section className="flex">
        <section className="w-3/4 p-8">
          <label>
            検索する語句：
            <input
              className="border px-2 py-1 mx-2" 
              name="myInput" 
              value={inputedText}
              onChange={(event) => setInputedText(event.target.value)}
            />
          </label>
          <ActionButton text="英英辞書でひく" action={() => getWord(inputedText)}/>
          {/* <p>入力した語句：{inputedText}</p> */}

          {/* <p>検索した語句：{lookupResult.myWord}</p> */}
          <p>意味：</p>
          <p>{dictInfo}</p>
        </section>

        <section className="w-1/4 p-8">
          {/* <h3>検索履歴</h3> */}
          <table>
            <thead>
              <tr>
                <th>検索語句履歴</th>
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
        </section>

      </section>

    </>
  );
};